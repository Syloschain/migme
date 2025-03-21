
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Wallet, 
  Users, 
  BadgePercent 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MerchantApplication = () => {
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We've received your merchant application. We'll review it and get back to you soon.",
    });
    setApplicationSubmitted(true);
  };

  if (applicationSubmitted) {
    return (
      <Card className="shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full w-fit">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle>Application Submitted!</CardTitle>
          <CardDescription>
            Thank you for applying to become a Migme Merchant. We'll review your application and get back to you within 2-3 business days.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4 text-green-800">
            <p className="text-sm">
              While you wait, you can learn more about the merchant program benefits and responsibilities in our help center.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-migblue/10 p-3 rounded-full mb-4">
              <Wallet className="h-6 w-6 text-migblue" />
            </div>
            <h3 className="font-medium mb-2">Sell Credits</h3>
            <p className="text-sm text-muted-foreground">
              Sell Migme credits to users and earn commission on each sale
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-migblue/10 p-3 rounded-full mb-4">
              <Users className="h-6 w-6 text-migblue" />
            </div>
            <h3 className="font-medium mb-2">Build a Network</h3>
            <p className="text-sm text-muted-foreground">
              Recruit other merchants and earn from their sales too
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-migblue/10 p-3 rounded-full mb-4">
              <BadgePercent className="h-6 w-6 text-migblue" />
            </div>
            <h3 className="font-medium mb-2">Earn Commission</h3>
            <p className="text-sm text-muted-foreground">
              Get 10% commission on customer purchases and 5% from recruited merchants
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Become a Migme Merchant</CardTitle>
          <CardDescription>
            Apply to become an official merchant and start earning credits by reselling to others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information</Label>
              <Input id="contact" placeholder="Email or phone number" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Country/Region" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Sales Experience</Label>
              <select 
                id="experience" 
                className="w-full h-10 px-3 border rounded-md"
                required
              >
                <option value="">Select your experience level</option>
                <option value="none">No prior experience</option>
                <option value="some">Some sales experience</option>
                <option value="experienced">Experienced in sales</option>
                <option value="professional">Professional salesperson</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">
                Why do you want to become a Migme Merchant?
              </Label>
              <Textarea
                id="reason"
                placeholder="Tell us why you'd be a good merchant and how you plan to sell credits"
                rows={4}
                required
              />
            </div>
            
            <div className="pt-2">
              <Label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" required />
                <span className="text-sm">
                  I agree to the Merchant Terms and Conditions and understand the responsibilities
                </span>
              </Label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            onClick={handleSubmit}
          >
            Submit Application
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MerchantApplication;
