
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { processGameBet, getCreditBalance } from "@/utils/supabaseHelpers";
import CreditDisplay from "../credits/CreditDisplay";

interface CardProps {
  suit: string;
  value: string;
  flipped: boolean;
}

const LowCardGame = () => {
  const { user, profile } = useAuth();
  const [playerCard, setPlayerCard] = useState<CardProps | null>(null);
  const [opponentCard, setOpponentCard] = useState<CardProps | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [betAmount, setBetAmount] = useState(5);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const suits = ["♥", "♦", "♠", "♣"];
  const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  
  const getRandomCard = (): CardProps => {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    return {
      suit: randomSuit,
      value: randomValue,
      flipped: false
    };
  };
  
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
    
    const newPlayerCard = getRandomCard();
    newPlayerCard.flipped = true;
    setPlayerCard(newPlayerCard);
    setOpponentCard({ ...getRandomCard(), flipped: false });
    
    // Simulate opponent drawing card after a delay
    setTimeout(async () => {
      const newOpponentCard = getRandomCard();
      newOpponentCard.flipped = true;
      setOpponentCard(newOpponentCard);
      
      // Determine winner
      // CORRECTED: Higher card wins in the original migme LowCard game
      const playerIndex = values.indexOf(newPlayerCard.value);
      const opponentIndex = values.indexOf(newOpponentCard.value);
      let result: "win" | "lose" | "draw";
      
      if (playerIndex > opponentIndex) {
        result = "win";
        toast({
          title: "You win!",
          description: `+${betAmount} credits earned`,
        });
      } else if (playerIndex < opponentIndex) {
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
        const gameType = "lowcards";
        await processGameBet(user.id, gameType, betAmount, result);
        
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
  
  const renderCard = (card: CardProps | null, isPlayer: boolean) => {
    if (!card) {
      return (
        <div className="w-32 h-44 bg-muted rounded-md flex items-center justify-center">
          {isPlayer ? "Your Card" : "Opponent's Card"}
        </div>
      );
    }
    
    const isRed = card.suit === "♥" || card.suit === "♦";
    
    if (!card.flipped) {
      return (
        <div className="w-32 h-44 bg-primary/90 rounded-md flex items-center justify-center text-primary-foreground">
          <div className="text-3xl font-bold">?</div>
        </div>
      );
    }
    
    return (
      <div className="w-32 h-44 bg-white border-2 border-gray-200 rounded-md flex flex-col items-center justify-center shadow-sm">
        <div className={`text-4xl font-bold ${isRed ? "text-red-500" : "text-black"}`}>
          {card.value}
        </div>
        <div className={`text-3xl ${isRed ? "text-red-500" : "text-black"}`}>
          {card.suit}
        </div>
      </div>
    );
  };
  
  const increaseBet = () => setBetAmount(prev => Math.min(prev + 5, 50));
  const decreaseBet = () => setBetAmount(prev => Math.max(prev - 5, 5));
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>LowCards</CardTitle>
        <CardDescription>
          Draw a card - higher card wins! Bet credits to win more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="flex justify-center items-center gap-8">
            {renderCard(opponentCard, false)}
            {renderCard(playerCard, true)}
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
          ) : "Play"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LowCardGame;
