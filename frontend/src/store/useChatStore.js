import { create } from 'zustand';
import { axiosInstanace } from "../lib/axios"
import { toast } from 'react-toastify';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    getUser: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstanace.get('/messages/users');
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstanace.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstanace.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on('newMessage', (newMessage) => {

            if (newMessage.senderId !== selectedUser._id) return
            
            set({ messages: [...get().messages, newMessage] });
        })
    },
    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage');
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
