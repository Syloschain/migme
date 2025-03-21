
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MerchantDashboard from "@/components/merchant/MerchantDashboard";
import MerchantApplication from "@/components/merchant/MerchantApplication";
import CreditDisplay from "@/components/credits/CreditDisplay";

const MerchantPage = () => {
  // In a real app, this would come from user data
  const isMerchant = false;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Migme Merchant Center</h1>
            <p className="text-muted-foreground">Become a credit reseller and earn from referrals</p>
          </div>
          <CreditDisplay credits={500} showBuyButton={true} />
        </div>

        {isMerchant ? (
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="transfers">Credit Transfers</TabsTrigger>
              <TabsTrigger value="customers">My Customers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-6">
              <MerchantDashboard />
            </TabsContent>
            
            <TabsContent value="transfers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Credit Transfers</CardTitle>
                  <CardDescription>Transfer credits to your customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Credit transfer functionality will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="customers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Customers</CardTitle>
                  <CardDescription>Manage your customer relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Customer management will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <MerchantApplication />
        )}
      </div>
    </Layout>
  );
};

export default MerchantPage;
