import React, { createContext, useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

type User = {
  id: string;
  name: string;
  email:string;
  avatarUrl: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  logout: () => void;
  fetchUser: () => void;
  loading:boolean;
  setLoading: (loading:boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading,setLoading] = useState<boolean>(false);
  const isLoggedIn = user !== null;

  const logout = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signout`, {}, { withCredentials: true });

      if (response.data) {
        toast.success("Logged Out Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
        setUser(null);
        setTimeout(() => {
          window.location.replace("/"); // Use replace to prevent back navigation
        }, 500);

      } else {
        toast.error("Logout failed", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
        setTimeout(() => {
          window.location.replace("/"); // Use replace to prevent back navigation
        }, 3000);
      }
    } catch (error:unknown) {
      console.log(error);
      let errorMessage = "";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || "";
      }
      toast.error(`Logout failed - ${errorMessage || "An unexpected error occurred"}`, {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/auth/me`, { withCredentials: true });
      if (response.data) {
        setUser(response.data.user);
        setLoading(false);
        console.log("user=",response.data.user);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }finally{
      setLoading(false);
    }
  };


  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, fetchUser, logout,loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
