import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';
export const api = axios.create({ baseURL: API_URL });
