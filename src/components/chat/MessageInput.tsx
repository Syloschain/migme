
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal, Mic, Image, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmojiPicker from "./EmojiPicker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleVoiceClick = () => {
    toast({
      title: "Voice Message",
      description: "Voice messages are coming soon!",
    });
  };

  const handleImageClick = () => {
    toast({
      title: "Image Upload",
      description: "Image sharing is coming soon!",
    });
  };

  const handleGiftClick = () => {
    toast({
      title: "Send a Gift",
      description: "Gift sending is coming soon!",
    });
  };

  return (
    <div className="p-3 border-t bg-background/80">
      <div className="flex flex-col gap-2">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[60px] resize-none border-migblue-light/40 focus-visible:ring-migblue"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <ToggleGroup type="single" variant="outline">
              <ToggleGroupItem value="mic" size="sm" onClick={handleVoiceClick}>
                <Mic className="h-4 w-4 mr-1" />
                <span className="text-xs">Voice</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="image" size="sm" onClick={handleImageClick}>
                <Image className="h-4 w-4 mr-1" />
                <span className="text-xs">Image</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="gift" size="sm" onClick={handleGiftClick}>
                <Gift className="h-4 w-4 mr-1" />
                <span className="text-xs">Gift</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex items-center gap-1">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            <Button 
              onClick={handleSendMessage}
              className="bg-migblue hover:bg-migblue-dark"
            >
              <SendHorizonal className="h-4 w-4 mr-1" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
