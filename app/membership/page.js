"use client"

import React from "react";
import Container from "../../components/container";
import {membership} from "../../components/data";
import Contents from "../../components/content";
import Link from "next/link";

const Membership = () => {
    return (
        <>
    <Container>
      <div className="ml-20 mr-20">
          <div>
            <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
              Membership
           </h1>
           <p className="py-5 text-lg leading-normal text-gray-500 lg:text-lg xl:text-lg">
           Members of the North America AI Association (NAAIA) 
           enjoy a range of benefits tailored to enhance their engagement with the AI community.
            </p>
            <Contents data={membership}/>
            <div className="w-full mt-5">
            <Link href="/sign-up" className="w-full px-6 py-2 mt-5 text-center text-white bg-indigo-600 rounded-md">         
              Become A Member
            </Link>
          </div>
          </div>
      </div>
      
    </Container>
        </>
    );
  }

export default Membership;