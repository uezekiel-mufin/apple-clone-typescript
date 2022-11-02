import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Button from "../components/Button";
import Image from "next/image";
import { urlFor } from "../sanity";
import { removeFromCart } from "../redux/cartSlice";
import CheckoutSummary from "../components/CheckoutSummary";
import Currency from "react-currency-formatter";

const CheckoutPage = () => {
  const [newQuantity, setNewQuantity] = useState<string>("");
  const router = useRouter();
  const [ssr, setSsr] = useState(true);
  useEffect(() => {
    setSsr(false);
  }, []);
  const cartItems = useAppSelector((state) => state.cartSlice.cart);
  const dispatch = useAppDispatch();

  if (ssr) {
    return;
  }

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <Layout title='checkout'>
      <main className=' flex min-h-screen justify-center  bg-[#E7ECee] px-8 pb-24'>
        <div className='mx-auto w-full max-w-4xl '>
          <div>
            <div>
              {cartItems.length >= 1 ? (
                <h1 className='my-8 mb-8 w-full text-3xl font-semibold lg:text-4xl '>
                  Review your shopping list <br />
                  <span className='text-base font-normal'>
                    {" "}
                    Free delivery and free return
                  </span>
                </h1>
              ) : (
                <h2 className='flex h-screen w-full flex-col items-center justify-center'>
                  <span className='font-semibold'>Your cart is empty</span>
                  <Button
                    title='Go Shopping'
                    onClick={() => router.push("/")}
                  />
                </h2>
              )}
            </div>
          </div>
          {cartItems.length > 0 && (
            <div className=' max-w-5xl space-y-8 '>
              <hr className='border-b border-solid border-gray-500 ' />
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className='flex flex-col justify-between gap-4 lg:flex-row'
                >
                  <div className='h-16 w-16 transition-all duration-500 ease-in-out hover:scale-150 md:h-24 md:w-24'>
                    <Image
                      src={urlFor(item.image[0]).url()}
                      alt={item.title}
                      layout='responsive'
                      height={50}
                      width={50}
                      className='rounded-xl'
                    />
                  </div>
                  <div className='flex flex-1 items-end justify-between  lg:items-center'>
                    <div className='flex-1 space-y-4'>
                      <div className='flex flex-col gap-y-4 gap-x-8 text-xl lg:flex-row lg:text-2xl'>
                        <h4 className='font-semibold capitalize lg:w-96'>
                          {item.title}
                        </h4>
                        <div>
                          <select
                            name=''
                            id=''
                            className='to rounded-lg bg-indigo-500 bg-gradient-to-r from-pink-600 bg-clip-border p-1 px-2 text-sm text-white focus:outline-none'
                            onChange={(e) => setNewQuantity(e.target.value)}
                          >
                            {[...new Array(item.stock + 1).keys()].map(
                              (numb) => (
                                <option
                                  key={numb + 1}
                                  value={item.quantityOrdered}
                                >
                                  {numb}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <p className='flex cursor-pointer items-center gap-1 text-blue-500 hover:underline'>
                        show prodct details
                        <ChevronDownIcon className='h-4 w-4' />
                      </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                      <Currency
                        quantity={item.price * item.quantityOrdered}
                        currency='USD'
                      />
                      <button
                        className='text-blue-500'
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <hr className='border-b border-solid border-gray-500' />
                </div>
              ))}

              <div>
                <CheckoutSummary cartItems={cartItems} />
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default CheckoutPage;
