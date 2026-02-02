import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            number: '01',
            icon: '📤',
            title: 'Upload Your Resume',
            description: 'Start by uploading your existing resume or create one from scratch with our AI builder.',
            color: 'blue'
        },
        {
            number: '02',
            icon: '🤖',
            title: 'AI Analyzes & Enhances',
            description: 'Our AI scans your resume, checks ATS compatibility, and suggests powerful improvements.',
            color: 'purple'
        },
        {
            number: '03',
            icon: '🎯',
            title: 'Apply to Matched Jobs',
            description: 'Get matched with relevant jobs and apply with your optimized resume in one click.',
            color: 'green'
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-white/10 text-purple-300 font-semibold rounded-full text-sm mb-4 backdrop-blur-sm">
                        HOW IT WORKS
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Get hired in{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            3 simple steps
                        </span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Our AI-powered platform makes job hunting effortless and effective
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {/* Connection line for large screens */}
                    <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-30"></div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Step Card */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
                                {/* Step Number */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                                        {step.number}
                                    </span>
                                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                                            step.color === 'purple' ? 'from-purple-500 to-pink-500' :
                                                'from-green-500 to-emerald-500'
                                        } rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform`}>
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Arrow for large screens */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2 z-10">
                                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all transform hover:scale-105"
                    >
                        <span>Start Your Journey</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
