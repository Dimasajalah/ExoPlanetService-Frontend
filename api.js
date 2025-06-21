import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Function to register a new user
export const registerUser = async (username, password) => {
    try {
        const response = await api.post('/register', { username, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'An error occurred during registration' };
    }
};

// Function to log in a user
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: 'An error occurred during login' };
    }
};

export default api;
