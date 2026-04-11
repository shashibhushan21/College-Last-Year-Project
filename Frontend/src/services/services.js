import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

export const resumeService = {
  upload: (formData) => api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  get: () => api.get('/resume')
};

export const aiService = {
  generateQuestions: (data) => api.post('/ai/questions', data),
  submitAnswer: (data) => api.post('/ai/feedback', data),
  completeInterview: (data) => api.post('/ai/complete', data)
};

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getInterviewDetails: (id) => api.get(`/dashboard/interview/${id}`)
};
