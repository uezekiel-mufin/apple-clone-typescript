import { GetServerSideProps } from "next";
import React from "react";
import Landing from "./Landing";

const Index = () => {
  return (
    <>
      <main className='relative h-[200vh] bg-[#E7ECEC]'>
        <Landing />
      </main>
      <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
        <div className='space-y-10 py-16'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>
            New Promos
          </h1>
        </div>
      </section>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
