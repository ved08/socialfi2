import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Use environment variable or fallback to the hardcoded URL
const API_BASE_URL = process.env.API_BASE_URL || "http://192.168.0.101:3000/";

// Create a custom axios instance with default config
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for API calls
api.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        // const token = getTokenFromStorage();
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        // Handle errors globally
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// API service methods
export function getProfile(user: string) {
    return false
}

export const postService = {
    getPosts: async () =>
        (await api.get('/posts')).data,

    getPost: async (id: string) =>
        (await api.get(`/posts/${id}`)).data,

    createPost: async (postData: { userName: string, mint: string, boughtAmt: string, holding: boolean, soldAmt: string }) =>
        (await api.post('/create-post', postData)).data,

    updatePost: (id: string, postData: { title?: string; content?: string }) =>
        api.put(`/posts/${id}`, postData),

    deletePost: (id: string) =>
        api.delete(`/posts/${id}`),
};

export const userService = {
    checkUser: async (name: string) => {
        return (await api.post('/get-user', { name })).data;
    },
    createUser: async (userData: {
        name: string;
        avatar?: string;
    }) => {
        return (await api.post('/create-user', userData)).data;
    },
    getUsers: () => api.get('/users'),
    getUser: (id: string) => api.get(`/users/${id}`),
    updateProfile: (userData: {
        name?: string;
        avatar?: string;
    }) => api.patch('/profile', userData),
};

export const tokenService = {
    getTokenData: async (mint: string) => {
        const data = await api.post('/token-data', { mint })
        return data.data
    },
    buyToken: async (mint: string, amount: string, walletAddress: string) => {
        const inputMint = "So11111111111111111111111111111111111111112"
        const data = await api.post('/swap', { inputMint, outputMint: mint, amount, userPublicKey: walletAddress })
        return data.data
    },
    sellToken: async (mint: string, amount: string, walletAddress: string) => {
        const outputMint = "So11111111111111111111111111111111111111112"
        const data = await api.post('/swap', { inputMint: mint, outputMint, amount, userPublicKey: walletAddress })
        return data.data
    }

}

// Export the axios instance in case it's needed directly
export default api;
