
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";
import LevelProgress from "@/components/profile/LevelProgress";
import VIPBadge from "@/components/profile/VIPBadge";
import CreditDisplay from "@/components/credits/CreditDisplay";
import BadgesDisplay from "@/components/profile/BadgesDisplay";
import UserStats from "@/components/profile/UserStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            My Profile 
            <VIPBadge />
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Card>
              <CardContent className="p-4">
                <LevelProgress 
                  level={7}
                  currentPoints={350}
                  nextLevelPoints={500}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <CreditDisplay credits={500} />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <UserProfile isVIP={true} />
          </div>
          
          <div className="space-y-6 md:col-span-3">
            <Tabs defaultValue="badges" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
                <TabsTrigger value="stats">Activity Stats</TabsTrigger>
              </TabsList>
              <TabsContent value="badges" className="mt-6">
                <BadgesDisplay badges={[]} />
              </TabsContent>
              <TabsContent value="stats" className="mt-6">
                <UserStats />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
