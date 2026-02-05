import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResumeBuilderPage = () => {
    const { isAuthenticated } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedIn: '',
        portfolio: '',
        summary: '',
        experience: [{ company: '', title: '', duration: '', description: '' }],
        education: [{ school: '', degree: '', year: '' }],
        skills: '',
    });

    const templates = [
        { id: 1, name: 'Modern', color: 'from-blue-500 to-cyan-500', icon: '💼', description: 'Clean and professional' },
        { id: 2, name: 'Creative', color: 'from-purple-500 to-pink-500', icon: '🎨', description: 'Stand out from the crowd' },
        { id: 3, name: 'Minimal', color: 'from-gray-600 to-gray-800', icon: '✨', description: 'Simple and elegant' },
        { id: 4, name: 'Executive', color: 'from-emerald-500 to-teal-500', icon: '👔', description: 'For senior roles' },
    ];

    const steps = [
        { id: 1, name: 'Template', icon: '🎨' },
        { id: 2, name: 'Personal', icon: '👤' },
        { id: 3, name: 'Experience', icon: '💼' },
        { id: 4, name: 'Education', icon: '🎓' },
        { id: 5, name: 'Skills', icon: '⚡' },
        { id: 6, name: 'Preview', icon: '👁️' },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experience: [...prev.experience, { company: '', title: '', duration: '', description: '' }]
        }));
    };

    const updateExperience = (index, field, value) => {
        const updated = [...formData.experience];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, experience: updated }));
    };

    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { school: '', degree: '', year: '' }]
        }));
    };

    const updateEducation = (index, field, value) => {
        const updated = [...formData.education];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, education: updated }));
    };

    return (
        <main className="pt-16 md:pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        AI Resume Builder ✨
                    </h1>
                    <p className="text-gray-400">Create a professional resume in minutes</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex justify-center gap-2 min-w-max px-4">
                        {steps.map((step, index) => (
                            <button
                                key={step.id}
                                onClick={() => setCurrentStep(step.id)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-medium text-sm transition-all ${currentStep === step.id
                                        ? 'bg-white text-gray-900'
                                        : currentStep > step.id
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-white/10 text-gray-400'
                                    }`}
                            >
                                <span>{step.icon}</span>
                                <span className="hidden sm:inline">{step.name}</span>
                                {currentStep > step.id && <span>✓</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10">
                    {/* Step 1: Template Selection */}
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Choose a Template</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {templates.map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`p-4 rounded-xl border-2 transition-all ${selectedTemplate === template.id
                                                ? 'border-white bg-white/20'
                                                : 'border-white/10 hover:border-white/30 bg-white/5'
                                            }`}
                                    >
                                        <div className={`w-full aspect-[3/4] bg-gradient-to-br ${template.color} rounded-lg mb-3 flex items-center justify-center text-4xl`}>
                                            {template.icon}
                                        </div>
                                        <p className="text-white font-medium">{template.name}</p>
                                        <p className="text-gray-400 text-sm">{template.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Personal Info */}
                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Email *</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Phone *</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="+91 9876543210"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        placeholder="Mumbai, India"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">LinkedIn</label>
                                    <input
                                        type="url"
                                        value={formData.linkedIn}
                                        onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                                        placeholder="linkedin.com/in/johndoe"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Portfolio</label>
                                    <input
                                        type="url"
                                        value={formData.portfolio}
                                        onChange={(e) => handleInputChange('portfolio', e.target.value)}
                                        placeholder="johndoe.com"
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-300 text-sm mb-2">Professional Summary</label>
                                    <textarea
                                        value={formData.summary}
                                        onChange={(e) => handleInputChange('summary', e.target.value)}
                                        placeholder="Brief overview of your professional background..."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Experience */}
                    {currentStep === 3 && (
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Work Experience</h2>
                            <div className="space-y-6">
                                {formData.experience.map((exp, index) => (
                                    <div key={index} className="p-4 bg-white/5 rounded-lg space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Experience {index + 1}</span>
                                            {index > 0 && (
                                                <button
                                                    onClick={() => setFormData(prev => ({
                                                        ...prev,
                                                        experience: prev.experience.filter((_, i) => i !== index)
                                                    }))}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                                placeholder="Company Name"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                            <input
                                                type="text"
                                                value={exp.title}
                                                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                                placeholder="Job Title"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                            <input
                                                type="text"
                                                value={exp.duration}
                                                onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                                                placeholder="Jan 2020 - Present"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                            <textarea
                                                value={exp.description}
                                                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                                placeholder="Key responsibilities and achievements..."
                                                rows={2}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 md:col-span-2"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={addExperience}
                                    className="w-full py-3 border-2 border-dashed border-white/30 text-white/70 hover:text-white hover:border-white/50 rounded-lg transition-colors"
                                >
                                    + Add Another Experience
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Education */}
                    {currentStep === 4 && (
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Education</h2>
                            <div className="space-y-6">
                                {formData.education.map((edu, index) => (
                                    <div key={index} className="p-4 bg-white/5 rounded-lg space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Education {index + 1}</span>
                                            {index > 0 && (
                                                <button
                                                    onClick={() => setFormData(prev => ({
                                                        ...prev,
                                                        education: prev.education.filter((_, i) => i !== index)
                                                    }))}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                value={edu.school}
                                                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                                placeholder="University/School Name"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                            <input
                                                type="text"
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                                placeholder="Degree & Major"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                            <input
                                                type="text"
                                                value={edu.year}
                                                onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                                placeholder="2020"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={addEducation}
                                    className="w-full py-3 border-2 border-dashed border-white/30 text-white/70 hover:text-white hover:border-white/50 rounded-lg transition-colors"
                                >
                                    + Add Another Education
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Skills */}
                    {currentStep === 5 && (
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Skills</h2>
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Enter your skills (comma-separated)
                                </label>
                                <textarea
                                    value={formData.skills}
                                    onChange={(e) => handleInputChange('skills', e.target.value)}
                                    placeholder="React, Node.js, Python, SQL, AWS, Git, Agile..."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                />
                                <p className="text-gray-500 text-sm mt-2">
                                    💡 Tip: Include both technical and soft skills relevant to your target role
                                </p>
                            </div>
                            {formData.skills && (
                                <div className="mt-4">
                                    <p className="text-gray-400 text-sm mb-2">Preview:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.skills.split(',').map((skill, index) => (
                                            skill.trim() && (
                                                <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                                                    {skill.trim()}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 6: Preview */}
                    {currentStep === 6 && (
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6">Resume Preview</h2>
                            <div className="bg-white rounded-lg p-6 sm:p-8 text-gray-800 max-w-2xl mx-auto">
                                {/* Preview Header */}
                                <div className="text-center border-b pb-4 mb-4">
                                    <h1 className="text-2xl font-bold text-gray-900">{formData.fullName || 'Your Name'}</h1>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {formData.email} {formData.phone && `• ${formData.phone}`} {formData.location && `• ${formData.location}`}
                                    </p>
                                    <div className="flex justify-center gap-3 mt-2 text-sm text-blue-600">
                                        {formData.linkedIn && <span>LinkedIn</span>}
                                        {formData.portfolio && <span>Portfolio</span>}
                                    </div>
                                </div>

                                {/* Summary */}
                                {formData.summary && (
                                    <div className="mb-4">
                                        <h2 className="font-bold text-gray-900 mb-2">Summary</h2>
                                        <p className="text-gray-700 text-sm">{formData.summary}</p>
                                    </div>
                                )}

                                {/* Experience */}
                                {formData.experience.some(e => e.company) && (
                                    <div className="mb-4">
                                        <h2 className="font-bold text-gray-900 mb-2">Experience</h2>
                                        {formData.experience.map((exp, index) => (
                                            exp.company && (
                                                <div key={index} className="mb-3">
                                                    <div className="flex justify-between">
                                                        <p className="font-medium">{exp.title} at {exp.company}</p>
                                                        <p className="text-gray-500 text-sm">{exp.duration}</p>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">{exp.description}</p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}

                                {/* Education */}
                                {formData.education.some(e => e.school) && (
                                    <div className="mb-4">
                                        <h2 className="font-bold text-gray-900 mb-2">Education</h2>
                                        {formData.education.map((edu, index) => (
                                            edu.school && (
                                                <div key={index} className="flex justify-between mb-2">
                                                    <p>{edu.degree} - {edu.school}</p>
                                                    <p className="text-gray-500 text-sm">{edu.year}</p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}

                                {/* Skills */}
                                {formData.skills && (
                                    <div>
                                        <h2 className="font-bold text-gray-900 mb-2">Skills</h2>
                                        <p className="text-gray-700 text-sm">{formData.skills}</p>
                                    </div>
                                )}
                            </div>

                            {/* Download Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                                    📥 Download PDF
                                </button>
                                <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20">
                                    📄 Download DOCX
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                        <button
                            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                            disabled={currentStep === 1}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${currentStep === 1
                                    ? 'bg-gray-600/50 text-gray-500 cursor-not-allowed'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            ← Back
                        </button>
                        <button
                            onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                            disabled={currentStep === 6}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${currentStep === 6
                                    ? 'bg-gray-600/50 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700'
                                }`}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ResumeBuilderPage;
