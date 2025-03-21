
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { ApiClient } from "@/services/ApiClient";
import CreditDisplay from "../credits/CreditDisplay";

const CricketGame = () => {
  const { user, profile } = useAuth();
  const [playerScore, setPlayerScore] = useState<number | null>(null);
  const [opponentScore, setOpponentScore] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [betAmount, setBetAmount] = useState(5);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handlePlay = async () => {
    if (!user || !profile) {
      toast({
        title: "Not logged in",
        description: "You need to be logged in to play",
        variant: "destructive",
      });
      return;
    }

    if (profile.credit_balance < betAmount) {
      toast({
        title: "Insufficient credits",
        description: "You don't have enough credits to place this bet",
        variant: "destructive",
      });
      return;
    }

    setIsPlaying(true);
    setGameResult(null);
    
    // Player score (0-100 runs)
    const newPlayerScore = Math.floor(Math.random() * 101);
    setPlayerScore(newPlayerScore);
    
    // Simulate opponent batting after a delay
    setTimeout(async () => {
      const newOpponentScore = Math.floor(Math.random() * 101);
      setOpponentScore(newOpponentScore);
      
      // Determine winner - higher score wins
      let result: "win" | "lose" | "draw";
      
      if (newPlayerScore > newOpponentScore) {
        result = "win";
        toast({
          title: "You win!",
          description: `+${betAmount} credits earned`,
        });
      } else if (newPlayerScore < newOpponentScore) {
        result = "lose";
        toast({
          title: "You lose",
          description: `${betAmount} credits lost`,
          variant: "destructive",
        });
      } else {
        result = "draw";
        toast({
          title: "It's a draw!",
          description: "Your bet has been returned",
        });
      }
      
      setGameResult(result);

      try {
        // Process the game bet
        const gameType = "cricket";
        await ApiClient.processGameBet(user.id, gameType, betAmount, result);
        
        // Refresh credit display
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        console.error("Error processing game bet:", error);
        toast({
          title: "Error",
          description: "There was an error processing your bet",
          variant: "destructive",
        });
      }
      
      setIsPlaying(false);
    }, 1500);
  };
  
  const renderScoreCard = (score: number | null, isPlayer: boolean) => {
    return (
      <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-md flex flex-col items-center justify-center shadow-sm">
        <Award className="mb-2" size={24} />
        <div className="text-sm font-medium">{isPlayer ? "Your Score" : "Opponent's Score"}</div>
        {score !== null ? (
          <div className="text-2xl font-bold">{score} runs</div>
        ) : (
          <div className="text-lg text-muted-foreground">?</div>
        )}
      </div>
    );
  };
  
  const increaseBet = () => setBetAmount(prev => Math.min(prev + 5, 50));
  const decreaseBet = () => setBetAmount(prev => Math.max(prev - 5, 5));
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cricket Game</CardTitle>
        <CardDescription>
          Cricket match simulation - higher runs wins! Bet credits to win more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="flex justify-center items-center gap-8">
            {renderScoreCard(opponentScore, false)}
            {renderScoreCard(playerScore, true)}
          </div>
          
          {gameResult && (
            <div className={`text-xl font-bold ${
              gameResult === "win" ? "text-green-600" : 
              gameResult === "lose" ? "text-red-600" : 
              "text-yellow-600"
            }`}>
              {gameResult === "win" ? "You Win!" : 
               gameResult === "lose" ? "You Lose!" : 
               "It's a Draw!"}
            </div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="font-medium">Bet:</div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={decreaseBet}
              disabled={betAmount <= 5 || isPlaying}
            >
              -
            </Button>
            <div className="min-w-10 text-center font-bold">{betAmount}</div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={increaseBet}
              disabled={betAmount >= 50 || isPlaying}
            >
              +
            </Button>
          </div>

          <div className="w-full flex justify-center">
            <CreditDisplay refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          onClick={handlePlay} 
          disabled={isPlaying}
          className="px-8"
        >
          {isPlaying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Playing...
            </>
          ) : "Play Cricket"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CricketGame;
