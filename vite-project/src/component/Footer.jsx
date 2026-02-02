import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const footerLinks = {
        Product: [
            { name: 'AI Resume Builder', path: '/resume-builder' },
            { name: 'Resume Analyzer', path: '/resume-analyzer' },
            { name: 'Job Search', path: '/jobs' },
            { name: 'AI Chatbot', path: '/chatbot' },
        ],
        Resources: [
            { name: 'Career Blog', path: '#' },
            { name: 'Resume Templates', path: '/resume-builder' },
            { name: 'Interview Tips', path: '#' },
            { name: 'Salary Guide', path: '#' },
        ],
        Company: [
            { name: 'About Us', path: '#' },
            { name: 'Careers', path: '#' },
            { name: 'Contact', path: '#' },
            { name: 'Press', path: '#' },
        ],
        Legal: [
            { name: 'Privacy Policy', path: '#' },
            { name: 'Terms of Service', path: '#' },
            { name: 'Cookie Policy', path: '#' },
        ]
    };

    const socialLinks = [
        { name: 'Twitter', icon: '𝕏', url: '#' },
        { name: 'LinkedIn', icon: 'in', url: '#' },
        { name: 'GitHub', icon: '⌘', url: '#' },
        { name: 'YouTube', icon: '▶', url: '#' },
    ];

    return (
        <footer className="bg-slate-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl font-bold">J</span>
                            </div>
                            <span className="text-xl font-bold text-white">
                                JobFlow<span className="text-blue-400">.ai</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-xs">
                            AI-powered job search platform helping millions land their dream jobs without the stress.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-lg flex items-center justify-center transition-all"
                                    aria-label={social.name}
                                >
                                    <span className="text-white font-bold text-sm">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-white mb-4">{category}</h3>
                            <ul className="space-y-3">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-400 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="mt-12 pt-12 border-t border-white/10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Stay updated</h3>
                            <p className="text-gray-400 text-sm">Get the latest career tips and job search strategies.</p>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                            />
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>© {new Date().getFullYear()} JobFlow.ai. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
                            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
                            <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
