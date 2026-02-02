import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Floating shapes */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-white font-medium text-sm">Join 1M+ job seekers today</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Take Control of Your{' '}
                    <br className="hidden sm:block" />
                    <span className="underline decoration-4 decoration-yellow-400 underline-offset-8">Job Search</span> Today
                </h2>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                    Stop applying blindly. Let AI optimize your resume and match you with the perfect opportunities.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                    <Link
                        to="/signup"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full shadow-2xl hover:shadow-white/25 transition-all transform hover:scale-105"
                    >
                        <span>Sign Up FOR FREE</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <Link
                        to="/resume-builder"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all"
                    >
                        <span>Try Resume Builder</span>
                    </Link>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
                    {[
                        { value: '1M+', label: 'Users Helped' },
                        { value: '98%', label: 'Success Rate' },
                        { value: '500K+', label: 'Resumes Built' },
                        { value: '4.9/5', label: 'User Rating' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Trust Logos */}
                <div className="mt-16 pt-16 border-t border-white/20">
                    <p className="text-white/60 text-sm mb-6">TRUSTED BY PROFESSIONALS AT</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company, index) => (
                            <div
                                key={index}
                                className="text-white/40 hover:text-white/80 transition-colors font-bold text-lg md:text-xl"
                            >
                                {company}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
