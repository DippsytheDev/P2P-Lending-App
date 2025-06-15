import axios from "axios"

export const createPool = async (payload: any, token: string) => {
  return axios.post("/api/pools", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
}
