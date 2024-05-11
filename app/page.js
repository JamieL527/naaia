"use client";

import Hero from "../components/hero";
import { benefit } from "../components/data";
import Benefits from "../components/benefits";

const Home = () => {
  return (
    <>
      <Hero />
      <Benefits data={benefit} />
    </>
  );
};

export default Home;
