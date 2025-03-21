
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditStore from "@/components/store/CreditStore";
import PremiumItems from "@/components/store/PremiumItems";
import VIPSubscription from "@/components/store/VIPSubscription";

const StorePage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">migme Store</h1>
          <p className="text-muted-foreground">Purchase credits, premium items, and VIP membership</p>
        </div>

        <Tabs defaultValue="credits" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credits">Credit Packages</TabsTrigger>
            <TabsTrigger value="premium">Premium Items</TabsTrigger>
            <TabsTrigger value="vip">VIP Membership</TabsTrigger>
          </TabsList>
          
          <TabsContent value="credits" className="mt-6">
            <CreditStore />
          </TabsContent>
          
          <TabsContent value="premium" className="mt-6">
            <PremiumItems />
          </TabsContent>
          
          <TabsContent value="vip" className="mt-6">
            <VIPSubscription />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StorePage;
