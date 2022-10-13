import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Index from "../components/Homepage";

const Home: NextPage = () => {
  return (
    <Layout title='Apple Redesign'>
      <Index />
    </Layout>
  );
};

export default Home;
