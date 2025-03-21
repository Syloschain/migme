
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GameSelection from "@/components/gaming/GameSelection";
import LeaderboardComponent from "@/components/gaming/LeaderboardComponent";
import GameAchievements from "@/components/gaming/GameAchievements";
import TriviaMiniGame from "@/components/gaming/TriviaMiniGame";
import LowCardGame from "@/components/gaming/LowCardGame";
import DiceGame from "@/components/gaming/DiceGame";
import CricketGame from "@/components/gaming/CricketGame";

const GameDetailsPage = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState<any>(null);

  useEffect(() => {
    // This would be replaced with an actual API call in a real app
    const fetchGameData = async () => {
      // Simulate API call
      setTimeout(() => {
        setGameData({
          id: gameId,
          name: getGameName(gameId),
          description: "An exciting game for migme users!",
          type: gameId,
        });
      }, 500);
    };

    fetchGameData();
  }, [gameId]);

  const getGameName = (id: string | undefined) => {
    if (!id) return "Unknown Game";
    
    switch (id.toLowerCase()) {
      case "lowcards":
        return "LowCards";
      case "dice":
        return "Dice Game";
      case "cricket":
        return "Cricket";
      case "trivia":
        return "Trivia Challenge";
      default:
        return "Unknown Game";
    }
  };

  const renderGameComponent = () => {
    if (!gameId) return null;
    
    switch (gameId.toLowerCase()) {
      case "lowcards":
        return <LowCardGame />;
      case "dice":
        return <DiceGame />;
      case "cricket":
        return <CricketGame />;
      case "trivia":
        return <TriviaMiniGame />;
      default:
        if (gameId === "all") {
          return <GameSelection />;
        }
        return <div className="text-center py-8">Game not available</div>;
    }
  };

  if (!gameData && gameId !== "all") {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar - Only show on non-"all" game pages */}
        {gameId !== "all" && (
          <div className="w-full md:w-1/4 space-y-6">
            <Button asChild variant="outline" className="mb-4">
              <Link to="/games">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Games
              </Link>
            </Button>
            
            <Card>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-2">{gameData?.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {gameData?.description}
                </p>
                <GameAchievements gameId={gameId} />
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Main content */}
        <div className={`w-full ${gameId !== "all" ? "md:w-2/4" : ""}`}>
          {gameId === "all" ? (
            <>
              <h1 className="text-2xl font-bold mb-6">Games Room</h1>
              <p className="mb-6">Play the classic migme games and win credits!</p>
            </>
          ) : null}
          
          {renderGameComponent()}
        </div>
        
        {/* Right sidebar - Only show on non-"all" game pages */}
        {gameId !== "all" && (
          <div className="w-full md:w-1/4">
            <LeaderboardComponent gameId={gameId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetailsPage;
