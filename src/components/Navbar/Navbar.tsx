
// import Image from "next/image";
// import Link from "next/link";
// import { useSetRecoilState } from "recoil";
type NavbarProps = {"profile"?:true};
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar: React.FC<NavbarProps> = () => {
	const {user} = useAuth();
	return (
		<div className='sm:px-12 px-4 py-3 md:px-24 bg-dark-layer-2 border-b border-gray-600'>
			<div className='flex justify-between items-center'>
				<div className="text-xl tracking-tight font-bold bg-gradient-to-b from-amber-100 to-amber-300 text-transparent bg-clip-text"><Link href={"/"}>Contest-Lab</Link></div>
				<div>
					{user?<Link href="/signin"
					className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-semibold
                hover:bg-brand-orange-s  border-2 border-transparent
                transition duration-300 ease-in-out
                '
				>
					Sign In
				</Link>:<Link href="/profile" className="w-8 h-8 rounded-full overflow-hidden border-4 border-white bg-white flex justify-center items-center">
            <Image
              src={"https://cdn-icons-png.flaticon.com/512/16802/16802273.png"}
              alt="Profile picture"
              width={20}
              height={20}
              className="object-cover"
            />
          </Link>}
				</div>
			</div>
		</div>
	);
};
export default Navbar;