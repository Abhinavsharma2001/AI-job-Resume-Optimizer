import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ChatbotPage = () => {
    const { user, isAuthenticated } = useAuth();
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hello! 👋 I'm your AI Career Assistant. I can help you with:\n\n• Resume tips and improvements\n• Interview preparation\n• Career advice\n• Job search strategies\n\nHow can I help you today?",
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const quickActions = [
        { label: '📄 Resume Tips', prompt: 'Give me tips to improve my resume' },
        { label: '🎤 Interview Prep', prompt: 'Help me prepare for a job interview' },
        { label: '💼 Career Advice', prompt: 'I need career guidance' },
        { label: '🔍 Job Search', prompt: 'How can I find better job opportunities?' },
        { label: '💰 Salary Negotiate', prompt: 'Tips for salary negotiation' },
        { label: '📝 Cover Letter', prompt: 'Help me write a cover letter' },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateBotResponse = (userMessage) => {
        const msg = userMessage.toLowerCase();

        if (msg.includes('resume') || msg.includes('cv')) {
            return "Here are some key resume tips:\n\n✅ **Keep it concise** - Aim for 1-2 pages max\n✅ **Use action verbs** - Start bullets with 'Led', 'Developed', 'Achieved'\n✅ **Quantify achievements** - Use numbers and percentages\n✅ **Customize for each job** - Match keywords from job description\n✅ **Use our Resume Builder** - Create an ATS-friendly resume\n\nWould you like me to review your resume or help you build one?";
        }

        if (msg.includes('interview')) {
            return "Great! Here's how to prepare for interviews:\n\n🎯 **STAR Method** - Structure answers: Situation, Task, Action, Result\n🔍 **Research the company** - Know their mission, products, culture\n💪 **Practice common questions** - Tell me about yourself, strengths/weaknesses\n👔 **Prepare questions to ask** - Show genuine interest\n⏰ **Be punctual** - Arrive 10-15 minutes early\n\nWould you like me to help you with mock interview questions?";
        }

        if (msg.includes('salary') || msg.includes('negotiate')) {
            return "Salary negotiation tips:\n\n💰 **Research market rates** - Use Glassdoor, LinkedIn Salary\n📊 **Know your worth** - List your achievements and skills\n⏰ **Wait for the offer first** - Don't discuss salary too early\n🎯 **Give a range** - Based on research, aim high but reasonable\n✨ **Consider total package** - Benefits, bonuses, equity matter too\n\nWant me to help you prepare a negotiation strategy?";
        }

        if (msg.includes('career') || msg.includes('advice') || msg.includes('guidance')) {
            return "Let me help you with your career path:\n\n🎯 **Define your goals** - Where do you want to be in 5 years?\n📚 **Skill development** - What skills are in demand in your field?\n🌐 **Networking** - Connect with professionals on LinkedIn\n📈 **Track your growth** - Document achievements regularly\n\nTell me more about your current role and career aspirations!";
        }

        if (msg.includes('job') || msg.includes('search') || msg.includes('find')) {
            return "Here's how to find better opportunities:\n\n🔍 **Optimize your LinkedIn** - Complete profile, relevant keywords\n📧 **Set up job alerts** - Get notified for matching positions\n🤝 **Network actively** - 70% of jobs are filled through networking\n🎯 **Target companies** - Make a list of dream companies\n📱 **Use our Jobs page** - Real-time listings from multiple sources\n\nWant me to help you refine your job search strategy?";
        }

        if (msg.includes('cover letter')) {
            return "Cover letter essentials:\n\n📝 **Personalize it** - Address hiring manager by name\n🎯 **Match the job** - Reference specific requirements\n💪 **Show value** - Explain what you'll bring to the role\n📏 **Keep it brief** - 3-4 paragraphs max\n✨ **Strong closing** - Include a call to action\n\nWould you like help drafting a cover letter for a specific role?";
        }

        if (msg.includes('thank') || msg.includes('thanks')) {
            return "You're welcome! 😊 I'm always here to help with your career journey. Feel free to ask anything else about job search, interviews, resumes, or career development!";
        }

        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return `Hi ${user?.displayName?.split(' ')[0] || 'there'}! 👋 Great to see you! How can I assist you with your career today?`;
        }

        return "I'd be happy to help you with that! Here are some things I specialize in:\n\n• Resume building and optimization\n• Interview preparation\n• Career planning\n• Job search strategies\n• Salary negotiation\n• Cover letter writing\n\nCould you tell me more specifically what you need help with?";
    };

    const handleSend = async (message = inputValue) => {
        if (!message.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: message,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        const botResponse = {
            id: Date.now() + 1,
            type: 'bot',
            text: generateBotResponse(message),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <main className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
                {/* Chat Header */}
                <div className="bg-white/10 backdrop-blur-md border-b border-white/10 px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-xl">🤖</span>
                        </div>
                        <div>
                            <h1 className="text-white font-bold">AI Career Assistant</h1>
                            <p className="text-green-400 text-sm flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="px-4 py-3 overflow-x-auto scrollbar-thin">
                    <div className="flex gap-2 min-w-max">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => handleSend(action.prompt)}
                                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full border border-white/20 whitespace-nowrap transition-colors"
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] sm:max-w-[70%] ${message.type === 'user'
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-br-md'
                                    : 'bg-white/10 backdrop-blur-md text-white rounded-2xl rounded-bl-md border border-white/10'
                                } px-4 py-3`}>
                                {message.type === 'bot' && (
                                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                                        <span className="text-lg">🤖</span>
                                        <span className="text-sm font-medium text-purple-300">AI Assistant</span>
                                    </div>
                                )}
                                <div className="text-sm sm:text-base whitespace-pre-wrap">
                                    {message.text.split('\n').map((line, i) => {
                                        // Handle bold text
                                        const parts = line.split(/\*\*(.*?)\*\*/g);
                                        return (
                                            <p key={i} className={i > 0 ? 'mt-1' : ''}>
                                                {parts.map((part, j) =>
                                                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                                                )}
                                            </p>
                                        );
                                    })}
                                </div>
                                <p className="text-xs opacity-50 mt-2 text-right">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl rounded-bl-md border border-white/10 px-4 py-3">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-white/10 backdrop-blur-md border-t border-white/10 px-4 py-4">
                    <div className="flex gap-2 sm:gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything about your career..."
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 text-sm sm:text-base"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!inputValue.trim() || isTyping}
                            className={`px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all ${inputValue.trim() && !isTyping
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-gray-500 text-xs mt-2 text-center">
                        AI responses are for guidance only. Always verify important information.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ChatbotPage;
