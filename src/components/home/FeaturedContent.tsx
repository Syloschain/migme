
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const featuredItems = [
  {
    id: 1,
    title: "Play Trivia Games",
    description: "Test your knowledge and win credits in our trivia games!",
    bgColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
    link: "/games",
    linkText: "Play Now"
  },
  {
    id: 2,
    title: "Send Virtual Gifts",
    description: "Show your appreciation with virtual gifts to friends",
    bgColor: "bg-gradient-to-r from-pink-500 to-rose-500",
    link: "/gifts",
    linkText: "Send Gifts"
  },
  {
    id: 3,
    title: "Become a VIP",
    description: "Get exclusive benefits and features with VIP status",
    bgColor: "bg-gradient-to-r from-amber-500 to-orange-600",
    link: "/profile",
    linkText: "Learn More"
  },
  {
    id: 4,
    title: "Chat with Friends",
    description: "Join public chat rooms or message friends directly",
    bgColor: "bg-gradient-to-r from-sky-500 to-blue-600",
    link: "/chat",
    linkText: "Start Chatting"
  }
];

const FeaturedContent = () => {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {featuredItems.map((item) => (
            <CarouselItem key={item.id}>
              <Card className="border-none shadow-lg bg-migblue text-white">
                <CardContent className="p-6 flex flex-col items-start gap-4 min-h-[180px]">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                  <Button asChild className="mt-auto migme-btn">
                    <Link to={item.link} className="flex items-center gap-2">
                      {item.linkText} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 lg:-left-4" />
        <CarouselNext className="right-2 lg:-right-4" />
      </Carousel>
    </div>
  );
};

export default FeaturedContent;
