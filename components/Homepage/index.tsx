import React, { useState } from "react";

import Landing from "./Landing";
import axios from "axios";
import { fetchCategories } from "../../utils/fetchCategories";

const Index = ({ categories }: CatProps) => {
  console.log(categories);
  const [selectedTab, setSelectedTab] = useState<string>("");

  const handleTabSet = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.target.textContent;
    setSelectedTab(el);
  };

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
          <div className='flex justify-center  border-[#35383C]'>
            {categories.map((category) => (
              <div
                key={category._id}
                className={`cursor-pointer whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base  ${
                  selectedTab === category.title
                    ? "borderGradient bg-[#35383c] text-white"
                    : "border-b-2 border-[#35383C] text-[#747474]"
                }`}
                onClick={(e) => handleTabSet(e)}
              >
                {category.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
