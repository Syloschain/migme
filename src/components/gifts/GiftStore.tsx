
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "popular" | "emoticons" | "avatars" | "seasonal" | "premium";
  isNew?: boolean;
  isLimited?: boolean;
}

const GiftStore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userCredits] = useState(250);
  const [giftItems] = useState<GiftItem[]>([
    { id: "1", name: "Red Rose", description: "A beautiful red rose for that special someone", price: 25, category: "popular", isNew: true },
    { id: "2", name: "Love Heart", description: "Show your affection with a pulsing heart", price: 30, category: "popular" },
    { id: "3", name: "Victory Trophy", description: "Celebrate a win with this golden trophy", price: 50, category: "popular" },
    { id: "4", name: "Cool Shades", description: "Avatar accessory: Stylish sunglasses", price: 75, category: "avatars" },
    { id: "5", name: "Diamond Ring", description: "Premium sparkly diamond ring gift", price: 100, category: "premium", isLimited: true },
    { id: "6", name: "Birthday Cake", description: "Wish someone a happy birthday", price: 40, category: "seasonal" },
    { id: "7", name: "Christmas Pack", description: "Holiday themed emoticons (set of 10)", price: 60, category: "emoticons", isLimited: true },
    { id: "8", name: "Party Hat", description: "Avatar accessory: Colorful party hat", price: 35, category: "avatars" },
    { id: "9", name: "LOL Emoji", description: "Animated laughing emoji", price: 15, category: "emoticons" },
    { id: "10", name: "Royal Crown", description: "Avatar accessory: Premium royal crown", price: 120, category: "premium" },
    { id: "11", name: "Valentine Box", description: "Box of chocolates for Valentine's", price: 45, category: "seasonal", isNew: true },
    { id: "12", name: "Thumbs Up", description: "Show your approval", price: 10, category: "emoticons" },
  ]);

  const allGifts = giftItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularGifts = allGifts.filter((item) => item.category === "popular");
  const emoticonGifts = allGifts.filter((item) => item.category === "emoticons");
  const avatarGifts = allGifts.filter((item) => item.category === "avatars");
  const seasonalGifts = allGifts.filter((item) => item.category === "seasonal");
  const premiumGifts = allGifts.filter((item) => item.category === "premium");

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              Gift Store
              <Badge variant="outline" className="ml-2">
                {userCredits} Credits
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
            <GiftGrid gifts={allGifts} userCredits={userCredits} />
          </TabsContent>
          
          <TabsContent value="popular" className="mt-6">
            <GiftGrid gifts={popularGifts} userCredits={userCredits} />
          </TabsContent>
          
          <TabsContent value="emoticons" className="mt-6">
            <GiftGrid gifts={emoticonGifts} userCredits={userCredits} />
          </TabsContent>
          
          <TabsContent value="avatars" className="mt-6">
            <GiftGrid gifts={avatarGifts} userCredits={userCredits} />
          </TabsContent>
          
          <TabsContent value="seasonal" className="mt-6">
            <GiftGrid gifts={seasonalGifts} userCredits={userCredits} />
          </TabsContent>
          
          <TabsContent value="premium" className="mt-6">
            <GiftGrid gifts={premiumGifts} userCredits={userCredits} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const GiftGrid = ({ gifts, userCredits }: { gifts: GiftItem[], userCredits: number }) => {
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
              <span className="text-xl">🎁</span>
            </div>
            {gift.isNew && (
              <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
            )}
            {gift.isLimited && (
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
