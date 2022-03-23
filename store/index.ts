import { QueryClient } from 'react-query';
import axios from 'axios';
export * from './actions/index';

export const fetch = axios.create({
  baseURL: 'https://wakulima.herokuapp.com',
  headers: {
    apikey: '974a82b7-3521-47a0-a588-4ff5663610e8',
  },
});

fetch.interceptors.response.use(
  (response) => response.data,
  (err) => Promise.reject(err.response?.data || err)
);
export const queryClient = new QueryClient();
