import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../lib/config";
import Header from "../components/Header";
import { Copy, Check, MessageCircle, Send } from "lucide-react";

interface MessageType {
  text: string;
  isMe: boolean;
}

export default function Chat() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Copy to Clipboard Logic
  const handleCopy = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 2. Auto Scroll to Bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. WebSocket Connection
  useEffect(() => {
    const ws = new WebSocket(BACKEND_URL);
    socketRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: { roomId }
      }));
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, { text: event.data, isMe: false }]);
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  // 4. Send Message Logic
  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return;

    socketRef.current.send(JSON.stringify({
      type: "chat",
      payload: { message: input }
    }));

    setMessages((prev) => [...prev, { text: input, isMe: true }]);
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-neutral-950 transition-colors duration-500 overflow-hidden text-neutral-900 dark:text-neutral-100">
      <Header />

      {/* --- Top Info Bar --- */}
      <div className="px-6 py-3 border-b dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Invite Code:</span>
          <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-xl border dark:border-neutral-700 shadow-sm">
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {roomId || "..."}
            </span>
            <button 
              onClick={handleCopy}
              className="ml-1 p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-all active:scale-90"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-neutral-400 hover:text-indigo-600" />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* --- Message Area --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-neutral-950 custom-scrollbar relative">
        
        {/* Empty State: Jab tak koi message nahi hai */}
        {messages.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-full mb-4">
              <MessageCircle className="w-12 h-12 text-indigo-600 dark:text-indigo-400 opacity-70" />
            </div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Start a conversation!</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-[260px] mt-2 text-sm leading-relaxed">
              Share your invite code and chat securely. <br />
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">No footprints left behind.</span>
            </p>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl shadow-sm text-sm sm:text-base ${
              msg.isMe 
                ? "bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/10" 
                : "bg-neutral-100 dark:bg-neutral-900 dark:text-white rounded-tl-none border dark:border-neutral-800"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* --- Input Area --- */}
      <div className="p-4 bg-white dark:bg-neutral-900 border-t dark:border-neutral-800 pb-6 sm:pb-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-neutral-100 dark:bg-neutral-800 dark:text-white rounded-2xl px-6 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-neutral-400"
            placeholder="Type a secure message..."
          />
          <button 
            onClick={sendMessage} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-2xl font-bold transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
