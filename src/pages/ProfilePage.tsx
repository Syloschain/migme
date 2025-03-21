
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";
import LevelProgress from "@/components/profile/LevelProgress";
import VIPBadge from "@/components/profile/VIPBadge";
import CreditDisplay from "@/components/credits/CreditDisplay";
import { Card, CardContent } from "@/components/ui/card";

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
        
        <UserProfile />
      </div>
    </Layout>
  );
};

export default ProfilePage;
