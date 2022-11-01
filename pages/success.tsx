import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GoCheck } from "react-icons/go";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { useMediaQuery } from "react-responsive";

const Success = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { session_id } = router.query;

  useEffect(() => {
    setMounted(true);
  }, []);

  //showOrderSummary always true for desktop but only conditionally true for mobile
  const isTabletOrMobile = useMediaQuery({ query: "{max-width:1024px}" });
  return (
    <div>
      <Head>
        <title>Thank You! - Apple</title>
        <link rel='icon' href='/favicon' />
      </Head>
      <header className='mx-auto max-w-xl'>
        <Link href='/'>
          <div className='relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden'>
            <Image
              src='https://rb.gy/vsvv2o'
              alt='image'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </Link>
      </header>

      <main>
        <section className='order-2 mx-auto max-w-xl pb-12 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44'>
          <Link href='/'>
            <div className='relative ml-4 hidden h-24 w-12 cursor-pointer transition lg:inline-flex'>
              <Image
                src='https://rb.gy/vsvv2o'
                alt='image'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </Link>

          <div className='my-8 ml-4 flex space-x-4 lg:ml-14 xl:ml-0'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-black'>
              <GoCheck className='h-8 w-8' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>
                Order #{session_id?.slice(-5)}
              </p>

              <h4 className='text-lg'>
                Thank you{" "}
                {/* {session ? session?.user?.name?.split(" ")[0] : "Guest"} */}
              </h4>
            </div>
          </div>

          <div className='border-gray mx-4 divide-y divide-gray-300 rounded-md border p-4 lg:ml-14'>
            <div className='space-y-2 pb-3'>
              <p>Your order is confirmed</p>
              <p className='text-gtay-600 text-sm'>
                We've accepted your order, and we're getting it ready. Come back
                to this page for updates on your shipment status
              </p>
            </div>
            <div className='pt-3 text-sm'>
              <p className='font-medium text-gray-600'>
                Other tracking number:
              </p>
              <p>CNB21441622</p>
            </div>
          </div>

          <div className='my-4 mx-4 space-y-2 rounded-md border border-gray-300 p-4 lg:ml-14'>
            <p>Prder updates</p>
            <p className='text-sm text-gray-600'>
              You'll get shipping and delivery updates by email and text.
            </p>
          </div>
          <div>
            <p className='hidden lg:inline'>Need help? Contact us</p>

            {mounted && (
              <Button
                title='continue shipping'
                onClick={() => router.push("/")}
                width={isTabletOrMobile ? "w-full" : undefined}
                padding='py-4'
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Success;
