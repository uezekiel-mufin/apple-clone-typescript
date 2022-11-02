import React from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "../utils/helpers";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useAppSelector } from "../redux/hooks";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const cartItems = useAppSelector((state) => state.cartSlice.cart);
  console.log(cartItems);
  const session = false;
  return (
    <header className='sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEC] p-4'>
      <div className='flex items-center justify-center md:w-1/5'>
        <Link href='/'>
          <div className='hover:opacity relative  h-10 w-5 cursor-pointer opacity-75'>
            <Image
              src='https://rb.gy/vsvv2o'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </Link>
      </div>
      <div className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
        {navLinks.map((link) => (
          <a key={link.id} className='headerLink'>
            {link.name}
          </a>
        ))}
      </div>
      <div className='flex items-center justify-center gap-x-4 md:w-1/5'>
        <SearchIcon className='headerIcons' />
        <Link href='/checkout'>
          <div className='relative cursor-pointer'>
            {cartItems.length >= 1 && (
              <span className='absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white'>
                {cartItems.length}
              </span>
            )}
            <ShoppingBagIcon className='headerIcons' />
          </div>
        </Link>

        {session ? (
          <Image
            src={
              // session.user?.image ||
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt=''
            className='cursor-pointer rounded-full'
            width={34}
            height={34}
          />
        ) : (
          <UserIcon className='headerIcons' onClick={() => signIn()} />
        )}
      </div>
    </header>
  );
};

export default Header;
