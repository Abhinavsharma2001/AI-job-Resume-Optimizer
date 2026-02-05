import React, { useState, useCallback, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * ===============================================
 * RESUME ANALYZER COMPONENT - DOCUMENTATION
 * ===============================================
 * 
 * FLOW OVERVIEW:
 * 1. User uploads their existing resume (PDF/TXT/DOCX)
 * 2. System parses the resume and extracts text content
 * 3. Initial ATS Score is calculated based on:
 *    - Keyword density (technical skills, action verbs)
 *    - Section completeness (summary, skills, experience, education)
 *    - Formatting quality (length, structure)
 *    - Contact information presence
 * 
 * 4. AI suggestions are provided for improvement:
 *    - Missing keywords for target role
 *    - Section improvements needed
 *    - Formatting recommendations
 * 
 * 5. After applying suggestions, new ATS score is calculated
 * 6. Relevant jobs are matched based on extracted skills
 * 
 * ATS SCORING ALGORITHM:
 * - Keyword Match: 30 points (technical skills present)
 * - Section Score: 25 points (all sections present)
 * - Action Verbs: 15 points (strong action words used)
 * - Formatting: 15 points (proper length, no graphics)
 * - Contact Info: 15 points (email, phone, LinkedIn)
 * 
 * Total: 100 points
 * 
 * SCORE INTERPRETATION:
 * - 0-40: Poor - Major improvements needed
 * - 41-60: Fair - Several improvements recommended
 * - 61-80: Good - Minor tweaks suggested
 * - 81-100: Excellent - ATS-optimized resume
 * ===============================================
 */

const ResumeAnalyzer = ({ onExtractedData, formData }) => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [atsScore, setAtsScore] = useState(null);
    const [improvedScore, setImprovedScore] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [relevantJobs, setRelevantJobs] = useState([]);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [targetRole, setTargetRole] = useState('');
    const [extractedData, setExtractedData] = useState(null);
    const [extractionStatus, setExtractionStatus] = useState('');

    // Extract structured data from resume text
    const extractResumeData = (text) => {
        const data = {
            fullName: '',
            email: '',
            phone: '',
            linkedin: '',
            github: '',
            summary: '',
            technicalSkills: '',
            softSkills: '',
            tools: '',
            education: [],
            projects: [],
            experience: [],
            achievements: '',
            certifications: ''
        };

        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

        // Extract Name (usually first line or line before email)
        // Look for a name pattern at the start
        for (let i = 0; i < Math.min(5, lines.length); i++) {
            const line = lines[i];
            // Name is typically capitalized words without numbers or special chars
            if (/^[A-Z][a-z]+(\s+[A-Z][a-z]+)+$/.test(line) && line.length < 50) {
                data.fullName = line;
                break;
            }
        }

        // If no name found, try first line as fallback
        if (!data.fullName && lines.length > 0) {
            const firstLine = lines[0];
            if (firstLine.length < 50 && /^[A-Za-z\s]+$/.test(firstLine)) {
                data.fullName = firstLine;
            }
        }

        // Extract Email
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (emailMatch) data.email = emailMatch[0];

        // Extract Phone - more comprehensive pattern
        const phonePatterns = [
            /(\+91[\s-]?)?[6-9]\d{9}/,           // Indian mobile
            /(\+91[\s-]?)?\d{10}/,                // 10 digit
            /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/, // US/International
            /\d{5}[\s-]?\d{5}/                    // Alternative format
        ];
        for (const pattern of phonePatterns) {
            const match = text.match(pattern);
            if (match) {
                data.phone = match[0].replace(/\s+/g, ' ').trim();
                break;
            }
        }

        // Extract LinkedIn
        const linkedinMatch = text.match(/(?:linkedin\.com\/in\/|linkedin:\s*)([a-zA-Z0-9_-]+)/i);
        if (linkedinMatch) data.linkedin = 'https://linkedin.com/in/' + linkedinMatch[1];

        // Extract GitHub
        const githubMatch = text.match(/(?:github\.com\/|github:\s*)([a-zA-Z0-9_-]+)/i);
        if (githubMatch) data.github = 'https://github.com/' + githubMatch[1];

        // Extract Skills - comprehensive list
        const techKeywords = [
            'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS', 'SQL', 'MongoDB',
            'TypeScript', 'Angular', 'Vue', 'Express', 'Django', 'Flask', 'AWS', 'Docker', 'Git',
            'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'PostgreSQL',
            'MySQL', 'Redis', 'GraphQL', 'REST API', 'Redux', 'Next.js', 'Tailwind', 'Bootstrap',
            'Firebase', 'Kubernetes', 'Jenkins', 'Linux', 'Azure', 'GCP', 'Terraform', 'Ansible',
            'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy',
            'Scikit-learn', 'NLP', 'Computer Vision', 'Data Science', 'Excel', 'Tableau', 'Power BI',
            'Selenium', 'Jest', 'Cypress', 'JIRA', 'Figma', 'Photoshop', 'Illustrator',
            'Spring Boot', 'Hibernate', '.NET', 'Laravel', 'Rails', 'FastAPI', 'Svelte',
            'Webpack', 'Vite', 'Babel', 'SASS', 'LESS', 'Material UI', 'Chakra UI'
        ];

        const foundSkills = techKeywords.filter(skill =>
            text.toLowerCase().includes(skill.toLowerCase())
        );
        data.technicalSkills = foundSkills.join(', ');

        // Extract Summary/Objective
        const summaryPatterns = [
            /(?:summary|objective|about\s*me|profile|career\s*objective)[:\s]*\n?([^\n]+(?:\n(?![A-Z][a-z]+:|\n)[^\n]+){0,5})/i,
            /(?:^|\n)([A-Z][^.]+(?:seeking|passionate|experienced|skilled|dedicated)[^.]+\.)/i
        ];
        for (const pattern of summaryPatterns) {
            const match = text.match(pattern);
            if (match) {
                data.summary = match[1].trim().substring(0, 500);
                break;
            }
        }

        // Extract Projects
        const projectsSection = text.match(/(?:projects?|portfolio)[:\s]*\n?([\s\S]*?)(?=(?:\n\s*(?:experience|education|skills|achievements|certifications|work)\s*:?)|$)/i);
        if (projectsSection) {
            const projectText = projectsSection[1];
            const projectBlocks = projectText.split(/\n(?=[•\-\*\d]|[A-Z][a-z]+\s*[-–:])/);

            projectBlocks.forEach(block => {
                if (block.trim().length > 20) {
                    const lines = block.split('\n').filter(l => l.trim());
                    if (lines.length > 0) {
                        const projectName = lines[0].replace(/^[•\-\*\d.)\s]+/, '').split(/[:\-–|]/)[0].trim();
                        const description = lines.slice(1).join(' ').trim();

                        const foundTech = techKeywords.filter(t => block.toLowerCase().includes(t.toLowerCase()));

                        if (projectName && projectName.length > 2 && projectName.length < 100) {
                            data.projects.push({
                                name: projectName.substring(0, 80),
                                description: description.substring(0, 400),
                                technologies: foundTech.join(', '),
                                link: '',
                                impact: ''
                            });
                        }
                    }
                }
            });
        }

        // Extract Education
        const eduSection = text.match(/(?:education|academic|qualification)[:\s]*\n?([\s\S]*?)(?=(?:\n\s*(?:experience|projects|skills|work)\s*:?)|$)/i);
        if (eduSection) {
            const eduText = eduSection[1];

            // Look for degree patterns
            const degreePatterns = [
                /(B\.?Tech|B\.?E|B\.?Sc|B\.?A|B\.?Com|BCA|BBA|M\.?Tech|M\.?S|M\.?Sc|M\.?A|M\.?Com|MCA|MBA|Ph\.?D|Bachelor|Master|Diploma)[^\n]*/gi,
            ];

            const degrees = [];
            for (const pattern of degreePatterns) {
                const matches = eduText.match(pattern);
                if (matches) {
                    matches.forEach(m => degrees.push(m));
                }
            }

            const univMatch = eduText.match(/(?:university|college|institute|school|academy)[^\n,]*/gi);
            const yearMatch = eduText.match(/20\d{2}/g);

            if (degrees.length > 0 || univMatch) {
                data.education.push({
                    degree: degrees[0] || '',
                    field: '',
                    university: univMatch ? univMatch[0].replace(/university|college|institute|school|academy/gi, '').trim() : '',
                    graduationYear: yearMatch ? yearMatch[yearMatch.length - 1] : '',
                    gpa: '',
                    coursework: ''
                });
            }
        }

        // Extract Experience
        const expSection = text.match(/(?:experience|work\s*history|employment|professional\s*experience)[:\s]*\n?([\s\S]*?)(?=(?:\n\s*(?:education|projects|skills|achievements)\s*:?)|$)/i);
        if (expSection) {
            const expText = expSection[1];
            const expBlocks = expText.split(/\n(?=[A-Z][a-z]+\s+(?:at|@|-|–|\|)|[•\-\*])/);

            expBlocks.forEach(block => {
                if (block.trim().length > 30) {
                    const lines = block.split('\n').filter(l => l.trim());
                    const roleMatch = block.match(/(intern|developer|engineer|analyst|designer|manager|associate|executive|specialist|architect|lead|senior|junior|consultant|administrator)/i);
                    const companyMatch = block.match(/(?:at|@|[-–|])\s*([A-Z][^\n,|]+)/i);
                    const dateMatch = block.match(/(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s,]+20\d{2}\s*[-–to]+\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|present|current)[a-z]*[\s,]*20\d{0,2}/gi);

                    if (roleMatch || lines.length > 0) {
                        data.experience.push({
                            company: companyMatch ? companyMatch[1].trim() : lines[0]?.substring(0, 50) || '',
                            role: roleMatch ? roleMatch[0] : '',
                            duration: dateMatch ? dateMatch[0] : '',
                            description: lines.slice(1, 4).join(' ').substring(0, 300),
                            achievements: ''
                        });
                    }
                }
            });
        }

        // Extract Certifications
        const certMatch = text.match(/(?:certifications?|certificates?|credentials?)[:\s]*\n?([^\n]+(?:\n(?![A-Z][a-z]+:)[^\n]+)*)/i);
        if (certMatch) {
            data.certifications = certMatch[1].trim().substring(0, 400);
        }

        // Ensure at least one entry for each
        if (data.projects.length === 0) {
            data.projects.push({ name: '', description: '', technologies: '', link: '', impact: '' });
        }
        if (data.experience.length === 0) {
            data.experience.push({ company: '', role: '', duration: '', description: '', achievements: '' });
        }
        if (data.education.length === 0) {
            data.education.push({ degree: '', field: '', university: '', graduationYear: '', gpa: '', coursework: '' });
        }

        return data;
    };

    // Keywords database for different roles
    const roleKeywords = {
        'frontend': ['JavaScript', 'React', 'Vue', 'Angular', 'HTML', 'CSS', 'TypeScript', 'Redux', 'Webpack', 'REST API', 'responsive design', 'UI/UX'],
        'backend': ['Node.js', 'Python', 'Java', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL', 'REST API', 'GraphQL', 'Docker', 'AWS', 'microservices'],
        'fullstack': ['JavaScript', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'REST API', 'Docker', 'AWS', 'Git', 'TypeScript', 'Express'],
        'data': ['Python', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'TensorFlow', 'Tableau', 'Statistics', 'Data Visualization', 'Excel'],
        'devops': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins', 'Terraform', 'Linux', 'Ansible', 'Monitoring'],
        'mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android', 'Firebase', 'REST API', 'Mobile UI'],
        'default': ['communication', 'problem-solving', 'teamwork', 'leadership', 'analytical', 'project management']
    };

    // Action verbs for strong resume
    const actionVerbs = [
        'achieved', 'built', 'created', 'developed', 'delivered', 'designed', 'enhanced', 'established',
        'executed', 'generated', 'implemented', 'improved', 'increased', 'launched', 'led', 'managed',
        'optimized', 'orchestrated', 'produced', 'reduced', 'streamlined', 'transformed', 'spearheaded'
    ];

    // Job database for matching
    const jobDatabase = [
        { title: 'Frontend Developer', company: 'TechCorp', skills: ['React', 'JavaScript', 'CSS'], salary: '₹8-15 LPA', match: 0 },
        { title: 'React Developer', company: 'StartupXYZ', skills: ['React', 'Redux', 'TypeScript'], salary: '₹10-18 LPA', match: 0 },
        { title: 'Full Stack Developer', company: 'InnovateTech', skills: ['React', 'Node.js', 'MongoDB'], salary: '₹12-22 LPA', match: 0 },
        { title: 'Backend Developer', company: 'DataFlow Inc', skills: ['Node.js', 'Python', 'PostgreSQL'], salary: '₹10-20 LPA', match: 0 },
        { title: 'Software Engineer', company: 'GlobalSoft', skills: ['JavaScript', 'Python', 'AWS'], salary: '₹15-25 LPA', match: 0 },
        { title: 'Data Analyst', company: 'AnalyticsPro', skills: ['Python', 'SQL', 'Tableau'], salary: '₹8-14 LPA', match: 0 },
        { title: 'DevOps Engineer', company: 'CloudFirst', skills: ['Docker', 'Kubernetes', 'AWS'], salary: '₹12-22 LPA', match: 0 },
        { title: 'Mobile Developer', company: 'AppMakers', skills: ['React Native', 'Flutter', 'Firebase'], salary: '₹10-18 LPA', match: 0 },
        { title: 'UI/UX Developer', company: 'DesignHub', skills: ['Figma', 'CSS', 'JavaScript'], salary: '₹8-15 LPA', match: 0 },
        { title: 'Python Developer', company: 'PyTech', skills: ['Python', 'Django', 'PostgreSQL'], salary: '₹10-18 LPA', match: 0 },
    ];

    // Proper PDF text extraction using pdf.js
    const extractPDFText = async (file) => {
        return new Promise(async (resolve, reject) => {
            try {
                setExtractionStatus('Reading PDF file...');
                const arrayBuffer = await file.arrayBuffer();

                setExtractionStatus('Parsing PDF content...');
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

                let fullText = '';
                const numPages = pdf.numPages;

                setExtractionStatus(`Extracting text from ${numPages} page(s)...`);

                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();

                    // Extract text items and join them
                    const pageText = textContent.items
                        .map(item => {
                            // item.str contains the text
                            // item.transform[4] is x position, item.transform[5] is y position
                            return item.str;
                        })
                        .join(' ');

                    fullText += pageText + '\n';
                    setExtractionStatus(`Extracting page ${pageNum} of ${numPages}...`);
                }

                // Clean up the extracted text
                fullText = fullText
                    .replace(/\s+/g, ' ')           // Normalize whitespace
                    .replace(/\n+/g, '\n')          // Normalize newlines
                    .replace(/([a-z])([A-Z])/g, '$1 $2')  // Add space between camelCase
                    .trim();

                // Try to restore structure by detecting sections
                const sections = ['Summary', 'Objective', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications'];
                sections.forEach(section => {
                    const regex = new RegExp(`(${section})`, 'gi');
                    fullText = fullText.replace(regex, '\n\n$1\n');
                });

                setExtractionStatus('Text extraction complete!');
                console.log('Extracted PDF text:', fullText.substring(0, 500) + '...');
                resolve(fullText);
            } catch (error) {
                console.error('PDF extraction error:', error);
                setExtractionStatus('Error extracting PDF. Try pasting text instead.');
                reject(error);
            }
        });
    };

    // Handle file upload
    const handleFileUpload = useCallback(async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploadedFile(file);
        setIsAnalyzing(true);
        setExtractionStatus('Starting file processing...');

        try {
            let text = '';

            if (file.type === 'text/plain') {
                setExtractionStatus('Reading text file...');
                text = await file.text();
            } else if (file.type === 'application/pdf') {
                text = await extractPDFText(file);
            } else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
                setExtractionStatus('DOCX files require paste. Please paste your resume text below.');
                setIsAnalyzing(false);
                return;
            } else {
                // Try to read as text
                text = await file.text();
            }

            if (text.trim().length < 50) {
                setExtractionStatus('Could not extract enough text. Please paste your resume content below.');
                setIsAnalyzing(false);
                return;
            }

            setExtractedText(text);
            setExtractionStatus('Analyzing resume content...');
            analyzeResume(text);
        } catch (error) {
            console.error('Error reading file:', error);
            setExtractionStatus('Error reading file. Please try pasting your resume text instead.');
            setIsAnalyzing(false);
        }
    }, [targetRole]);

    // Calculate ATS Score
    const calculateATSScore = (text, isImproved = false) => {
        const lowerText = text.toLowerCase();
        let score = 0;
        const breakdown = {};

        // 1. Keyword Match (30 points)
        const role = targetRole.toLowerCase();
        let keywords = roleKeywords.default;

        Object.keys(roleKeywords).forEach(key => {
            if (role.includes(key)) {
                keywords = [...roleKeywords[key], ...roleKeywords.default];
            }
        });

        const foundKeywords = keywords.filter(kw => lowerText.includes(kw.toLowerCase()));
        const keywordScore = Math.min(30, Math.round((foundKeywords.length / keywords.length) * 30));
        breakdown.keywords = { score: keywordScore, max: 30, found: foundKeywords };
        score += keywordScore;

        // 2. Section Completeness (25 points)
        const sections = {
            summary: /summary|objective|about|profile/i.test(text),
            experience: /experience|work|employment|internship/i.test(text),
            education: /education|degree|university|college/i.test(text),
            skills: /skills|technologies|tech stack/i.test(text),
            projects: /projects|portfolio/i.test(text)
        };
        const sectionScore = Object.values(sections).filter(Boolean).length * 5;
        breakdown.sections = { score: sectionScore, max: 25, found: sections };
        score += sectionScore;

        // 3. Action Verbs (15 points)
        const foundVerbs = actionVerbs.filter(verb => lowerText.includes(verb));
        const verbScore = Math.min(15, foundVerbs.length * 2);
        breakdown.actionVerbs = { score: verbScore, max: 15, found: foundVerbs };
        score += verbScore;

        // 4. Formatting (15 points)
        const wordCount = text.split(/\s+/).length;
        let formatScore = 0;
        if (wordCount >= 200 && wordCount <= 800) formatScore += 8;
        else if (wordCount >= 100) formatScore += 4;
        if (text.includes('\n')) formatScore += 4; // Has structure
        if (!/[<>{}]/.test(text)) formatScore += 3; // No HTML/code artifacts
        breakdown.formatting = { score: formatScore, max: 15, wordCount };
        score += formatScore;

        // 5. Contact Information (15 points)
        const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
        const hasPhone = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}|[6-9]\d{9}/.test(text);
        const hasLinkedIn = /linkedin/i.test(text);
        const hasGitHub = /github/i.test(text);
        let contactScore = 0;
        if (hasEmail) contactScore += 5;
        if (hasPhone) contactScore += 4;
        if (hasLinkedIn) contactScore += 3;
        if (hasGitHub) contactScore += 3;
        breakdown.contact = { score: contactScore, max: 15, hasEmail, hasPhone, hasLinkedIn, hasGitHub };
        score += contactScore;

        return { score: Math.min(100, score), breakdown };
    };

    // Generate improvement suggestions
    const generateSuggestions = (breakdown) => {
        const suggestionsList = [];

        // Keyword suggestions
        if (breakdown.keywords.score < 20) {
            const missing = roleKeywords[Object.keys(roleKeywords).find(k => targetRole.toLowerCase().includes(k)) || 'default']
                .filter(kw => !breakdown.keywords.found.includes(kw));
            suggestionsList.push({
                type: 'critical',
                title: 'Add More Keywords',
                description: `Add these skills to improve ATS matching: ${missing.slice(0, 5).join(', ')}`,
                impact: '+10-15 points'
            });
        }

        // Section suggestions
        if (!breakdown.sections.found.summary) {
            suggestionsList.push({
                type: 'important',
                title: 'Add Professional Summary',
                description: 'Include a 2-3 sentence summary highlighting your key strengths and career goals.',
                impact: '+5 points'
            });
        }

        if (!breakdown.sections.found.projects) {
            suggestionsList.push({
                type: 'important',
                title: 'Add Projects Section',
                description: 'Include 2-3 relevant projects with technologies used and impact achieved.',
                impact: '+5 points'
            });
        }

        // Action verbs
        if (breakdown.actionVerbs.score < 10) {
            suggestionsList.push({
                type: 'moderate',
                title: 'Use Stronger Action Verbs',
                description: `Start bullet points with: ${actionVerbs.slice(0, 8).join(', ')}`,
                impact: '+5-10 points'
            });
        }

        // Contact info
        if (!breakdown.contact.hasLinkedIn) {
            suggestionsList.push({
                type: 'moderate',
                title: 'Add LinkedIn Profile',
                description: 'Include your LinkedIn URL to help recruiters find more about you.',
                impact: '+3 points'
            });
        }

        if (!breakdown.contact.hasGitHub && targetRole.toLowerCase().includes('developer')) {
            suggestionsList.push({
                type: 'moderate',
                title: 'Add GitHub Profile',
                description: 'Showcase your code repositories with a GitHub link.',
                impact: '+3 points'
            });
        }

        // Formatting
        if (breakdown.formatting.wordCount < 200) {
            suggestionsList.push({
                type: 'important',
                title: 'Add More Content',
                description: 'Your resume seems too short. Add more details about your experience and achievements.',
                impact: '+5-8 points'
            });
        } else if (breakdown.formatting.wordCount > 800) {
            suggestionsList.push({
                type: 'moderate',
                title: 'Reduce Length',
                description: 'Your resume is too long. Keep it concise (1-2 pages). Remove less relevant information.',
                impact: '+3-5 points'
            });
        }

        return suggestionsList;
    };

    // Match relevant jobs
    const matchJobs = (text) => {
        const lowerText = text.toLowerCase();

        const matchedJobs = jobDatabase.map(job => {
            const matchingSkills = job.skills.filter(skill =>
                lowerText.includes(skill.toLowerCase())
            );
            const matchPercentage = Math.round((matchingSkills.length / job.skills.length) * 100);
            return { ...job, match: matchPercentage, matchingSkills };
        })
            .filter(job => job.match > 30)
            .sort((a, b) => b.match - a.match)
            .slice(0, 5);

        return matchedJobs;
    };

    // Main analysis function
    const analyzeResume = (text) => {
        setTimeout(() => {
            // Extract structured data from resume
            const resumeData = extractResumeData(text);
            resumeData.targetRole = targetRole;
            setExtractedData(resumeData);

            // Pass extracted data to parent component if callback exists
            if (onExtractedData) {
                onExtractedData(resumeData);
            }

            // Calculate initial ATS score
            const initialResult = calculateATSScore(text);
            setAtsScore(initialResult);

            // Generate suggestions
            const suggestionsList = generateSuggestions(initialResult.breakdown);
            setSuggestions(suggestionsList);

            // Calculate improved score (potential after applying suggestions)
            const potentialImprovement = suggestionsList.reduce((acc, s) => {
                const match = s.impact.match(/\+(\d+)/);
                return acc + (match ? parseInt(match[1]) : 0);
            }, 0);
            setImprovedScore({
                score: Math.min(100, initialResult.score + potentialImprovement),
                potential: potentialImprovement
            });

            // Match jobs
            const jobs = matchJobs(text);
            setRelevantJobs(jobs);

            setShowAnalysis(true);
            setIsAnalyzing(false);
            setExtractionStatus('');
        }, 1500);
    };

    // Get score color
    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 60) return 'text-yellow-400';
        if (score >= 40) return 'text-orange-400';
        return 'text-red-400';
    };

    const getScoreGradient = (score) => {
        if (score >= 80) return 'from-emerald-500 to-cyan-500';
        if (score >= 60) return 'from-yellow-500 to-orange-500';
        if (score >= 40) return 'from-orange-500 to-red-500';
        return 'from-red-500 to-pink-500';
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Work';
    };

    const resetAnalysis = () => {
        setShowAnalysis(false);
        setExtractedText('');
        setUploadedFile(null);
        setAtsScore(null);
        setImprovedScore(null);
        setSuggestions([]);
        setRelevantJobs([]);
        setExtractedData(null);
        setExtractionStatus('');
    };

    return (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">📄</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Resume Analyzer & ATS Score</h3>
                    <p className="text-gray-400 text-sm">Upload your resume to get instant ATS score and improvement tips</p>
                </div>
            </div>

            {!showAnalysis ? (
                <div className="space-y-4">
                    {/* Target Role Input */}
                    <div>
                        <label className="text-purple-300 text-sm mb-2 block">Target Job Role *</label>
                        <input
                            type="text"
                            placeholder="e.g., Frontend Developer, Data Analyst, DevOps Engineer"
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-purple-400/50 rounded-xl p-8 text-center hover:border-purple-400 transition-all">
                        <input
                            type="file"
                            id="resume-upload"
                            accept=".pdf,.txt,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <label htmlFor="resume-upload" className="cursor-pointer">
                            <div className="text-4xl mb-3">📤</div>
                            <p className="text-white font-medium mb-2">
                                {isAnalyzing ? extractionStatus || 'Analyzing your resume...' : 'Drop your resume here or click to upload'}
                            </p>
                            <p className="text-gray-400 text-sm">Supports PDF, TXT files (DOCX requires paste)</p>
                            {uploadedFile && (
                                <p className="text-purple-300 mt-2">📎 {uploadedFile.name}</p>
                            )}
                        </label>
                        {isAnalyzing && (
                            <div className="mt-4">
                                <div className="animate-spin inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                                <p className="text-purple-300 mt-2">{extractionStatus}</p>
                            </div>
                        )}
                    </div>

                    {/* Or paste text */}
                    <div className="text-center text-gray-400">— OR PASTE YOUR RESUME TEXT —</div>
                    <textarea
                        placeholder="Paste your resume text here for best results..."
                        value={extractedText}
                        onChange={(e) => setExtractedText(e.target.value)}
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                    />
                    <button
                        onClick={() => analyzeResume(extractedText)}
                        disabled={!extractedText.trim() || !targetRole.trim() || isAnalyzing}
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        🔍 Analyze Resume
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Reset Button */}
                    <button
                        onClick={resetAnalysis}
                        className="text-purple-300 hover:text-white text-sm flex items-center gap-2"
                    >
                        ← Analyze Another Resume
                    </button>

                    {/* Score Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Current Score */}
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
                            <p className="text-gray-400 mb-2">Current ATS Score</p>
                            <div className={`text-5xl font-bold ${getScoreColor(atsScore.score)}`}>
                                {atsScore.score}
                            </div>
                            <p className={`text-sm mt-1 ${getScoreColor(atsScore.score)}`}>
                                {getScoreLabel(atsScore.score)}
                            </p>
                            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${getScoreGradient(atsScore.score)} transition-all duration-1000`}
                                    style={{ width: `${atsScore.score}%` }}
                                />
                            </div>
                        </div>

                        {/* Potential Score */}
                        <div className="bg-white/5 rounded-xl p-6 border border-emerald-500/30 text-center">
                            <p className="text-gray-400 mb-2">Potential Score (After Improvements)</p>
                            <div className="text-5xl font-bold text-emerald-400">
                                {improvedScore.score}
                            </div>
                            <p className="text-emerald-300 text-sm mt-1">
                                +{improvedScore.potential} points possible
                            </p>
                            <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
                                    style={{ width: `${improvedScore.score}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h4 className="text-white font-semibold mb-3">📊 Score Breakdown</h4>
                        <div className="space-y-3">
                            {Object.entries(atsScore.breakdown).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-3">
                                    <span className="text-gray-400 text-sm w-24 capitalize">{key}</span>
                                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                            style={{ width: `${(value.score / value.max) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-white text-sm w-16 text-right">
                                        {value.score}/{value.max}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Extracted Data Preview */}
                    {extractedData && (
                        <div className="bg-white/5 rounded-xl p-4 border border-emerald-500/30">
                            <h4 className="text-white font-semibold mb-3">📋 Extracted from Your Resume</h4>

                            {/* Contact Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                {extractedData.fullName && (
                                    <div className="bg-white/5 p-2 rounded">
                                        <span className="text-gray-400 text-xs">Name</span>
                                        <p className="text-white text-sm font-medium">{extractedData.fullName}</p>
                                    </div>
                                )}
                                {extractedData.email && (
                                    <div className="bg-white/5 p-2 rounded">
                                        <span className="text-gray-400 text-xs">Email</span>
                                        <p className="text-white text-sm truncate">{extractedData.email}</p>
                                    </div>
                                )}
                                {extractedData.phone && (
                                    <div className="bg-white/5 p-2 rounded">
                                        <span className="text-gray-400 text-xs">Phone</span>
                                        <p className="text-white text-sm">{extractedData.phone}</p>
                                    </div>
                                )}
                                {extractedData.technicalSkills && (
                                    <div className="bg-white/5 p-2 rounded">
                                        <span className="text-gray-400 text-xs">Skills Found</span>
                                        <p className="text-emerald-300 text-sm font-medium">{extractedData.technicalSkills.split(',').length} skills</p>
                                    </div>
                                )}
                            </div>

                            {/* Skills */}
                            {extractedData.technicalSkills && (
                                <div className="mb-4">
                                    <span className="text-purple-300 text-sm font-medium">💼 Skills Detected:</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {extractedData.technicalSkills.split(',').slice(0, 15).map((skill, i) => (
                                            <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                        {extractedData.technicalSkills.split(',').length > 15 && (
                                            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">
                                                +{extractedData.technicalSkills.split(',').length - 15} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Experience */}
                            {extractedData.experience.some(e => e.company || e.role) && (
                                <div className="mb-4">
                                    <span className="text-purple-300 text-sm font-medium">💼 Experience Detected:</span>
                                    <div className="space-y-2 mt-2">
                                        {extractedData.experience.filter(e => e.company || e.role).slice(0, 3).map((exp, i) => (
                                            <div key={i} className="bg-white/5 p-2 rounded border border-white/10">
                                                <p className="text-white text-sm font-medium">{exp.role || 'Role'} {exp.company ? `at ${exp.company}` : ''}</p>
                                                {exp.duration && <p className="text-gray-400 text-xs">{exp.duration}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {extractedData.projects.some(p => p.name) && (
                                <div className="mb-4">
                                    <span className="text-purple-300 text-sm font-medium">💻 Projects Detected ({extractedData.projects.filter(p => p.name).length}):</span>
                                    <div className="space-y-2 mt-2">
                                        {extractedData.projects.filter(p => p.name).slice(0, 3).map((project, i) => (
                                            <div key={i} className="bg-white/5 p-3 rounded border border-white/10">
                                                <p className="text-white font-medium">{project.name}</p>
                                                {project.description && (
                                                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{project.description}</p>
                                                )}
                                                {project.technologies && (
                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        {project.technologies.split(',').map((tech, j) => (
                                                            <span key={j} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded">
                                                                {tech.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Improvement Suggestions */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h4 className="text-white font-semibold mb-3">💡 Improvement Suggestions</h4>
                        <div className="space-y-3">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg border ${suggestion.type === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                                        suggestion.type === 'important' ? 'bg-orange-500/10 border-orange-500/30' :
                                            'bg-yellow-500/10 border-yellow-500/30'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-white font-medium">{suggestion.title}</p>
                                            <p className="text-gray-300 text-sm mt-1">{suggestion.description}</p>
                                        </div>
                                        <span className="text-emerald-400 text-sm font-medium whitespace-nowrap ml-2">
                                            {suggestion.impact}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Relevant Jobs */}
                    {relevantJobs.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <h4 className="text-white font-semibold mb-3">🎯 Relevant Jobs For You</h4>
                            <div className="space-y-3">
                                {relevantJobs.map((job, index) => (
                                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h5 className="text-white font-medium">{job.title}</h5>
                                                <p className="text-gray-400 text-sm">{job.company}</p>
                                                <div className="flex gap-2 mt-2 flex-wrap">
                                                    {job.skills.map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className={`px-2 py-1 rounded text-xs ${job.matchingSkills.includes(skill)
                                                                ? 'bg-emerald-500/20 text-emerald-300'
                                                                : 'bg-gray-500/20 text-gray-400'
                                                                }`}
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-lg font-bold ${job.match >= 80 ? 'text-emerald-400' :
                                                    job.match >= 50 ? 'text-yellow-400' : 'text-orange-400'
                                                    }`}>
                                                    {job.match}% Match
                                                </div>
                                                <p className="text-gray-400 text-sm">{job.salary}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResumeAnalyzer;
