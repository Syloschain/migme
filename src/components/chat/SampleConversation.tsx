
import ChatMessage from "./ChatMessage";

// Sample data for demonstration
const messages = [
  {
    id: "1",
    content: "Hey everyone! 👋 Just joined migme. This chat platform looks awesome!",
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    sender: {
      username: "Sarah_J",
      avatarUrl: "/placeholder.svg",
      level: 7,
      isVIP: true
    }
  },
  {
    id: "2",
    content: "Welcome to migme! We're happy to have you here. Have you tried any games yet?",
    timestamp: new Date(Date.now() - 3500000 * 2), // 1.9 hours ago
    sender: {
      username: "MigmeMod",
      level: 20,
      isVIP: true
    }
  },
  {
    id: "3",
    content: "Thanks! Not yet, but I'm planning to try the trivia game soon. I heard it's fun!",
    timestamp: new Date(Date.now() - 3400000 * 2), // 1.8 hours ago
    sender: {
      username: "Sarah_J",
      avatarUrl: "/placeholder.svg",
      level: 7,
      isVIP: true
    }
  },
  {
    id: "4",
    content: "The trivia game is great! I play it every day. You can earn credits too!",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    sender: {
      username: "GameMaster42",
      level: 15
    }
  },
  {
    id: "5",
    content: "I prefer LowCards myself. It's more strategic and the rewards are better if you're good at it.",
    timestamp: new Date(Date.now() - 1500000), // 25 minutes ago
    sender: {
      username: "CardShark",
      level: 12
    }
  },
  {
    id: "6",
    content: "Anyone want to join a private game room? I just created one called 'Friends Only'",
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    sender: {
      username: "FunTimes99",
      level: 9
    }
  },
  {
    id: "7",
    content: "I'll join! Send me an invite.",
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    sender: {
      username: "CurrentUser",
      level: 5,
      isVIP: false
    },
    isOwnMessage: true
  },
  {
    id: "8",
    content: "Invite sent! Check your notifications.",
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    sender: {
      username: "FunTimes99",
      level: 9
    }
  },
  {
    id: "9",
    content: "Thanks! I'll join in a minute.",
    timestamp: new Date(Date.now() - 60000), // 1 minute ago
    sender: {
      username: "CurrentUser",
      level: 5,
      isVIP: false
    },
    isOwnMessage: true
  }
];

const SampleConversation = () => {
  return (
    <div className="flex flex-col p-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          id={message.id}
          content={message.content}
          timestamp={message.timestamp}
          sender={message.sender}
          isOwnMessage={message.isOwnMessage}
        />
      ))}
    </div>
  );
};

export default SampleConversation;
