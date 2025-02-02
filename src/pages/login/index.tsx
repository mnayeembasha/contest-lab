'use client';
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const { user,loading,setLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if user is not found
  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  if (loading || user) {
    return (
      <div className="text-white text-xl flex justify-center items-center min-h-[90vh]">
        Loading...
      </div>
    );
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      window.location.href = "http://localhost:3000/auth/google";
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="bg-black/60 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Welcome!
        </h1>
        <p className="text-lg text-gray-300 text-center mb-6">
          Login to showcase your skills and compete in coding contests!
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 mb-4 bg-blue-600 text-white rounded-lg flex justify-center items-center hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
        >
          <>
            <i className="bi bi-google text-2xl mr-3"></i>
            Sign In with Google
          </>
        </button>
      </div>
    </div>
  );
}
