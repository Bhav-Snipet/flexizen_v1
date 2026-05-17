import api from './api';

export const classService = {
    // Public API
    getActiveClasses: async () => {
        const response = await api.get('/classes');
        return response.data;
    },

    // Admin APIs
    getAllClasses: async () => {
        const response = await api.get('/admin/classes');
        return response.data;
    },

    createClass: async (classData) => {
        const response = await api.post('/admin/classes', classData);
        return response.data;
    },

    updateClass: async (id, classData) => {
        const response = await api.put(`/admin/classes/${id}`, classData);
        return response.data;
    },

    deleteClass: async (id) => {
        const response = await api.delete(`/admin/classes/${id}`);
        return response.data;
    }
};
