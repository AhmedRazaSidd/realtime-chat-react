import axios from 'axios';
export const axiosInstanace = axios.create({
    baseURL: 'https://realtime-chat-react-backend.vercel.app/api',
    withCredentials: true,
})
