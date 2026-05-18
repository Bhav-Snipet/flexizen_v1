import api from './api';

export const adminService = {
    getDashboardKPIs: async () => {
        const response = await api.get('/admin/dashboard');
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/admin/profile', profileData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.put('/admin/password', passwordData);
        return response.data;
    }
};
