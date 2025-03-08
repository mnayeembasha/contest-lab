import { useEffect } from "react";
import DotSpinnerLoader from "@/components/Loader/DotSpinner";
import { BACKEND_URL } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Login() {
  const router = useRouter();
  const { user, loading, setLoading } = useAuth();


  useEffect(() => {
    if (user) {
      // customizedToast({
      //   type: "error",
      //   position: "top-center",
      //   message: "Login to continue to contest",
      // });

      // localStorage.setItem("redirectPath", pathName);
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      router.push(`${redirectPath}`);
    }
  }, [router,user]);

  // Load redirectPath from localStorage once
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const storedPath = localStorage.getItem("redirectPath") || "/";
  //     setRedirectPath((prev) => prev ?? storedPath); // Only update if it's null

  //     if (localStorage.getItem("user")) {
  //       router.replace(storedPath);
  //     } else {
  //       setCheckedAuth(true);
  //     }
  //   }
  // }, [router]);

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
  // useEffect(() => {
  //   if (user && redirectPath) {
  //     router.replace(redirectPath);
  //   }
  // }, [user, redirectPath, router]);

  // Show loader if authentication check isn't complete
  if (loading) {
    return <DotSpinnerLoader />;
  }

  const handleGoogleLogin = () => {
    setLoading(true);
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="">
      {/* <Navbar/> */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#0f1118] via-[#1a1b25] to-[#23162e]">
      {/* Glass panel */}

      <div
        className={`relative z-10 backdrop-blur-lg bg-white/5 p-10 md:p-14 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] w-[90%] max-w-md transition-all duration-1000 ease-out`}>
        {/* Accent circles */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"></div>

        {/* Brand chip */}
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1 text-xs font-medium tracking-wider text-white/70 bg-white/10 rounded-full uppercase mb-2">
            Welcome
          </div>
        </div>

        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-600/80 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-1000 delay-100`}>
             Login
          </h1>
          <p className={`text-white/60 text-center max-w-xs transition-all duration-1000 delay-200`}>
            Sign in with your Google account to continue to this platform
          </p>
        </div>

        {/* Google Sign-in Button */}
        <div className={`transition-all duration-1000 delay-300`}>
          <Button
            variant="outline"
            className="w-full py-6 text-base bg-white hover:bg-white/90 text-[#24292e] border-0 shadow-md flex items-center justify-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 326667 333333"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path
                d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38204 3428 342c31481-29074 49630-71852 49630-122468z"
                fill="#4285f4"
              ></path>
              <path
                d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                fill="#34a853"
              ></path>
              <path
                d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851z"
                fill="#fbbc04"
              ></path>
              <path
                d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260z"
                fill="#ea4335"
              ></path>
            </svg>
            Sign in with Google
          </Button>
        </div>


      </div>

      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj4KICA8cGF0aCBvcGFjaXR5PSIwLjA1IiBmaWxsPSIjZmZmZmZmIiBkPSJNMzAgMEMxMy40IDAgMCAxMy40IDAgMzBzMTMuNCAzMCAzMCAzMCA2MC0xMy40IDYwLTMwUzQ2LjYgMCAzMCAwem0wIDUzLjNDMTcuMSA1My4zIDYuNyA0Mi45IDYuNyAzMCwgMTcuMSA2LjcgMzAgNi43IDUzLjMgMTcuMSA1My4zIDMwIDQyLjkgNTMuMyAzMCA1My4zeiIvPgo8L3N2Zz4=')] opacity-5"></div>
      </div>
    </div>
    </div>
  );
}
