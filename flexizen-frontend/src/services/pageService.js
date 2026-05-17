import api from './api';

export const pageService = {
    // Public API
    getPageContent: async (pageType) => {
        const response = await api.get(`/pages/${pageType}`);
        return response.data;
    },

    // Admin API
    updatePageContent: async (pageType, content) => {
        const response = await api.put(`/admin/pages/${pageType}`, { content });
        return response.data;
    }
};
