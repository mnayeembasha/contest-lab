import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState,useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
export default function App({ Component, pageProps }: AppProps) {


  return (
    // <RecoilRoot>
    <AuthProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <div className="flex flex-col min-h-screen bg-dark-layer-2 text-white">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
    // </RecoilRoot>
  );
}
