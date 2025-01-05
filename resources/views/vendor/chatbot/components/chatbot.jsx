import React, { useState } from "react";

function ChatBot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi, how can I help you today?" },
    ]);
    const [input, setInput] = useState("");

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: input }),
            });

            const data = await response.json();
            if (data.response) {
                setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: data.response },
                ]);
            }
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
        }
    };

    return (
        <div className="relative">
            {/* Chatbot Toggle Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium border rounded-full w-16 h-16 bg-black hover:bg-gray-700 cursor-pointer"
            >
                <svg
                    width="102"
                    height="67"
                    viewBox="0 0 1028 673"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* SVG Path */}
                    <path
                        d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
                        className="border-gray-200"
                    ></path>
                </svg>
            </button>

            {/* Chatbox */}
            {isChatOpen && (
                <div
                    id="chatbox"
                    className="fixed bottom-24 right-6 bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg w-80 flex flex-col space-y-4 p-4"
                >
                    {/* Header */}
                    <div className="flex flex-col space-y-1 pb-2">
                        <h6 className="font-semibold text-lg tracking-tight text-black dark:text-white">
                            Chatbot
                        </h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Powered by OpenAI
                        </p>
                    </div>

                    {/* Messages */}
                    <div
                        id="messages"
                        className="flex-grow overflow-y-auto space-y-4"
                        style={{ maxHeight: "300px" }}
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-3 items-start ${
                                    message.sender === "user" ? "justify-end" : ""
                                }`}
                            >
                                <div
                                    className={`rounded-full w-8 h-8 bg-gray-300 flex items-center justify-center ${
                                        message.sender === "user" ? "order-2" : ""
                                    }`}
                                >
                                    {message.sender === "bot" ? "AI" : "You"}
                                </div>
                                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg text-sm">
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center space-x-2 pt-2"
                    >
                        <input
                            type="text"
                            className="flex-grow h-10 rounded-md border px-3 text-sm"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ChatBot;
