"use client"

import Container from "../../components/container";
import { goals, activities } from "../../components/data";
import Contents from "../../components/content";

const About = () => {
    return (
        <>
    <Container className="flex flex-wrap">
        <div className="items-center w-full">
          <div>
            <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
              Who are we?
           </h1>
           <p className="pt-5 text-lg leading-normal text-gray-500 lg:text-lg xl:text-lg">
            The North America Artificial Intelligence (AI) Association (NAAIA) aims to 
            advance and promote the AI research, education, spanning from 
            elementary levels to university and career training, technology 
            industrialization, and responsible use of artificial intelligence 
            for the benefit of society, by fostering collaboration among 
            AI professionals, academics, and industry leaders. 
            Our goal is to make AI accessible and useful for everyone, enhancing 
            learning, collaboration, and innovation in the professional world.
            </p>
            </div>
          </div>
     </Container>
            <Contents data={goals} />
            <Contents data={activities}/>

        </>
    );
  }

export default About;