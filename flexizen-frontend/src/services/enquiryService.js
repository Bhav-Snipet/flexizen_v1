import api from './api';

export const enquiryService = {
    // Public API
    submitEnquiry: async (enquiryData) => {
        const response = await api.post('/enquiries', enquiryData);
        return response.data;
    },

    // Admin APIs
    getAllEnquiries: async () => {
        const response = await api.get('/admin/enquiries');
        return response.data;
    },

    markAsRead: async (id) => {
        const response = await api.put(`/admin/enquiries/${id}/read`);
        return response.data;
    },

    deleteEnquiry: async (id) => {
        const response = await api.delete(`/admin/enquiries/${id}`);
        return response.data;
    },

    replyEnquiry: async (id, replyMessage) => {
        const response = await api.post(`/admin/enquiries/${id}/reply`, { replyMessage });
        return response.data;
    }
};
