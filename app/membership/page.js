"use client"

import React from "react";
import Container from "../../components/container";
import {membership} from "../../components/data";
import Contents from "../../components/content";
import Link from "next/link";

const Membership = () => {
    return (
        <>
    <Container className="flex flex-wrap">
        <div className="items-center w-full">
          <div>
            <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
              Membership
           </h1>
           <p className="pt-5 text-lg leading-normal text-gray-500 lg:text-lg xl:text-lg">
           Members of the North America AI Association (NAAIA) 
           enjoy a range of benefits tailored to enhance their engagement with the AI community.
            </p>
            </div>
        </div>
      
    </Container>
    <Contents data={membership}/>

    <Container className="flex flex-wrap">
      <div className="w-full">
        <Link href="/sign-up" className="w-full px-6 py-2 text-center text-white bg-indigo-600 rounded-md">         
          Become A Member
        </Link>
      </div>
    </Container>
    </>
    );
  }

export default Membership;