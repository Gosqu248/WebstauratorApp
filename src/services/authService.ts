import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/src/api';

const API_URL = api.backendUrl + '/auth';

export const authService = {
    register: async (user) => {
        try {
            const response = await axios.post(`${API_URL}/register`, user);
            return response.data.message;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },

    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            if (response.data) {
                await AsyncStorage.setItem('email', email);
                return true;
            }
            return false;
        } catch (error) {
            if (error.response?.status === 423) {
                throw new Error('Account is locked. Try again later.');
            }
            throw error;
        }
    },

    verify2FA: async (code) => {
        const email = await AsyncStorage.getItem('email');
        try {
            const response = await axios.post(`${API_URL}/verify-2fa`, { email, code });
            const jwt = response.data.jwt;
            await AsyncStorage.setItem('jwt', jwt);
            return jwt;
        } catch (error) {
            console.error('2FA verification error:', error);
            throw error;
        }
    },

    getUser: async (jwt) => {
        try {
            const response = await axios.get(`${API_URL}/user`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error) {
            console.error('Get user error:', error);
            throw error;
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem('jwt');
        await AsyncStorage.removeItem('email');
    },

    changeUserName: async (name, jwt) => {
        try {
            const response = await axios.put(
                `${API_URL}/changeName`,
                name,
                { headers: { Authorization: `Bearer ${jwt}` }, responseType: 'text' }
            );
            return response.data;
        } catch (error) {
            console.error('Change user name error:', error);
            throw error;
        }
    },

    changePassword: async (password, newPassword, jwt) => {
        try {
            const response = await axios.put(
                `${API_URL}/changePassword`,
                { password, newPassword },
                { headers: { Authorization: `Bearer ${jwt}` } }
            );
            return response.data;
        } catch (error) {
            console.error('Change password error:', error);
            throw error;
        }
    },
};
