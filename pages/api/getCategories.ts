// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { groq } from "next-sanity";

type Data = {
  categories: CategoryProps[];
};

const query = groq`*[_type == 'category']{
  _id,
  ...
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await sanityClient.fetch(query);

  res.status(201).json({ categories });
}
