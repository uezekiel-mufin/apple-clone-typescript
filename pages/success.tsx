import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { GoCheck } from "react-icons/go";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { useMediaQuery } from "react-responsive";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { GetServerSideProps } from "next";
import { fetchLineItems } from "../utils/fetchLineItems";
import CurrencyFormat from "react-currency-format";
import { useSession } from "next-auth/react";

interface Props {
  products: StripeProduct[];
}

const Success = ({ products }: Props) => {
  console.log(products);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { session_id } = router.query;
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = products.reduce(
    (acc, product) => acc + product.amount_subtotal,
    0
  );
  console.log(products);
  const { data: session } = useSession();

  //showOrderSummary always true for desktop but only conditionally true for mobile
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const showOrderSummaryCondition = isTabletOrMobile ? showOrderSummary : true;

  const handleShowOrderSummary = () => {
    setShowOrderSummary(!showOrderSummary);
  };
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

      <main className='grid grid-cols-1 lg:grid-cols-9'>
        <section className='order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44'>
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
                {session ? session?.user?.name?.split(" ")[0] : "Guest"}
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
          <div className='mx-4 flex flex-col items-center justify-between text-sm lg:ml-14 lg:flex-row'>
            <p className='hidden lg:inline'>Need help? Contact us</p>

            {mounted && (
              <Button
                title='continue shipping'
                onClick={() => router.push("/")}
                // width='w-full'
                width={`${isTabletOrMobile && "w-full"}`}
                padding='py-4'
              />
            )}
          </div>
        </section>

        {mounted && (
          <section className='col-span-4 overflow-y-scroll border-y border-l border-gray-300 bg-[#fafafa] lg:col-span-4 lg:h-screen lg:border-y-0'>
            <div
              className={`w-full ${
                showOrderSummaryCondition && "border-b"
              } border-gray-300 text-sm lg:hidden`}
            >
              <div className='mx-auto flex max-w-xl items-center justify-between py-6 px-4 '>
                <button
                  onClick={handleShowOrderSummary}
                  className='flex items-center space-x-2'
                >
                  <ShoppingCartIcon className='h-6 w-6' />
                  <p>Show order summary</p>
                  {showOrderSummaryCondition ? (
                    <ChevronUpIcon className='h-4 w-4' />
                  ) : (
                    <ChevronDownIcon className='h-4 w-4' />
                  )}
                </button>

                <p className='text-xl font-medium text-black'>
                  <CurrencyFormat
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    value={subtotal + 20}
                  />
                </p>
              </div>
            </div>
            {showOrderSummaryCondition && (
              <div className='mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16'>
                <div className='space-y-4 pb-4'>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className='flex items-center space-x-4 text-sm font-medium'
                    >
                      <div className='relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1f1f1] text-xs text-white'>
                        <div className='relative h-7 w-7 animate-bounce rounded-md'>
                          <Image
                            src='https://rb.gy/vsvv2o'
                            layout='fill'
                            objectFit='contain'
                          />
                        </div>

                        <div className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs'>
                          {product.quantity}
                        </div>
                      </div>
                      <p className='flex-1'>{product.description}</p>
                      <p>
                        <CurrencyFormat
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          value={product.price.unit_amount / 100}
                        />
                      </p>
                    </div>
                  ))}
                </div>
                <div className='space-y-1 py-4'>
                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>Subtotal</p>
                    <p className='font-medium'>
                      <CurrencyFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        value={subtotal}
                      />
                    </p>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>Discount</p>
                    <p className='text-[gray]'></p>
                  </div>

                  <div className='flex justify-between text-sm'>
                    <p className='text-[gray]'>Shipping</p>
                    <p className='font-medium'>
                      <CurrencyFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        value={20}
                      />
                    </p>
                  </div>
                </div>
                <div className='flex justify-between pt-4'>
                  <p>Total</p>
                  <p className='flex items-center gap-x-2 text-xs text-[gray]'>
                    USD
                    <span className='text-xl font-medium text-black'>
                      <CurrencyFormat
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        value={subtotal + 20}
                      />
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const session_id = query.session_id as string;
  const products = await fetchLineItems(session_id);
  console.log(products);
  return {
    props: { products },
  };
};
