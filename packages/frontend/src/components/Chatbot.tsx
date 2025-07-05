import { ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";

interface Message {
    sender: "user" | "bot";
    text: string;
}

export function Chatbot() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const toggleOpen = () => setOpen(!open);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMessage: Message = { sender: "user", text: input };
        const botMessage: Message = { sender: "bot", text: "testing" };
        setMessages((prev) => [...prev, userMessage, botMessage]);
        setInput("");
    };

    if (!open) {
        return (
            <button
                onClick={toggleOpen}
                className="fixed bottom-4 right-4 z-50 bg-cal-poly-green text-white rounded-full p-3 shadow-lg"
            >
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 w-72 h-96 flex flex-col shadow-xl rounded-lg border border-cal-poly-green bg-white">
            <div className="bg-cal-poly-green text-white flex justify-between items-center px-3 py-2 rounded-t-lg">
                <span className="font-bold">Chatbot</span>
                <button onClick={toggleOpen} aria-label="Close chat">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm">
                {messages.map((m, idx) => (
                    <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`${m.sender === "user" ? "bg-cal-poly-green text-white" : "bg-gray-200"} px-2 py-1 rounded-md max-w-[75%]`}>{m.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={onSubmit} className="p-2 flex gap-2 border-t">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    placeholder="Type a message..."
                />
                <button className="bg-cal-poly-green text-white rounded p-1" type="submit" aria-label="Send message">
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}

export default Chatbot;
