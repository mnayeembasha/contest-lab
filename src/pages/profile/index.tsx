import { useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import DotSpinnerLoader from "@/components/Loader/DotSpinner";

export default function Profile() {
  const router = useRouter();
  // axios.defaults.baseURL = BACKEND_URL;

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
    // console.log(user);
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!user || loading) {
    return <DotSpinnerLoader/>
  }

  function getUsernameCapitalized (username:string):string{
    return username.split(" ").map((word)=>{
      return word[0].toUpperCase()+word.substring(1).toLowerCase()
    }).join(" ");
  }

  return (
   <div className="min-h-[90vh] bg-neutral-900 p-4 flex items-center justify-center">
  <div className="bg-neutral-800 rounded-3xl shadow-xl w-full max-w-2xl mt-20 relative pt-20 pb-8 px-4">
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
      <h1 className="text-4xl font-medium text-gray-200 capitalize">{getUsernameCapitalized(user?.name)}</h1>
      <h3 className="text-2xl font-medium text-gray-300 ">UserId : {user?.id} </h3>
      <h4 className="text-xl font-medium text-gray-400 ">{user?.email}</h4>

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
