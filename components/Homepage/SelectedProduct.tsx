import Image from "next/image";
import React, { useState } from "react";
import { urlFor } from "../../sanity";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const SelectedProduct = ({ activeProducts }: ActiveProductsProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartSlice.cart);
  const [quantityOrdered, setQuantityOrdered] = useState<number>(1);

  const handleAddToCart = (item: ProductsProps) => {
    if (item.stock <= 0) {
      toast.error(`${item.title} is out of stock`);
      return;
    }
    if (quantityOrdered > item.stock) {
      toast.error(`${item.title} is out of stock`);
      return;
    }
    const existingItem = cartItems.find((product) => product._id === item._id);
    if (existingItem) {
      toast.success(`${item.title} has been updated in the cart`);
    } else {
      toast.success(`${item.title} was added to your cart`);
    }
    console.log(cartItems);
    dispatch(addToCart({ ...item, quantityOrdered }));
  };

  return (
    <div className='grid grid-cols-1 gap-4 px-8 text-white transition-all duration-300 ease-linear sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
      {activeProducts.map((product: ProductsProps) => (
        <div
          key={product._id}
          className='flex h-full w-[300px] select-none flex-col space-y-8  rounded-xl bg-[#35383c] p-8 md:h-[450px] md:w-[350px] md:p-10'
        >
          {/* <div className='relative flex h-64 w-64 md:h-72 '> */}
          <Image
            src={urlFor(product.image[0]).url()}
            alt={product.title}
            layout='responsive'
            height={40}
            width={40}
            className=' rounded-2xl'
          />
          {/* </div> */}
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-sm capitalize'> {product.title}</h3>
              <h4>${product.price}</h4>
            </div>
            {product.stock >= 1 && (
              <select
                onChange={(e) => {
                  setQuantityOrdered(+(e.target as HTMLSelectElement).value);
                }}
                name=''
                id=''
                className='to rounded-full bg-indigo-500 bg-gradient-to-r from-pink-600 bg-clip-border p-1 px-2 text-white focus:outline-none'
              >
                {[...new Array(product.stock + 1).keys()].map((item) => (
                  <option key={item + 1}>{item + 1}</option>
                ))}
              </select>
            )}
            <button className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 p-3  text-white md:h-[50px] md:w-[50px]'>
              <AiOutlineShoppingCart
                onClick={() => handleAddToCart(product)}
                className='h-8 w-8'
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedProduct;
