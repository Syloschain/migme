
// PacketUtils.js - Modern rewrite of a.java and b.java
// Handles data serialization and message formatting

export const serializePacket = (data) => {
  const encoder = new TextEncoder();
  return encoder.encode(JSON.stringify(data));
};

export const deserializePacket = (packet) => {
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(packet));
};

// Format chat message with emoticons
export const formatMessage = (message) => {
  // Replace text emoticon patterns with emoji
  const emoticons = {
    ':)': '😊',
    ':(': '😞',
    ':D': '😃',
    ':P': '😛',
    ';)': '😉',
    '<3': '❤️',
    ':*': '😘',
    ':/': '😕',
    ':O': '😮',
    ':o': '😮'
  };
  
  let formattedMessage = message;
  Object.entries(emoticons).forEach(([code, emoji]) => {
    formattedMessage = formattedMessage.replace(new RegExp(code, 'g'), emoji);
  });
  
  return formattedMessage;
};

// Parse message for commands - similar to mig33's command system
export const parseCommand = (message) => {
  if (!message.startsWith('/')) return null;
  
  const parts = message.split(' ');
  const command = parts[0].substring(1).toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
};

// Generate unique message ID (timestamp + random)
export const generateMessageId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
