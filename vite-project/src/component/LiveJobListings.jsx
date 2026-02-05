import React, { useState, useEffect } from 'react';
import { fetchAllJobs, SOURCE_COLORS } from '../services/jobsApi';

const LiveJobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [sources, setSources] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('developer');
    const [inputValue, setInputValue] = useState('developer');
    const [activeSource, setActiveSource] = useState('all');

    const loadJobs = async (term, source) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchAllJobs(term, source);
            setJobs(result.jobs);
            setSources(result.sources);
        } catch (err) {
            setError(err.message || 'Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs(searchTerm, activeSource);
    }, [searchTerm, activeSource]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(inputValue);
    };

    const sourceTabs = [
        { id: 'all', label: 'All', icon: '🌐' },
        { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
        { id: 'indeed', label: 'Indeed', icon: '🔍' },
        { id: 'glassdoor', label: 'Glassdoor', icon: '🏢' },
        { id: 'naukri', label: 'Naukri', icon: '🇮🇳' },
    ];

    return (
        <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-3 sm:px-4 py-8 sm:py-16 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-full animate-pulse">
                            🔴 LIVE
                        </span>
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-full">
                            Multi-Source
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        Real-Time Job Aggregator
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base px-4">
                        Jobs from <span className="text-blue-400 font-semibold">LinkedIn</span>,
                        <span className="text-purple-400 font-semibold"> Indeed</span>,
                        <span className="text-green-400 font-semibold"> Glassdoor</span> &
                        <span className="text-cyan-400 font-semibold"> Naukri</span>
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6 px-2">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 bg-white/10 backdrop-blur-md p-2 rounded-xl sm:rounded-2xl border border-white/20">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search jobs..."
                            className="flex-1 px-4 py-3 bg-white rounded-lg sm:rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all text-sm sm:text-base"
                        >
                            🔍 Search
                        </button>
                    </div>
                </form>

                {/* Source Tabs - Scrollable on mobile */}
                <div className="mb-6 px-2 overflow-x-auto scrollbar-thin">
                    <div className="flex gap-2 min-w-max pb-2 justify-start sm:justify-center">
                        {sourceTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSource(tab.id)}
                                className={`px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap ${activeSource === tab.id
                                        ? 'bg-white text-gray-900 shadow-lg scale-105'
                                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                                {sources[tab.id] > 0 && (
                                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${activeSource === tab.id ? 'bg-purple-600 text-white' : 'bg-white/20'
                                        }`}>
                                        {sources[tab.id]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-purple-400/30 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base mt-4">Fetching jobs...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-xl mx-auto bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-xl p-4 sm:p-6 text-center mx-4">
                        <div className="text-3xl mb-2">⚠️</div>
                        <h3 className="text-lg font-bold text-red-300 mb-1">Error Loading Jobs</h3>
                        <p className="text-red-200 text-sm">{error}</p>
                    </div>
                )}

                {/* Jobs Grid */}
                {!loading && !error && (
                    <>
                        <p className="text-center text-gray-400 mb-4 text-sm sm:text-base">
                            Showing <span className="font-bold text-white">{jobs.length}</span> jobs
                            {activeSource !== 'all' && ` from ${sourceTabs.find(t => t.id === activeSource)?.label}`}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2">
                            {jobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </>
                )}

                {/* No Results */}
                {!loading && !error && jobs.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-3">🔍</div>
                        <p className="text-gray-300 text-sm sm:text-base">No jobs found. Try a different search term.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

// Job Card Component - Mobile Optimized
const JobCard = ({ job }) => {
    const sourceStyle = SOURCE_COLORS[job.source] || SOURCE_COLORS.indeed;

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
            {/* Source Badge Header */}
            <div className={`${sourceStyle.bg} px-3 sm:px-4 py-2 flex items-center justify-between`}>
                <span className="text-white text-xs sm:text-sm font-medium flex items-center gap-1.5">
                    <span>{sourceStyle.icon}</span> {job.sourceLabel}
                </span>
                <span className="text-white/80 text-xs">{job.type}</span>
            </div>

            <div className="p-4 sm:p-5">
                {/* Company Logo & Name */}
                <div className="flex items-center gap-3 mb-3">
                    {job.logo ? (
                        <img
                            src={job.logo}
                            alt={job.company}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-contain bg-white p-1"
                        />
                    ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                            {job.company?.charAt(0) || 'C'}
                        </div>
                    )}
                    <div className="min-w-0 flex-1">
                        <p className="text-purple-300 font-medium text-xs sm:text-sm truncate">{job.company}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1 truncate">
                            📍 {job.location}
                        </p>
                    </div>
                </div>

                {/* Job Title */}
                <h3 className="text-sm sm:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {job.title}
                </h3>

                {/* Description - Hidden on small screens */}
                <p className="hidden sm:block text-gray-400 text-sm mb-3 line-clamp-2">
                    {job.description}
                </p>

                {/* Salary */}
                <div className="text-emerald-400 font-bold text-sm sm:text-base mb-3">
                    💰 {job.salary}
                </div>

                {/* Apply Button */}
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-2.5 sm:py-3 ${sourceStyle.bg} text-white text-center font-semibold rounded-lg sm:rounded-xl hover:opacity-90 transition-all text-sm sm:text-base`}
                >
                    Apply on {job.sourceLabel} →
                </a>
            </div>
        </div>
    );
};

export default LiveJobListings;
