import api from './api';

export const reportService = {
    getBookingsReport: async (startDate, endDate) => {
        let url = '/admin/reports/bookings';
        if (startDate && endDate) {
            url += `?start=${startDate}&end=${endDate}`;
        }
        const response = await api.get(url);
        return response.data;
    },

    searchBooking: async (bookingNo) => {
        const response = await api.get(`/admin/bookings/search?bookingNo=${bookingNo}`);
        return response.data;
    }
};
