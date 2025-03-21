
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CreditCard, Trophy, Users, Star, MessageSquare } from "lucide-react";
import CreditDisplay from "@/components/credits/CreditDisplay";
import LeaderboardEntry, { LeaderboardEntryData } from "@/components/gaming/LeaderboardEntry";
import UserAvatar from "@/components/profile/UserAvatar";

// Mock data for a single game
const gameDetails = {
  id: "lowcards",
  name: "LowCards",
  description: "A simple card game where players bet on who has the lower card. Are you feeling lucky?",
  longDescription: "LowCards is one of the most popular card games on migme. Each player draws a card, and the player with the lowest card wins the pot. Special rules apply for ties and face cards. The game is fast-paced and perfect for quick betting with friends.",
  type: "paid",
  minCredits: 20,
  category: "cards",
  popularityRank: 2,
  rating: 4.8,
  players: 2468,
  playersOnline: 146,
  image: "/placeholder.svg",
  rules: [
    "Each player bets an equal amount of credits before the game starts",
    "Each player draws one card from the deck",
    "The player with the lowest card wins all credits",
    "In case of a tie, players draw again",
    "Aces are considered high cards"
  ],
  tips: [
    "Watch other players' habits before betting high",
    "Start with small bets to get a feel for the game",
    "Remember that the house takes a small percentage of each pot"
  ]
};

// Mock top players
const topPlayers: LeaderboardEntryData[] = [
  {
    id: "player-1",
    rank: 1,
    username: "CardMaster",
    avatarUrl: "/placeholder.svg",
    score: 15750,
    isVIP: true,
    level: 30,
    games: 345,
    winRate: 78
  },
  {
    id: "player-2",
    rank: 2,
    username: "LuckyDraw",
    avatarUrl: "/placeholder.svg",
    score: 12480,
    level: 28,
    games: 287,
    winRate: 72
  },
  {
    id: "player-3",
    rank: 3,
    username: "AceLow",
    avatarUrl: "/placeholder.svg",
    score: 9840,
    isVIP: true,
    level: 25,
    games: 264,
    winRate: 68
  }
];

// Mock recent activity
const recentActivity = [
  {
    id: "activity-1",
    username: "Player1",
    action: "won 250 credits",
    time: "2 min ago",
    avatarUrl: "/placeholder.svg",
    status: "online"
  },
  {
    id: "activity-2",
    username: "Player2",
    action: "lost 120 credits",
    time: "5 min ago",
    avatarUrl: "/placeholder.svg",
    status: "online"
  },
  {
    id: "activity-3",
    username: "Player3",
    action: "won 180 credits",
    time: "8 min ago",
    avatarUrl: "/placeholder.svg",
    status: "away"
  },
  {
    id: "activity-4",
    username: "Player4",
    action: "joined the game",
    time: "10 min ago",
    avatarUrl: "/placeholder.svg",
    status: "online"
  },
  {
    id: "activity-5",
    username: "Player5",
    action: "left the game",
    time: "12 min ago",
    avatarUrl: "/placeholder.svg",
    status: "offline"
  }
];

// Mock reviews
const reviews = [
  {
    id: "review-1",
    username: "GameFan123",
    avatarUrl: "/placeholder.svg",
    rating: 5,
    comment: "My favorite game on migme! I've won over 1000 credits in just a week.",
    time: "2 days ago",
    level: 22
  },
  {
    id: "review-2",
    username: "CardEnthusiast",
    avatarUrl: "/placeholder.svg",
    rating: 4,
    comment: "Really fun game but I wish there were more card variations.",
    time: "1 week ago",
    level: 18,
    isVIP: true
  },
  {
    id: "review-3",
    username: "CasualPlayer",
    avatarUrl: "/placeholder.svg",
    rating: 5,
    comment: "Simple to learn but addictive! Great for quick games while chatting.",
    time: "2 weeks ago",
    level: 15
  }
];

const GameDetailsPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [activeTab, setActiveTab] = useState("info");
  const [yourCredits, setYourCredits] = useState(500);
  
  // In a real app, you would fetch the game details based on gameId
  const game = gameDetails;
  const canPlay = yourCredits >= game.minCredits;
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/games">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Games
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{game.name}</CardTitle>
                    <CardDescription className="mt-1">{game.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={game.type === 'free' ? 'secondary' : 'outline'} 
                      className={game.type === 'paid' ? 'bg-migorange/10 text-migorange border-migorange/20' : ''}
                    >
                      {game.type === 'free' ? 'Free' : 'Paid'}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      {game.rating}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-4 mb-4">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="rules">Rules & Tips</TabsTrigger>
                    <TabsTrigger value="players">Players</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <img 
                        src={game.image} 
                        alt={game.name}
                        className="max-h-full object-contain"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4">
                      <div className="bg-migblue-light/10 p-3 rounded-md text-center">
                        <div className="text-sm text-muted-foreground">Players</div>
                        <div className="font-semibold">{game.players.toLocaleString()}</div>
                      </div>
                      <div className="bg-migblue-light/10 p-3 rounded-md text-center">
                        <div className="text-sm text-muted-foreground">Online</div>
                        <div className="font-semibold">{game.playersOnline}</div>
                      </div>
                      <div className="bg-migblue-light/10 p-3 rounded-md text-center">
                        <div className="text-sm text-muted-foreground">Min Credits</div>
                        <div className="font-semibold">{game.minCredits}</div>
                      </div>
                      <div className="bg-migblue-light/10 p-3 rounded-md text-center">
                        <div className="text-sm text-muted-foreground">Category</div>
                        <div className="font-semibold capitalize">{game.category}</div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{game.longDescription}</p>
                    
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Top Players This Week</h3>
                      <div className="space-y-2">
                        {topPlayers.map(player => (
                          <LeaderboardEntry key={player.id} entry={player} />
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="rules" className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h3 className="font-semibold mb-2">Game Rules</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {game.rules.map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="rounded-md border p-4">
                      <h3 className="font-semibold mb-2">Tips & Tricks</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {game.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="players" className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Recent Activity</h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {game.playersOnline} online
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {recentActivity.map(activity => (
                        <div 
                          key={activity.id} 
                          className="flex items-center p-3 rounded-lg bg-gray-50"
                        >
                          <UserAvatar 
                            username={activity.username} 
                            avatarUrl={activity.avatarUrl}
                            status={activity.status as any}
                            size="sm"
                          />
                          
                          <div className="ml-3 flex-1">
                            <div className="text-sm">
                              <span className="font-medium">{activity.username}</span>
                              {" "}
                              <span className="text-muted-foreground">{activity.action}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold">{game.rating}</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(game.rating) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Write Review
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {reviews.map(review => (
                        <div key={review.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <UserAvatar 
                                username={review.username} 
                                avatarUrl={review.avatarUrl}
                                size="sm"
                                level={review.level}
                                showLevel
                              />
                              <div>
                                <div className="font-medium">{review.username}</div>
                                <div className="text-xs text-muted-foreground">{review.time}</div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {review.comment}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="flex items-center gap-6">
                  <CreditDisplay credits={yourCredits} />
                  {game.type === 'paid' && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Min. Required: </span>
                      <span className="font-medium">{game.minCredits} credits</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {!canPlay && game.type === 'paid' && (
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-1" />
                      Buy Credits
                    </Button>
                  )}
                  <Button disabled={game.type === 'paid' && !canPlay}>
                    <Trophy className="h-4 w-4 mr-1" />
                    {canPlay ? 'Play Now' : 'Not Enough Credits'}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Similar Games</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Blackjack', 'Dice', 'Roulette', 'Baccarat'].map((name, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 rounded-md hover:bg-secondary cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-migblue-light/20 flex items-center justify-center">
                        <Trophy size={16} className="text-migblue" />
                      </div>
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground">
                          {20 + index * 10} players online
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Play
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Game Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Games Today</span>
                    <span className="font-medium">1,485</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credits Wagered</span>
                    <span className="font-medium">24,560</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Biggest Win</span>
                    <span className="font-medium">1,200 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Games</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Win Rate</span>
                    <span className="font-medium">58%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GameDetailsPage;
