import { useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import DotSpinnerLoader from "@/components/Loader/DotSpinner";

export default function Profile() {
  const router = useRouter();
  axios.defaults.baseURL = "http://localhost:3000";

  const { user, fetchUser, logout ,loading} = useAuth();



  // Fetch user data if not present
  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };

    if (!user && loading) {
      fetchData();
    }
  }, [user, fetchUser, loading]);

  // Redirect to login if user is not found
  useEffect(() => {
    console.log(user);
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);


  // Show loading state while user data is being fetched
  if (loading) {
    return <DotSpinnerLoader/>
  }

  return (
    <div className="min-h-[90vh] bg-gradient-to-r from-pink-500 to-rose-400 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl mt-20 relative pt-20 pb-8 px-4">
        {/* Profile Image */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white">
            <Image
              src={user?.avatarUrl || "https://cdn-icons-png.flaticon.com/512/16802/16802273.png"}
              alt="Profile picture"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-medium text-gray-700 ">{user?.name}</h1>
          <h3 className="text-2xl font-medium text-gray-700 ">UserId : {user?.id} </h3>
          <h4 className="text-xl font-medium text-gray-700 ">{user?.email}</h4>

          {/* Stats */}
          <div className="flex justify-center gap-12 py-4">
            <div className="text-center">
              <p className="text-3xl font-semibold text-gray-700">65</p>
              <p className="text-gray-500">Friends</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-gray-700">43</p>
              <p className="text-gray-500">Photos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-gray-700">21</p>
              <p className="text-gray-500">Comments</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:opacity-90 transition-opacity px-4 py-2 rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
