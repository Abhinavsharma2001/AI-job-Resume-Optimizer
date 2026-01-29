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
        { id: 'all', label: 'All Jobs', icon: '🌐' },
        { id: 'linkedin', label: 'LinkedIn', icon: '💼', color: 'bg-blue-600' },
        { id: 'indeed', label: 'Indeed', icon: '🔍', color: 'bg-purple-600' },
        { id: 'glassdoor', label: 'Glassdoor', icon: '🏢', color: 'bg-green-600' },
        { id: 'naukri', label: 'Naukri', icon: '🇮🇳', color: 'bg-blue-500' },
    ];

    return (
        <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 min-h-screen">
            <div className="container-xl lg:container m-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-semibold rounded-full animate-pulse">
                            🔴 LIVE
                        </span>
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-full">
                            Multi-Source
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                        Real-Time Job Aggregator
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Jobs from <span className="text-blue-400 font-semibold">LinkedIn</span>,
                        <span className="text-purple-400 font-semibold"> Indeed</span>,
                        <span className="text-green-400 font-semibold"> Glassdoor</span> &
                        <span className="text-cyan-400 font-semibold"> Naukri</span>
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                    <div className="flex gap-3 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search jobs... (React, Python, Data Analyst)"
                            className="flex-1 px-5 py-3 bg-white rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            🔍 Search
                        </button>
                    </div>
                </form>

                {/* Source Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {sourceTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSource(tab.id)}
                            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${activeSource === tab.id
                                    ? 'bg-white text-gray-900 shadow-lg scale-105'
                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                            {sources[tab.id] > 0 && (
                                <span className={`px-2 py-0.5 text-xs rounded-full ${activeSource === tab.id ? 'bg-purple-600 text-white' : 'bg-white/20'
                                    }`}>
                                    {sources[tab.id]}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-purple-400/30 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-300 text-lg mt-4">Fetching jobs from all sources...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-xl mx-auto bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-3">⚠️</div>
                        <h3 className="text-xl font-bold text-red-300 mb-2">Error Loading Jobs</h3>
                        <p className="text-red-200">{error}</p>
                    </div>
                )}

                {/* Jobs Grid */}
                {!loading && !error && (
                    <>
                        <p className="text-center text-gray-400 mb-6">
                            Showing <span className="font-bold text-white">{jobs.length}</span> jobs
                            {activeSource !== 'all' && ` from ${sourceTabs.find(t => t.id === activeSource)?.label}`}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    </>
                )}

                {/* No Results */}
                {!loading && !error && jobs.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-gray-300 text-lg">No jobs found. Try a different search term.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

// Job Card Component
const JobCard = ({ job }) => {
    const sourceStyle = SOURCE_COLORS[job.source] || SOURCE_COLORS.indeed;

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 group">
            {/* Source Badge Header */}
            <div className={`${sourceStyle.bg} px-4 py-2 flex items-center justify-between`}>
                <span className="text-white text-sm font-medium flex items-center gap-2">
                    <span>{sourceStyle.icon}</span> {job.sourceLabel}
                </span>
                <span className="text-white/80 text-xs">{job.type}</span>
            </div>

            <div className="p-5">
                {/* Company Logo & Name */}
                <div className="flex items-center gap-3 mb-4">
                    {job.logo ? (
                        <img
                            src={job.logo}
                            alt={job.company}
                            className="w-12 h-12 rounded-lg object-contain bg-white p-1"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                            {job.company?.charAt(0) || 'C'}
                        </div>
                    )}
                    <div>
                        <p className="text-purple-300 font-medium text-sm">{job.company}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1">
                            📍 {job.location}
                        </p>
                    </div>
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {job.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {job.description}
                </p>

                {/* Salary */}
                <div className="text-emerald-400 font-bold mb-4">
                    💰 {job.salary}
                </div>

                {/* Apply Button */}
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 ${sourceStyle.bg} text-white text-center font-semibold rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]`}
                >
                    Apply on {job.sourceLabel} →
                </a>
            </div>
        </div>
    );
};

export default LiveJobListings;
