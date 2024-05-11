import React from "react";
import { authOptions } from '../lib/auth';
import { getServerSession } from 'next-auth';
import NavMenu from "./navmenu";
import UserAccountnav from "./useraccountnav";
import Link from "next/link";


const Navbar = async() => {
  const session = await getServerSession(authOptions);
  return (
     <nav className="container sticky top-0 bg-white flex mx-auto lg:justify-between xl:px-0 ">
       
       <NavMenu/>
       <div className="flex space-x-4">
         {session?.user ? (
          <UserAccountnav firstname={session?.user.firstname} />
          ): (
          <Link href="/sign-in" className="w-[100px] h-[40px] text-center ml-20 mt-12 pt-2 text-white bg-indigo-600 rounded-md">
             Sign in
          </Link> 
         )}
       </div>
     </nav>
 );
}



export default Navbar;