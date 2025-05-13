import { axiosInstanace } from "../lib/axios"
import { create } from 'zustand'
export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
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

    }
})) 