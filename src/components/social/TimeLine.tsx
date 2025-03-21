
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageSquare, Gift, Share2, MoreHorizontal } from "lucide-react";

interface Post {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const Timeline = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      username: "coolcat99",
      content: "Just won 500 credits playing LowCards! Anyone want to challenge me? 🎮",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      likes: 24,
      comments: 7,
      isLiked: false,
    },
    {
      id: "2",
      username: "migstar42",
      content: "Check out my new avatar items! Spent all my credits but worth it 😎 #StyleUpdate",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      likes: 36,
      comments: 12,
      isLiked: true,
    },
    {
      id: "3",
      username: "chatmaster",
      content: "Created a new chat room for music lovers! Join 'Melody Hangout' and let's talk about your favorite songs 🎵 #MigmeMusic",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      likes: 18,
      comments: 5,
      isLiked: false,
    },
  ]);

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      username: "You",
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isLiked: false,
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newPost.trim()) {
      handlePostSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Avatar className="h-10 w-10">
              <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-sm font-bold">
                YO
              </div>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input 
                placeholder="What's on your mind?" 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                Post
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-2">
                      <Avatar className="h-10 w-10">
                        <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-sm font-bold">
                          {post.username.substring(0, 2).toUpperCase()}
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-medium">{post.username}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {post.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <p className="mb-4">{post.content}</p>
                        <div className="flex gap-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : ''}`}
                            onClick={() => toggleLike(post.id)}
                          >
                            <Heart size={16} className={`${post.isLiked ? 'fill-red-500' : ''}`} />
                            <span>{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <MessageSquare size={16} />
                            <span>{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Gift size={16} />
                            <span>Gift</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Share2 size={16} />
                            <span>Share</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;
