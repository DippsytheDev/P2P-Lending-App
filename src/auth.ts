// src/api/auth.ts
import { publicApi } from "./lib/axios"

export const login = async (email: string, password: string) => {
  try {
    // Try the auth/login endpoint first
    const response = await publicApi.post(`/auth/login`, {
      email,
      password,
    })
    return response.data
  } catch (error) {
    console.log("Auth/login failed, trying /login...");
    // Fallback to /login endpoint
    const response = await publicApi.post(`/login`, {
      email,
      password,
    })
    return response.data
  }
}

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: "Lender" | "Borrower"
) => {
  const response = await publicApi.post(`/auth/register`, {
    firstName,
    lastName,
    email,
    password,
    role,
  })
  return response.data
}
