import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Link from "next/link";
import Button from "../components/Button";
const CheckoutPage = () => {
  const router = useRouter();
  const [ssr, setSsr] = useState(true);
  useEffect(() => {
    setSsr(false);
  }, []);
  const cartItems = useAppSelector((state) => state.cartSlice.cart);

  if (ssr) {
    return;
  }

  return (
    <Layout title='checkout'>
      <main>
        <div>
          <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
            {cartItems.length >= 1 ? (
              "Review your shopping list"
            ) : (
              <h2 className='flex h-screen w-full flex-col items-center justify-center'>
                <span className='font-semibold'>Your cart is empty</span>
                <Button title='Go Shopping' onClick={() => router.push("/")} />
              </h2>
            )}
          </h1>
        </div>
      </main>
    </Layout>
  );
};

export default CheckoutPage;
