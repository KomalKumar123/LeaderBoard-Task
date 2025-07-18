import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/users';

export const getUsers = () => axios.get(BASE_URL);
export const createUser = (username) => axios.post(`${BASE_URL}/create`, { username });
export const claimPoints = (userId) => axios.post(`${BASE_URL}/claim/${userId}`);
export const getClaimHistory = (userId) => axios.get(`${BASE_URL}/history/${userId}`);
