"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { customizedToast } from "@/utils/Toast/Toast";
import DotSpinnerLoader from "@/components/Loader/DotSpinner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


// Define form schema
const loginSchema = z.object({
  teckziteId: z.string().min(1, "Teckzite ID is required"),
  password: z.string().min(1, "Password is required"),
});

// Define TypeScript type from schema
type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user,setUser } = useAuth();


  useEffect(() => {
    if (user) {
      // customizedToast({
      //   type: "error",
      //   position: "top-center",
      //   message: "Login to continue to contest",
      // });

      // localStorage.setItem("redirectPath", pathName);
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      console.log(redirectPath)
      router.push(redirectPath);
    }
  }, [router,user]);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  // const teckziteId = watch("teckziteId");

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    console.log("Submitting:", data);

    try {
      const response = await axios.post(`${BACKEND_URL}/teckzite/login`, data, { withCredentials: true });

      console.log(response.data.message);
      customizedToast({
        type: "success",
        position: "top-center",
        message: response.data.message,
      });

      setUser({
        teckziteId:response.data.teckziteId
      })

      // Ensure we get the redirect path before navigating
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      // localStorage.removeItem("redirectPath"); // Optional: Remove after using it
      router.push(redirectPath);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        customizedToast({
          type: "error",
          position: "top-center",
          message: error.response?.data?.message || "Error submitting contest",
        });
      } else {
        console.error("Unexpected error:", error);
        customizedToast({
          type: "error",
          position: "top-center",
          message: "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <DotSpinnerLoader />;
  }

  return (
    <div className="">
      {/* <Navbar/> */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#0f1118] via-[#1a1b25] to-[#23162e]">
        {/* Glass panel */}

        <div
          className={`relative z-10 backdrop-blur-lg bg-white/5 p-10 md:p-14 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] w-[90%] max-w-md transition-all duration-1000 ease-out`}
        >
          {/* Accent circles */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"></div>

          {/* Brand chip */}
          <div className="flex justify-center mb-8">
            <div className="px-4 py-1 text-xs font-bold tracking-wider text-white/70 bg-white/10 rounded-full  mb-2">
              Welcome to AlgoHustle
            </div>
          </div>

          {/* Logo & Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-600/80 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <h1
              className={`text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-1000 delay-100`}
            >
              Login
            </h1>
            {/* <p
              className={`text-white/60 text-center max-w-xs transition-all duration-1000 delay-200`}
            >
              Sign in with your Teckzite Details to continue to this platform
            </p> */}
          </div>

          <Card className="w-full max-w-sm  bg-transparent border-none shadow-none">
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Teckzite ID"
                    {...register("teckziteId")}
                    name="teckziteId" // Ensure name is explicitly defined
                    disabled={loading}
                    className="text-gray-300 "
                  />
                  {errors.teckziteId && (
                    <p className="text-red-500 text-sm">
                      {errors.teckziteId.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    name="password" // Ensure name is explicitly defined
                    disabled={loading}
                    className="text-gray-300 "
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
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
