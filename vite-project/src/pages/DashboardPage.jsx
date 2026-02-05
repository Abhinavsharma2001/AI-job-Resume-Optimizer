import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSavedJobs, getApplications, getApplicationStats, STATUS_LABELS, updateApplicationStatus, deleteApplication } from '../services/userJobsService';

const DashboardPage = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [savedJobs, setSavedJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({ total: 0, applied: 0, interview: 0, offer: 0, rejected: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        loadData();
    }, [isAuthenticated, navigate]);

    const loadData = async () => {
        if (!user?.uid) return;
        setLoading(true);
        try {
            const [saved, apps, appStats] = await Promise.all([
                getSavedJobs(user.uid),
                getApplications(user.uid),
                getApplicationStats(user.uid)
            ]);
            setSavedJobs(saved);
            setApplications(apps);
            setStats(appStats);
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (jobId, newStatus) => {
        try {
            await updateApplicationStatus(user.uid, jobId, newStatus);
            loadData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDeleteApplication = async (jobId) => {
        try {
            await deleteApplication(user.uid, jobId);
            loadData();
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'applications', label: 'Applications', icon: '📋' },
        { id: 'saved', label: 'Saved Jobs', icon: '💾' },
        { id: 'profile', label: 'Profile', icon: '👤' }
    ];

    return (
        <main className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}! 👋
                    </h1>
                    <p className="text-gray-400">Track your job search progress and manage applications</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-all ${activeTab === tab.id
                                    ? 'bg-white text-gray-900'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Total Applications', value: stats.total, color: 'from-blue-500 to-cyan-500', icon: '📊' },
                                        { label: 'In Progress', value: stats.applied, color: 'from-purple-500 to-pink-500', icon: '📤' },
                                        { label: 'Interviews', value: stats.interview, color: 'from-yellow-500 to-orange-500', icon: '🎤' },
                                        { label: 'Offers', value: stats.offer, color: 'from-green-500 to-emerald-500', icon: '🎉' }
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-2xl">{stat.icon}</span>
                                                <span className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                                    {stat.value}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <Link to="/jobs" className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                            <span className="text-2xl">🔍</span>
                                            <span className="text-white text-sm">Find Jobs</span>
                                        </Link>
                                        <Link to="/resume-builder" className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                            <span className="text-2xl">📄</span>
                                            <span className="text-white text-sm">Build Resume</span>
                                        </Link>
                                        <Link to="/resume-analyzer" className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                            <span className="text-2xl">📊</span>
                                            <span className="text-white text-sm">Analyze Resume</span>
                                        </Link>
                                        <Link to="/chatbot" className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                                            <span className="text-2xl">🤖</span>
                                            <span className="text-white text-sm">AI Assistant</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Recent Applications */}
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-white">Recent Applications</h3>
                                        <button onClick={() => setActiveTab('applications')} className="text-purple-400 hover:text-purple-300 text-sm">
                                            View All →
                                        </button>
                                    </div>
                                    {applications.length === 0 ? (
                                        <div className="text-center py-8">
                                            <span className="text-4xl mb-3 block">📋</span>
                                            <p className="text-gray-400">No applications yet</p>
                                            <Link to="/jobs" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">
                                                Start applying →
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {applications.slice(0, 5).map(app => (
                                                <div key={app.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-white font-medium truncate">{app.title}</p>
                                                        <p className="text-gray-400 text-sm truncate">{app.company}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 ${STATUS_LABELS[app.status]?.color || 'bg-gray-500'} text-white text-xs rounded-full`}>
                                                        {STATUS_LABELS[app.status]?.label || app.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Applications Tab */}
                        {activeTab === 'applications' && (
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4">My Applications ({applications.length})</h3>
                                {applications.length === 0 ? (
                                    <div className="text-center py-12">
                                        <span className="text-5xl mb-4 block">📋</span>
                                        <p className="text-gray-400 mb-2">No applications tracked yet</p>
                                        <Link to="/jobs" className="text-purple-400 hover:text-purple-300">
                                            Find jobs to apply →
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {applications.map(app => (
                                            <div key={app.id} className="bg-white/5 rounded-lg p-4">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="text-white font-medium">{app.title}</h4>
                                                        <p className="text-gray-400 text-sm">{app.company} • {app.location}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            value={app.status}
                                                            onChange={(e) => handleStatusUpdate(app.id.split('_')[1], e.target.value)}
                                                            className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none"
                                                        >
                                                            {Object.entries(STATUS_LABELS).map(([key, val]) => (
                                                                <option key={key} value={key} className="bg-gray-800">{val.icon} {val.label}</option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            onClick={() => handleDeleteApplication(app.id.split('_')[1])}
                                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Saved Jobs Tab */}
                        {activeTab === 'saved' && (
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4">Saved Jobs ({savedJobs.length})</h3>
                                {savedJobs.length === 0 ? (
                                    <div className="text-center py-12">
                                        <span className="text-5xl mb-4 block">💾</span>
                                        <p className="text-gray-400 mb-2">No saved jobs yet</p>
                                        <Link to="/jobs" className="text-purple-400 hover:text-purple-300">
                                            Browse jobs to save →
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {savedJobs.map(job => (
                                            <div key={job.id} className="bg-white/5 rounded-lg p-4">
                                                <h4 className="text-white font-medium mb-1">{job.title}</h4>
                                                <p className="text-gray-400 text-sm mb-2">{job.company} • {job.location}</p>
                                                <p className="text-emerald-400 text-sm mb-3">{job.salary}</p>
                                                <div className="flex gap-2">
                                                    <a
                                                        href={job.applyUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white text-center text-sm rounded-lg transition-colors"
                                                    >
                                                        Apply Now
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-6">Profile Settings</h3>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">{user?.displayName || 'User'}</h4>
                                        <p className="text-gray-400 text-sm">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-white/5 rounded-lg">
                                        <p className="text-gray-400 text-sm mb-1">Email</p>
                                        <p className="text-white">{user?.email}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg">
                                        <p className="text-gray-400 text-sm mb-1">Member Since</p>
                                        <p className="text-white">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-lg transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};

export default DashboardPage;
