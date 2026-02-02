import React, { useState } from 'react';
import ResumeAnalyzer from '../component/ResumeAnalyzer';

const ResumeAnalyzerPage = () => {
    const [analyzedData, setAnalyzedData] = useState(null);

    return (
        <main className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Page Header */}
            <div className="bg-gradient-to-b from-slate-800/50 to-transparent py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-full mb-4">
                        📊 ATS SCORE CHECKER
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Resume Analyzer
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Upload your resume and get an instant ATS compatibility score. Our AI provides
                        actionable suggestions to improve your resume and increase interview callbacks.
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {['ATS Score Analysis', 'Keyword Detection', 'Improvement Tips', 'Job Matching'].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Analyzer Section */}
            <section className="px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <ResumeAnalyzer
                        onExtractedData={setAnalyzedData}
                        formData={analyzedData}
                    />
                </div>
            </section>

            {/* How It Works */}
            <section className="px-4 py-12 border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
                        How the ATS Score Works
                    </h2>

                    <div className="grid md:grid-cols-5 gap-6 text-center">
                        {[
                            { label: 'Keywords', points: '30', icon: '🔍', desc: 'Technical skills & job-relevant terms' },
                            { label: 'Sections', points: '25', icon: '📋', desc: 'Summary, Skills, Experience, Education' },
                            { label: 'Action Verbs', points: '15', icon: '⚡', desc: 'Strong action words like "developed"' },
                            { label: 'Formatting', points: '15', icon: '📐', desc: 'Proper length & structure' },
                            { label: 'Contact Info', points: '15', icon: '📧', desc: 'Email, Phone, LinkedIn, GitHub' }
                        ].map((item, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="text-2xl font-bold text-white mb-1">{item.points}</div>
                                <div className="text-purple-300 font-medium text-sm mb-2">{item.label}</div>
                                <div className="text-gray-400 text-xs">{item.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* Score Legend */}
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { range: '81-100', label: 'Excellent', color: 'bg-emerald-500', desc: 'ATS-optimized' },
                            { range: '61-80', label: 'Good', color: 'bg-yellow-500', desc: 'Minor tweaks needed' },
                            { range: '41-60', label: 'Fair', color: 'bg-orange-500', desc: 'Improvements needed' },
                            { range: '0-40', label: 'Needs Work', color: 'bg-red-500', desc: 'Major improvements' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg p-3">
                                <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                                <div>
                                    <div className="text-white font-medium">{item.range}</div>
                                    <div className="text-gray-400 text-xs">{item.label} - {item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ResumeAnalyzerPage;
