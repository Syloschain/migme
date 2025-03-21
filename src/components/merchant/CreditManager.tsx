
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { ApiClient } from "@/services/ApiClient";
import { supabase } from "@/integrations/supabase/client";

const CreditManager = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [userId, setUserId] = useState("");

  const searchUser = async () => {
    if (!username) {
      toast({
        title: "Error",
        description: "Please enter a username to search",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username')
        .ilike('username', `%${username}%`)
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setUserId(data[0].id);
        toast({
          title: "User found",
          description: `Found user: ${data[0].username}`,
        });
      } else {
        toast({
          title: "User not found",
          description: "No user found with that username",
          variant: "destructive",
        });
        setUserId("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const credits = parseInt(amount);
    if (isNaN(credits) || credits <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid credit amount",
        variant: "destructive",
      });
      return;
    }

    if (!profile || !profile.is_merchant) {
      toast({
        title: "Unauthorized",
        description: "Only merchants can transfer credits",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Add transaction
      await ApiClient.addCreditTransaction(
        userId, 
        credits, 
        "merchant_transfer", 
        note || `Transfer from ${profile.username}`
      );
      
      // Record merchant relationship
      await supabase
        .from('merchant_transactions')
        .insert({
          merchant_id: profile.id,
          customer_id: userId,
          amount: credits,
          commission: Math.floor(credits * 0.1), // 10% commission
          status: 'completed'
        });
      
      toast({
        title: "Credits Transferred!",
        description: `${credits} credits have been transferred to the user.`,
      });
      
      // Reset form
      setUsername("");
      setAmount("");
      setNote("");
      setUserId("");
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: error instanceof Error ? error.message : "Failed to transfer credits",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!profile || !profile.is_merchant) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p>You need to be a merchant to manage credits.</p>
            <Button className="mt-4" asChild>
              <a href="/merchant">Apply to become a merchant</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Credit Management</CardTitle>
        <CardDescription>Manage and transfer credits as a merchant</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transfer">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transfer">Transfer Credits</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transfer" className="space-y-4 mt-4">
            <form onSubmit={handleTransfer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex gap-2">
                  <Input 
                    id="username" 
                    placeholder="Recipient's username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={searchUser}
                    disabled={isLoading}
                  >
                    Search
                  </Button>
                </div>
                {userId && (
                  <p className="text-xs text-green-600">User found! Ready to transfer.</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="Credits to transfer" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                {profile && (
                  <p className="text-xs text-muted-foreground">
                    Available Balance: {profile.credit_balance} Credits
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Input 
                  id="note" 
                  placeholder="Add a message" 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              
              <div className="bg-migblue/10 p-3 rounded-md space-y-1">
                <p className="text-sm font-medium">Transfer Details</p>
                <ul className="text-xs space-y-1">
                  <li className="flex justify-between">
                    <span>Amount:</span>
                    <span>{amount ? `${amount} Credits` : "-"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Recipient:</span>
                    <span>{username || "-"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>They become your customer for:</span>
                    <span>30 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Your commission:</span>
                    <span>10% of their purchases</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !userId}
              >
                {isLoading ? "Processing..." : "Transfer Credits"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <p className="text-center text-muted-foreground py-8">
              Transaction history coming soon...
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CreditManager;
