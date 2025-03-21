
import { useState } from "react";
import VirtualItem from "@/components/gifts/VirtualItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PremiumItemsProps {
  // Props if needed
}

const PremiumItems = ({}: PremiumItemsProps) => {
  const [activeCategory, setActiveCategory] = useState("exclusive");
  
  const categories = [
    { id: "exclusive", label: "Exclusive" },
    { id: "seasonal", label: "Seasonal" },
    { id: "avatars", label: "Avatars" },
    { id: "emoticons", label: "Emoticons" }
  ];
  
  const premiumItems = [
    // Exclusive items
    {
      id: "diamond-gift",
      name: "Diamond Gift",
      description: "Ultra-rare premium gift that shows your high status",
      price: 1000,
      category: "gift",
      isPremium: true,
      group: "exclusive"
    },
    {
      id: "vip-crown",
      name: "VIP Crown",
      description: "Special avatar accessory only for elite members",
      price: 750,
      category: "avatar",
      isPremium: true,
      group: "exclusive"
    },
    {
      id: "gold-wings",
      name: "Golden Wings",
      description: "Majestic wings for your avatar that animate when you chat",
      price: 1200,
      category: "avatar",
      isPremium: true,
      group: "exclusive"
    },
    {
      id: "premium-animations",
      name: "Premium Animations",
      description: "Special effects that appear when you send a message",
      price: 500,
      category: "emoticon",
      isPremium: true,
      group: "exclusive"
    },
    
    // Seasonal items
    {
      id: "holiday-pack",
      name: "Holiday Pack",
      description: "Limited-time festive gifts and decorations",
      price: 350,
      category: "gift",
      isLimited: true,
      group: "seasonal"
    },
    {
      id: "summer-bundle",
      name: "Summer Bundle",
      description: "Beach-themed stickers and avatar items",
      price: 300,
      category: "sticker",
      isLimited: true,
      group: "seasonal"
    },
    {
      id: "birthday-set",
      name: "Birthday Set",
      description: "Special items to celebrate birthdays",
      price: 250,
      category: "gift",
      group: "seasonal"
    },
    {
      id: "valentine-pack",
      name: "Valentine Pack",
      description: "Romantic stickers and gifts for that special someone",
      price: 300,
      category: "gift",
      isLimited: true,
      group: "seasonal"
    },
    
    // Avatar items
    {
      id: "luxury-outfit",
      name: "Luxury Outfit",
      description: "Designer clothes for your avatar",
      price: 450,
      category: "avatar",
      group: "avatars"
    },
    {
      id: "legendary-pet",
      name: "Legendary Pet",
      description: "Rare companion for your avatar",
      price: 600,
      category: "avatar",
      isPremium: true,
      group: "avatars"
    },
    {
      id: "animated-hair",
      name: "Animated Hairstyle",
      description: "Hair that moves with special effects",
      price: 350,
      category: "avatar",
      group: "avatars"
    },
    {
      id: "special-fx",
      name: "Special Effects",
      description: "Particle effects that surround your avatar",
      price: 400,
      category: "avatar",
      group: "avatars"
    },
    
    // Emoticon packs
    {
      id: "animated-emotes",
      name: "Animated Emotes",
      description: "Set of moving emoticons for chat",
      price: 200,
      category: "emoticon",
      group: "emoticons"
    },
    {
      id: "vip-emotes",
      name: "VIP Emotes",
      description: "Exclusive emoticons only available to premium users",
      price: 250,
      category: "emoticon",
      isPremium: true,
      group: "emoticons"
    },
    {
      id: "custom-reactions",
      name: "Custom Reactions",
      description: "Personalized reaction stickers",
      price: 300,
      category: "sticker",
      group: "emoticons"
    },
    {
      id: "3d-emoticons",
      name: "3D Emoticons",
      description: "Premium 3D animated emoticons",
      price: 350,
      category: "emoticon",
      isPremium: true,
      group: "emoticons"
    }
  ];
  
  const filteredItems = premiumItems.filter(item => item.group === activeCategory);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Premium Store Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="exclusive" 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredItems.map(item => (
                    <VirtualItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      category={item.category as any}
                      isPremium={item.isPremium}
                      isLimited={item.isLimited}
                      isNew={item.id.includes('new')}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumItems;
