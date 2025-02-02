import Navbar from "@/components/Navbar/Navbar";
import { AuthProvider } from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
	return (
			<AuthProvider>
			<div className="flex flex-col min-h-screen bg-dark-layer-2 text-white">
				<ToastContainer />
				<Navbar/>
				<Component {...pageProps} />
			</div>
			</AuthProvider>

	);
}
