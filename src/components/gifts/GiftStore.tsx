
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  is_new?: boolean;
  is_limited?: boolean;
  image_url?: string;
}

const GiftStore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [giftItems, setGiftItems] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const { data, error } = await supabase
          .from('virtual_gifts')
          .select('*');
          
        if (error) throw error;
        
        setGiftItems(data || []);
      } catch (error) {
        console.error('Error fetching gifts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load gift items',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchGifts();
  }, [toast]);

  const allGifts = giftItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularGifts = allGifts.filter((item) => item.category === "popular");
  const emoticonGifts = allGifts.filter((item) => item.category === "emoticons");
  const avatarGifts = allGifts.filter((item) => item.category === "avatars");
  const seasonalGifts = allGifts.filter((item) => item.category === "seasonal");
  const premiumGifts = allGifts.filter((item) => item.category === "premium");

  const handlePurchase = async (giftId: string, price: number) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to purchase gifts',
        variant: 'destructive'
      });
      return;
    }
    
    if (!profile || profile.credit_balance < price) {
      toast({
        title: 'Insufficient Credits',
        description: 'You do not have enough credits to purchase this gift',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      const { data, error } = await supabase.rpc('purchase_gift', {
        gift_id: giftId,
        buyer_id: user.id
      });
      
      if (error) throw error;
      
      toast({
        title: 'Purchase Successful',
        description: 'Gift has been added to your inventory',
      });
    } catch (error) {
      console.error('Error purchasing gift:', error);
      toast({
        title: 'Purchase Failed',
        description: 'Failed to purchase the gift item',
        variant: 'destructive'
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              Gift Store
              <Badge variant="outline" className="ml-2">
                {profile?.credit_balance || 0} Credits
              </Badge>
            </CardTitle>
            <CardDescription>Buy gifts and emoticons to share with friends</CardDescription>
          </div>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search gifts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All ({allGifts.length})</TabsTrigger>
              <TabsTrigger value="popular" className="flex-1">Popular ({popularGifts.length})</TabsTrigger>
              <TabsTrigger value="emoticons" className="flex-1">Emoticons ({emoticonGifts.length})</TabsTrigger>
              <TabsTrigger value="avatars" className="flex-1">Avatar Items ({avatarGifts.length})</TabsTrigger>
              <TabsTrigger value="seasonal" className="flex-1">Seasonal ({seasonalGifts.length})</TabsTrigger>
              <TabsTrigger value="premium" className="flex-1">Premium ({premiumGifts.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <GiftGrid gifts={allGifts} userCredits={profile?.credit_balance || 0} onPurchase={handlePurchase} />
            </TabsContent>
            
            <TabsContent value="popular" className="mt-6">
              <GiftGrid gifts={popularGifts} userCredits={profile?.credit_balance || 0} onPurchase={handlePurchase} />
            </TabsContent>
            
            <TabsContent value="emoticons" className="mt-6">
              <GiftGrid gifts={emoticonGifts} userCredits={profile?.credit_balance || 0} onPurchase={handlePurchase} />
            </TabsContent>
            
            <TabsContent value="avatars" className="mt-6">
              <GiftGrid gifts={avatarGifts} userCredits={profile?.credit_balance || 0} onPurchase={handlePurchase} />
            </TabsContent>
            
            <TabsContent value="seasonal" className="mt-6">
              <GiftGrid gifts={seasonalGifts} userCredits={profile?.credit_balance || 0} onPurchase={handlePurchase} />
            </TabsContent>
            
            <TabsContent value="premium" className="mt-6">
              <GiftGrid gifts={premiumGifts} userCredits={profile?.credit_balance || 0} onPurchase={handlePurchase} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

interface GiftGridProps {
  gifts: GiftItem[];
  userCredits: number;
  onPurchase: (giftId: string, price: number) => void;
}

const GiftGrid = ({ gifts, userCredits, onPurchase }: GiftGridProps) => {
  if (gifts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No gifts found
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {gifts.map((gift) => (
        <Card key={gift.id} className="overflow-hidden">
          <div className="aspect-square bg-muted flex items-center justify-center relative">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              {gift.image_url ? (
                <img src={gift.image_url} alt={gift.name} className="h-full w-full object-contain" />
              ) : (
                <span className="text-xl">🎁</span>
              )}
            </div>
            {gift.is_new && (
              <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
            )}
            {gift.is_limited && (
              <Badge className="absolute top-2 right-2 bg-red-500">Limited</Badge>
            )}
            <Button variant="ghost" size="icon" className="absolute bottom-2 right-2">
              <Heart size={18} />
            </Button>
          </div>
          <CardContent className="p-3">
            <div className="font-medium truncate">{gift.name}</div>
            <div className="text-xs text-muted-foreground mb-2 h-8 line-clamp-2">
              {gift.description}
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="font-normal">
                {gift.price} Credits
              </Badge>
              <Button 
                size="sm" 
                disabled={userCredits < gift.price}
                className="flex items-center gap-1"
                onClick={() => onPurchase(gift.id, gift.price)}
              >
                <ShoppingCart size={14} />
                <span>Buy</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GiftStore;
