import React from 'react';

const FeaturesSection = () => {
    const beforeFeatures = [
        {
            icon: '❌',
            title: 'Rejection',
            description: 'Generic resumes get filtered by ATS systems',
            color: 'red'
        },
        {
            icon: '⏰',
            title: 'Time Wasted',
            description: 'Hours spent on manual job applications',
            color: 'orange'
        },
        {
            icon: '🔌',
            title: 'Fragmented Tools',
            description: 'Juggling between multiple platforms',
            color: 'yellow'
        }
    ];

    const afterFeatures = [
        {
            icon: '✅',
            title: 'No More Rejections',
            description: 'AI-optimized resumes that pass ATS',
            color: 'green'
        },
        {
            icon: '⚡',
            title: 'Save Time',
            description: 'Auto-fill applications in seconds',
            color: 'cyan'
        },
        {
            icon: '🎯',
            title: 'All-in-One Solution',
            description: 'Everything you need in one platform',
            color: 'purple'
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Say goodbye to job search{' '}
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">frustration</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Transform your job search experience with AI-powered tools that actually work
                    </p>
                </div>

                {/* Comparison Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Before - Without JobFlow */}
                    <div className="relative">
                        <div className="absolute -top-4 left-4 px-4 py-1 bg-red-100 text-red-700 font-semibold rounded-full text-sm">
                            Without JobFlow.ai
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
                            <div className="space-y-6">
                                {beforeFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 bg-white/80 rounded-2xl border border-red-100 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="text-3xl">{feature.icon}</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-1">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Sad Face Illustration */}
                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full text-5xl">
                                    😞
                                </div>
                                <p className="mt-3 text-gray-500 font-medium">Struggling to stand out</p>
                            </div>
                        </div>
                    </div>

                    {/* After - With JobFlow */}
                    <div className="relative">
                        <div className="absolute -top-4 left-4 px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-full text-sm">
                            With JobFlow.ai ✨
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-3xl p-8 border border-green-100">
                            <div className="space-y-6">
                                {afterFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 bg-white/80 rounded-2xl border border-green-100 hover:shadow-lg hover:shadow-green-100 transition-shadow"
                                    >
                                        <div className="text-3xl">{feature.icon}</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-1">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Happy Face Illustration */}
                            <div className="mt-8 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full text-5xl shadow-lg shadow-green-200">
                                    🎉
                                </div>
                                <p className="mt-3 text-gray-700 font-medium">Landing dream jobs</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Arrow in the middle for large screens */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
