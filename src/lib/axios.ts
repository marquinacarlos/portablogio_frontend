import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Asegúrate que tu backend corra aquí
});

export default api;