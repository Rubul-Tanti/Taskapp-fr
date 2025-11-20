import axios from 'axios';

const api=axios.create({
    baseURL: 'https://taskapp-35wn.onrender.com',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});
export default api;