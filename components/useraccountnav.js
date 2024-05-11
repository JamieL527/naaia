"use client"

import { signOut } from "next-auth/react"
import React from "react";
import { Button } from "./ui/button"
import Link from "next/link";

const UserAccountnav = ({firstname} ) => {
  return (
    <>
      <Link className="w-[140px] h-[40px] mt-10 py-4 text-center text-lg hover:underline" href='/profile'>
       Hi, {firstname} !
      </Link>
      <Button className="w-[100px] h-[40px] ml-20 mt-12 py-4 text-base text-white bg-indigo-600 rounded-md"
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`
          })
        }
     
      >
        Sign out
      </Button>
    </>
  )
}

export default UserAccountnav
