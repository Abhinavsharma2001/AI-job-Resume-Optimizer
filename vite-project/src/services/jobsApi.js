/**
 * Multi-Source Jobs API Service
 * 
 * Sources:
 * 1. Adzuna API - Indian job listings (developer.adzuna.com)
 * 2. JSearch API - LinkedIn, Indeed, Glassdoor jobs (rapidapi.com)
 */

// ============================================
// 🔑 API CREDENTIALS
// ============================================

// Adzuna API credentials
const ADZUNA_APP_ID = '22ea858a';
const ADZUNA_APP_KEY = '1a46ffab3c2ab080d8f14b474f6116f4';

// JSearch (RapidAPI) credentials - LinkedIn, Indeed, Glassdoor
const RAPIDAPI_KEY = '83da1b1c2cmshdc176d16f06646bp1e1c8bjsn41dd51490ce9';

// ============================================
// ADZUNA API (Naukri, Indeed India)
// ============================================

const ADZUNA_BASE_URL = '/api/adzuna/v1/api/jobs/in';

export async function fetchFromAdzuna(searchTerm = 'developer', page = 1) {
    try {
        const url = `${ADZUNA_BASE_URL}/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${encodeURIComponent(searchTerm)}&results_per_page=6&content-type=application/json`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Adzuna API Error: ${response.status}`);

        const data = await response.json();
        return (data.results || []).map(job => transformAdzunaJob(job));
    } catch (error) {
        console.error('Adzuna fetch error:', error);
        return [];
    }
}

function transformAdzunaJob(job) {
    return {
        id: `adzuna-${job.id}`,
        title: job.title,
        company: job.company?.display_name || 'Company',
        location: job.location?.display_name || 'India',
        description: job.description?.substring(0, 150) + '...' || 'No description',
        salary: job.salary_min ? `₹${formatSalary(job.salary_min)}` : 'Competitive',
        type: job.contract_time === 'full_time' ? 'Full-Time' : 'Part-Time',
        applyUrl: job.redirect_url,
        source: 'naukri', // Adzuna aggregates from Naukri in India
        sourceLabel: 'Naukri',
        posted: job.created,
    };
}

// ============================================
// JSEARCH API (LinkedIn, Indeed, Glassdoor)
// ============================================

const JSEARCH_BASE_URL = '/api/jsearch';

export async function fetchFromJSearch(searchTerm = 'developer', page = 1) {
    try {
        const url = `${JSEARCH_BASE_URL}/search?query=${encodeURIComponent(searchTerm + ' in India')}&page=${page}&num_pages=1`;

        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        });

        if (!response.ok) throw new Error(`JSearch API Error: ${response.status}`);

        const data = await response.json();
        return (data.data || []).map(job => transformJSearchJob(job));
    } catch (error) {
        console.error('JSearch fetch error:', error);
        return [];
    }
}

function transformJSearchJob(job) {
    // Detect source from employer or job link
    let source = 'indeed';
    let sourceLabel = 'Indeed';

    const applyLink = (job.job_apply_link || '').toLowerCase();
    const employer = (job.employer_name || '').toLowerCase();

    if (applyLink.includes('linkedin') || employer.includes('linkedin')) {
        source = 'linkedin';
        sourceLabel = 'LinkedIn';
    } else if (applyLink.includes('glassdoor')) {
        source = 'glassdoor';
        sourceLabel = 'Glassdoor';
    } else if (applyLink.includes('naukri')) {
        source = 'naukri';
        sourceLabel = 'Naukri';
    }

    return {
        id: `jsearch-${job.job_id}`,
        title: job.job_title,
        company: job.employer_name || 'Company',
        location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country || 'India',
        description: job.job_description?.substring(0, 150) + '...' || 'No description',
        salary: job.job_min_salary ? `₹${formatSalary(job.job_min_salary)}` : 'Competitive',
        type: job.job_employment_type || 'Full-Time',
        applyUrl: job.job_apply_link,
        source,
        sourceLabel,
        posted: job.job_posted_at_datetime_utc,
        logo: job.employer_logo,
    };
}

// ============================================
// COMBINED FETCH - All Sources
// ============================================

export async function fetchAllJobs(searchTerm = 'developer', activeSource = 'all') {
    const results = { jobs: [], sources: {} };

    try {
        // Fetch from both APIs in parallel
        const [adzunaJobs, jsearchJobs] = await Promise.all([
            fetchFromAdzuna(searchTerm),
            fetchFromJSearch(searchTerm)
        ]);

        // Combine all jobs
        const allJobs = [...jsearchJobs, ...adzunaJobs];

        // Count by source
        results.sources = {
            all: allJobs.length,
            linkedin: allJobs.filter(j => j.source === 'linkedin').length,
            indeed: allJobs.filter(j => j.source === 'indeed').length,
            glassdoor: allJobs.filter(j => j.source === 'glassdoor').length,
            naukri: allJobs.filter(j => j.source === 'naukri').length,
        };

        // Filter by active source
        if (activeSource === 'all') {
            results.jobs = allJobs;
        } else {
            results.jobs = allJobs.filter(j => j.source === activeSource);
        }

        return results;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
}

// ============================================
// HELPERS
// ============================================

function formatSalary(amount) {
    if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)}L`;
    }
    return amount.toLocaleString('en-IN');
}

// Source brand colors
export const SOURCE_COLORS = {
    linkedin: { bg: 'bg-blue-600', text: 'text-white', icon: '💼' },
    indeed: { bg: 'bg-purple-600', text: 'text-white', icon: '🔍' },
    glassdoor: { bg: 'bg-green-600', text: 'text-white', icon: '🏢' },
    naukri: { bg: 'bg-blue-500', text: 'text-white', icon: '🇮🇳' },
};

// Legacy export for backward compatibility
export { fetchFromAdzuna as fetchIndianJobs };
export function transformJob(job) {
    return transformAdzunaJob(job);
}
