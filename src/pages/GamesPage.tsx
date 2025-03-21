
import Layout from "@/components/layout/Layout";
import GamesList from "@/components/gaming/GamesList";

const GamesPage = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <GamesList />
      </div>
    </Layout>
  );
};

export default GamesPage;
