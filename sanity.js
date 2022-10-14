import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-10-21", //Learn more: https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === "production",
};

// set up the client for fetching data in the getProps page functions

export const sanityClient = createClient(config);

/**
 *
 * set up a helper function for generating Image URLs with only the assest reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 */

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
