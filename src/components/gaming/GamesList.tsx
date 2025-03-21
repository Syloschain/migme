
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Trophy, Users, Clock, Coins } from "lucide-react";

interface Game {
  id: string;
  name: string;
  description: string;
  players: number;
  category: "free" | "paid";
  minCredits?: number;
  isPopular?: boolean;
}

const GamesList = () => {
  const games: Game[] = [
    { 
      id: "1", 
      name: "Trivia", 
      description: "Test your knowledge with various categories of questions", 
      players: 157, 
      category: "free",
      isPopular: true
    },
    { 
      id: "2", 
      name: "LowCards", 
      description: "Card game where the lowest card wins", 
      players: 89, 
      category: "paid",
      minCredits: 20,
      isPopular: true
    },
    { 
      id: "3", 
      name: "Dice", 
      description: "Roll dice and bet on the outcome", 
      players: 64, 
      category: "paid",
      minCredits: 20,
      isPopular: true
    },
    { 
      id: "4", 
      name: "Blackjack", 
      description: "Classic card game - get close to 21 without going over", 
      players: 45, 
      category: "paid",
      minCredits: 20
    },
    { 
      id: "5", 
      name: "MigWars", 
      description: "Strategic game where you battle other users", 
      players: 105, 
      category: "free",
      isPopular: true
    },
    { 
      id: "6", 
      name: "Rock Paper Scissors", 
      description: "Classic game of chance", 
      players: 37, 
      category: "paid",
      minCredits: 10
    },
    { 
      id: "7", 
      name: "Russian Roulette", 
      description: "Take your chances in this game of risk", 
      players: 29, 
      category: "paid",
      minCredits: 30
    },
    { 
      id: "8", 
      name: "Boyfriend/Girlfriend Quiz", 
      description: "Fun quiz game about relationships", 
      players: 52, 
      category: "free"
    },
  ];

  const freeGames = games.filter(game => game.category === "free");
  const paidGames = games.filter(game => game.category === "paid");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                Games
              </CardTitle>
              <CardDescription>Play games and earn credits</CardDescription>
            </div>
            <Button size="sm" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-3">Free Games</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freeGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Paid Games</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paidGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const GameCard = ({ game }: { game: Game }) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 flex justify-between items-start">
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="font-medium flex items-center gap-1">
              {game.name}
              {game.isPopular && (
                <Badge variant="secondary" className="ml-1 text-xs">Popular</Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {game.description}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{game.players} playing</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>~5 min</span>
              </div>
              {game.category === "paid" && game.minCredits && (
                <div className="flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5" />
                  <span>Min {game.minCredits} credits</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button size="sm">Play</Button>
      </div>
    </Card>
  );
};

export default GamesList;
