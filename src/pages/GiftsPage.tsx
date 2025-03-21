
import Layout from "@/components/layout/Layout";
import GiftStore from "@/components/gifts/GiftStore";
import CreditDisplay from "@/components/credits/CreditDisplay";
import VirtualItem from "@/components/gifts/VirtualItem";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GiftsPage = () => {
  const specialGifts = [
    { id: "g1", name: "Diamond", price: 50, category: "gift" as const, isPremium: true },
    { id: "g2", name: "Bouquet", price: 20, category: "gift" as const, isNew: true },
    { id: "g3", name: "Heart", price: 10, category: "gift" as const },
    { id: "g4", name: "Crown", price: 30, category: "gift" as const, isPremium: true },
  ];
  
  const avatarItems = [
    { id: "a1", name: "Royal Crown", price: 100, category: "avatar" as const, isPremium: true },
    { id: "a2", name: "Summer Hat", price: 40, category: "avatar" as const, isNew: true },
    { id: "a3", name: "Cool Glasses", price: 25, category: "avatar" as const },
    { id: "a4", name: "Party Outfit", price: 60, category: "avatar" as const, isLimited: true },
  ];
  
  const stickerPacks = [
    { id: "s1", name: "Emoji Pack", price: 15, category: "sticker" as const, description: "24 fun emoji stickers" },
    { id: "s2", name: "Holiday Pack", price: 20, category: "sticker" as const, description: "Christmas themed stickers", isLimited: true },
    { id: "s3", name: "Cute Animals", price: 15, category: "sticker" as const, description: "12 adorable animal stickers" },
    { id: "s4", name: "Animated Love", price: 25, category: "sticker" as const, description: "Animated love stickers", isPremium: true },
  ];
  
  const emoticons = [
    { id: "e1", name: "Party Emoticons", price: 5, category: "emoticon" as const, description: "Party themed emoticons" },
    { id: "e2", name: "Reactions Pack", price: 5, category: "emoticon" as const, description: "Express yourself with reactions" },
    { id: "e3", name: "Special Emotes", price: 10, category: "emoticon" as const, description: "Exclusive emoticons", isPremium: true },
    { id: "e4", name: "Animated Faces", price: 15, category: "emoticon" as const, description: "Animated face emoticons", isNew: true },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gift Store</h1>
          <CreditDisplay credits={500} />
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Popular Gift Categories</CardTitle>
            <CardDescription>Send gifts to friends to show your appreciation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <CategoryButton name="Special" count={24} bgColor="bg-purple-100" textColor="text-purple-800" />
              <CategoryButton name="Seasonal" count={12} bgColor="bg-green-100" textColor="text-green-800" />
              <CategoryButton name="Animated" count={18} bgColor="bg-blue-100" textColor="text-blue-800" />
              <CategoryButton name="Premium" count={8} bgColor="bg-amber-100" textColor="text-amber-800" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Virtual Items</CardTitle>
            <CardDescription>Purchase virtual items for your avatar or to send as gifts</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <Tabs defaultValue="gifts">
              <TabsList className="w-full grid grid-cols-4 mb-6">
                <TabsTrigger value="gifts">Gifts</TabsTrigger>
                <TabsTrigger value="avatar">Avatar Items</TabsTrigger>
                <TabsTrigger value="stickers">Sticker Packs</TabsTrigger>
                <TabsTrigger value="emoticons">Emoticons</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gifts">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {specialGifts.map((gift) => (
                    <VirtualItem key={gift.id} {...gift} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="avatar">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {avatarItems.map((item) => (
                    <VirtualItem key={item.id} {...item} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="stickers">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stickerPacks.map((pack) => (
                    <VirtualItem key={pack.id} {...pack} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="emoticons">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {emoticons.map((emoticon) => (
                    <VirtualItem key={emoticon.id} {...emoticon} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

const CategoryButton = ({ 
  name, 
  count, 
  bgColor,
  textColor
}: { 
  name: string; 
  count: number;
  bgColor: string;
  textColor: string;
}) => {
  return (
    <div className={`${bgColor} ${textColor} rounded-lg p-4 text-center cursor-pointer hover:opacity-90 transition-opacity`}>
      <div className="font-medium">{name}</div>
      <div className="text-xs">{count} gifts</div>
    </div>
  );
};

export default GiftsPage;
