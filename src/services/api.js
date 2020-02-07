import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.rmsmart.com.br/api/',
});

export default api;
