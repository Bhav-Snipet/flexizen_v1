import api from './api';

export const notificationService = {
    getUnreadNotifications: async () => {
        const response = await api.get('/admin/notifications');
        return response.data;
    },

    markAllAsRead: async () => {
        const response = await api.post('/admin/notifications/read-all');
        return response.data;
    },

    markAsRead: async (id) => {
        const response = await api.post(`/admin/notifications/${id}/read`);
        return response.data;
    }
};
