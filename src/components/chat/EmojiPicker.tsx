
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smile } from "lucide-react";

const emojiCategories = {
  "smileys": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
  "people": ["👋", "👌", "✌️", "🤞", "👍", "👎", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "💪", "🦾", "🖐️", "✋"],
  "animals": ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵"],
  "food": ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥"],
  "activities": ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🥊", "🥋", "🎯"],
  "travel": ["🚗", "🚕", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🛵", "🏍️"]
};

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  disabled?: boolean;
}

const EmojiPicker = ({ onEmojiSelect, disabled = false }: EmojiPickerProps) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" disabled={disabled}>
          <Smile className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2" align="end">
        <Tabs defaultValue="smileys">
          <TabsList className="w-full grid grid-cols-6 h-auto mb-2">
            {Object.keys(emojiCategories).map(category => (
              <TabsTrigger key={category} value={category} className="p-1 h-8">
                {emojiCategories[category as keyof typeof emojiCategories][0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <TabsContent key={category} value={category} className="m-0">
              <div className="grid grid-cols-7 gap-1">
                {emojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
