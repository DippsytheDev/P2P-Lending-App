// src/context/AuthContext.tsx
// authContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { publicApi } from "../lib/axios";

interface User {
  firstName: string
  lastName: string
  email: string
  role: string
  userId:string
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  refreshToken: string | null;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | null>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");
  
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user"); // Clear invalid data
      }
    } else {
      console.warn("No valid user found in localStorage.");
      localStorage.removeItem("user"); // Clean up if "undefined" was stored
    }
  
    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
    } else {
      console.warn("No valid token found in localStorage.");
      localStorage.removeItem("token");
    }

    if (storedRefreshToken && storedRefreshToken !== "undefined") {
      setRefreshToken(storedRefreshToken);
    } else {
      console.warn("No valid refresh token found in localStorage.");
      localStorage.removeItem("refreshToken");
    }
    
    setLoading(false);
  }, []);

  const login = (user: User, token: string, refreshToken: string) => {
    console.log("Logging in user:", user);
    setUser(user);
    setToken(token);
    setRefreshToken(refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    if (!refreshToken) {
      console.error("No refresh token available");
      logout();
      return null;
    }

    try {
      const response = await publicApi.post(
        "/auth/refresh-token",
        {
          refreshToken: refreshToken
        }
      );

      const newToken = response.data.token || response.data.accessToken;
      if (newToken) {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        console.log("Token refreshed successfully");
        return newToken;
      } else {
        console.error("No token in refresh response");
        logout();
        return null;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      refreshToken,
      login, 
      logout, 
      refreshAccessToken,
      setUser, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};