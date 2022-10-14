import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Index from "../components/Homepage";
import { GetServerSideProps } from "next";
import { fetchCategories } from "../utils/fetchCategories";

const Home = ({ categories }: CatProps) => {
  return (
    <Layout title='Apple Redesign'>
      <Index categories={categories} />
    </Layout>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps<CatProps> = async (
  context
) => {
  const categories = await fetchCategories();

  return {
    props: {
      categories,
    },
  };
};
