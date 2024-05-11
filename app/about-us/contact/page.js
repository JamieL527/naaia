"use client"

import Container from "../../../components/container";
import { address, email } from "../../../components/data";
import Contents from "../../../components/content";

const Contact = () => {
    return (
        <>
    <Container className="flex flex-wrap">
        <div className="items-center w-full">
          <div>
            <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
              Contact NAAIA
           </h1>
           </div>
        </div>
        </Container>
        
            <Contents data={address} />
            <Contents data={email}/>
         
        </>
    );
  }

export default Contact;