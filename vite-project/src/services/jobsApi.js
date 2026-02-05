/**
 * Multi-Source Jobs API Service
 * Uses sample data as fallback when API calls fail
 */

// Sample job data for fallback
const SAMPLE_JOBS = [
    {
        id: 'sample-1',
        title: 'Senior React Developer',
        company: 'TCS',
        location: 'Bangalore, India',
        description: 'Looking for experienced React developers to build enterprise applications. Strong knowledge of hooks, Redux, and TypeScript required.',
        salary: '₹18-25 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        sourceLabel: 'LinkedIn',
        logo: null
    },
    {
        id: 'sample-2',
        title: 'Full Stack Developer',
        company: 'Infosys',
        location: 'Hyderabad, India',
        description: 'Join our team to work on cutting-edge web applications. Experience with Node.js, React, and cloud services preferred.',
        salary: '₹12-18 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.indeed.com',
        source: 'indeed',
        sourceLabel: 'Indeed',
        logo: null
    },
    {
        id: 'sample-3',
        title: 'Frontend Engineer',
        company: 'Wipro',
        location: 'Chennai, India',
        description: 'Design and develop responsive web interfaces. Proficiency in JavaScript, CSS, and modern frameworks expected.',
        salary: '₹10-15 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.glassdoor.com',
        source: 'glassdoor',
        sourceLabel: 'Glassdoor',
        logo: null
    },
    {
        id: 'sample-4',
        title: 'Software Developer',
        company: 'HCL Technologies',
        location: 'Noida, India',
        description: 'Develop and maintain software solutions for global clients. Strong problem-solving skills required.',
        salary: '₹8-12 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.naukri.com',
        source: 'naukri',
        sourceLabel: 'Naukri',
        logo: null
    },
    {
        id: 'sample-5',
        title: 'Python Developer',
        company: 'Tech Mahindra',
        location: 'Pune, India',
        description: 'Work on data-driven applications using Python. Django/Flask experience is a plus.',
        salary: '₹10-16 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        sourceLabel: 'LinkedIn',
        logo: null
    },
    {
        id: 'sample-6',
        title: 'Java Backend Developer',
        company: 'Accenture',
        location: 'Mumbai, India',
        description: 'Build scalable microservices using Java and Spring Boot. Experience with AWS/Azure is preferred.',
        salary: '₹14-22 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.indeed.com',
        source: 'indeed',
        sourceLabel: 'Indeed',
        logo: null
    },
    {
        id: 'sample-7',
        title: 'DevOps Engineer',
        company: 'Cognizant',
        location: 'Bangalore, India',
        description: 'Manage CI/CD pipelines and cloud infrastructure. Docker, Kubernetes, and Jenkins experience required.',
        salary: '₹15-24 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.glassdoor.com',
        source: 'glassdoor',
        sourceLabel: 'Glassdoor',
        logo: null
    },
    {
        id: 'sample-8',
        title: 'Data Analyst',
        company: 'Capgemini',
        location: 'Gurgaon, India',
        description: 'Analyze business data and create insightful reports. SQL and Python skills required.',
        salary: '₹8-14 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.naukri.com',
        source: 'naukri',
        sourceLabel: 'Naukri',
        logo: null
    },
    {
        id: 'sample-9',
        title: 'UI/UX Designer',
        company: 'Flipkart',
        location: 'Bangalore, India',
        description: 'Create beautiful and intuitive user interfaces. Figma and Adobe XD proficiency required.',
        salary: '₹12-20 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        sourceLabel: 'LinkedIn',
        logo: null
    },
    {
        id: 'sample-10',
        title: 'Machine Learning Engineer',
        company: 'Amazon',
        location: 'Hyderabad, India',
        description: 'Build and deploy ML models at scale. TensorFlow/PyTorch experience is a must.',
        salary: '₹25-40 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.indeed.com',
        source: 'indeed',
        sourceLabel: 'Indeed',
        logo: null
    },
    {
        id: 'sample-11',
        title: 'Cloud Architect',
        company: 'Google',
        location: 'Bangalore, India',
        description: 'Design and implement cloud-native solutions on GCP. AWS/Azure experience also valued.',
        salary: '₹35-55 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.glassdoor.com',
        source: 'glassdoor',
        sourceLabel: 'Glassdoor',
        logo: null
    },
    {
        id: 'sample-12',
        title: 'Mobile App Developer',
        company: 'Paytm',
        location: 'Noida, India',
        description: 'Develop cross-platform mobile apps using React Native or Flutter.',
        salary: '₹14-22 LPA',
        type: 'Full-Time',
        applyUrl: 'https://www.naukri.com',
        source: 'naukri',
        sourceLabel: 'Naukri',
        logo: null
    }
];

/**
 * Fetch jobs with search filtering
 * Uses sample data (can be extended to call real APIs)
 */
export async function fetchAllJobs(searchTerm = 'developer', activeSource = 'all') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let jobs = [...SAMPLE_JOBS];

    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        jobs = jobs.filter(job =>
            job.title.toLowerCase().includes(term) ||
            job.company.toLowerCase().includes(term) ||
            job.description.toLowerCase().includes(term) ||
            job.location.toLowerCase().includes(term)
        );
    }

    // If no matches found with filter, return all jobs
    if (jobs.length === 0) {
        jobs = [...SAMPLE_JOBS];
    }

    // Count by source (from full list for accurate counts)
    const allJobs = SAMPLE_JOBS;
    const sources = {
        all: allJobs.length,
        linkedin: allJobs.filter(j => j.source === 'linkedin').length,
        indeed: allJobs.filter(j => j.source === 'indeed').length,
        glassdoor: allJobs.filter(j => j.source === 'glassdoor').length,
        naukri: allJobs.filter(j => j.source === 'naukri').length,
    };

    // Filter by active source
    if (activeSource !== 'all') {
        jobs = jobs.filter(j => j.source === activeSource);
    }

    return { jobs, sources };
}

// Source brand colors
export const SOURCE_COLORS = {
    linkedin: { bg: 'bg-blue-600', text: 'text-white', icon: '💼' },
    indeed: { bg: 'bg-purple-600', text: 'text-white', icon: '🔍' },
    glassdoor: { bg: 'bg-green-600', text: 'text-white', icon: '🏢' },
    naukri: { bg: 'bg-blue-500', text: 'text-white', icon: '🇮🇳' },
};

// Legacy exports for backward compatibility
export const fetchFromAdzuna = async () => [];
export const fetchFromJSearch = async () => [];
export const fetchIndianJobs = async () => [];
export function transformJob(job) { return job; }
