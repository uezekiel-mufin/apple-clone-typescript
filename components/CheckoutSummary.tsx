import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import CurrencyFormat from "react-currency-format";
import Button from "./Button";
import { Stripe } from "stripe";
import getStripe from "../get-stripejs";
import { fetchPostJSON } from "../utils/api-helpers";

const CheckoutSummary = ({ cartItems }: Data2) => {
  const [loading, setLoading] = useState(false);
  // calculating the prices of all the items in the cart
  const itemsPrice = cartItems.reduce(
    (acc: number, cur: ProductsProps) => acc + cur.price * cur.quantityOrdered,
    0
  );
  // console.log(cartItems);

  const createCheckoutSession = async () => {
    setLoading(true);
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      `api/getStripeSession`,
      { cartItems }
    );

    // checking for internal server error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    //Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the checkout session creation API response
      // available to this file, so you can provide it as a paramaeter here
      /// instead of the {{CHECKOUT_SESSION_ID}} placeholder
      sessionId: checkoutSession.id,
    });

    console.warn(error.message);
    setLoading(false);
  };
  const totalPrize = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantityOrdered,
    0
  );
  const taxPrize = totalPrize > 2000 ? totalPrize * 0.008 : totalPrize * 0.01;
  console.log(taxPrize);
  return (
    <div className='my-12 mt-6 ml-auto max-w-3xl'>
      <div className='divide-y divide-gray-300'>
        <div className='pb-4'>
          <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>
              <CurrencyFormat
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                value={itemsPrice}
              />
            </p>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-x-1 lg:flex-row'>
              Estimated tax for:{" "}
              <p className='text-blie-500 flex cursor-pointer items-end hover:underline'>
                Enter zip code
                <ChevronDownIcon className='h-6 w-6' />
              </p>
            </div>
            <p>
              {" "}
              <CurrencyFormat
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                value={taxPrize.toFixed(2)}
              />
            </p>
          </div>
        </div>

        <div className='flex justify-between pt-4 text-xl font-semibold'>
          <h4>Total</h4>
          <h4>
            <CurrencyFormat
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              value={itemsPrice + taxPrize}
            />
          </h4>
        </div>
      </div>

      <div className='my-14 space-y-4'>
        <h4 className='text-xl font-semibold'>
          How would you like to check out
        </h4>
        <div className='flex flex-col gap-4 md:flex-col'>
          <div className='order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center'>
            <h4 className='mb-4 flex flex-col text-xl font-semibold'>
              <span>Pay Monthly</span>
              <span>with Apple card</span>
              <span>
                $283.16/mo. at 0% APR <sup className='-top-1'></sup>
              </span>
            </h4>
            <Button
              title='Check out with Apple Card'
              onClick={() => console.log("yes")}
            />
            <p className='mt-2 max-w-[240px] text-[13px]'>
              $0.00 due today, which includes applicable full-price items, down
              payments, shipping, and taxes
            </p>
          </div>

          <div className='flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2'>
            <h4 className='mb-4 flex flex-col text-xl font-semibold'>
              Pay in full
              <span>
                <CurrencyFormat
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  value={itemsPrice + taxPrize}
                />
              </span>
            </h4>

            <Button
              loading={loading}
              onClick={createCheckoutSession}
              title='Check out'
              width='w-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
