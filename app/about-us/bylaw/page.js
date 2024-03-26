"use client"

import Container from "../../../components/container";
import { policyContent } from '../../../components/policycontent';

const ByLaw = () => {
  const scrolltoHash = (hash) => {
    const element = document.getElementById(hash);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  };


  return (
    <> 
     <Container className="flex flex-wrap">
      <div className="items-center w-full">
          <ul>
            <li className="mb-3">
              <h2 className="text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-3xl lg:leading-tight xl:text-3xl xl:leading-tight">
                Contents
              </h2>
            </li>
            {Object.keys(policyContent).map((section) => (
            <li key={section} className="mb-3">
              <a onClick={() => scrolltoHash(section)} className="text-blue-500 underline mb-4 ml-2 hover:text-indigo-600">
                 {policyContent[section].title}</a>
            </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
        {Object.keys(policyContent).map((section) => (
            <section key={section} id={section}>
            <h2 className="text-2xl font-extrabold text-gray-800"> {policyContent[section].title}</h2>
             {policyContent[section].content.map((item, index) => (
                <p key={index} className="py-2 leading-normal text-gray-500">
                  {item.heading && <strong>{item.heading}:</strong>} {item.text}
                </p>
              ))}
            </section>
          ))}
        </div>
    </Container>
    </>
  );
};

export default ByLaw;

    