import axios from 'axios';

// const baseURL = import.meta.env.VITE_API_URL;
const baseURLTest = 'http://localhost:3333';

export const api = axios.create({
  // baseURL,
  baseURL: baseURLTest,
});
