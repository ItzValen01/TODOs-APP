import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if(error.response){
            if (error.response.status === 401 && error.response.data.msg === 'Token expired.') {
                window.location.href = '/login';
            }   
        }else{
            window.location.href = '/login';
            console.error('Error sin respuesta del servidor: ', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;