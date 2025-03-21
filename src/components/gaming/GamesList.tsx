
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Trophy, Users, Clock, Coins, Star, Zap, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface Game {
  id: string;
  name: string;
  description: string;
  players: number;
  category: "free" | "paid";
  minCredits?: number;
  isPopular?: boolean;
  isNew?: boolean;
  tags?: string[];
  iconColor?: string;
}

const GamesList = () => {
  const games: Game[] = [
    { 
      id: "1", 
      name: "Trivia", 
      description: "Test your knowledge with various categories of questions", 
      players: 157, 
      category: "free",
      isPopular: true,
      tags: ["Knowledge", "Multiplayer"],
      iconColor: "text-purple-500"
    },
    { 
      id: "2", 
      name: "LowCards", 
      description: "Card game where the lowest card wins", 
      players: 89, 
      category: "paid",
      minCredits: 20,
      isPopular: true,
      tags: ["Cards", "Betting"],
      iconColor: "text-red-500"
    },
    { 
      id: "3", 
      name: "Dice", 
      description: "Roll dice and bet on the outcome", 
      players: 64, 
      category: "paid",
      minCredits: 20,
      isPopular: true,
      tags: ["Luck", "Betting"],
      iconColor: "text-green-500"
    },
    { 
      id: "4", 
      name: "Blackjack", 
      description: "Classic card game - get close to 21 without going over", 
      players: 45, 
      category: "paid",
      minCredits: 20,
      tags: ["Cards", "Strategy"],
      iconColor: "text-amber-500"
    },
    { 
      id: "5", 
      name: "MigWars", 
      description: "Strategic game where you battle other users", 
      players: 105, 
      category: "free",
      isPopular: true,
      tags: ["Strategy", "Multiplayer"],
      iconColor: "text-blue-500"
    },
    { 
      id: "6", 
      name: "Rock Paper Scissors", 
      description: "Classic game of chance", 
      players: 37, 
      category: "paid",
      minCredits: 10,
      tags: ["Quick", "Casual"],
      iconColor: "text-pink-500"
    },
    { 
      id: "7", 
      name: "Russian Roulette", 
      description: "Take your chances in this game of risk", 
      players: 29, 
      category: "paid",
      minCredits: 30,
      tags: ["Risk", "Suspense"],
      iconColor: "text-gray-700"
    },
    { 
      id: "8", 
      name: "Boyfriend/Girlfriend Quiz", 
      description: "Fun quiz game about relationships", 
      players: 52, 
      category: "free",
      tags: ["Social", "Fun"],
      iconColor: "text-pink-400"
    },
    { 
      id: "9", 
      name: "Word Scramble", 
      description: "Unscramble letters to find the hidden words", 
      players: 42, 
      category: "free",
      isNew: true,
      tags: ["Words", "Puzzle"],
      iconColor: "text-cyan-500"
    },
    { 
      id: "10", 
      name: "Memory Match", 
      description: "Test your memory by matching pairs of cards", 
      players: 38, 
      category: "free",
      isNew: true,
      tags: ["Memory", "Casual"],
      iconColor: "text-orange-500"
    },
  ];

  const handlePlayGame = (game: Game) => {
    if (game.category === "paid" && game.minCredits) {
      toast({
        title: `Starting ${game.name}`,
        description: `${game.minCredits} credits will be used to play this game`,
      });
    } else {
      toast({
        title: `Starting ${game.name}`,
        description: "Loading game...",
      });
    }
  };

  const freeGames = games.filter(game => game.category === "free");
  const paidGames = games.filter(game => game.category === "paid");
  const popularGames = games.filter(game => game.isPopular);
  const newGames = games.filter(game => game.isNew);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-migblue" />
                migme Games
              </CardTitle>
              <CardDescription>Play games, earn credits, level up</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="popular">
            <TabsList className="mb-6">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="free">Free Games</TabsTrigger>
              <TabsTrigger value="paid">Paid Games</TabsTrigger>
              <TabsTrigger value="new">New Games</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularGames.map(game => (
                  <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="free">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freeGames.map(game => (
                  <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="paid">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paidGames.map(game => (
                  <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newGames.length > 0 ? (
                  newGames.map(game => (
                    <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-muted-foreground">
                    No new games at the moment. Check back soon!
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const GameCard = ({ game, onPlay }: { game: Game; onPlay: (game: Game) => void }) => {
  const getGameIcon = () => {
    switch(game.name) {
      case "Trivia":
        return <Award className={`h-6 w-6 ${game.iconColor}`} />;
      case "LowCards":
        return <Zap className={`h-6 w-6 ${game.iconColor}`} />;
      case "Dice":
        return <Star className={`h-6 w-6 ${game.iconColor}`} />;
      default:
        return <Gamepad2 className={`h-6 w-6 ${game.iconColor || "text-primary"}`} />;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4 flex justify-between items-start">
        <div className="flex gap-3">
          <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
            {getGameIcon()}
          </div>
          <div>
            <div className="font-medium flex items-center gap-1">
              {game.name}
              {game.isPopular && (
                <Badge variant="secondary" className="ml-1 text-xs">Popular</Badge>
              )}
              {game.isNew && (
                <Badge variant="outline" className="ml-1 text-xs border-green-500 text-green-600">New</Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {game.description}
            </div>
            <div className="flex flex-wrap gap-1">
              {game.tags?.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
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
        <Button 
          size="sm" 
          variant={game.category === "free" ? "default" : "outline"}
          className={game.category === "paid" ? "border-migblue text-migblue hover:bg-migblue hover:text-white" : ""}
          onClick={() => onPlay(game)}
        >
          Play
        </Button>
      </div>
    </Card>
  );
};

export default GamesList;
