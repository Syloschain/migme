
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Gift, Sparkles, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export interface VirtualItemProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: "gift" | "avatar" | "sticker" | "emoticon";
  isLimited?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
  onPurchase?: (id: string) => void;
}

const CategoryIcons = {
  gift: <Gift className="h-6 w-6" />,
  avatar: <Sparkles className="h-6 w-6" />,
  sticker: <Star className="h-6 w-6" />,
  emoticon: <Sparkles className="h-6 w-6" />,
};

const VirtualItem = ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  isLimited = false,
  isNew = false,
  isPremium = false,
  onPurchase
}: VirtualItemProps) => {
  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(id);
    } else {
      toast({
        title: "Item Purchased",
        description: `You've purchased ${name} for ${price} credits!`,
      });
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border">
      <div className="relative">
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="object-cover w-full h-full" 
            />
          ) : (
            <div className="bg-gradient-to-r from-migblue-light to-migblue flex items-center justify-center h-full w-full">
              {CategoryIcons[category]}
            </div>
          )}
        </div>
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-miggreen">New</Badge>
          )}
          {isLimited && (
            <Badge className="bg-migorange flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Limited
            </Badge>
          )}
          {isPremium && (
            <Badge className="bg-purple-500 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Premium
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-3 flex-grow">
        <div className="font-medium">{name}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <div className="flex items-center text-migblue font-semibold">
          {price} credits
        </div>
        <Button size="sm" onClick={handlePurchase}>Purchase</Button>
      </CardFooter>
    </Card>
  );
};

export default VirtualItem;
