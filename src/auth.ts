// src/api/auth.ts
import axios from 'axios';
import { data } from 'react-router-dom';

const BASE_URL = 'https://lendpool-api-web.onrender.com'; 

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/lendpool/api/v1/login`, { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string, role: 'lender' | 'borrower') => {
  const response = await axios.post(`${BASE_URL}/lendpool/api/v1/register`, { fullName : name, email, password,role});
  return response.data;
};