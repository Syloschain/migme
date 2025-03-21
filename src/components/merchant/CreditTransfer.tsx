
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
import { toast } from "@/hooks/use-toast";

const CreditTransfer = () => {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !amount) {
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
    
    // In a real app, this would call an API
    toast({
      title: "Credits Transferred!",
      description: `${credits} credits have been transferred to ${username}.`,
    });
    
    // Reset form
    setUsername("");
    setAmount("");
    setNote("");
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Transfer Credits</CardTitle>
        <CardDescription>Send credits to users or customers</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTransfer} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              placeholder="Recipient's username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
            <p className="text-xs text-muted-foreground">
              Available Balance: 500 Credits
            </p>
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
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleTransfer}>
          Transfer Credits
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreditTransfer;
