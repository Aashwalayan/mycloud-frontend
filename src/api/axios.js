import axios from 'axios';

const api = axios.create({
    baseURL: "https://nas-server-6myw.onrender.com/api",
});

export default api;