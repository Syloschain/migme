
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import GamesList from "@/components/gaming/GamesList";
import TriviaMiniGame from "@/components/gaming/TriviaMiniGame";
import LowCardGame from "@/components/gaming/LowCardGame";
import LeaderboardComponent from "@/components/gaming/LeaderboardComponent";
import GameAchievements from "@/components/gaming/GameAchievements";
import GameFilters, { GameType } from "@/components/gaming/GameFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditDisplay from "@/components/credits/CreditDisplay";
import LevelProgress from "@/components/profile/LevelProgress";
import { Card, CardContent } from "@/components/ui/card";

const GamesPage = () => {
  const [filters, setFilters] = useState({
    type: "all" as GameType,
    category: "all",
    sort: "popular"
  });

  const handleFilterChange = (newFilters: {
    type: GameType;
    category: string;
    sort: string;
  }) => {
    setFilters(newFilters);
    console.log("Filters updated:", newFilters);
    // In a real app, you would filter the games list based on these filters
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">migme Games</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Card className="w-full md:w-auto">
              <CardContent className="p-4">
                <LevelProgress 
                  level={7}
                  currentPoints={350}
                  nextLevelPoints={500}
                />
              </CardContent>
            </Card>
            
            <CreditDisplay credits={500} showBuyButton={true} />
          </div>
        </div>
        
        <GameFilters onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="games">
              <TabsList className="mb-4">
                <TabsTrigger value="games">All Games</TabsTrigger>
                <TabsTrigger value="trivia">Trivia</TabsTrigger>
                <TabsTrigger value="lowcards">LowCards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="games">
                <GamesList />
              </TabsContent>
              
              <TabsContent value="trivia">
                <TriviaMiniGame />
              </TabsContent>
              
              <TabsContent value="lowcards">
                <LowCardGame />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:col-span-1 space-y-4">
            <LeaderboardComponent />
            <GameAchievements />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GamesPage;
