import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { useAppSelector } from "../redux/hooks";

const CartIcon = () => {
  const cartItems = useAppSelector((state) => state.cartSlice.cart);
  console.log(cartItems);
  if (cartItems.length <= 0) {
    return;
  }
  return (
    <Link href='/checkout'>
      <div className='fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300 transition-all duration-500 ease-linear'>
        <Link href='/checkout'>
          <div className='relative cursor-pointer'>
            <span className='absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] text-white'>
              {cartItems.length}
            </span>
            <ShoppingBagIcon className='headerIcons' />
          </div>
        </Link>
      </div>
    </Link>
  );
};

export default CartIcon;
