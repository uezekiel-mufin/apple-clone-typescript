import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Index from "../components/Homepage";
import { GetServerSideProps } from "next";
import { fetchCategories } from "../utils/fetchCategories";
import { fetchProducts } from "../utils/fetchProducts";
import { convertDocToObj } from "../utils/convertToDoc";
import { wrapper } from "../redux/store";

const Home = ({ categories, products }: CatProps) => {
  return (
    <Layout title='Apple Redesign'>
      <Index categories={categories} products={products} />
    </Layout>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps<CatProps> = async (
  context
) => {
  const categories = await fetchCategories();
  const { data } = await fetchProducts();
  const { products } = data;

  return {
    props: {
      categories,
      products: products.map(convertDocToObj),
    },
  };
};
