import Image from "next/image";
import Container from "./container";
import heroImg from "../public/img/main.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight">
              Welcome to NAAIA!
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-xl">
            The North America Artificial Intelligence (AI) Association aims to 
            advance and promote the AI research, education, spanning from 
            elementary levels to university and career training, technology 
            industrialization, and responsible use of artificial intelligence 
            for the benefit of society, by fostering collaboration among 
            AI professionals, academics, and industry leaders. 
            Our goal is to make AI accessible and useful for everyone, enhancing 
            learning, collaboration, and innovation in the professional world.
            </p>
            <Link href="/about-us" className="px-5 py-2 text-white bg-indigo-600 rounded-md">
              Read More About NAAIA
          </Link>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="570"
              height="570"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
export default Hero;