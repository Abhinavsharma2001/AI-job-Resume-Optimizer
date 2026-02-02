import React from 'react';
import JobResumeBuilder from '../component/JobResumeBuilder';

const ResumeBuilderPage = () => {
    return (
        <main className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Page Header */}
            <div className="bg-gradient-to-b from-slate-800/50 to-transparent py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full mb-4">
                        ✨ AI-POWERED
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        AI Resume Builder
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Create a job-winning resume tailored to your target role. Our AI analyzes job requirements
                        and helps you build a resume that passes ATS systems and impresses recruiters.
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {['ATS-Optimized', 'Job-Tailored', 'One-Click PDF', 'Skill Suggestions'].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Resume Builder Component */}
            <JobResumeBuilder />
        </main>
    );
};

export default ResumeBuilderPage;
