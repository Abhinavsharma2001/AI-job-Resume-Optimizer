import React from 'react';
import { Link } from 'react-router-dom';

const AIToolsShowcase = () => {
    const tools = [
        {
            icon: '📝',
            title: 'AI Resume Builder',
            description: 'Create job-winning resumes in minutes with AI that knows what recruiters want.',
            link: '/resume-builder',
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50'
        },
        {
            icon: '📊',
            title: 'Resume Analyzer',
            description: 'Get an instant ATS score and actionable tips to improve your resume.',
            link: '/resume-analyzer',
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50'
        },
        {
            icon: '🤖',
            title: 'AI Career Assistant',
            description: 'Chat with our AI for career advice, interview prep, and job search tips.',
            link: '/chatbot',
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50'
        },
        {
            icon: '🎯',
            title: 'Job Matching',
            description: 'Find jobs that match your skills and experience automatically.',
            link: '/jobs',
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50'
        },
        {
            icon: '✉️',
            title: 'Cover Letter Generator',
            description: 'Generate personalized cover letters tailored to each job application.',
            link: '/resume-builder',
            gradient: 'from-indigo-500 to-purple-500',
            bgGradient: 'from-indigo-50 to-purple-50'
        },
        {
            icon: '💼',
            title: 'Interview Prep',
            description: 'Practice with AI-powered mock interviews for any role.',
            link: '/chatbot',
            gradient: 'from-teal-500 to-cyan-500',
            bgGradient: 'from-teal-50 to-cyan-50'
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm mb-4">
                        POWERFUL TOOLS
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Explore our full suite of{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            AI tools & features
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to supercharge your job search, all in one platform
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {tools.map((tool, index) => (
                        <Link
                            key={index}
                            to={tool.link}
                            className={`group relative p-6 bg-gradient-to-br ${tool.bgGradient} rounded-2xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 bg-gradient-to-br ${tool.gradient} rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                                {tool.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {tool.description}
                            </p>

                            {/* Arrow Link */}
                            <div className="flex items-center gap-2 text-blue-600 font-medium">
                                <span>Try it now</span>
                                <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-full shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:scale-105"
                    >
                        <span>Get Started Free</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <p className="mt-4 text-gray-500 text-sm">No credit card required</p>
                </div>
            </div>
        </section>
    );
};

export default AIToolsShowcase;
