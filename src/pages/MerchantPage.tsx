
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditTransfer from "@/components/merchant/CreditTransfer";
import CreditManager from "@/components/merchant/CreditManager";
import MerchantDashboard from "@/components/merchant/MerchantDashboard";
import MerchantApplication from "@/components/merchant/MerchantApplication";
import { useAuth } from "@/context/AuthContext";

const MerchantPage = () => {
  const { profile } = useAuth();
  const isMerchant = profile?.is_merchant;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Merchant Center</h1>
          <p className="text-muted-foreground">
            {isMerchant 
              ? "Manage your merchant account and credit transfers" 
              : "Apply to become a migme merchant and earn commissions"}
          </p>
        </div>

        {isMerchant ? (
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="credits">Credit Management</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-6">
              <MerchantDashboard />
            </TabsContent>
            
            <TabsContent value="credits" className="mt-6">
              <CreditManager />
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
