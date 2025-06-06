// src/api/auth.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:5155/api'; 

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string, role: 'lender' | 'borrower') => {
  const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password,role});
  return response.data;
};