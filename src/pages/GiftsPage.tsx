
import Layout from "@/components/layout/Layout";
import GiftStore from "@/components/gifts/GiftStore";
import CreditDisplay from "@/components/credits/CreditDisplay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GiftsPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gift Store</h1>
          <CreditDisplay credits={500} />
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Popular Gift Categories</CardTitle>
            <CardDescription>Send gifts to friends to show your appreciation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <CategoryButton name="Special" count={24} bgColor="bg-purple-100" textColor="text-purple-800" />
              <CategoryButton name="Seasonal" count={12} bgColor="bg-green-100" textColor="text-green-800" />
              <CategoryButton name="Animated" count={18} bgColor="bg-blue-100" textColor="text-blue-800" />
              <CategoryButton name="Premium" count={8} bgColor="bg-amber-100" textColor="text-amber-800" />
            </div>
          </CardContent>
        </Card>
        
        <GiftStore />
      </div>
    </Layout>
  );
};

const CategoryButton = ({ 
  name, 
  count, 
  bgColor,
  textColor
}: { 
  name: string; 
  count: number;
  bgColor: string;
  textColor: string;
}) => {
  return (
    <div className={`${bgColor} ${textColor} rounded-lg p-4 text-center cursor-pointer hover:opacity-90 transition-opacity`}>
      <div className="font-medium">{name}</div>
      <div className="text-xs">{count} gifts</div>
    </div>
  );
};

export default GiftsPage;
