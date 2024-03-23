import Link from "next/link";
import React from "react";
import Container from "./container";
import Image from "next/image";


const Benefits = (props) => {
  const { data } = props;
  return (
    <>
      <Container className="flex flex-wrap mt-3 mb-2 lg:gap-10 lg:flex-nowrap">
        <div
          className={`flex items-center justify-center w-full lg:w-1/2 ${
            props.imgPos === "right" ? "lg:order-1" : ""
          }`}>
          <div>
            <Image
              src={data.image}
              width="600"
              height="auto"
              alt="Benefits"
              className={"object-cover"}
              placeholder="blur"
              blurDataURL={data.image.src}
            />
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center w-full lg:w-1/2 ${
            data.imgPos === "right" ? "lg:justify-end" : ""
          }`}>
          <div>
            <div className="flex flex-col w-full mt-2">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl">
                {data.title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
                {data.desc}
              </p>
            </div>

            <div className="w-full mt-2">
              {data.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Benefit>
              ))}
            </div>
            <div className="w-full mt-5">
                <Link href="/membership" className="w-full px-6 py-2 mt-5 text-center text-white bg-indigo-600 rounded-md">         
                        Become A Member
                </Link>
            </div>

          </div>
        </div>
      </Container>
    </>
  );
};

function Benefit(props) {
  return (
    <>
      <div className="flex items-start mt-1 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-4 h-4 ">
          
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800">
            {props.title}
          </h4>
        </div>
      </div>
    </>
  );
}

export default Benefits;
