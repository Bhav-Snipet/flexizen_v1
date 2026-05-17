import api from './api';

export const authService = {
    login: async (username, password) => {
        // Spring Security form-login endpoint expects form-urlencoded by default
        // So we use URLSearchParams
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        
        const response = await api.post('/auth/login', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
