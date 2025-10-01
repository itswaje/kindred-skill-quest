import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");

  const conversations = [
    { id: 1, name: "Sarah Chen", avatar: "SC", lastMessage: "See you tomorrow!", time: "2m ago", unread: 2 },
    { id: 2, name: "Marcus Johnson", avatar: "MJ", lastMessage: "Thanks for the session!", time: "1h ago", unread: 0 },
    { id: 3, name: "Emily Rodriguez", avatar: "ER", lastMessage: "Can we reschedule?", time: "3h ago", unread: 1 },
  ];

  const messages = [
    { id: 1, sender: "them", text: "Hi! Looking forward to our session tomorrow.", time: "2:30 PM" },
    { id: 2, sender: "me", text: "Me too! Do you have any specific topics you'd like to cover?", time: "2:32 PM" },
    { id: 3, sender: "them", text: "Yes, I'd like to learn more about React hooks and state management.", time: "2:35 PM" },
    { id: 4, sender: "me", text: "Perfect! I'll prepare some examples. See you tomorrow at 3 PM!", time: "2:37 PM" },
    { id: 5, sender: "them", text: "See you tomorrow! Thanks!", time: "2:38 PM" },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 animate-fade-in">Messages</h1>
        
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-3 h-[600px]">
            {/* Conversation List */}
            <div className="border-r bg-muted/20">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedChat(conv.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat === conv.id 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {conv.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      
                      {conv.unread > 0 && (
                        <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Chat Area */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b bg-background">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Sarah Chen</h3>
                    <p className="text-sm text-muted-foreground">Web Development Mentor</p>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'me'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'me' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Input */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button onClick={handleSend} className="btn-gradient">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
