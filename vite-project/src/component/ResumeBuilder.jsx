import React, { useState, useRef } from 'react';
import ResumeAnalyzer from './ResumeAnalyzer';

const ResumeBuilder = () => {
    const [step, setStep] = useState(1);
    const [showPreview, setShowPreview] = useState(false);
    const resumeRef = useRef(null);

    const [formData, setFormData] = useState({
        // Personal Info
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        portfolio: '',
        location: '',

        // Professional Summary
        summary: '',
        targetRole: '',

        // Education
        education: [{
            degree: '',
            field: '',
            university: '',
            graduationYear: '',
            gpa: '',
            coursework: ''
        }],

        // Skills
        technicalSkills: '',
        softSkills: '',
        tools: '',

        // Experience
        experience: [{
            company: '',
            role: '',
            duration: '',
            description: '',
            achievements: ''
        }],

        // Projects
        projects: [{
            name: '',
            description: '',
            technologies: '',
            link: '',
            impact: ''
        }],

        // Achievements
        achievements: '',
        certifications: '',
        languages: '',
        hobbies: ''
    });

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateArrayField = (arrayName, index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addArrayItem = (arrayName, template) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], template]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    // Handle data extracted from uploaded resume
    const handleExtractedData = (data) => {
        setFormData(prev => ({
            ...prev,
            fullName: data.fullName || prev.fullName,
            email: data.email || prev.email,
            phone: data.phone || prev.phone,
            linkedin: data.linkedin || prev.linkedin,
            github: data.github || prev.github,
            summary: data.summary || prev.summary,
            targetRole: data.targetRole || prev.targetRole,
            technicalSkills: data.technicalSkills || prev.technicalSkills,
            softSkills: data.softSkills || prev.softSkills,
            tools: data.tools || prev.tools,
            certifications: data.certifications || prev.certifications,
            achievements: data.achievements || prev.achievements,
            education: data.education && data.education.length > 0 && data.education[0].degree
                ? data.education
                : prev.education,
            projects: data.projects && data.projects.length > 0 && data.projects[0].name
                ? data.projects
                : prev.projects,
            experience: data.experience && data.experience.length > 0 && (data.experience[0].company || data.experience[0].role)
                ? data.experience
                : prev.experience,
        }));

        // Show notification
        alert('✅ Resume data imported successfully! Check the form below and fill in any missing details.');
    };

    const handlePrint = () => {
        const printContent = resumeRef.current;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${formData.fullName || 'Resume'} - Resume</title>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
                        .resume-container { max-width: 800px; margin: 0 auto; }
                        h1 { color: #1e3a5f; margin-bottom: 5px; }
                        h2 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 5px; margin-top: 20px; font-size: 16px; }
                        h3 { margin: 10px 0 5px; font-size: 14px; }
                        p, li { font-size: 12px; line-height: 1.5; }
                        .contact-info { font-size: 12px; color: #666; }
                        .summary { background: #f8fafc; padding: 10px; border-left: 3px solid #2563eb; margin: 15px 0; }
                        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                        .skill-category { background: #f1f5f9; padding: 8px; border-radius: 5px; }
                        ul { padding-left: 20px; margin: 5px 0; }
                        .experience-item, .project-item, .education-item { margin-bottom: 15px; }
                        .date { color: #666; font-size: 11px; }
                        @media print { body { padding: 0; } }
                    </style>
                </head>
                <body>
                    ${printContent.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 250);
    };

    // AI-Powered Generation State
    const [isGenerating, setIsGenerating] = useState(false);

    // AI Generate Professional Summary
    const generateAISummary = () => {
        setIsGenerating(true);

        const role = formData.targetRole || 'Software Developer';
        const skills = formData.technicalSkills || 'programming';
        const edu = formData.education[0];

        const summaryTemplates = [
            `Results-driven ${role} with a strong foundation in ${skills.split(',')[0]?.trim() || 'technology'}. ${edu.degree ? `Holding a ${edu.degree} in ${edu.field || 'Computer Science'}` : 'Recent graduate'} with hands-on experience in building scalable solutions. Passionate about leveraging technology to solve complex problems and deliver exceptional user experiences. Seeking to contribute technical expertise and innovative thinking to a dynamic team.`,
            `Motivated and detail-oriented ${role} with expertise in ${skills.split(',').slice(0, 2).join(' and ').trim() || 'modern technologies'}. Proven ability to develop efficient, user-centric solutions while collaborating effectively in agile environments. Strong analytical skills combined with a passion for continuous learning make me a valuable asset to any development team.`,
            `Aspiring ${role} with solid knowledge of ${skills.split(',')[0]?.trim() || 'software development'}. ${edu.university ? `Educated at ${edu.university}` : 'Recent graduate'} with a track record of delivering quality projects. Eager to apply technical skills and creative problem-solving abilities in a challenging role that offers growth opportunities.`
        ];

        setTimeout(() => {
            const randomSummary = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];
            updateField('summary', randomSummary);
            setIsGenerating(false);
        }, 1500);
    };

    // AI Suggest Skills based on Target Role
    const generateAISkills = () => {
        setIsGenerating(true);

        const role = (formData.targetRole || '').toLowerCase();

        let techSkills = 'JavaScript, Python, SQL, Git, REST APIs';
        let tools = 'VS Code, GitHub, Postman, Jira';
        let softSkills = 'Problem-solving, Communication, Team Collaboration, Time Management, Adaptability';

        if (role.includes('frontend') || role.includes('react') || role.includes('web')) {
            techSkills = 'JavaScript, TypeScript, React.js, HTML5, CSS3, Redux, Next.js, Tailwind CSS, REST APIs, GraphQL';
            tools = 'VS Code, Git, GitHub, npm, Webpack, Figma, Chrome DevTools, Vercel';
        } else if (role.includes('backend') || role.includes('node') || role.includes('java')) {
            techSkills = 'Node.js, Python, Java, Express.js, MongoDB, PostgreSQL, REST APIs, GraphQL, Docker, AWS';
            tools = 'VS Code, Git, Postman, Docker, AWS Console, MongoDB Compass, pgAdmin';
        } else if (role.includes('fullstack') || role.includes('full stack')) {
            techSkills = 'JavaScript, TypeScript, React.js, Node.js, Express.js, MongoDB, PostgreSQL, REST APIs, GraphQL, Docker';
            tools = 'VS Code, Git, GitHub, Postman, Docker, AWS, MongoDB Compass, Figma';
        } else if (role.includes('data') || role.includes('analyst') || role.includes('science')) {
            techSkills = 'Python, SQL, Pandas, NumPy, Matplotlib, Scikit-learn, TensorFlow, Tableau, Excel, Statistics';
            tools = 'Jupyter Notebook, VS Code, Tableau, Power BI, Google Colab, Excel, BigQuery';
        } else if (role.includes('mobile') || role.includes('android') || role.includes('ios')) {
            techSkills = 'React Native, Flutter, Dart, Swift, Kotlin, Firebase, REST APIs, SQLite, Redux';
            tools = 'Android Studio, Xcode, VS Code, Figma, Firebase Console, Postman';
        } else if (role.includes('devops') || role.includes('cloud')) {
            techSkills = 'Docker, Kubernetes, AWS, Azure, CI/CD, Terraform, Linux, Python, Bash, Jenkins';
            tools = 'Docker Desktop, AWS Console, Terraform, Jenkins, GitHub Actions, Prometheus, Grafana';
        } else if (role.includes('design') || role.includes('ui') || role.includes('ux')) {
            techSkills = 'UI/UX Design, Wireframing, Prototyping, User Research, Design Systems, HTML, CSS, Figma';
            tools = 'Figma, Adobe XD, Sketch, InVision, Miro, Notion, Zeplin';
            softSkills = 'Creativity, Empathy, User Advocacy, Attention to Detail, Collaboration, Presentation Skills';
        }

        setTimeout(() => {
            updateField('technicalSkills', techSkills);
            updateField('tools', tools);
            updateField('softSkills', softSkills);
            setIsGenerating(false);
        }, 1500);
    };

    // AI Enhance Project Description
    const enhanceProjectDescription = (index) => {
        setIsGenerating(true);
        const project = formData.projects[index];

        if (!project.name || !project.technologies) {
            setIsGenerating(false);
            return;
        }

        const enhancedDesc = `Developed ${project.name}, a ${project.technologies.split(',')[0]?.trim()}-based application that ${project.description || 'solves user problems efficiently'}. Implemented features using ${project.technologies} with focus on performance optimization, clean code architecture, and responsive design. ${project.impact ? `Achieved measurable results: ${project.impact}.` : 'Resulted in improved user experience and system reliability.'}`;

        setTimeout(() => {
            updateArrayField('projects', index, 'description', enhancedDesc);
            setIsGenerating(false);
        }, 1200);
    };

    // AI Enhance Experience Description
    const enhanceExperienceDescription = (index) => {
        setIsGenerating(true);
        const exp = formData.experience[index];

        if (!exp.role || !exp.company) {
            setIsGenerating(false);
            return;
        }

        const enhancedDesc = `Served as ${exp.role} at ${exp.company}, contributing to key initiatives and delivering impactful solutions. Collaborated with cross-functional teams to develop and implement technical solutions, ensuring high-quality deliverables within deadlines.`;

        const enhancedAchievements = `Improved team productivity by streamlining development workflows, Successfully delivered projects on time meeting all technical requirements, Received positive feedback from stakeholders for quality of work`;

        setTimeout(() => {
            updateArrayField('experience', index, 'description', enhancedDesc);
            updateArrayField('experience', index, 'achievements', enhancedAchievements);
            setIsGenerating(false);
        }, 1200);
    };

    const totalSteps = 6;

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">👤 Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                value={formData.fullName}
                                onChange={(e) => updateField('fullName', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="email"
                                placeholder="Email *"
                                value={formData.email}
                                onChange={(e) => updateField('email', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Location (City, Country)"
                                value={formData.location}
                                onChange={(e) => updateField('location', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="url"
                                placeholder="LinkedIn URL"
                                value={formData.linkedin}
                                onChange={(e) => updateField('linkedin', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="url"
                                placeholder="GitHub URL"
                                value={formData.github}
                                onChange={(e) => updateField('github', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="url"
                                placeholder="Portfolio URL"
                                value={formData.portfolio}
                                onChange={(e) => updateField('portfolio', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
                            />
                        </div>

                        <div className="mt-6">
                            <h4 className="text-lg font-semibold text-white mb-3">🎯 Target Role & Summary</h4>
                            <input
                                type="text"
                                placeholder="Target Job Title (e.g., Frontend Developer, Data Analyst)"
                                value={formData.targetRole}
                                onChange={(e) => updateField('targetRole', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                            />
                            <textarea
                                placeholder="Professional Summary (2-3 sentences about your background, skills, and career goals)"
                                value={formData.summary}
                                onChange={(e) => updateField('summary', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={generateAISummary}
                                disabled={isGenerating}
                                className="mt-3 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <span className="animate-spin">⚙️</span> Generating...
                                    </>
                                ) : (
                                    <>✨ AI Generate Summary</>
                                )}
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">🎓 Education</h3>
                        {formData.education.map((edu, index) => (
                            <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-purple-300 font-medium">Education {index + 1}</span>
                                    {formData.education.length > 1 && (
                                        <button
                                            onClick={() => removeArrayItem('education', index)}
                                            className="text-red-400 hover:text-red-300 text-sm"
                                        >
                                            ✕ Remove
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Degree (e.g., B.Tech, BCA, MBA)"
                                        value={edu.degree}
                                        onChange={(e) => updateArrayField('education', index, 'degree', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Field of Study (e.g., Computer Science)"
                                        value={edu.field}
                                        onChange={(e) => updateArrayField('education', index, 'field', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="University/College Name"
                                        value={edu.university}
                                        onChange={(e) => updateArrayField('education', index, 'university', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Graduation Year (e.g., 2024)"
                                        value={edu.graduationYear}
                                        onChange={(e) => updateArrayField('education', index, 'graduationYear', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="GPA/Percentage (optional)"
                                        value={edu.gpa}
                                        onChange={(e) => updateArrayField('education', index, 'gpa', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Relevant Coursework (comma separated)"
                                        value={edu.coursework}
                                        onChange={(e) => updateArrayField('education', index, 'coursework', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('education', { degree: '', field: '', university: '', graduationYear: '', gpa: '', coursework: '' })}
                            className="w-full py-3 border-2 border-dashed border-purple-400/50 rounded-xl text-purple-300 hover:border-purple-400 hover:text-white transition-all"
                        >
                            + Add Another Education
                        </button>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">💼 Skills</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-purple-300 text-sm mb-2 block">Technical Skills</label>
                                <textarea
                                    placeholder="e.g., JavaScript, React, Python, SQL, Git, AWS (comma separated)"
                                    value={formData.technicalSkills}
                                    onChange={(e) => updateField('technicalSkills', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="text-purple-300 text-sm mb-2 block">Tools & Technologies</label>
                                <textarea
                                    placeholder="e.g., VS Code, Figma, Docker, Jira, Postman (comma separated)"
                                    value={formData.tools}
                                    onChange={(e) => updateField('tools', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="text-purple-300 text-sm mb-2 block">Soft Skills</label>
                                <textarea
                                    placeholder="e.g., Communication, Problem-solving, Team Collaboration, Time Management"
                                    value={formData.softSkills}
                                    onChange={(e) => updateField('softSkills', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="text-purple-300 text-sm mb-2 block">Languages</label>
                                <input
                                    type="text"
                                    placeholder="e.g., English (Fluent), Hindi (Native), Spanish (Basic)"
                                    value={formData.languages}
                                    onChange={(e) => updateField('languages', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <button
                                onClick={generateAISkills}
                                disabled={isGenerating}
                                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <span className="animate-spin">⚙️</span> Generating Skills...
                                    </>
                                ) : (
                                    <>✨ AI Suggest Skills for "{formData.targetRole || 'Your Role'}"</>
                                )}
                            </button>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">💻 Projects</h3>
                        {formData.projects.map((project, index) => (
                            <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-purple-300 font-medium">Project {index + 1}</span>
                                    {formData.projects.length > 1 && (
                                        <button
                                            onClick={() => removeArrayItem('projects', index)}
                                            className="text-red-400 hover:text-red-300 text-sm"
                                        >
                                            ✕ Remove
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Project Name"
                                        value={project.name}
                                        onChange={(e) => updateArrayField('projects', index, 'name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <textarea
                                        placeholder="Project Description (What problem did it solve? What did you build?)"
                                        value={project.description}
                                        onChange={(e) => updateArrayField('projects', index, 'description', e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
                                        value={project.technologies}
                                        onChange={(e) => updateArrayField('projects', index, 'technologies', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input
                                            type="url"
                                            placeholder="Project Link (GitHub/Live Demo)"
                                            value={project.link}
                                            onChange={(e) => updateArrayField('projects', index, 'link', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Impact (e.g., 500+ users, 30% faster)"
                                            value={project.impact}
                                            onChange={(e) => updateArrayField('projects', index, 'impact', e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                    <button
                                        onClick={() => enhanceProjectDescription(index)}
                                        disabled={isGenerating || !project.name}
                                        className="mt-3 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {isGenerating ? '⚙️ Enhancing...' : '✨ AI Enhance Description'}
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('projects', { name: '', description: '', technologies: '', link: '', impact: '' })}
                            className="w-full py-3 border-2 border-dashed border-purple-400/50 rounded-xl text-purple-300 hover:border-purple-400 hover:text-white transition-all"
                        >
                            + Add Another Project
                        </button>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">🏢 Experience (Internships/Jobs)</h3>
                        {formData.experience.map((exp, index) => (
                            <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-purple-300 font-medium">Experience {index + 1}</span>
                                    {formData.experience.length > 1 && (
                                        <button
                                            onClick={() => removeArrayItem('experience', index)}
                                            className="text-red-400 hover:text-red-300 text-sm"
                                        >
                                            ✕ Remove
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        value={exp.company}
                                        onChange={(e) => updateArrayField('experience', index, 'company', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Role/Title"
                                        value={exp.role}
                                        onChange={(e) => updateArrayField('experience', index, 'role', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Duration (e.g., Jun 2023 - Aug 2023)"
                                        value={exp.duration}
                                        onChange={(e) => updateArrayField('experience', index, 'duration', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
                                    />
                                </div>
                                <textarea
                                    placeholder="Key Responsibilities (What did you do? Use action verbs)"
                                    value={exp.description}
                                    onChange={(e) => updateArrayField('experience', index, 'description', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
                                />
                                <textarea
                                    placeholder="Key Achievements (Quantify if possible: Increased sales by 20%, Reduced load time by 50%)"
                                    value={exp.achievements}
                                    onChange={(e) => updateArrayField('experience', index, 'achievements', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-3"
                                />
                                <button
                                    onClick={() => enhanceExperienceDescription(index)}
                                    disabled={isGenerating || !exp.company || !exp.role}
                                    className="mt-3 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isGenerating ? '⚙️ Enhancing...' : '✨ AI Enhance Description'}
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => addArrayItem('experience', { company: '', role: '', duration: '', description: '', achievements: '' })}
                            className="w-full py-3 border-2 border-dashed border-purple-400/50 rounded-xl text-purple-300 hover:border-purple-400 hover:text-white transition-all"
                        >
                            + Add Another Experience
                        </button>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">🏆 Achievements & Certifications</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-purple-300 text-sm mb-2 block">Achievements & Awards</label>
                                <textarea
                                    placeholder="e.g., Won 1st place in XYZ Hackathon, Dean's List 2023, Published research paper on AI"
                                    value={formData.achievements}
                                    onChange={(e) => updateField('achievements', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="text-purple-300 text-sm mb-2 block">Certifications</label>
                                <textarea
                                    placeholder="e.g., AWS Certified Cloud Practitioner, Google Analytics Certified, Meta React Developer"
                                    value={formData.certifications}
                                    onChange={(e) => updateField('certifications', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="text-purple-300 text-sm mb-2 block">Hobbies & Interests (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Open source contributing, Tech blogging, Competitive programming"
                                    value={formData.hobbies}
                                    onChange={(e) => updateField('hobbies', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const ResumePreview = () => (
        <div ref={resumeRef} className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl max-w-4xl mx-auto">
            <div className="resume-container">
                {/* Header */}
                <div className="text-center border-b-2 border-blue-600 pb-4 mb-4">
                    <h1 className="text-3xl font-bold text-blue-900">{formData.fullName || 'Your Name'}</h1>
                    {formData.targetRole && (
                        <p className="text-lg text-blue-600 font-medium mt-1">{formData.targetRole}</p>
                    )}
                    <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-600">
                        {formData.email && <span>📧 {formData.email}</span>}
                        {formData.phone && <span>📱 {formData.phone}</span>}
                        {formData.location && <span>📍 {formData.location}</span>}
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mt-1 text-sm text-blue-600">
                        {formData.linkedin && <a href={formData.linkedin} className="hover:underline">LinkedIn</a>}
                        {formData.github && <a href={formData.github} className="hover:underline">GitHub</a>}
                        {formData.portfolio && <a href={formData.portfolio} className="hover:underline">Portfolio</a>}
                    </div>
                </div>

                {/* Summary */}
                {formData.summary && (
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
                        <p className="text-gray-700 text-sm leading-relaxed bg-blue-50 p-3 rounded">{formData.summary}</p>
                    </div>
                )}

                {/* Skills */}
                {(formData.technicalSkills || formData.tools || formData.softSkills) && (
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">SKILLS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            {formData.technicalSkills && (
                                <div className="bg-gray-50 p-2 rounded">
                                    <strong className="text-blue-700">Technical:</strong> {formData.technicalSkills}
                                </div>
                            )}
                            {formData.tools && (
                                <div className="bg-gray-50 p-2 rounded">
                                    <strong className="text-blue-700">Tools:</strong> {formData.tools}
                                </div>
                            )}
                            {formData.softSkills && (
                                <div className="bg-gray-50 p-2 rounded md:col-span-2">
                                    <strong className="text-blue-700">Soft Skills:</strong> {formData.softSkills}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Experience */}
                {formData.experience.some(e => e.company) && (
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">EXPERIENCE</h2>
                        {formData.experience.filter(e => e.company).map((exp, i) => (
                            <div key={i} className="mb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{exp.role}</h3>
                                        <p className="text-blue-600">{exp.company}</p>
                                    </div>
                                    <span className="text-gray-500 text-sm">{exp.duration}</span>
                                </div>
                                {exp.description && <p className="text-gray-600 text-sm mt-1">{exp.description}</p>}
                                {exp.achievements && (
                                    <ul className="list-disc list-inside text-gray-600 text-sm mt-1">
                                        {exp.achievements.split(',').map((a, j) => (
                                            <li key={j}>{a.trim()}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Projects */}
                {formData.projects.some(p => p.name) && (
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">PROJECTS</h2>
                        {formData.projects.filter(p => p.name).map((proj, i) => (
                            <div key={i} className="mb-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-800">{proj.name}</h3>
                                    {proj.link && (
                                        <a href={proj.link} className="text-blue-600 text-sm hover:underline">View Project →</a>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm">{proj.description}</p>
                                <p className="text-sm mt-1">
                                    <span className="text-blue-700 font-medium">Tech:</span> {proj.technologies}
                                </p>
                                {proj.impact && (
                                    <p className="text-green-600 text-sm font-medium">Impact: {proj.impact}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Education */}
                {formData.education.some(e => e.university) && (
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">EDUCATION</h2>
                        {formData.education.filter(e => e.university).map((edu, i) => (
                            <div key={i} className="mb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                                        <p className="text-blue-600">{edu.university}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-gray-500 text-sm">{edu.graduationYear}</span>
                                        {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                    </div>
                                </div>
                                {edu.coursework && (
                                    <p className="text-gray-600 text-sm mt-1">
                                        <span className="font-medium">Relevant Coursework:</span> {edu.coursework}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Achievements & Certifications */}
                {(formData.achievements || formData.certifications) && (
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">ACHIEVEMENTS & CERTIFICATIONS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {formData.achievements && (
                                <div>
                                    <h4 className="font-medium text-gray-800 text-sm">🏆 Achievements</h4>
                                    <ul className="list-disc list-inside text-gray-600 text-sm">
                                        {formData.achievements.split(',').map((a, i) => (
                                            <li key={i}>{a.trim()}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {formData.certifications && (
                                <div>
                                    <h4 className="font-medium text-gray-800 text-sm">📜 Certifications</h4>
                                    <ul className="list-disc list-inside text-gray-600 text-sm">
                                        {formData.certifications.split(',').map((c, i) => (
                                            <li key={i}>{c.trim()}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Languages & Hobbies */}
                {(formData.languages || formData.hobbies) && (
                    <div className="flex gap-4 text-sm text-gray-600">
                        {formData.languages && (
                            <div><strong className="text-blue-700">Languages:</strong> {formData.languages}</div>
                        )}
                        {formData.hobbies && (
                            <div><strong className="text-blue-700">Interests:</strong> {formData.hobbies}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 min-h-screen">
            <div className="container-xl lg:container m-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-sm font-semibold rounded-full">
                            ✨ AI-Powered
                        </span>
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-semibold rounded-full">
                            ATS-Friendly
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                        Professional Resume Builder
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Create a stunning, job-winning resume in minutes
                    </p>
                </div>

                {/* Resume Analyzer - Upload & ATS Score */}
                <ResumeAnalyzer formData={formData} onExtractedData={handleExtractedData} />

                {!showPreview ? (
                    <>
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                <span>Step {step} of {totalSteps}</span>
                                <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                                    style={{ width: `${(step / totalSteps) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Form Container */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            {renderStep()}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => setStep(Math.max(1, step - 1))}
                                disabled={step === 1}
                                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                ← Previous
                            </button>

                            {step < totalSteps ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all"
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowPreview(true)}
                                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-cyan-700 transition-all"
                                >
                                    🎉 Generate Resume
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Preview Actions */}
                        <div className="flex justify-center gap-4 mb-6">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                            >
                                ← Edit Resume
                            </button>
                            <button
                                onClick={handlePrint}
                                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-cyan-700 transition-all flex items-center gap-2"
                            >
                                📄 Download PDF
                            </button>
                        </div>

                        {/* Resume Preview */}
                        <ResumePreview />
                    </>
                )}
            </div>
        </section>
    );
};

export default ResumeBuilder;
