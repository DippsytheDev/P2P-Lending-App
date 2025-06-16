// src/context/AuthContext.tsx
// authContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  firstName: string
  lastName: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
  
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
  }, []);

  const login = (user: User, token: string) => {
    console.log("Logging in user:", user);
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
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