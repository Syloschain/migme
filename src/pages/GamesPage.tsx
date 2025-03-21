
import Layout from "@/components/layout/Layout";
import GamesList from "@/components/gaming/GamesList";
import TriviaMiniGame from "@/components/gaming/TriviaMiniGame";
import LowCardGame from "@/components/gaming/LowCardGame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GamesPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">migme Games</h1>
        
        <Tabs defaultValue="games">
          <TabsList className="mb-4">
            <TabsTrigger value="games">Games List</TabsTrigger>
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
    </Layout>
  );
};

export default GamesPage;
