import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Resume API
export const resumeAPI = {
  getAllResumes: async () => {
    const response = await api.get('/resumes');
    return response.data;
  },

  getResume: async (id) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  },

  createResume: async (title) => {
    const response = await api.post('/resumes', { title });
    return response.data;
  },

  updateResume: async (id, data) => {
    const response = await api.put(`/resumes/${id}`, data);
    return response.data;
  },

  deleteResume: async (id) => {
    const response = await api.delete(`/resumes/${id}`);
    return response.data;
  },

  duplicateResume: async (id) => {
    const response = await api.post(`/resumes/${id}/duplicate`);
    return response.data;
  },
};

export default api;
