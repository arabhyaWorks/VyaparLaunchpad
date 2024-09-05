import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backend.vlai.in/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
