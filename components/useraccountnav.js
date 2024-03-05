"use client"

import { signOut } from "next-auth/react"
import React from "react";
import { Button } from "./ui/button"

const UserAccountnav = ({firstname} ) => {
  return (
    <>
      <span className=" w-[140px] h-[40px] mt-1 py-4 text-center text-lg">Hi, {firstname} !</span>
      <Button className="w-[100px] h-[40px] ml-20 mt-3 py-4 text-base text-white bg-indigo-600 rounded-md"
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
