// src/api/auth.ts
import axios from "axios"

const BASE_URL = "https://lendpool-api-web.onrender.com"

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/lendpool/api/v1/login`, {
    email,
    password,
  })
  return response.data
}

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: "Lender" | "Borrower"
) => {
  const response = await axios.post(`${BASE_URL}/lendpool/api/v1/register`, {
    firstName,
    lastName,
    email,
    password,
    role,
  })
  return response.data
}
