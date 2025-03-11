'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { customizedToast } from "@/utils/Toast/Toast";
import { BACKEND_URL } from "@/config";

type User = {
  teckziteId: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  authToken: string | null;
  setAuthToken: (token: string |null) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  loading: boolean;
  setLoading:(loading:boolean)=>void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null;

      if (token) setAuthToken(token);
      if (storedUser) setUser(JSON.parse(storedUser));

      try {
        if (token) await fetchUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Persist authToken changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (authToken) {
      localStorage.setItem("token", authToken);
    } else {
      localStorage.removeItem("token");
    }
  }, [authToken]);

  // Persist user changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      if (!authToken) return;

      const response = await axios.get(`${BACKEND_URL}/teckzite/me`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (response.data?.teckziteId) {
        const userData = {
          teckziteId: response.data.teckziteId,
          name: response.data.name || ''
        };
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      if (authToken) {
        await axios.post(`${BACKEND_URL}/teckzite/signOut`, {}, {
          headers: { Authorization: `Bearer ${authToken}` }
        });
      }

      setUser(null);
      setAuthToken(null);

      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // localStorage.clear();
      }
    } catch (error) {
      console.error("Logout error:", error);
      customizedToast({
        type: "error",
        message: "Logout failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser,authToken, setAuthToken,logout, fetchUser, loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};