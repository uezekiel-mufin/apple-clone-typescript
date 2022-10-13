import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className='hover:opacity relative  h-10 w-5 cursor-pointer opacity-75'>
        <Image src='https://rb.gy/vsvv2o' layout='fill' objectFit='contain' />
      </div>
    </header>
  );
};

export default Header;
