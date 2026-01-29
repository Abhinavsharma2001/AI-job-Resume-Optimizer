import React, { useState, useRef } from 'react';

/**
 * JOB-FIRST RESUME BUILDER
 * 
 * Flow:
 * 1. User enters desired job title
 * 2. System suggests skills and generates tailored content
 * 3. User fills basic info
 * 4. Resume is generated optimized for that job
 * 5. Relevant jobs are shown that user can apply to
 */

const JobResumeBuilder = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedJob, setSelectedJob] = useState('');
    const [showJobs, setShowJobs] = useState(false);
    const [generatedResume, setGeneratedResume] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const resumeRef = useRef(null);

    // Form data
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        location: '',
        experience: '0-1',
        // Experience details
        companyName: '',
        jobTitle: '',
        startDate: '',
        endDate: 'Present',
        // Education
        education: '',
        university: '',
        graduationYear: '',
        projectCount: 2,
        skills: [],
        customSkills: '',
        // User's custom projects
        projects: [
            { name: '', description: '', tech: '' },
            { name: '', description: '', tech: '' }
        ],
        // Parsed from resume
        parsedProjects: [],
        parsedExperience: [],
        summary: ''
    });

    // Resume upload and ATS scoring state
    const [uploadedResume, setUploadedResume] = useState('');
    const [isParsing, setIsParsing] = useState(false);
    const [atsScoreBefore, setAtsScoreBefore] = useState(null);
    const [atsScoreAfter, setAtsScoreAfter] = useState(null);
    const [improvements, setImprovements] = useState([]);
    const [showUploadOption, setShowUploadOption] = useState(true);

    // Job templates with skills and requirements
    const jobTemplates = {
        'Frontend Developer': {
            skills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'TypeScript', 'Redux', 'REST APIs', 'Git', 'Responsive Design', 'Webpack'],
            tools: ['VS Code', 'Chrome DevTools', 'Figma', 'npm', 'GitHub'],
            softSkills: ['Problem-solving', 'Communication', 'Team Collaboration', 'Attention to Detail'],
            summary: (name, exp) => `Passionate Frontend Developer with ${exp} of experience building responsive, user-centric web applications. Skilled in React, JavaScript, and modern CSS frameworks. Committed to writing clean, maintainable code and delivering exceptional user experiences.`,
            projects: [
                { name: 'E-commerce Platform', desc: 'Built a responsive e-commerce website with React, Redux for state management, and integrated payment gateway. Features include product filtering, cart management, and user authentication.', tech: 'React, Redux, Node.js, Stripe API' },
                { name: 'Task Management Dashboard', desc: 'Developed a Kanban-style task manager with drag-and-drop functionality, real-time updates, and team collaboration features.', tech: 'React, TypeScript, Firebase, Tailwind CSS' },
                { name: 'Portfolio Website', desc: 'Created a modern, animated portfolio website showcasing projects with smooth transitions and optimized performance.', tech: 'React, Framer Motion, CSS Modules' }
            ]
        },
        'Backend Developer': {
            skills: ['Node.js', 'Python', 'Java', 'Express.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL', 'Docker', 'AWS'],
            tools: ['VS Code', 'Postman', 'Docker Desktop', 'pgAdmin', 'MongoDB Compass'],
            softSkills: ['Analytical Thinking', 'Problem-solving', 'System Design', 'Documentation'],
            summary: (name, exp) => `Results-driven Backend Developer with ${exp} of experience designing and implementing scalable server-side applications. Proficient in Node.js, Python, and database management. Focused on building secure, efficient APIs and microservices.`,
            projects: [
                { name: 'RESTful API Service', desc: 'Designed and built a scalable REST API serving 10,000+ requests/day with authentication, rate limiting, and comprehensive documentation.', tech: 'Node.js, Express, MongoDB, JWT' },
                { name: 'Data Pipeline System', desc: 'Developed an automated data processing pipeline handling ETL operations for large datasets with error handling and logging.', tech: 'Python, PostgreSQL, Redis, Docker' },
                { name: 'Microservices Architecture', desc: 'Implemented a microservices-based system with service discovery, load balancing, and containerization.', tech: 'Node.js, Docker, Kubernetes, RabbitMQ' }
            ]
        },
        'Full Stack Developer': {
            skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'TypeScript', 'REST APIs', 'Docker', 'Git'],
            tools: ['VS Code', 'Postman', 'Docker', 'GitHub', 'Figma'],
            softSkills: ['Full-cycle Development', 'Problem-solving', 'Communication', 'Agile Methodology'],
            summary: (name, exp) => `Versatile Full Stack Developer with ${exp} of experience building end-to-end web applications. Proficient in both frontend (React) and backend (Node.js) technologies. Passionate about creating seamless user experiences backed by robust server architecture.`,
            projects: [
                { name: 'Social Media Platform', desc: 'Built a full-stack social networking app with real-time messaging, post feeds, and user profiles. Implemented JWT authentication and WebSocket connections.', tech: 'React, Node.js, MongoDB, Socket.io' },
                { name: 'Project Management Tool', desc: 'Developed a comprehensive project management system with task tracking, team collaboration, and analytics dashboard.', tech: 'React, Express, PostgreSQL, Redis' },
                { name: 'E-learning Platform', desc: 'Created an online learning platform with video streaming, progress tracking, and certificate generation.', tech: 'Next.js, Node.js, MongoDB, AWS S3' }
            ]
        },
        'Data Analyst': {
            skills: ['Python', 'SQL', 'Excel', 'Tableau', 'Power BI', 'Pandas', 'NumPy', 'Statistics', 'Data Visualization', 'R'],
            tools: ['Jupyter Notebook', 'Tableau', 'Power BI', 'Excel', 'Google Analytics'],
            softSkills: ['Analytical Thinking', 'Attention to Detail', 'Communication', 'Business Acumen'],
            summary: (name, exp) => `Detail-oriented Data Analyst with ${exp} of experience transforming complex data into actionable insights. Proficient in Python, SQL, and visualization tools. Skilled at identifying trends and patterns to drive data-informed business decisions.`,
            projects: [
                { name: 'Sales Analytics Dashboard', desc: 'Created interactive dashboards tracking sales performance, customer segments, and revenue trends. Reduced reporting time by 60%.', tech: 'Python, Tableau, SQL' },
                { name: 'Customer Churn Analysis', desc: 'Developed predictive models to identify at-risk customers, resulting in 25% reduction in churn rate.', tech: 'Python, Pandas, Scikit-learn' },
                { name: 'Market Research Report', desc: 'Conducted comprehensive market analysis using statistical methods and presented findings to stakeholders.', tech: 'Excel, Power BI, SQL' }
            ]
        },
        'DevOps Engineer': {
            skills: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins', 'Terraform', 'Linux', 'Python', 'Bash'],
            tools: ['Docker Desktop', 'AWS Console', 'Jenkins', 'Terraform', 'Prometheus', 'Grafana'],
            softSkills: ['Automation Mindset', 'Problem-solving', 'System Administration', 'Security Awareness'],
            summary: (name, exp) => `Experienced DevOps Engineer with ${exp} of experience automating infrastructure and streamlining deployment pipelines. Expert in containerization, cloud services, and CI/CD implementation. Committed to improving system reliability and developer productivity.`,
            projects: [
                { name: 'CI/CD Pipeline Automation', desc: 'Implemented end-to-end CI/CD pipelines reducing deployment time from hours to minutes with automated testing and rollback capabilities.', tech: 'Jenkins, Docker, Kubernetes, GitHub Actions' },
                { name: 'Infrastructure as Code', desc: 'Migrated infrastructure to IaC using Terraform, enabling version control and reproducible environments across multiple regions.', tech: 'Terraform, AWS, Docker' },
                { name: 'Monitoring & Alerting System', desc: 'Set up comprehensive monitoring solution with custom dashboards and intelligent alerting, reducing incident response time by 40%.', tech: 'Prometheus, Grafana, ELK Stack' }
            ]
        },
        'Mobile Developer': {
            skills: ['React Native', 'Flutter', 'JavaScript', 'Dart', 'iOS', 'Android', 'Firebase', 'REST APIs', 'Redux', 'Git'],
            tools: ['VS Code', 'Android Studio', 'Xcode', 'Firebase Console', 'Figma'],
            softSkills: ['Mobile UX Design', 'Problem-solving', 'Performance Optimization', 'Cross-platform Thinking'],
            summary: (name, exp) => `Creative Mobile Developer with ${exp} of experience building cross-platform mobile applications. Proficient in React Native and Flutter. Passionate about creating intuitive, performant mobile experiences that users love.`,
            projects: [
                { name: 'Food Delivery App', desc: 'Built a full-featured food delivery app with real-time order tracking, push notifications, and payment integration.', tech: 'React Native, Firebase, Stripe' },
                { name: 'Fitness Tracking App', desc: 'Developed a health and fitness app with workout tracking, progress charts, and social sharing features.', tech: 'Flutter, Firebase, Health APIs' },
                { name: 'E-commerce Mobile App', desc: 'Created a mobile shopping app with product catalog, cart management, and secure checkout process.', tech: 'React Native, Redux, Node.js' }
            ]
        },
        'UI/UX Designer': {
            skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'HTML', 'CSS', 'Usability Testing'],
            tools: ['Figma', 'Adobe Creative Suite', 'Miro', 'InVision', 'Maze'],
            softSkills: ['Creativity', 'Empathy', 'User Advocacy', 'Visual Communication', 'Collaboration'],
            summary: (name, exp) => `Creative UI/UX Designer with ${exp} of experience crafting intuitive digital experiences. Expert in user research, wireframing, and prototyping. Passionate about solving user problems through thoughtful, accessible design.`,
            projects: [
                { name: 'Banking App Redesign', desc: 'Led the complete redesign of a mobile banking app, improving user satisfaction scores by 45% through simplified navigation and modern UI.', tech: 'Figma, User Testing, Design Systems' },
                { name: 'E-commerce UX Optimization', desc: 'Conducted user research and redesigned checkout flow, resulting in 30% increase in conversion rate.', tech: 'Figma, A/B Testing, Hotjar' },
                { name: 'Design System Creation', desc: 'Built a comprehensive design system with reusable components, ensuring brand consistency across 5 products.', tech: 'Figma, Storybook, Documentation' }
            ]
        },
        'Python Developer': {
            skills: ['Python', 'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Docker', 'Git', 'AWS'],
            tools: ['PyCharm', 'VS Code', 'Postman', 'Docker', 'Jupyter'],
            softSkills: ['Problem-solving', 'Code Quality', 'Documentation', 'Debugging'],
            summary: (name, exp) => `Skilled Python Developer with ${exp} of experience building robust backend systems and automation tools. Proficient in Django, Flask, and data processing. Committed to writing clean, efficient, and well-documented code.`,
            projects: [
                { name: 'Web Scraping Automation', desc: 'Built an automated data collection system processing 50,000+ records daily with error handling and data validation.', tech: 'Python, BeautifulSoup, Selenium, PostgreSQL' },
                { name: 'REST API Backend', desc: 'Developed a high-performance API backend serving a mobile app with 10,000+ active users.', tech: 'Django REST Framework, PostgreSQL, Redis' },
                { name: 'ML Model Deployment', desc: 'Created a Flask-based service for deploying machine learning models with real-time predictions.', tech: 'Flask, TensorFlow, Docker, AWS' }
            ]
        }
    };

    // Job listings database
    const jobListings = [
        { id: 1, title: 'Frontend Developer', company: 'TechCorp India', location: 'Bangalore', salary: '₹8-15 LPA', type: 'Full-time', skills: ['React', 'JavaScript', 'CSS'], posted: '2 days ago', logo: '🏢' },
        { id: 2, title: 'React Developer', company: 'StartupXYZ', location: 'Mumbai', salary: '₹10-18 LPA', type: 'Full-time', skills: ['React', 'Redux', 'TypeScript'], posted: '1 day ago', logo: '🚀' },
        { id: 3, title: 'Full Stack Developer', company: 'InnovateTech', location: 'Remote', salary: '₹12-22 LPA', type: 'Full-time', skills: ['React', 'Node.js', 'MongoDB'], posted: '3 days ago', logo: '💻' },
        { id: 4, title: 'Senior Frontend Engineer', company: 'GlobalSoft', location: 'Hyderabad', salary: '₹18-28 LPA', type: 'Full-time', skills: ['React', 'TypeScript', 'GraphQL'], posted: '1 week ago', logo: '🌐' },
        { id: 5, title: 'Backend Developer', company: 'DataFlow Inc', location: 'Pune', salary: '₹10-20 LPA', type: 'Full-time', skills: ['Node.js', 'Python', 'PostgreSQL'], posted: '4 days ago', logo: '⚙️' },
        { id: 6, title: 'Python Developer', company: 'PyTech Solutions', location: 'Chennai', salary: '₹10-18 LPA', type: 'Full-time', skills: ['Python', 'Django', 'PostgreSQL'], posted: '2 days ago', logo: '🐍' },
        { id: 7, title: 'Data Analyst', company: 'AnalyticsPro', location: 'Bangalore', salary: '₹8-14 LPA', type: 'Full-time', skills: ['Python', 'SQL', 'Tableau'], posted: '5 days ago', logo: '📊' },
        { id: 8, title: 'DevOps Engineer', company: 'CloudFirst', location: 'Remote', salary: '₹15-25 LPA', type: 'Full-time', skills: ['Docker', 'Kubernetes', 'AWS'], posted: '3 days ago', logo: '☁️' },
        { id: 9, title: 'Mobile Developer', company: 'AppMakers', location: 'Noida', salary: '₹10-18 LPA', type: 'Full-time', skills: ['React Native', 'Flutter', 'Firebase'], posted: '1 day ago', logo: '📱' },
        { id: 10, title: 'UI/UX Designer', company: 'DesignHub', location: 'Mumbai', salary: '₹8-15 LPA', type: 'Full-time', skills: ['Figma', 'Adobe XD', 'User Research'], posted: '6 days ago', logo: '🎨' },
        { id: 11, title: 'Junior React Developer', company: 'FreshTech', location: 'Gurgaon', salary: '₹4-8 LPA', type: 'Full-time', skills: ['React', 'JavaScript', 'HTML'], posted: '1 day ago', logo: '🌱' },
        { id: 12, title: 'Node.js Developer', company: 'ServerPro', location: 'Bangalore', salary: '₹12-20 LPA', type: 'Full-time', skills: ['Node.js', 'Express', 'MongoDB'], posted: '4 days ago', logo: '🟢' },
    ];

    // Get relevant jobs based on selected job title
    const getRelevantJobs = () => {
        const template = jobTemplates[selectedJob];
        if (!template) return jobListings.slice(0, 6);

        const templateSkills = template.skills.map(s => s.toLowerCase());

        return jobListings
            .map(job => {
                const matchingSkills = job.skills.filter(s =>
                    templateSkills.includes(s.toLowerCase()) ||
                    userData.skills.map(us => us.toLowerCase()).includes(s.toLowerCase())
                );
                const matchScore = (matchingSkills.length / job.skills.length) * 100;
                return { ...job, matchScore, matchingSkills };
            })
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 8);
    };

    // Generate resume based on selected job
    const generateResume = () => {
        setIsGenerating(true);

        setTimeout(() => {
            const template = jobTemplates[selectedJob] || jobTemplates['Frontend Developer'];
            const expText = userData.experience === '0-1' ? '1+ year of experience' :
                userData.experience === '1-2' ? '1+ years of experience' :
                    userData.experience === '2-3' ? '2+ years of experience' :
                        userData.experience === '3-5' ? '3+ years of experience' : '5+ years of experience';

            const allSkills = [...new Set([...userData.skills, ...userData.customSkills.split(',').filter(s => s.trim())])];

            // ATS-optimized experience bullet points based on role
            const experienceBullets = selectedJob.includes('Frontend') ? [
                'Developed and maintained responsive React dashboards to improve internal workflows and user engagement.',
                'Built reusable and scalable React components, reducing development time across multiple modules.',
                'Integrated REST APIs and collaborated closely with backend developers to ensure smooth frontend-backend communication.',
                'Improved application performance by ~30% using lazy loading and code splitting.',
                'Worked with UI/UX designers to enhance visual consistency and user experience across the platform.'
            ] : selectedJob.includes('Backend') ? [
                'Designed and implemented RESTful APIs using Node.js/Express for scalable microservices architecture.',
                'Optimized database queries reducing response time by 40% using indexing and query optimization.',
                'Implemented authentication and authorization using JWT and OAuth 2.0.',
                'Collaborated with frontend teams to define API contracts and ensure seamless integration.',
                'Set up CI/CD pipelines and automated testing to improve deployment efficiency.'
            ] : [
                'Developed full-stack web applications using modern frameworks and best practices.',
                'Built responsive and user-friendly interfaces with focus on performance optimization.',
                'Integrated third-party APIs and services to extend application functionality.',
                'Collaborated with cross-functional teams to deliver features on time.',
                'Implemented code reviews and testing practices to maintain code quality.'
            ];

            const resume = {
                name: userData.fullName,
                email: userData.email,
                phone: userData.phone,
                linkedin: userData.linkedin,
                github: userData.github,
                location: userData.location,
                targetRole: selectedJob,
                summary: `${selectedJob} with ${expText} building scalable, responsive, and performance-optimized web applications. Strong expertise in ${allSkills.slice(0, 4).join(', ')}, and modern CSS frameworks. Experienced in dashboard development, payment integration, and frontend performance optimization. Actively seeking ${selectedJob.split(' ')[0]} / React developer roles in product-based companies.`,
                skills: {
                    technical: allSkills.length > 0 ? allSkills.join(', ') : template.skills.join(', '),
                    tools: template.tools.join(', '),
                    soft: template.softSkills.join(', ')
                },
                education: {
                    degree: userData.education,
                    university: userData.university,
                    year: userData.graduationYear
                },
                projects: userData.projects.filter(p => p.name.trim()).map(p => ({
                    name: p.name,
                    desc: p.description,
                    tech: p.tech
                })),
                experience: {
                    company: userData.companyName || 'Project-based Experience',
                    title: userData.jobTitle || selectedJob,
                    startDate: userData.startDate || 'January 2024',
                    endDate: userData.endDate || 'Present',
                    bullets: experienceBullets
                }
            };

            setGeneratedResume(resume);
            setIsGenerating(false);
            setShowJobs(true);
            setCurrentStep(4);
        }, 2000);
    };

    // Handle skill selection
    const toggleSkill = (skill) => {
        setUserData(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    // Parse resume text and extract data
    const parseResumeText = (text) => {
        const data = { fullName: '', email: '', phone: '', linkedin: '', github: '', location: '', skills: [], parsedProjects: [], parsedExperience: [], education: '', university: '', summary: '' };

        // Extract email
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (emailMatch) data.email = emailMatch[0];

        // Extract phone
        const phoneMatch = text.match(/(\+91[\s-]?)?[6-9]\d{9}|(\+\d{1,3}[\s-]?)?\d{3}[\s-]?\d{3}[\s-]?\d{4}/);
        if (phoneMatch) data.phone = phoneMatch[0];

        // Extract name (first capitalized words)
        const nameMatch = text.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/m);
        if (nameMatch) data.fullName = nameMatch[1];

        // Extract LinkedIn
        const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
        if (linkedinMatch) data.linkedin = 'https://' + linkedinMatch[0];

        // Extract GitHub
        const githubMatch = text.match(/github\.com\/[\w-]+/i);
        if (githubMatch) data.github = 'https://' + githubMatch[0];

        // Extract skills
        const techSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'HTML', 'CSS', 'TypeScript', 'MongoDB', 'SQL', 'Java', 'C++', 'Docker', 'AWS', 'Git', 'Redux', 'Express', 'Angular', 'Vue', 'Flutter', 'Kotlin', 'Swift'];
        data.skills = techSkills.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));

        // Extract education
        const eduMatch = text.match(/(B\.?Tech|B\.?E|B\.?Sc|M\.?Tech|MBA|BCA|MCA|Bachelor|Master)[^,\n]*/i);
        if (eduMatch) data.education = eduMatch[0];

        const univMatch = text.match(/(University|College|Institute|School)[^,\n]+/i);
        if (univMatch) data.university = univMatch[0];

        return data;
    };

    // Calculate ATS Score
    const calculateATSScore = (text, targetJob) => {
        let score = 0;
        const template = jobTemplates[targetJob] || jobTemplates['Frontend Developer'];
        const lowerText = text.toLowerCase();

        // Keyword match (40 points)
        const foundSkills = template.skills.filter(s => lowerText.includes(s.toLowerCase()));
        score += Math.min(40, (foundSkills.length / template.skills.length) * 40);

        // Contact info (15 points)
        if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text)) score += 5;
        if (/\d{10}/.test(text)) score += 5;
        if (/linkedin/i.test(text)) score += 5;

        // Sections (25 points)
        if (/summary|objective|about/i.test(text)) score += 5;
        if (/experience|work/i.test(text)) score += 5;
        if (/education|degree/i.test(text)) score += 5;
        if (/skills|technologies/i.test(text)) score += 5;
        if (/projects/i.test(text)) score += 5;

        // Action verbs (10 points)
        const actionVerbs = ['developed', 'built', 'created', 'implemented', 'designed', 'led', 'managed', 'improved'];
        const foundVerbs = actionVerbs.filter(v => lowerText.includes(v));
        score += Math.min(10, foundVerbs.length * 2);

        // Length (10 points)
        const wordCount = text.split(/\s+/).length;
        if (wordCount >= 200 && wordCount <= 600) score += 10;
        else if (wordCount >= 100) score += 5;

        return Math.round(score);
    };

    // Handle file upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsParsing(true);

        try {
            let extractedText = '';

            if (file.name.toLowerCase().endsWith('.pdf')) {
                // PDF parsing with pdf.js legacy (no worker needed)
                const arrayBuffer = await file.arrayBuffer();
                const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

                // Disable worker to avoid CORS issues
                pdfjsLib.GlobalWorkerOptions.workerSrc = '';

                const pdf = await pdfjsLib.getDocument({
                    data: arrayBuffer,
                    useWorkerFetch: false,
                    isEvalSupported: false,
                    useSystemFonts: true
                }).promise;

                // Extract text from all pages
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items
                        .map(item => item.str)
                        .join(' ');
                    extractedText += pageText + '\n';
                }
            } else if (file.name.toLowerCase().endsWith('.txt')) {
                // Plain text file
                extractedText = await file.text();
            } else {
                // For DOCX and other formats, show message
                setIsParsing(false);
                alert('📋 For Word documents (.docx):\n\n1. Open the file in Word\n2. Select All (Ctrl+A)\n3. Copy (Ctrl+C)\n4. Paste in the text area below');
                return;
            }

            // Clean up extracted text
            extractedText = extractedText
                .replace(/\s+/g, ' ')
                .trim();

            if (extractedText.length > 20) {
                handleResumeTextChange(extractedText);
                setIsParsing(false);
            } else {
                setIsParsing(false);
                alert('Could not extract text from this PDF. It might be image-based.\n\nPlease copy-paste your resume text instead.');
            }
        } catch (error) {
            console.error('PDF parsing error:', error);
            setIsParsing(false);
            alert('Could not read this PDF file.\n\nTry: Open your PDF → Select All (Ctrl+A) → Copy (Ctrl+C) → Paste below');
        }
    };

    // Handle resume text parsing (real-time as user types/pastes)
    const handleResumeTextChange = (text) => {
        setUploadedResume(text);

        if (text.length > 50) {
            // Calculate ATS score
            const beforeScore = calculateATSScore(text, selectedJob);
            setAtsScoreBefore(beforeScore);

            // Parse resume
            const parsed = parseResumeText(text);
            setUserData(prev => ({
                ...prev,
                ...parsed,
                skills: [...new Set([...prev.skills, ...parsed.skills])]
            }));

            // Generate improvements
            const improvementsList = [];
            if (beforeScore < 40) improvementsList.push({ text: 'Add more relevant technical skills', impact: '+15' });
            if (!/summary|objective/i.test(text)) improvementsList.push({ text: 'Add a professional summary', impact: '+10' });
            if (!/projects/i.test(text)) improvementsList.push({ text: 'Add projects section', impact: '+10' });
            if (!/linkedin/i.test(text)) improvementsList.push({ text: 'Add LinkedIn profile', impact: '+5' });
            if (!/github/i.test(text)) improvementsList.push({ text: 'Add GitHub profile', impact: '+5' });
            setImprovements(improvementsList);
        }
    };

    // Download PDF
    const downloadPDF = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${generatedResume.name} - Resume</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; }
                        .header { padding: 30px 40px; text-align: center; border-bottom: 1px solid #e5e7eb; }
                        .header h1 { font-size: 28px; margin-bottom: 5px; font-style: italic; color: #1f2937; }
                        .header p { font-size: 18px; color: #2563eb; }
                        .contact-bar { padding: 12px 40px; display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; font-size: 12px; color: #374151; }
                        .links { padding: 8px 40px 15px; font-size: 12px; color: #374151; border-bottom: 1px solid #e5e7eb; }
                        .links a { color: #2563eb; text-decoration: underline; }
                        .content { padding: 30px 40px; }
                        h2 { font-size: 14px; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin: 20px 0 12px 0; text-transform: uppercase; font-weight: 600; }
                        h2:first-child { margin-top: 0; }
                        h3 { font-size: 13px; color: #1f2937; margin: 10px 0 5px; }
                        p { font-size: 12px; line-height: 1.6; color: #374151; }
                        .exp-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
                        .exp-title { font-weight: bold; }
                        .exp-company { color: #2563eb; font-size: 12px; }
                        .exp-date { color: #6b7280; font-size: 12px; }
                        ul { padding-left: 20px; margin: 8px 0; }
                        li { font-size: 12px; margin-bottom: 4px; color: #374151; }
                        .skills-row { margin-bottom: 6px; }
                        .skills-row strong { color: #1f2937; }
                        .project { margin-bottom: 15px; }
                        .project-name { font-weight: bold; color: #2563eb; font-size: 13px; }
                        .edu-row { display: flex; justify-content: space-between; }
                        @media print { body { padding: 0; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>${generatedResume.name}</h1>
                        <p>${generatedResume.targetRole}</p>
                    </div>
                    <div class="contact-bar">
                        <span>📞 ${generatedResume.phone}</span>
                        <span>📍 ${generatedResume.location}</span>
                        <span>✉️ ${generatedResume.email}</span>
                    </div>
                    <div class="links">
                        ${generatedResume.linkedin ? `<p>Portfolio: <a href="${generatedResume.linkedin}">${generatedResume.linkedin}</a></p>` : ''}
                        ${generatedResume.github ? `<p>Github: <a href="${generatedResume.github}">${generatedResume.github}</a></p>` : ''}
                    </div>
                    <div class="content">
                        <h2>Professional Summary</h2>
                        <p>${generatedResume.summary}</p>
                        
                        <h2>PROFESSIONAL EXPERIENCE</h2>
                        <div class="exp-header">
                            <div>
                                <span class="exp-title">${generatedResume.experience.title}</span><br>
                                <span class="exp-company">${generatedResume.experience.company}</span>
                            </div>
                            <span class="exp-date">${generatedResume.experience.startDate} - ${generatedResume.experience.endDate}</span>
                        </div>
                        <ul>
                            ${generatedResume.experience.bullets.map(b => `<li>${b}</li>`).join('')}
                        </ul>
                        
                        <h2>Technical Skills</h2>
                        <p class="skills-row"><strong>Frontend:</strong> ${generatedResume.skills.technical}</p>
                        <p class="skills-row"><strong>Tools:</strong> ${generatedResume.skills.tools}</p>
                        <p class="skills-row"><strong>Performance:</strong> Lazy Loading, Code Splitting, UI Optimization</p>
                        
                        <h2>Projects</h2>
                        ${generatedResume.projects.map(p => `
                            <div class="project">
                                <p class="project-name">${p.name}</p>
                                <ul>
                                    <li>${p.desc}</li>
                                    <li>Tech Stack: ${p.tech}</li>
                                </ul>
                            </div>
                        `).join('')}
                        
                        <h2>Education</h2>
                        <div class="edu-row">
                            <div>
                                <strong>${generatedResume.education.degree}</strong><br>
                                <span style="color:#6b7280;font-size:12px">${generatedResume.education.university}</span>
                            </div>
                            <span style="color:#6b7280;font-size:12px">${generatedResume.education.year}</span>
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 250);
    };

    const jobOptions = Object.keys(jobTemplates);

    return (
        <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-16 min-h-screen">
            <div className="container-xl lg:container m-auto max-w-5xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white text-sm font-semibold rounded-full">
                            ✨ AI-Powered
                        </span>
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-semibold rounded-full">
                            Job-Tailored
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-3">
                        Get Your Dream Job
                    </h2>
                    <p className="text-gray-300 text-lg">
                        Select your target job → Get a tailored resume → Apply to matching jobs
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-10">
                    <div className="flex items-center gap-4">
                        {[
                            { num: 1, label: 'Select Job' },
                            { num: 2, label: 'Your Info' },
                            { num: 3, label: 'Skills' },
                            { num: 4, label: 'Resume & Jobs' }
                        ].map((s, i) => (
                            <div key={s.num} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= s.num
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                    : 'bg-white/10 text-gray-400'
                                    }`}>
                                    {currentStep > s.num ? '✓' : s.num}
                                </div>
                                <span className={`ml-2 text-sm ${currentStep >= s.num ? 'text-white' : 'text-gray-500'}`}>
                                    {s.label}
                                </span>
                                {i < 3 && <div className={`w-12 h-0.5 mx-3 ${currentStep > s.num ? 'bg-purple-500' : 'bg-white/20'}`} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 1: Select Job */}
                {currentStep === 1 && (
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">
                            🎯 What job are you looking for?
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {jobOptions.map(job => (
                                <button
                                    key={job}
                                    onClick={() => setSelectedJob(job)}
                                    className={`p-4 rounded-xl border-2 transition-all text-left ${selectedJob === job
                                        ? 'border-purple-500 bg-purple-500/20 text-white'
                                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-purple-400'
                                        }`}
                                >
                                    <div className="text-2xl mb-2">
                                        {job.includes('Frontend') ? '🎨' :
                                            job.includes('Backend') ? '⚙️' :
                                                job.includes('Full Stack') ? '💻' :
                                                    job.includes('Data') ? '📊' :
                                                        job.includes('DevOps') ? '☁️' :
                                                            job.includes('Mobile') ? '📱' :
                                                                job.includes('UI/UX') ? '✨' : '🐍'}
                                    </div>
                                    <p className="font-medium text-sm">{job}</p>
                                </button>
                            ))}
                        </div>

                        {/* Resume Upload/Paste Section */}
                        {selectedJob && (
                            <div className="mb-6 p-6 border-2 border-dashed border-purple-400/50 rounded-xl bg-purple-500/5">
                                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                    📄 Import Your Resume (Optional)
                                </h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Auto-extract your details and get an instant ATS score analysis
                                </p>

                                {/* Upload Button */}
                                <div className="flex gap-4 items-center mb-4">
                                    <label className="cursor-pointer">
                                        <input
                                            type="file"
                                            accept=".pdf,.txt"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                        <div className="py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all flex items-center gap-2">
                                            {isParsing ? '⏳ Parsing...' : '📤 Upload PDF Resume'}
                                        </div>
                                    </label>
                                    <span className="text-gray-400 text-sm">Supports: PDF, TXT</span>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-1 h-px bg-white/20"></div>
                                    <span className="text-gray-400 text-sm">or paste text below</span>
                                    <div className="flex-1 h-px bg-white/20"></div>
                                </div>

                                {/* Text Area */}
                                <textarea
                                    placeholder="Paste your resume text here...

Tip: Open your resume in Word/PDF → Select All (Ctrl+A) → Copy (Ctrl+C) → Paste here (Ctrl+V)"
                                    value={uploadedResume}
                                    onChange={(e) => handleResumeTextChange(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm h-32 resize-none"
                                />

                                {/* ATS Score Display */}
                                {atsScoreBefore !== null && (
                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
                                            <p className="text-gray-400 text-sm mb-1">Current ATS Score</p>
                                            <p className={`text-4xl font-bold ${atsScoreBefore >= 60 ? 'text-emerald-400' : atsScoreBefore >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                {atsScoreBefore}
                                            </p>
                                            <p className="text-xs text-gray-500">out of 100</p>
                                        </div>
                                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                                            <p className="text-gray-400 text-sm mb-1">After AI Improvement</p>
                                            <p className="text-4xl font-bold text-emerald-400">
                                                {Math.min(100, atsScoreBefore + 35)}
                                            </p>
                                            <p className="text-xs text-emerald-400">+35 potential</p>
                                        </div>
                                    </div>
                                )}

                                {/* Improvements */}
                                {improvements.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-purple-300 text-sm font-medium mb-2">💡 AI Suggestions:</p>
                                        <div className="space-y-2">
                                            {improvements.map((imp, i) => (
                                                <div key={i} className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-2">
                                                    <span className="text-gray-300 text-sm">{imp.text}</span>
                                                    <span className="text-emerald-400 text-sm font-medium">{imp.impact}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Parsed Data Preview */}
                                {userData.fullName && uploadedResume && (
                                    <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                                        <p className="text-emerald-300 text-sm mb-2">✅ Extracted from your resume:</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div><span className="text-gray-400">Name:</span> <span className="text-white">{userData.fullName}</span></div>
                                            <div><span className="text-gray-400">Email:</span> <span className="text-white">{userData.email}</span></div>
                                            <div><span className="text-gray-400">Phone:</span> <span className="text-white">{userData.phone}</span></div>
                                            <div><span className="text-gray-400">Skills:</span> <span className="text-white">{userData.skills.length} found</span></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => setCurrentStep(2)}
                            disabled={!selectedJob}
                            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        >
                            Continue with {selectedJob || 'Select a Job'} →
                        </button>
                    </div>
                )}

                {/* Step 2: Basic Info */}
                {currentStep === 2 && (
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-6">
                            👤 Tell us about yourself
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                value={userData.fullName}
                                onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="email"
                                placeholder="Email *"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number *"
                                value={userData.phone}
                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Location (City)"
                                value={userData.location}
                                onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="url"
                                placeholder="LinkedIn URL (optional)"
                                value={userData.linkedin}
                                onChange={(e) => setUserData({ ...userData, linkedin: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="url"
                                placeholder="GitHub URL (optional)"
                                value={userData.github}
                                onChange={(e) => setUserData({ ...userData, github: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-3">🎓 Education</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Degree (e.g., B.Tech, BCA)"
                                value={userData.education}
                                onChange={(e) => setUserData({ ...userData, education: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="University/College"
                                value={userData.university}
                                onChange={(e) => setUserData({ ...userData, university: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Graduation Year"
                                value={userData.graduationYear}
                                onChange={(e) => setUserData({ ...userData, graduationYear: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-3">💼 Work Experience (Optional)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Company Name (e.g., CareerGuide.com)"
                                value={userData.companyName}
                                onChange={(e) => setUserData({ ...userData, companyName: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Job Title (e.g., Frontend Developer)"
                                value={userData.jobTitle}
                                onChange={(e) => setUserData({ ...userData, jobTitle: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Start Date (e.g., April 2024)"
                                value={userData.startDate}
                                onChange={(e) => setUserData({ ...userData, startDate: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="End Date (e.g., Present)"
                                value={userData.endDate}
                                onChange={(e) => setUserData({ ...userData, endDate: e.target.value })}
                                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-3">� Your Projects</h4>
                        <div className="space-y-4 mb-6">
                            {userData.projects.map((project, index) => (
                                <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <p className="text-purple-400 font-medium mb-2">Project {index + 1}</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Project Name (e.g., E-commerce Platform)"
                                            value={project.name}
                                            onChange={(e) => {
                                                const newProjects = [...userData.projects];
                                                newProjects[index].name = e.target.value;
                                                setUserData({ ...userData, projects: newProjects });
                                            }}
                                            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                        <textarea
                                            placeholder="Project Description (e.g., Built a responsive e-commerce website with React, Redux, and integrated payment gateway)"
                                            value={project.description}
                                            onChange={(e) => {
                                                const newProjects = [...userData.projects];
                                                newProjects[index].description = e.target.value;
                                                setUserData({ ...userData, projects: newProjects });
                                            }}
                                            rows={2}
                                            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Tech Stack (e.g., React, Redux, Node.js, Stripe API)"
                                            value={project.tech}
                                            onChange={(e) => {
                                                const newProjects = [...userData.projects];
                                                newProjects[index].tech = e.target.value;
                                                setUserData({ ...userData, projects: newProjects });
                                            }}
                                            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setUserData({
                                    ...userData,
                                    projects: [...userData.projects, { name: '', description: '', tech: '' }]
                                })}
                                className="w-full py-2 border-2 border-dashed border-purple-500/50 text-purple-400 rounded-xl hover:border-purple-400 hover:text-purple-300 transition-all"
                            >
                                + Add Another Project
                            </button>
                        </div>

                        <h4 className="text-lg font-semibold text-white mb-3">�📊 Experience Level</h4>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {[
                                { value: '0-1', label: 'Fresher (0-1 years)' },
                                { value: '1-2', label: '1-2 years' },
                                { value: '2-3', label: '2-3 years' },
                                { value: '3-5', label: '3-5 years' },
                                { value: '5+', label: '5+ years' }
                            ].map(exp => (
                                <button
                                    key={exp.value}
                                    onClick={() => setUserData({ ...userData, experience: exp.value })}
                                    className={`px-4 py-2 rounded-full border transition-all ${userData.experience === exp.value
                                        ? 'border-purple-500 bg-purple-500/30 text-white'
                                        : 'border-white/20 text-gray-400 hover:border-purple-400'
                                        }`}
                                >
                                    {exp.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={() => setCurrentStep(3)}
                                disabled={!userData.fullName || !userData.email || !userData.phone}
                                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50"
                            >
                                Continue to Skills →
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Skills Selection */}
                {currentStep === 3 && (
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            💼 Select your skills for {selectedJob}
                        </h3>
                        <p className="text-gray-400 mb-6">Click to select the skills you have. We'll highlight these in your resume.</p>

                        <div className="mb-6">
                            <h4 className="text-purple-300 text-sm font-medium mb-3">Recommended for {selectedJob}:</h4>
                            <div className="flex flex-wrap gap-2">
                                {(jobTemplates[selectedJob]?.skills || []).map(skill => (
                                    <button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${userData.skills.includes(skill)
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                            }`}
                                    >
                                        {userData.skills.includes(skill) ? '✓ ' : ''}{skill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-purple-300 text-sm font-medium mb-3">Tools & Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                                {(jobTemplates[selectedJob]?.tools || []).map(tool => (
                                    <button
                                        key={tool}
                                        onClick={() => toggleSkill(tool)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${userData.skills.includes(tool)
                                            ? 'bg-cyan-500 text-white'
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                            }`}
                                    >
                                        {userData.skills.includes(tool) ? '✓ ' : ''}{tool}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-purple-300 text-sm font-medium mb-3">Add custom skills (comma separated):</h4>
                            <input
                                type="text"
                                placeholder="e.g., Redux, GraphQL, Sass"
                                value={userData.customSkills}
                                onChange={(e) => setUserData({ ...userData, customSkills: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div className="mb-8">
                            <h4 className="text-purple-300 text-sm font-medium mb-3">Number of projects to include:</h4>
                            <div className="flex gap-3">
                                {[1, 2, 3].map(num => (
                                    <button
                                        key={num}
                                        onClick={() => setUserData({ ...userData, projectCount: num })}
                                        className={`w-12 h-12 rounded-full font-bold transition-all ${userData.projectCount === num
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="text-emerald-400 mb-6">
                            ✓ {userData.skills.length} skills selected
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={generateResume}
                                disabled={isGenerating}
                                className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all disabled:opacity-50 text-lg"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin">⚙️</span> Generating Your Resume...
                                    </span>
                                ) : (
                                    '🚀 Generate Resume & Find Jobs'
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Resume & Jobs */}
                {currentStep === 4 && generatedResume && (
                    <div className="space-y-8">
                        {/* Success Message */}
                        <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-6 text-center">
                            <span className="text-4xl mb-2 block">🎉</span>
                            <h3 className="text-xl font-bold text-white mb-2">Your Resume is Ready!</h3>
                            <p className="text-emerald-300">Tailored for {selectedJob} positions. Download it and apply to the jobs below!</p>
                        </div>

                        {/* Resume Preview - Exact PDF Format */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl" ref={resumeRef}>
                            {/* Header - Centered Name and Title on White */}
                            <div className="px-8 pt-8 pb-4 text-center">
                                <h1 className="text-3xl font-bold text-gray-900 italic">{generatedResume.name}</h1>
                                <p className="text-xl text-blue-600 font-medium mt-1">{generatedResume.targetRole}</p>
                            </div>

                            {/* Contact Info Row - Centered */}
                            <div className="px-8 py-3 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-600">
                                <span className="flex items-center gap-1">📞 {generatedResume.phone}</span>
                                <span className="flex items-center gap-1">📍 {generatedResume.location}</span>
                                <span className="flex items-center gap-1">✉️ {generatedResume.email}</span>
                            </div>

                            {/* Portfolio/Github Links */}
                            <div className="px-8 pb-4 text-sm border-b border-gray-200">
                                {generatedResume.linkedin && (
                                    <p className="text-gray-600">Portfolio: <span className="text-blue-600 underline">{generatedResume.linkedin || 'https://portfolio-link'}</span></p>
                                )}
                                {generatedResume.github && (
                                    <p className="text-gray-600">Github: <span className="text-blue-600 underline">{generatedResume.github || 'https://github.com/username'}</span></p>
                                )}
                            </div>

                            <div className="p-8 text-gray-800">
                                {/* Professional Summary */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">Professional Summary</h2>
                                    <p className="text-gray-700 leading-relaxed">{generatedResume.summary}</p>
                                </div>

                                {/* Professional Experience */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">PROFESSIONAL EXPERIENCE</h2>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-800">{generatedResume.experience.title}</h3>
                                                <p className="text-blue-600 text-sm">{generatedResume.experience.company}</p>
                                            </div>
                                            <span className="text-gray-500 text-sm">{generatedResume.experience.startDate} - {generatedResume.experience.endDate}</span>
                                        </div>
                                        <ul className="mt-2 space-y-1 text-sm text-gray-700">
                                            {generatedResume.experience.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Technical Skills */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">Technical Skills</h2>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="font-semibold text-gray-800">Frontend:</span> <span className="text-gray-700">{generatedResume.skills.technical}</span></p>
                                        <p><span className="font-semibold text-gray-800">Tools:</span> <span className="text-gray-700">{generatedResume.skills.tools}</span></p>
                                        <p><span className="font-semibold text-gray-800">Performance:</span> <span className="text-gray-700">Lazy Loading, Code Splitting, UI Optimization</span></p>
                                    </div>
                                </div>

                                {/* Projects */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
                                    {generatedResume.projects.map((p, i) => (
                                        <div key={i} className="mb-4">
                                            <h3 className="font-bold text-blue-600">{p.name}</h3>
                                            <ul className="mt-1 space-y-1 text-sm text-gray-700">
                                                <li className="flex items-start gap-2"><span className="text-blue-500">•</span> {p.desc}</li>
                                                <li className="flex items-start gap-2"><span className="text-blue-500">•</span> Tech Stack: {p.tech}</li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* Education */}
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-800">{generatedResume.education.degree}</h3>
                                            <p className="text-gray-600 text-sm">{generatedResume.education.university}</p>
                                        </div>
                                        <span className="text-gray-500 text-sm">{generatedResume.education.year}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Download Button */}
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => { setCurrentStep(3); setShowJobs(false); }}
                                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                            >
                                ← Edit Resume
                            </button>
                            <button
                                onClick={downloadPDF}
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-cyan-700 transition-all text-lg"
                            >
                                📄 Download PDF Resume
                            </button>
                        </div>

                        {/* Relevant Jobs */}
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-2">🎯 Apply to These Jobs</h3>
                            <p className="text-gray-400 mb-6">Jobs matching your {selectedJob} profile</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {getRelevantJobs().map(job => (
                                    <div key={job.id} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-all">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{job.logo}</span>
                                                <div>
                                                    <h4 className="text-white font-semibold">{job.title}</h4>
                                                    <p className="text-gray-400 text-sm">{job.company}</p>
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${job.matchScore >= 80 ? 'bg-emerald-500/20 text-emerald-300' :
                                                job.matchScore >= 50 ? 'bg-yellow-500/20 text-yellow-300' :
                                                    'bg-orange-500/20 text-orange-300'
                                                }`}>
                                                {Math.round(job.matchScore)}% Match
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                            <span>📍 {job.location}</span>
                                            <span>💰 {job.salary}</span>
                                            <span>🕐 {job.posted}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {job.skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-2 py-1 rounded text-xs ${job.matchingSkills?.includes(skill)
                                                        ? 'bg-emerald-500/20 text-emerald-300'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                        }`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all">
                                            Apply Now →
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Start Over */}
                        <div className="text-center">
                            <button
                                onClick={() => { setCurrentStep(1); setSelectedJob(''); setGeneratedResume(null); setShowJobs(false); }}
                                className="text-purple-400 hover:text-purple-300"
                            >
                                🔄 Start over with a different job
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobResumeBuilder;
