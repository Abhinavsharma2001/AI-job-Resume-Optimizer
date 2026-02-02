import React, { useState } from 'react';
import LiveJobListings from '../component/LiveJobListings';
import JobListings from '../component/JobListings';

const JobsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');

    return (
        <main className="pt-16 md:pt-20 min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Find Your Dream Job
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
                        Explore thousands of job opportunities matched to your skills. Apply with your AI-optimized resume.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-3 p-2 bg-white rounded-2xl shadow-2xl shadow-purple-500/20">
                            <div className="flex-1 relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Job title, keywords, or company"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            <div className="flex-1 relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="City, state, or remote"
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg">
                                Search Jobs
                            </button>
                        </div>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {['Remote', 'Full-time', 'Entry Level', 'Tech', 'Design', 'Marketing'].map((filter, index) => (
                            <button
                                key={index}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition-colors backdrop-blur-sm"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
                        <div className="flex items-center gap-8">
                            {[
                                { value: '10,000+', label: 'Active Jobs' },
                                { value: '500+', label: 'Companies' },
                                { value: '50K+', label: 'Applications Sent' }
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Updated in real-time
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Title */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Latest Opportunities</h2>
                        <select className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option>Most Recent</option>
                            <option>Most Relevant</option>
                            <option>Highest Salary</option>
                        </select>
                    </div>

                    {/* Job Listings */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <LiveJobListings />
                    </div>

                    {/* More Jobs */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Jobs</h2>
                        <JobListings />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Can't find the perfect job?
                    </h2>
                    <p className="text-white/80 mb-8">
                        Let our AI build you a perfect resume and match you with opportunities.
                    </p>
                    <a
                        href="/resume-builder"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl"
                    >
                        <span>Build Your Resume</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    );
};

export default JobsPage;
