import api from './api';

export const bookingService = {
    // Public API
    createBooking: async (bookingData) => {
        const response = await api.post('/bookings', bookingData);
        return response.data;
    },

    // Admin APIs
    getAllBookings: async (status = '') => {
        const url = status ? `/admin/bookings?status=${status}` : '/admin/bookings';
        const response = await api.get(url);
        return response.data;
    },

    updateStatus: async (id, status) => {
        const response = await api.put(`/admin/bookings/${id}/status`, { status });
        return response.data;
    },

    updateRemark: async (id, remark) => {
        const response = await api.put(`/admin/bookings/${id}/remark`, { remark });
        return response.data;
    }
};
