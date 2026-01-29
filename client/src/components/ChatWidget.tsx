import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/hooks/use-dashboard";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Eloy's Digital Twin. Ask me anything about my IT journey, skills, or projects!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chatMutation = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    try {
      const data = await chatMutation.mutateAsync({ message: userMessage });
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please try again later." }]);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="absolute bottom-16 right-0 mb-2 w-[350px] sm:w-[400px] h-[500px] bg-card border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Eloy's Digital Twin</h3>
                    <p className="text-white/70 text-xs">Powered by AI</p>
                  </div>
                </div>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-secondary text-secondary-foreground rounded-bl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {chatMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-secondary p-3 rounded-2xl rounded-bl-none">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-background/50 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 bg-secondary/50 border-white/10 focus:ring-primary"
                    disabled={chatMutation.isPending}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={chatMutation.isPending || !inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25 flex items-center justify-center text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>
    </>
  );
}
