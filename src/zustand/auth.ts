import {create} from 'zustand';
import {authService} from '@/src/services/authService';
import AsyncStorage from "@react-native-async-storage/async-storage"; // importujemy authService

const useAuthStore = create((set, get) => ({
    isAuthenticated: false,
    jwt: null,
    user: null,

    // Rejestracja użytkownika
    register: async (user) => {
        try {
            return await authService.register(user);
        } catch (error) {
            console.error('Error in register:', error);
            throw error;
        }
    },

    // Logowanie użytkownika
    login: async (email, password) => {
        try {
            const success = await authService.login(email, password);
            if (success) {
                set({ isAuthenticated: true });
            }
            return success;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    },

    // Weryfikacja 2FA
    verify2FA: async (code) => {
        try {
            const jwt = await authService.verify2FA(code);
            set({ isAuthenticated: true, jwt });
            return jwt;
        } catch (error) {
            console.error('2FA verification error:', error);
            return null;
        }
    },

    // Pobieranie danych użytkownika
    getUser: async () => {
        const jwt = get().jwt || await AsyncStorage.getItem('jwt');
        if (!jwt) return null;
        try {
            const user = await authService.getUser(jwt);
            set({ user });
            return user;
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    },

    // Wylogowanie użytkownika
    logout: async () => {
        await authService.logout();
        set({ isAuthenticated: false, jwt: null, user: null });
    },

    // Zmiana nazwy użytkownika
    changeUserName: async (name) => {
        const jwt = get().jwt || await AsyncStorage.getItem('jwt');
        try {
            return await authService.changeUserName(name, jwt);
        } catch (error) {
            console.error('Error in change user name:', error);
            throw error;
        }
    },

    // Zmiana hasła
    changePassword: async (password, newPassword) => {
        const jwt = get().jwt || await AsyncStorage.getItem('jwt');
        try {
            return await authService.changePassword(password, newPassword, jwt);
        } catch (error) {
            console.error('Error in change password:', error);
            throw error;
        }
    },

    // Inicjalizacja stanu autoryzacji
    initializeAuth: async () => {
        const jwt = await AsyncStorage.getItem('jwt');
        if (jwt) {
            set({ isAuthenticated: true, jwt });
        } else {
            set({ isAuthenticated: false, jwt: null });
        }
    },
}));

export default useAuthStore;
