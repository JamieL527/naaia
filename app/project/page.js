"use client"

import Container from "../../components/container";
import Projects from "../../components/projects";

const Project = () => {
    return (
        <>
    <Container className="flex flex-wrap">
        <div className="items-center w-full">
          <div>
            <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
            non-profit AI project
           </h1>
           <p className="py-5 text-lg leading-normal text-gray-500 lg:text-lg xl:text-lg">
           The North America Artificial Intelligence (AI) Association is at the forefront of innovative non-profit AI research projects, 
           aimed at solving real-world challenges for a better society. 
           Our focus spans critical sectors like healthcare, education, and environmental sustainability. 
           Our vision is centered on not just advancing AI technology but also ensuring its ethical application, 
           emphasizing responsible use that aligns with the highest standards of AI ethics. 
           We're calling on AI professionals and volunteers to join us in this impactful journey. 
           By contributing your expertise, you'll collaborate with experts and industry leaders, 
           driving solutions that shape a more equitable and prosperous future. 
           Join us in harnessing AI's potential to make a lasting, positive difference in the world.
           </p>
          </div>
        </div>
        </Container>
        <Projects/>
       
        </>
    );
  }

export default Project;