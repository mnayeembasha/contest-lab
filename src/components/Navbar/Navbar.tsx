
// import Image from "next/image";
// import Link from "next/link";
// import { useSetRecoilState } from "recoil";
type NavbarProps = {"profile"?:true};
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Navbar: React.FC<NavbarProps> = () => {
	const {user} = useAuth();
	return (
		<div className='sm:px-12 px-4 py-3  bg-dark-layer-2 border-b border-gray-600'>
			<div className='flex justify-between items-center'>
				<div className="text-2xl tracking-tight font-bold bg-gradient-to-b  from-amber-300 to-amber-600 text-transparent bg-clip-text"><Link href={"/"}>Contest-Lab</Link></div>
				<div>
					{user?<Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center">
            <Image
              src={user?.avatarUrl || "https://cdn-icons-png.flaticon.com/512/16802/16802273.png"}
              alt="Profile picture"
              width={20}
              height={20}
              className="object-cover w-full h-full"
            />
          </Link>:<Link href="/login"
					className=''
				>
					<Button className="bg-gradient-to-b from-amber-300 to-amber-600 text-gray-700 text-md px-2 py-1 sm:px-4 rounded-md font-semibold
                transition duration-300 ease-in-out">Login</Button>
				</Link>}
				</div>
			</div>
		</div>
	);
};
export default Navbar;