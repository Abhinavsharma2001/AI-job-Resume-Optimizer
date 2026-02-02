import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            name: 'Rahul Sharma',
            role: 'Software Engineer at Google',
            image: null,
            avatar: '👨‍💻',
            quote: 'JobFlow.ai completely transformed my job search. The AI resume builder helped me land interviews at top tech companies. I went from getting no responses to 5 interview calls in just 2 weeks!',
            rating: 5
        },
        {
            name: 'Priya Patel',
            role: 'Product Manager at Microsoft',
            image: null,
            avatar: '👩‍💼',
            quote: 'The ATS score checker was a game-changer. I had no idea my resume was being filtered out. After optimizing with JobFlow, my application response rate increased by 300%!',
            rating: 5
        },
        {
            name: 'Arjun Verma',
            role: 'Data Scientist at Amazon',
            image: null,
            avatar: '👨‍🔬',
            quote: 'I love how the AI chatbot helped me prepare for technical interviews. It\'s like having a career coach available 24/7. Highly recommend to all job seekers!',
            rating: 5
        },
        {
            name: 'Sneha Reddy',
            role: 'Frontend Developer at Flipkart',
            image: null,
            avatar: '👩‍💻',
            quote: 'Creating a professional resume used to take me hours. With JobFlow\'s AI builder, I created a stunning resume in just 15 minutes. The job matching feature is incredibly accurate!',
            rating: 5
        },
        {
            name: 'Karan Singh',
            role: 'DevOps Engineer at Atlassian',
            image: null,
            avatar: '🧑‍💻',
            quote: 'Best investment I made for my career. The platform helped me understand what recruiters are looking for. Landed my dream job within a month of using JobFlow!',
            rating: 5
        }
    ];

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-sm mb-4">
                        SUCCESS STORIES
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Hear from our{' '}
                        <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            community
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of job seekers who have transformed their careers with JobFlow.ai
                    </p>
                </div>

                {/* Featured Testimonial */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
                        {/* Quote Icon */}
                        <div className="absolute top-6 right-8 text-6xl text-blue-200 font-serif">"</div>

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-xl md:text-2xl text-gray-800 font-medium mb-8 leading-relaxed">
                                "{testimonials[activeIndex].quote}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl">
                                    {testimonials[activeIndex].avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">{testimonials[activeIndex].name}</p>
                                    <p className="text-gray-600">{testimonials[activeIndex].role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mb-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'bg-blue-500 w-8'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>

                {/* All Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${index === activeIndex ? 'ring-2 ring-blue-500' : ''
                                }`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* Rating */}
                            <div className="flex gap-0.5 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
