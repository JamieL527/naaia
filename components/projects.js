import React from "react";
import {projects} from "../components/data";

export default function Projects() {
  return (
    <section className="bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 py-8 pb-40">
          {projects.map((proj,index) => (
            <ProjectCard
              title={proj.title}
              link={proj.link}
              imgUrl={proj.imgUrl}
              key={index}
            />
          ))}
        </div>
      </section>

  );
}

const ProjectCard = ({ title, link, imgUrl }) => {
  return (
    <a href={link} className="reletive w-full block shadow-2xl">
      <div >
        <div className="h-60 object-cover">
          <img
            src={imgUrl}
            alt="projects"
          />
        </div>
        <h1 className="reletive text-center text-white font-bold text-xl bg-indigo-600 rounded-md">
          {title}
        </h1>
      </div>
    </a>
  );
};