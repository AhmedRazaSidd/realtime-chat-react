import { toast } from 'react-toastify';
import { axiosInstanace } from "../lib/axios"
import { create } from 'zustand'
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstanace.get('/auth/check');
            set({
                authUser: res.data
            })
        } catch (error) {
            console.log('Error in Checkin', error);
            set({
                authUser: null
            })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstanace.post('/auth/signup', data);
            set({ authUser: res.data });
            toast.success('Account created Successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true, })
        try {
            const res = await axiosInstanace.post('/auth/login', data);
            set({ authUser: res.data });
            toast.success('Logged in Successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false, })
        }
    },
    logout: async () => {
        try {
            await axiosInstanace.get('/auth/logout');
            set({ authUser: null });
            toast.success('Logged out Successfully');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
})) 