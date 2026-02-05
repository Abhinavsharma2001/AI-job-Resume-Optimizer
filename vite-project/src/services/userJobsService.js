/**
 * User Jobs Service
 * Handles saving jobs and tracking applications in Firestore
 */
import { db } from '../firebase/config';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    query,
    where,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

// Collection names
const SAVED_JOBS_COLLECTION = 'savedJobs';
const APPLICATIONS_COLLECTION = 'applications';

/**
 * Save a job for a user
 */
export async function saveJob(userId, job) {
    try {
        const jobRef = doc(db, SAVED_JOBS_COLLECTION, `${userId}_${job.id}`);
        await setDoc(jobRef, {
            ...job,
            userId,
            savedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error saving job:', error);
        throw error;
    }
}

/**
 * Remove a saved job
 */
export async function unsaveJob(userId, jobId) {
    try {
        const jobRef = doc(db, SAVED_JOBS_COLLECTION, `${userId}_${jobId}`);
        await deleteDoc(jobRef);
        return true;
    } catch (error) {
        console.error('Error removing saved job:', error);
        throw error;
    }
}

/**
 * Get all saved jobs for a user
 */
export async function getSavedJobs(userId) {
    try {
        const q = query(
            collection(db, SAVED_JOBS_COLLECTION),
            where('userId', '==', userId),
            orderBy('savedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting saved jobs:', error);
        return [];
    }
}

/**
 * Check if a job is saved
 */
export async function isJobSaved(userId, jobId) {
    try {
        const jobRef = doc(db, SAVED_JOBS_COLLECTION, `${userId}_${jobId}`);
        const snapshot = await getDoc(jobRef);
        return snapshot.exists();
    } catch (error) {
        console.error('Error checking saved job:', error);
        return false;
    }
}

/**
 * Application Status Types
 */
export const APPLICATION_STATUS = {
    SAVED: 'saved',
    APPLIED: 'applied',
    INTERVIEW: 'interview',
    OFFER: 'offer',
    REJECTED: 'rejected',
    WITHDRAWN: 'withdrawn'
};

export const STATUS_LABELS = {
    saved: { label: 'Saved', color: 'bg-gray-500', icon: '📌' },
    applied: { label: 'Applied', color: 'bg-blue-500', icon: '📤' },
    interview: { label: 'Interview', color: 'bg-purple-500', icon: '🎤' },
    offer: { label: 'Offer', color: 'bg-green-500', icon: '🎉' },
    rejected: { label: 'Rejected', color: 'bg-red-500', icon: '❌' },
    withdrawn: { label: 'Withdrawn', color: 'bg-gray-400', icon: '↩️' }
};

/**
 * Track a job application
 */
export async function trackApplication(userId, job, status = APPLICATION_STATUS.APPLIED) {
    try {
        const appRef = doc(db, APPLICATIONS_COLLECTION, `${userId}_${job.id}`);
        await setDoc(appRef, {
            ...job,
            userId,
            status,
            appliedAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            notes: ''
        });
        return true;
    } catch (error) {
        console.error('Error tracking application:', error);
        throw error;
    }
}

/**
 * Update application status
 */
export async function updateApplicationStatus(userId, jobId, status, notes = '') {
    try {
        const appRef = doc(db, APPLICATIONS_COLLECTION, `${userId}_${jobId}`);
        await updateDoc(appRef, {
            status,
            notes,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Error updating application:', error);
        throw error;
    }
}

/**
 * Get all applications for a user
 */
export async function getApplications(userId) {
    try {
        const q = query(
            collection(db, APPLICATIONS_COLLECTION),
            where('userId', '==', userId),
            orderBy('appliedAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting applications:', error);
        return [];
    }
}

/**
 * Delete an application
 */
export async function deleteApplication(userId, jobId) {
    try {
        const appRef = doc(db, APPLICATIONS_COLLECTION, `${userId}_${jobId}`);
        await deleteDoc(appRef);
        return true;
    } catch (error) {
        console.error('Error deleting application:', error);
        throw error;
    }
}

/**
 * Get application stats for dashboard
 */
export async function getApplicationStats(userId) {
    try {
        const applications = await getApplications(userId);
        const stats = {
            total: applications.length,
            applied: applications.filter(a => a.status === APPLICATION_STATUS.APPLIED).length,
            interview: applications.filter(a => a.status === APPLICATION_STATUS.INTERVIEW).length,
            offer: applications.filter(a => a.status === APPLICATION_STATUS.OFFER).length,
            rejected: applications.filter(a => a.status === APPLICATION_STATUS.REJECTED).length,
        };
        return stats;
    } catch (error) {
        console.error('Error getting stats:', error);
        return { total: 0, applied: 0, interview: 0, offer: 0, rejected: 0 };
    }
}
