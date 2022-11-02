import Layout from "../components/Layout";
import Index from "../components/Homepage";
import { GetServerSideProps } from "next";
import { fetchCategories } from "../utils/fetchCategories";
import { fetchProducts } from "../utils/fetchProducts";
import { convertDocToObj } from "../utils/convertToDoc";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CatPropsHome {
  categories: CategoryProps[];
  products: ProductsProps[];
  session: Session | null;
}

const Home = ({ categories, products }: CatPropsHome) => {
  // console.log(products);
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
  const session = await getSession(context);
  const categories = await fetchCategories();
  const { data } = await fetchProducts();
  const { products } = data;

  return {
    props: {
      categories,
      products: products.map(convertDocToObj),
      session,
    },
  };
};
