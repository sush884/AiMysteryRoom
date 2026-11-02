import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://ai-mystery-room-virid.vercel.app/api/v1' : 'http://localhost:5000/api/v1');
const api = axios.create({ baseURL: apiBaseUrl, withCredentials: true, headers: { 'Content-Type': 'application/json' } });
export function errorMessage(error) { return error.response?.data?.message || error.message || 'Something went wrong. Please try again.'; }
export default api;
