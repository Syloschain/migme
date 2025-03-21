
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Crown, ShieldCheck, Zap, Star, Gift, Gem } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VIPPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  discount?: number;
  credits?: number;
  popular?: boolean;
}

const VIPSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  
  const vipPlans: VIPPlan[] = [
    {
      id: "monthly",
      name: "Monthly",
      price: 9.99,
      duration: "1 month",
      credits: 500
    },
    {
      id: "quarterly",
      name: "Quarterly",
      price: 24.99,
      duration: "3 months",
      discount: 15,
      credits: 1500,
      popular: true
    },
    {
      id: "annual",
      name: "Annual",
      price: 79.99,
      duration: "12 months",
      discount: 30,
      credits: 7500
    },
  ];
  
  const vipBenefits = [
    {
      icon: <Crown className="h-5 w-5 text-amber-500" />,
      title: "VIP Status Badge",
      description: "Show off your VIP status with an exclusive badge on your profile"
    },
    {
      icon: <Gift className="h-5 w-5 text-migblue" />,
      title: "Monthly Credit Bonus",
      description: "Receive free credits every month with your membership"
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-green-600" />,
      title: "Priority Support",
      description: "Get help faster with priority customer support"
    },
    {
      icon: <Zap className="h-5 w-5 text-purple-600" />,
      title: "Exclusive Features",
      description: "Access to VIP-only features like profile customization options"
    },
    {
      icon: <Star className="h-5 w-5 text-amber-500" />,
      title: "Exclusive Content",
      description: "Access to VIP-only rooms, games, and virtual items"
    },
    {
      icon: <Gem className="h-5 w-5 text-pink-500" />,
      title: "Ad-Free Experience",
      description: "Enjoy migme without advertisements"
    }
  ];
  
  const selectedPlanData = vipPlans.find(plan => plan.id === selectedPlan);
  
  const handleSubscribe = () => {
    if (!selectedPlanData) return;
    
    toast({
      title: "VIP Subscription Activated!",
      description: `You are now a VIP member for ${selectedPlanData.duration}!`
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-300 text-white">
            <CardTitle className="flex items-center gap-2">
              <Crown /> VIP Membership Benefits
            </CardTitle>
            <CardDescription className="text-white/90">
              Unlock premium features and enhance your migme experience
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vipBenefits.map((benefit, index) => (
                <div key={index} className="flex gap-3">
                  <div className="bg-muted rounded-full p-2 h-fit">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">What is VIP membership?</h3>
              <p className="text-sm text-muted-foreground">
                VIP membership gives you premium status and exclusive benefits across the migme platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Can I cancel my subscription?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. Your benefits will remain active until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">How do I use my free credits?</h3>
              <p className="text-sm text-muted-foreground">
                Your free credits will be automatically added to your account when you subscribe and at the beginning of each billing cycle.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Choose Your VIP Plan</CardTitle>
            <CardDescription>
              Select the membership duration that works best for you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={selectedPlan} 
              onValueChange={setSelectedPlan} 
              className="space-y-3"
            >
              {vipPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`relative flex items-center space-x-2 rounded-md border p-4 hover:border-primary transition-all ${
                    selectedPlan === plan.id ? 'border-primary bg-muted/50' : ''
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-2.5 right-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <RadioGroupItem value={plan.id} id={plan.id} />
                  <Label 
                    htmlFor={plan.id} 
                    className="flex flex-1 cursor-pointer justify-between"
                  >
                    <div>
                      <div className="font-medium">{plan.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {plan.duration}
                      </div>
                      {plan.credits && (
                        <div className="text-sm text-green-600 mt-1">
                          + {plan.credits} bonus credits
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${plan.price}</div>
                      {plan.discount && (
                        <div className="text-xs text-green-600">
                          Save {plan.discount}%
                        </div>
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="flex justify-between w-full text-sm">
              <span>Price:</span>
              <span className="font-medium">${selectedPlanData?.price}</span>
            </div>
            {selectedPlanData?.credits && (
              <div className="flex justify-between w-full text-sm">
                <span>Bonus Credits:</span>
                <span className="font-medium text-green-600">
                  {selectedPlanData.credits} credits
                </span>
              </div>
            )}
            <Button 
              onClick={handleSubscribe} 
              size="lg" 
              className="w-full bg-gradient-to-r from-amber-500 to-amber-300"
            >
              <Crown className="mr-2 h-4 w-4" />
              Become VIP Now
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By subscribing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VIPSubscription;
