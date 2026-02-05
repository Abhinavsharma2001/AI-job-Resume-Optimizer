import React, { useState } from 'react';
import LiveJobListings from '../component/LiveJobListings';

const JobsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');

    return (
        <main className="pt-16 md:pt-20 min-h-screen bg-gray-50">
            {/* Hero Section - Mobile Optimized */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-10 sm:py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                        Find Your Dream Job
                    </h1>
                    <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                        Explore job opportunities matched to your skills
                    </p>

                    {/* Search Bar - Mobile Optimized */}
                    <div className="max-w-4xl mx-auto px-2">
                        <div className="flex flex-col gap-2 p-2 bg-white rounded-xl sm:rounded-2xl shadow-2xl shadow-purple-500/20">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Job title or keyword"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                                    />
                                </div>
                                <div className="flex-1 relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="City or remote"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                            <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg text-sm sm:text-base">
                                Search Jobs
                            </button>
                        </div>
                    </div>

                    {/* Quick Filters - Scrollable on mobile */}
                    <div className="mt-4 sm:mt-6 overflow-x-auto scrollbar-thin px-2">
                        <div className="flex gap-2 min-w-max justify-start sm:justify-center pb-2">
                            {['Remote', 'Full-time', 'Entry Level', 'Tech', 'Design', 'Marketing'].map((filter, index) => (
                                <button
                                    key={index}
                                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs sm:text-sm font-medium transition-colors backdrop-blur-sm whitespace-nowrap"
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar - Mobile Optimized */}
            <div className="bg-white border-b border-gray-200 py-4 sm:py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
                        {[
                            { value: '10,000+', label: 'Active Jobs' },
                            { value: '500+', label: 'Companies' },
                            { value: '50K+', label: 'Applications' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Live
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Listings - Full Width on Mobile */}
            <div className="py-4 sm:py-8">
                <LiveJobListings />
            </div>

            {/* CTA Section - Mobile Optimized */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-10 sm:py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                        Can't find the perfect job?
                    </h2>
                    <p className="text-white/80 mb-6 text-sm sm:text-base">
                        Let our AI build you a perfect resume
                    </p>
                    <a
                        href="/resume-builder"
                        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl text-sm sm:text-base"
                    >
                        <span>Build Your Resume</span>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    );
};

export default JobsPage;
