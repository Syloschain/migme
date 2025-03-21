
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shirt, Crown, User, Image, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AvatarCustomizerProps {
  username: string;
  currentAvatarUrl?: string;
  onSave?: (avatarUrl: string) => void;
}

const AVATAR_ITEMS = {
  backgrounds: [
    { id: "bg1", name: "Blue", color: "bg-blue-500" },
    { id: "bg2", name: "Green", color: "bg-green-500" },
    { id: "bg3", name: "Purple", color: "bg-purple-500" },
    { id: "bg4", name: "Orange", color: "bg-orange-500" },
    { id: "bg5", name: "Pink", color: "bg-pink-500" },
    { id: "bg6", name: "Gray", color: "bg-gray-500" },
  ],
  clothing: [
    { id: "cl1", name: "T-Shirt", icon: <Shirt className="h-5 w-5" /> },
    { id: "cl2", name: "Suit", icon: <Shirt className="h-5 w-5" /> },
    { id: "cl3", name: "Hoodie", icon: <Shirt className="h-5 w-5" /> },
    { id: "cl4", name: "Dress", icon: <Shirt className="h-5 w-5" /> },
  ],
  accessories: [
    { id: "ac1", name: "Crown", icon: <Crown className="h-5 w-5" /> },
    { id: "ac2", name: "Hat", icon: <Crown className="h-5 w-5" /> },
    { id: "ac3", name: "Glasses", icon: <User className="h-5 w-5" /> },
    { id: "ac4", name: "Necklace", icon: <User className="h-5 w-5" /> },
  ]
};

const AvatarCustomizer = ({ username, currentAvatarUrl, onSave }: AvatarCustomizerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(AVATAR_ITEMS.backgrounds[0].id);
  const [selectedClothing, setSelectedClothing] = useState("");
  const [selectedAccessory, setSelectedAccessory] = useState("");
  
  // In a real implementation, we would combine these selections to create a custom avatar
  // For now, we'll just use the selected background color for the preview
  
  const handleSave = () => {
    // In a real implementation, this would save the avatar configuration to the server
    // and return a URL to the generated avatar
    toast({
      title: "Avatar updated!",
      description: "Your new look is saved.",
    });
    
    if (onSave) {
      // Normally we'd pass back a real URL. For now, we'll just indicate a change happened
      onSave("new-avatar-url-would-be-here");
    }
    
    setOpen(false);
  };
  
  const handleUploadPhoto = () => {
    // In a real implementation, this would open a file picker and upload the selected image
    toast({
      title: "Photo upload",
      description: "This would let you upload a profile photo instead of using an avatar.",
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Customize Avatar</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Your Avatar</DialogTitle>
          <DialogDescription>
            Create your unique look with our avatar customizer
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center my-4">
          <Avatar className="h-24 w-24">
            {currentAvatarUrl ? (
              <AvatarImage src={currentAvatarUrl} alt={username} />
            ) : (
              <AvatarFallback className={`${
                selectedBackground ? 
                AVATAR_ITEMS.backgrounds.find(bg => bg.id === selectedBackground)?.color : 
                'bg-migblue'
              }`}>
                {username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        
        <Tabs defaultValue="backgrounds" className="w-full">
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="backgrounds">Background</TabsTrigger>
            <TabsTrigger value="clothing">Clothing</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backgrounds" className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {AVATAR_ITEMS.backgrounds.map((bg) => (
                <div 
                  key={bg.id}
                  className={`${bg.color} h-12 rounded-md cursor-pointer flex items-center justify-center ${
                    selectedBackground === bg.id ? 'ring-2 ring-migblue ring-offset-2' : ''
                  }`}
                  onClick={() => setSelectedBackground(bg.id)}
                >
                  <span className="text-white text-xs font-medium">{bg.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="clothing" className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_ITEMS.clothing.map((item) => (
                <div 
                  key={item.id}
                  className={`bg-gray-100 h-16 rounded-md cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    selectedClothing === item.id ? 'ring-2 ring-migblue ring-offset-2' : ''
                  }`}
                  onClick={() => setSelectedClothing(item.id)}
                >
                  {item.icon}
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="accessories" className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_ITEMS.accessories.map((item) => (
                <div 
                  key={item.id}
                  className={`bg-gray-100 h-16 rounded-md cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    selectedAccessory === item.id ? 'ring-2 ring-migblue ring-offset-2' : ''
                  }`}
                  onClick={() => setSelectedAccessory(item.id)}
                >
                  {item.icon}
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-4">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Upload className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-sm text-center text-gray-600 mb-4">
                Upload your own photo instead of using an avatar
              </p>
              <Button onClick={handleUploadPhoto}>
                <Image className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCustomizer;
