
// MessageLine.jsx - Modern rewrite of l.java
import React from 'react';
import { cn } from "@/lib/utils";
import { formatMessage } from '@/utils/PacketUtils';

const MessageLine = ({ 
  text, 
  color = "inherit", 
  bold = false, 
  italic = false,
  className = "",
  timestamp = null,
  formatEmoticons = true
}) => {
  const displayText = formatEmoticons ? formatMessage(text) : text;
  
  return (
    <p className={cn(
      "message-line",
      bold && "font-bold",
      italic && "italic",
      className
    )} style={{ color }}>
      {displayText}
      {timestamp && (
        <span className="text-xs text-muted-foreground ml-2">
          {typeof timestamp === 'string' 
            ? timestamp 
            : new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      )}
    </p>
  );
};

export default MessageLine;
