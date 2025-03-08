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
  setAuthToken: (token: string | null) => void;
  logout: () => void;
  fetchUser: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load authToken from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      setLoading(true);

      if (!authToken) {
        customizedToast({ type: "error", message: "No authentication token found." });
        return;
      }

      const response = await axios.post(
        `${BACKEND_URL}/teckzite/signOut`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data) {
        customizedToast({ type: "success", message: "Logged out Successfully" });
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      customizedToast({
        type: "error",
        message: `Logout failed - ${
          axios.isAxiosError(error) ? error.response?.data?.message || "An unexpected error occurred" : "An unexpected error occurred"
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);

      if (!authToken) {
        setUser(null);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/teckzite/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data?.user) {
        const userDetails: User = {
          teckziteId: response.data.user.teckziteId,
          name: response.data.user.name,
        };
        setUser(userDetails);
        localStorage.setItem("user", JSON.stringify(userDetails));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authToken, setAuthToken, fetchUser, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
