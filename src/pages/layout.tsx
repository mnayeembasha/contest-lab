import {ReactNode} from "react";
import Navbar from "@/components/Navbar/Navbar";
export default function Layout({children}:{children:ReactNode}){
    return <div className='flex flex-col min-h-screen text-white bg-dark-layer-2'>
        <Navbar/>
        {children}
    </div>
}