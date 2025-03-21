
import Layout from "@/components/layout/Layout";
import FriendsList from "@/components/social/FriendsList";
import LevelProgress from "@/components/profile/LevelProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FriendsPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Friends</h1>
          <Card className="w-full md:w-auto">
            <CardContent className="p-4">
              <LevelProgress 
                level={7}
                currentPoints={350}
                nextLevelPoints={500}
              />
            </CardContent>
          </Card>
        </div>
        <FriendsList />
      </div>
    </Layout>
  );
};

export default FriendsPage;
