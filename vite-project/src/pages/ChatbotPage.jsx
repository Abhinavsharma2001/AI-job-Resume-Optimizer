import React, { useState, useRef, useEffect } from 'react';

const ChatbotPage = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "👋 Hello! I'm your AI Career Assistant powered by Gemini. I'm here to help you with:\n\n• Job search strategies\n• Resume tips and optimization\n• Interview preparation\n• Career advice and planning\n• Salary negotiation tips\n\nHow can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const quickPrompts = [
        "How do I write a strong resume?",
        "Tips for technical interviews",
        "How to negotiate salary?",
        "Best way to follow up after interview",
        "How to handle job rejection?",
        "Career change advice"
    ];

    // AI Response using Gemini API
    const generateAIResponse = async (userMessage) => {
        setIsTyping(true);

        try {
            const API_KEY = 'AIzaSyCegIJFu8GWIqodtgkdxBILSq12ePfNOV0';

            const conversationContext = messages.slice(-6).map(msg =>
                `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
            ).join('\n');

            const prompt = `You are a helpful AI career assistant on JobFlow.ai, a job search platform. Help users with job searching, resume tips, interview prep, coding questions, and career advice. Be helpful, professional, and concise. Format your responses clearly with bullet points when listing multiple items.

${conversationContext}

User: ${userMessage}
Assistant:`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 800
                        }
                    })
                }
            );

            const data = await response.json();

            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            }

            return "I'm here to help! Could you please rephrase your question?";
        } catch (error) {
            console.error('Gemini API Error:', error);
            return "I'm having trouble connecting right now. Please try again in a moment.";
        } finally {
            setIsTyping(false);
        }
    };

    const handleSendMessage = async (message = inputValue) => {
        if (!message.trim()) return;

        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: message,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        const aiResponse = await generateAIResponse(message);

        const botMsg = {
            id: Date.now() + 1,
            type: 'bot',
            text: aiResponse,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botMsg]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <main className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-6 px-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
                        🤖
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">AI Career Assistant</h1>
                        <p className="text-white/70 text-sm">Powered by Gemini AI • Always ready to help</p>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col p-4">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-thin">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] md:max-w-[70%] ${msg.type === 'user'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-tr-sm'
                                    : 'bg-white/10 backdrop-blur-sm text-gray-200 rounded-2xl rounded-tl-sm border border-white/10'
                                } px-5 py-3`}>
                                {msg.type === 'bot' && (
                                    <div className="flex items-center gap-2 mb-2 text-purple-300 text-sm font-medium">
                                        <span>🤖</span>
                                        <span>AI Assistant</span>
                                    </div>
                                )}
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                <p className={`text-xs mt-2 ${msg.type === 'user' ? 'text-white/50' : 'text-gray-500'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/10 backdrop-blur-sm px-5 py-4 rounded-2xl rounded-tl-sm border border-white/10">
                                <div className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
                                    <span>🤖</span>
                                    <span>AI Assistant</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                {messages.length <= 2 && (
                    <div className="mb-4">
                        <p className="text-gray-400 text-sm mb-3">Quick prompts:</p>
                        <div className="flex flex-wrap gap-2">
                            {quickPrompts.map((prompt, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSendMessage(prompt)}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full border border-white/20 transition-colors"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-3">
                    <div className="flex gap-3">
                        <textarea
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything about your job search..."
                            rows={1}
                            className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 resize-none"
                            style={{ minHeight: '48px', maxHeight: '120px' }}
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim() || isTyping}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            <span>Send</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-center text-gray-500 text-xs mt-2">
                        Press Enter to send • Shift+Enter for new line
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ChatbotPage;
