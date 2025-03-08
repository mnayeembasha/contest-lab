type NavbarProps = { profile?: true,backgroundColor?:string };
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Navbar: React.FC<NavbarProps> = ({backgroundColor}) => {
  const { user } = useAuth();
  const pathName = usePathname();
  return (
    //border-b border-gray-600
    <div className={`x-12 md:px-6 py-3 ${backgroundColor}`}>
      <div className="flex justify-between items-center">
        <div className="text-2xl tracking-tighter font-bold bg-gradient-to-b  from-amber-300 to-amber-600 text-transparent bg-clip-text">
          <Link href={"/"}>Algo Hustle</Link>
        </div>
        <div>
          {user ? (
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center"
            >
              <Image
                src={
                  "https://cdn-icons-png.flaticon.com/512/16802/16802273.png"
                }
                alt="Profile picture"
                width={20}
                height={20}
                className="object-cover w-full h-full"
              />
            </Link>
          ) : (
            <Link href={"/login"}>
              {/* bg-gradient-to-b from-amber-300 to-amber-600 text-neutral-800 */}
              <Button
                className="login-btn tracking-tight font-bold text-md px-2 sm:px-4 rounded-3xl
                transition duration-300 ease-in-out"
                onClick={()=>localStorage.setItem("redirectPath",pathName)}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
