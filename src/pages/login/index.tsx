import { useEffect, useState } from "react";
import DotSpinnerLoader from "@/components/Loader/DotSpinner";
import { BACKEND_URL } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { user, loading, setLoading } = useAuth();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [checkedAuth, setCheckedAuth] = useState<boolean>(false);

  // Load redirectPath from localStorage once
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPath = localStorage.getItem("redirectPath") || "/";
      setRedirectPath((prev) => prev ?? storedPath); // Only update if it's null

      if (localStorage.getItem("user")) {
        router.replace(storedPath);
      } else {
        setCheckedAuth(true);
      }
    }
  }, [router]);

  // Fetch user only when necessary
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       if (!user && checkedAuth) {
  //         await fetchUser(); // Ensure fetchUser is awaited properly
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user:", err);
  //     }
  //   };

  //   checkAuth();
  // }, [user, checkedAuth, fetchUser]);

  // Redirect if user is authenticated
  useEffect(() => {
    if (user && redirectPath) {
      router.replace(redirectPath);
    }
  }, [user, redirectPath, router]);

  // Show loader if authentication check isn't complete
  if (loading || !checkedAuth) {
    return <DotSpinnerLoader />;
  }

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = `${BACKEND_URL}/auth/google`;
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
