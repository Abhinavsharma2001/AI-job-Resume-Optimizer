import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const features = [
        'AI Resume Builder',
        'Auto Job Tracking',
        'ATS Optimizer',
        'And More...'
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-cyan-50 pt-16 md:pt-20">
            {/* Background Decorations - Hidden on mobile for performance */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs - Smaller on mobile */}
                <div className="absolute top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Grid Pattern - Hidden on mobile */}
                <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
                <div className="text-center">
                    {/* Trust Badge - Smaller on mobile */}
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 rounded-full mb-4 sm:mb-8">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span className="text-blue-700 font-semibold text-xs sm:text-sm">
                            TRUSTED BY 1M+ JOB SEEKERS!
                        </span>
                    </div>

                    {/* Main Headline - Responsive sizing */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
                        Land your{' '}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                dream job
                            </span>
                            <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
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
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>
                        <span className="text-gray-800">stress-free.</span>
                    </h1>

                    {/* Subtitle - Smaller on mobile */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto px-4">
                        AI-powered tools to optimize your resume, track applications, and land interviews faster.
                    </p>

                    {/* Feature Checkmarks - 2x2 grid on mobile */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-10 px-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1.5 sm:gap-2 text-gray-700"
                            >
                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-xs sm:text-sm md:text-base font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 px-4">
                        <Link
                            to="/signup"
                            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white font-bold text-sm sm:text-lg rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10">SIGN UP FOR FREE</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link
                            to="/resume-builder"
                            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 font-bold text-sm sm:text-lg rounded-full border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all transform hover:scale-105 shadow-lg"
                        >
                            <span>Try Resume Builder</span>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Stats - Smaller on mobile */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
                        {[
                            { value: '1M+', label: 'Users' },
                            { value: '500K+', label: 'Resumes' },
                            { value: '50K+', label: 'Jobs' },
                            { value: '95%', label: 'Success' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Hidden on mobile */}
            <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-scroll"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
