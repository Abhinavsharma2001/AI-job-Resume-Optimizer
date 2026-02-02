import React from 'react';
import HeroSection from '../component/HeroSection';
import FeaturesSection from '../component/FeaturesSection';
import AIToolsShowcase from '../component/AIToolsShowcase';
import HowItWorks from '../component/HowItWorks';
import TestimonialsSection from '../component/TestimonialsSection';
import CTASection from '../component/CTASection';

const HomePage = () => {
    return (
        <main className="pt-16 md:pt-20">
            <HeroSection />
            <FeaturesSection />
            <AIToolsShowcase />
            <HowItWorks />
            <TestimonialsSection />
            <CTASection />
        </main>
    );
};

export default HomePage;
