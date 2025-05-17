import { toast } from 'react-toastify';
import { axiosInstanace } from "../lib/axios"
import { create } from 'zustand'
import { io } from 'socket.io-client'
const BASE_URL = 'http://localhost:5001'
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdateProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async () => {
        try {
            const res = await axiosInstanace.get('/auth/check');
            set({
                authUser: res.data
            })
            get().connectSocket()
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
            get().connectSocket()
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
            get().connectSocket()
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
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdateProfile: true });
        try {
            const res = await axiosInstanace.put('/auth/update-profile', data)
            set({ authUser: res.data });
            toast.success('Profile updated successfully');
        } catch (error) {
            console.log('error in update profile:', error);
            toast.error(error.response.data.message)
        } finally {
            set({ isUpdateProfile: false })
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connect) return;

        const socket = io(BASE_URL);
        socket.connect();
        set({ socket: socket })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    }
})) 