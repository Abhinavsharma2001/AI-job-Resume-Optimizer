import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const features = [
        'AI Resume Builder',
        'Automated Job Tracking',
        'ATS Score Optimizer',
        'And Much More...'
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-cyan-50">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-300/10 rounded-full blur-3xl"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="text-center">
                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-8 animate-bounce-slow">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-700 font-semibold text-sm tracking-wide">
                            TRUSTED BY OVER 1,000,000+ JOB SEEKERS!
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Land your{' '}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                dream job
                            </span>
                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                                <path d="M2 10C50 2 150 2 198 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="50%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#EC4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                        <br />
                        <span className="text-gray-800">Without the stress.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        AI-powered tools to optimize your resume, track applications, and land interviews faster than ever.
                    </p>

                    {/* Feature Checkmarks */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-gray-700"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                        <Link
                            to="/signup"
                            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white font-bold text-lg rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10">SIGN UP FOR FREE</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link
                            to="/resume-builder"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 font-bold text-lg rounded-full border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all transform hover:scale-105 shadow-lg"
                        >
                            <span>Try Resume Builder</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {[
                            { value: '1M+', label: 'Active Users' },
                            { value: '500K+', label: 'Resumes Created' },
                            { value: '50K+', label: 'Jobs Matched' },
                            { value: '95%', label: 'Success Rate' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 text-sm md:text-base mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-scroll"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
