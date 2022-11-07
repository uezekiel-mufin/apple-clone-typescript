import Head from "next/head";
import React from "react";
import Header from "./Header";

const Layout = ({ children, title }: LayoutType) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
