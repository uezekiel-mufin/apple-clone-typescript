import Image from "next/image";
import React from "react";
import { urlFor } from "../../sanity";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAppDispatch } from "../../redux/hooks";
import { addToCart } from "../../redux/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const SelectedProduct = ({ activeProducts }: ActiveProductsProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (item: ProductsProps) => {
    dispatch(addToCart(item));
    toast.success(`${item.title} was added to your cart`);
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
          <div className='flex items-center justify-between px-4'>
            <div>
              <h3 className='capitalize'> {product.title}</h3>
              <h4>${product.price}</h4>
            </div>
            <button className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 p-3  text-white md:h-[70px] md:w-[70px]'>
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
