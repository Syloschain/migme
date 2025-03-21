
import { Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CreditBalanceWidgetProps {
  className?: string;
  refreshTrigger?: number;
}

const CreditBalanceWidget = ({ className, refreshTrigger = 0 }: CreditBalanceWidgetProps) => {
  const { profile, user } = useAuth();
  const [credits, setCredits] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && profile.credit_balance !== undefined) {
      setCredits(profile.credit_balance);
    }
  }, [profile, refreshTrigger]);

  const handleBuyCredits = () => {
    navigate("/store");
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
          <div className="text-2xl font-bold">{credits.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Available Credits</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditBalanceWidget;
