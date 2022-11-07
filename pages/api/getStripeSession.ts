import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { urlFor } from "../../sanity";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { cartItems }: Data2 = req.body;

    //this is the shape in which stripe expects the data to be in

    const transformationData = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [urlFor(item.image[0]).url()],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantityOrdered,
    }));

    try {
      //create checkout sessions from body params

      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        // shipping_address_collection:{
        // allowed_countries: ['US',"CA","GB"]
        // }
        line_items: transformationData,
        payment_intent_data: {},
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
          images: JSON.stringify(
            cartItems.map((item) => item.image[0].asset.url)
          ),
        },
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      res.status(201).json(checkoutSession);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
