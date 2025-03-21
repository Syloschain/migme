
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Coin } from "lucide-react";

const SuperMentorCredits = () => {
  const { user, profile } = useAuth();
  const [targetUserId, setTargetUserId] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const isSuperMentor = profile?.roles?.includes('supermentor');

  const generateCredits = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to perform this action",
        variant: "destructive"
      });
      return;
    }

    if (!isSuperMentor) {
      toast({
        title: "Unauthorized",
        description: "Only SuperMentors can generate credits",
        variant: "destructive"
      });
      return;
    }

    if (!targetUserId || !amount || Number(amount) <= 0) {
      toast({
        title: "Invalid input",
        description: "Please provide a valid user ID and amount",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.rpc('generate_credits', {
        admin_id: user.id,
        target_user_id: targetUserId,
        amount: Number(amount)
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `${amount} credits have been generated and added to the user's account`,
      });

      // Reset fields
      setTargetUserId("");
      setAmount("");
    } catch (error: any) {
      console.error("Error generating credits:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate credits",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isSuperMentor) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Only SuperMentors can access this feature.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coin className="h-5 w-5 text-migorange" />
          SuperMentor: Generate Credits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="target-user" className="text-sm font-medium">
            Target User ID
          </label>
          <Input
            id="target-user"
            placeholder="Enter user UUID"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="credit-amount" className="text-sm font-medium">
            Credit Amount
          </label>
          <Input
            id="credit-amount"
            type="number"
            placeholder="Enter amount to generate"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            min={1}
          />
        </div>

        <Button 
          onClick={generateCredits} 
          disabled={loading || !targetUserId || !amount || Number(amount) <= 0}
          className="w-full"
        >
          {loading ? "Processing..." : "Generate Credits"}
        </Button>

        <div className="text-sm text-muted-foreground mt-4">
          <p>Note: This action is logged and can only be performed by SuperMentors.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperMentorCredits;
