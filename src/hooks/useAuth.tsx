// 'use client';
// import React, { createContext,useContext,useState,useEffect } from "react";
// import axios from "axios";
// import { customizedToast } from "@/utils/Toast/Toast";
// import { BACKEND_URL } from "@/config";


// type User = {
//   id: string;
//   name: string;
//   avatarUrl: string;
//   email?:string;
// };

// type AuthContextType = {
//   user: User | null;
//   setUser: (user: User | null) => void;
//   logout: () => void;
//   fetchUser: () => void;
//   loading:boolean;
//   setLoading: (loading:boolean) => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);


// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

//   useEffect(()=>{
//     localStorage.removeItem("user");
//     fetchUser();
//   },[])


//   const [user, setUser] = useState<User | null>(()=>{
//     if(typeof window !== undefined){
//       return null;
//     }
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   const [loading,setLoading] = useState<boolean>(false);

//   const logout = async () => {
//     try {
//       const response = await axios.post(`${BACKEND_URL}/auth/signout`, {}, { withCredentials: true });

//       if (response.data) {
//         customizedToast({type:"success",message:`Logged out Successfully`})
//         setUser(null);
//         localStorage.removeItem("user");
//         setTimeout(() => {
//           window.location.replace("/"); // Use replace to prevent back navigation
//         }, 500);

//       } else {
//         customizedToast({type:"error",message:`Logout failed`})
//         setTimeout(() => {
//           window.location.replace("/"); // Use replace to prevent back navigation
//         }, 3000);
//       }
//     } catch (error:unknown) {
//       console.log(error);
//       let errorMessage = "";
//       if (axios.isAxiosError(error)) {
//         errorMessage = error.response?.data?.message || "";
//       }
//       customizedToast({type:"error",message:`Logout failed - ${errorMessage || "An unexpected error occurred"}`})
//     }
//   };

//   const fetchUser = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${BACKEND_URL}/auth/me`, { withCredentials: true });
//       if (response.data) {
//         const userDetails = {
//           id:response.data.user.id,
//           name:response.data.user.name,
//           avatarUrl:response.data.user.avatarUrl
//         }
//         setUser(userDetails);
//         localStorage.setItem("user", JSON.stringify(userDetails));
//       }
//     } catch (error) {
//       console.log("Error fetching user:", error);
//     }finally{
//       setLoading(false);
//     }
//   };


//   return (
//     <AuthContext.Provider value={{ user, setUser, fetchUser, logout,loading,setLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };


'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { customizedToast } from "@/utils/Toast/Toast";
import { BACKEND_URL } from "@/config";

type User = {
  teckziteId: string;
  name?: string;
  // profilePic?: string;
  // email?: string;
  // role: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  fetchUser: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    localStorage.removeItem("user");
    fetchUser();
  }, []);

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(false);

  const logout = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/teckzite/signOut`, {}, { withCredentials: true });

      if (response.data) {
        customizedToast({ type: "success", message: "Logged out Successfully" });
        setUser(null);
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location.replace("/"); // Use replace to prevent back navigation
        }, 500);
      } else {
        customizedToast({ type: "error", message: "Logout failed" });
        // setTimeout(() => {
        //   window.location.replace("/");
        // }, 3000);
      }
    } catch (error: unknown) {
      console.log(error);
      let errorMessage = "";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || "";
      }
      customizedToast({
        type: "error",
        message: `Logout failed - ${errorMessage || "An unexpected error occurred"}`
      });
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/teckzite/me`, { withCredentials: true });

      if (response.data) {
        const userDetails: User = {
          teckziteId: response.data.user.teckziteId,
          // username: response.data.user.username,
          // profilePic: response.data.user.profilePic,
          // email: response.data.user.email,
          // role: response.data.user.role
        };
        setUser(userDetails);
        localStorage.setItem("user", JSON.stringify(userDetails));
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

