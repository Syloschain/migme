
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Star, Zap, Gift, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  discount?: number;
  popular?: boolean;
  bonus?: number;
}

const CreditStore = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  const creditPackages: CreditPackage[] = [
    {
      id: "small",
      name: "Starter Pack",
      credits: 100,
      price: 1.99,
    },
    {
      id: "medium",
      name: "Regular Pack",
      credits: 500,
      price: 8.99,
      discount: 10,
      popular: true,
    },
    {
      id: "large",
      name: "Premium Pack",
      credits: 1000,
      price: 15.99,
      discount: 20,
    },
    {
      id: "xlarge",
      name: "Mega Pack",
      credits: 3000,
      price: 39.99,
      discount: 33,
      bonus: 500,
    }
  ];

  const handlePurchase = () => {
    if (!selectedPackage) {
      toast({
        title: "Please select a package",
        description: "You need to select a credit package before purchasing",
        variant: "destructive",
      });
      return;
    }

    const pkg = creditPackages.find(p => p.id === selectedPackage);
    if (pkg) {
      toast({
        title: "Purchase Successful!",
        description: `You've purchased ${pkg.credits} credits${pkg.bonus ? ` (+ ${pkg.bonus} bonus)` : ''}!`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {creditPackages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedPackage === pkg.id 
                ? 'border-primary border-2' 
                : 'border-border'
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{pkg.name}</CardTitle>
                {pkg.popular && (
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-migblue">{pkg.credits}</span>
                <span className="ml-1 text-muted-foreground">credits</span>
                {pkg.bonus && (
                  <span className="ml-2 text-green-600 text-sm">+{pkg.bonus} bonus</span>
                )}
              </div>
              <div className="flex items-center">
                {pkg.discount ? (
                  <>
                    <span className="text-xl font-semibold">${pkg.price}</span>
                    <span className="ml-2 line-through text-muted-foreground text-sm">
                      ${(pkg.price / (1 - pkg.discount / 100)).toFixed(2)}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded">
                      {pkg.discount}% off
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-semibold">${pkg.price}</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant={selectedPackage === pkg.id ? "default" : "outline"} 
                className="w-full"
                onClick={() => setSelectedPackage(pkg.id)}
              >
                Select
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-migblue-light/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-migblue rounded-full p-2">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">All transactions are processed securely</p>
            </div>
          </div>
          <Button 
            size="lg" 
            onClick={handlePurchase}
            disabled={!selectedPackage}
            className="bg-gradient-to-r from-migblue to-migblue-dark"
          >
            Purchase Now
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex gap-3">
            <div className="bg-migblue/10 rounded-full p-2 h-fit">
              <Zap className="h-5 w-5 text-migblue" />
            </div>
            <div>
              <h3 className="font-semibold">Instant Delivery</h3>
              <p className="text-sm text-muted-foreground">Credits are added to your account immediately</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex gap-3">
            <div className="bg-migblue/10 rounded-full p-2 h-fit">
              <Gift className="h-5 w-5 text-migblue" />
            </div>
            <div>
              <h3 className="font-semibold">Special Offers</h3>
              <p className="text-sm text-muted-foreground">Bonus credits and special discounts</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex gap-3">
            <div className="bg-migblue/10 rounded-full p-2 h-fit">
              <Sparkles className="h-5 w-5 text-migblue" />
            </div>
            <div>
              <h3 className="font-semibold">VIP Benefits</h3>
              <p className="text-sm text-muted-foreground">Exclusive items for VIP members</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreditStore;
