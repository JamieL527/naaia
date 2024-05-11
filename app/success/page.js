"use client"

import Container from "../../components/container";
import Link from "next/link";

const Success = () => {
    return (
        <>
    <Container className="flex flex-wrap">
        <div className="items-center w-full">
          
          <h1 className="p-2 text-center text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
            Thank you!
          </h1>
            <p className="p-2 text-center text-xl  text-gray-800 lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight">Thanks for subscribing to our membership.<br/>
             You should receive a confirmation email soon.</p>
          <div className="flex justify-center items-center">
            
              <Link href="/sign-in" className="w-1/3 px-6 py-2 mt-5 text-center text-white bg-indigo-600 rounded-md">
                Sign in
              </Link>
           
           
          </div>
        </div>
       
        </Container>
        </>
    );
  }

export default Success;