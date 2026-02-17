import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const baseUrl = `${apiUrl}/api`;

export const api = axios.create({
  baseURL: baseUrl,
});

export const fiapusAIApi = {
  api,
};
