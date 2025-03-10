// import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Loader/DotSpinner.css";
import {useEffect,useRef} from "react";
// import { RecoilRoot } from "recoil";
export default function App({ Component, pageProps }: AppProps) {
  const switchCountRef = useRef<number>(0);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        switchCountRef.current += 1;
        if (switchCountRef.current >= 3) {
          alert("⚠️ Test submitted due to multiple tab switches!");
        } else {
          alert(`⚠️ Tab switching is not allowed! (${switchCountRef.current}/3)`);
        }
      }
    };

    const handleBlur = () => {
      alert("⚠️ Do not leave the test window!");
    };

    const disableRightClick = (e: MouseEvent) => e.preventDefault();

    const disableDevTools = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        ["u", "U", "s", "S", "i", "I", "j", "J", "c", "C", "v", "V"].includes(e.key)
      ) {
        e.preventDefault();
      }
      if (e.key === "F12") {
        e.preventDefault();
      }
    };

    const disableCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      alert("⚠️ Copying is not allowed!");
    };

    const disablePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      alert("⚠️ Pasting is not allowed!");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableDevTools);
    document.addEventListener("copy", disableCopy);
    document.addEventListener("paste", disablePaste);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableDevTools);
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("paste", disablePaste);
    };
  }, []);


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
      <div className="flex flex-col min-h-screen text-white">
        {/* <Navbar /> */}
        <Component {...pageProps} />
      </div>
    </AuthProvider>
    // </RecoilRoot>
  );
}
