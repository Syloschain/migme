
import { Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface CreditBalanceWidgetProps {
  credits?: number;
  className?: string;
}

const CreditBalanceWidget = ({ credits = 500, className }: CreditBalanceWidgetProps) => {
  const handleBuyCredits = () => {
    toast({
      title: "Buy Credits",
      description: "Credit purchase feature coming soon!",
    });
  };

  return (
    <Card className={`overflow-hidden shadow-md ${className}`}>
      <CardContent className="p-0">
        <div className="bg-migblue p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            <span className="font-semibold">migCredits</span>
          </div>
          <Button 
            size="sm" 
            onClick={handleBuyCredits}
            className="migme-btn px-3 py-1"
          >
            Buy More
          </Button>
        </div>
        <div className="p-4 flex justify-between items-center">
          <div className="text-2xl font-bold">{credits}</div>
          <div className="text-sm text-muted-foreground">Available Credits</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditBalanceWidget;
