
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiApi } from "@/lib/ai-api";

interface Message {
    role: "user" | "model";
    parts: [{ text: string }];
}

export default function AIChatbot({
    context = "MediNest medical e-commerce platform",
}: {
    context?: string;
}) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const send = async () => {
        if (!input.trim() || loading) return;

        const userMsg: Message = { role: "user", parts: [{ text: input }] };
        const updated = [...messages, userMsg];
        setMessages(updated);
        setInput("");
        setLoading(true);

        try {
            // ✅ Backend এর Groq format এ convert করো
            const historyForBackend = messages.map((m) => ({
                role: m.role === "model" ? "assistant" : "user",
                content: m.parts[0].text,
            }));

            const data = await aiApi.chat(input, historyForBackend);

            setMessages([
                ...updated,
                {
                    role: "model",
                    parts: [{ text: data.reply || "Hello! How can I help you?" }],
                },
            ]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages([
                ...updated,
                {
                    role: "model",
                    parts: [{ text: "Could not reach AI service. Please try again." }],
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <button
                onClick={() => setOpen(!open)}
                className="bg-primary text-white rounded-full w-14 h-14 text-2xl shadow-lg hover:scale-105 transition-transform"
            >
                {open ? "✕" : "💬"}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 w-80 sm:w-96 h-[400px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800"
                    >
                        <div className="p-4 bg-primary text-white rounded-t-2xl font-semibold flex items-center gap-2">
                            🤖 MediNest AI Assistant
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.length === 0 && (
                                <div className="text-center mt-12">
                                    <p className="text-4xl mb-2">👋</p>
                                    <p className="text-sm text-gray-500">
                                        Hi! I'm your MediNest AI assistant. Ask me about medicines,
                                        prices, or anything else!
                                    </p>
                                </div>
                            )}

                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`text-sm p-3 rounded-2xl max-w-[85%] ${m.role === "user"
                                        ? "bg-primary text-white ml-auto rounded-tr-none"
                                        : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
                                        }`}
                                >
                                    {m.parts[0].text}
                                </div>
                            ))}

                            {loading && (
                                <div className="text-sm p-3 rounded-2xl max-w-[85%] bg-gray-100 dark:bg-gray-800 rounded-tl-none">
                                    <div className="flex gap-1">
                                        <span className="animate-bounce">.</span>
                                        <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 border-t dark:border-gray-800 flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && send()}
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button
                                onClick={send}
                                disabled={loading || !input.trim()}
                                className="bg-primary text-white px-4 rounded-full text-sm font-medium disabled:opacity-50"
                            >
                                Send
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}