import React, { createContext, useState, useContext, useEffect } from 'react';
import { resumeAPI } from '../services/api';
import { useAuth } from './AuthContext';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch resumes when user logs in
  useEffect(() => {
    if (user) {
      fetchResumes();
    }
  }, [user]);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await resumeAPI.getAllResumes();
      setResumes(response.resumes || []);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async (title) => {
    setLoading(true);
    try {
      const response = await resumeAPI.createResume(title);
      const newResume = response.resume;
      setResumes([...resumes, newResume]);
      setCurrentResume(newResume);
      localStorage.setItem('currentResume', JSON.stringify(newResume));
      return newResume;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (resumeId, updates) => {
    setLoading(true);
    try {
      const response = await resumeAPI.updateResume(resumeId, updates);
      const updatedResume = response.resume;
      setResumes(
        resumes.map((resume) => (resume._id === resumeId ? updatedResume : resume))
      );
      if (currentResume?._id === resumeId) {
        setCurrentResume(updatedResume);
        localStorage.setItem('currentResume', JSON.stringify(updatedResume));
      }
      return updatedResume;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (resumeId) => {
    setLoading(true);
    try {
      await resumeAPI.deleteResume(resumeId);
      setResumes(resumes.filter((r) => r._id !== resumeId));
      if (currentResume?._id === resumeId) {
        setCurrentResume(null);
        localStorage.removeItem('currentResume');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const duplicateResume = async (resumeId) => {
    setLoading(true);
    try {
      const response = await resumeAPI.duplicateResume(resumeId);
      const duplicatedResume = response.resume;
      setResumes([...resumes, duplicatedResume]);
      return duplicatedResume;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadResume = async (resumeId) => {
    setLoading(true);
    try {
      const response = await resumeAPI.getResume(resumeId);
      const resume = response.resume;
      setCurrentResume(resume);
      localStorage.setItem('currentResume', JSON.stringify(resume));
      return resume;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        currentResume,
        loading,
        error,
        createResume,
        updateResume,
        deleteResume,
        duplicateResume,
        loadResume,
        fetchResumes,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
};
