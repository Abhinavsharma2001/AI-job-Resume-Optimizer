import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const { user, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { name: 'AI Resume Builder', path: '/resume-builder' },
        {
            name: 'Features',
            dropdown: [
                { name: 'Resume Analyzer', path: '/resume-analyzer', icon: '📊' },
                { name: 'ATS Score Checker', path: '/resume-analyzer', icon: '✅' },
                { name: 'AI Chatbot', path: '/chatbot', icon: '🤖' },
                { name: 'Job Matching', path: '/jobs', icon: '🎯' },
            ]
        },
        { name: 'Jobs', path: '/jobs' },
        {
            name: 'Resources',
            dropdown: [
                { name: 'Career Tips', path: '#', icon: '💡' },
                { name: 'Interview Guide', path: '#', icon: '📝' },
                { name: 'Salary Calculator', path: '#', icon: '💰' },
            ]
        },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
                : 'bg-white/80 backdrop-blur-sm'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                            <span className="text-white text-xl font-bold">J</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            JobFlow<span className="text-blue-500">.ai</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {link.dropdown ? (
                                    <>
                                        <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-gray-50">
                                            {link.name}
                                            <svg className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${activeDropdown === index
                                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                                : 'opacity-0 -translate-y-2 pointer-events-none'
                                            }`}>
                                            <div className="py-2">
                                                {link.dropdown.map((item, dropIndex) => (
                                                    <Link
                                                        key={dropIndex}
                                                        to={item.path}
                                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors"
                                                    >
                                                        <span className="text-xl">{item.icon}</span>
                                                        <span className="text-gray-700 font-medium">{item.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`px-4 py-2 font-medium rounded-lg transition-colors ${location.pathname === link.path
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                        {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm max-w-[120px] truncate">
                                        {user?.displayName || user?.email?.split('@')[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2.5 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                                >
                                    LOG IN
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform hover:scale-105"
                                >
                                    SIGN UP
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                }`}>
                <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <nav className="px-4 py-4 space-y-1">
                        {navLinks.map((link, index) => (
                            <div key={index}>
                                {link.dropdown ? (
                                    <div className="mb-2">
                                        <div className="px-4 py-2 text-gray-500 font-medium text-sm uppercase tracking-wider">
                                            {link.name}
                                        </div>
                                        {link.dropdown.map((item, dropIndex) => (
                                            <Link
                                                key={dropIndex}
                                                to={item.path}
                                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="font-medium">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`block px-4 py-3 rounded-lg font-medium ${location.pathname === link.path
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Auth */}
                    <div className="px-4 py-4 border-t border-gray-200">
                        {isAuthenticated ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 px-4 py-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                                        {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{user?.displayName || 'User'}</p>
                                        <p className="text-sm text-gray-500">{user?.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    to="/login"
                                    className="flex-1 py-3 text-center text-blue-600 font-semibold border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                                >
                                    LOG IN
                                </Link>
                                <Link
                                    to="/signup"
                                    className="flex-1 py-3 text-center text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                >
                                    SIGN UP
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
