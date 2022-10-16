import React, { useEffect, useState } from "react";
import CartIcon from "../CartIcon";
import Landing from "./Landing";
import SelectedProduct from "./SelectedProduct";

const Index = ({ categories, products }: CatProps) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(
    categories[0].title
  );
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeProducts, setActiveProducts] = useState<ProductsProps[]>([]);

  // setting the initial category to display
  useEffect(() => {
    const setCategory = () => {
      setActiveCategory(categories[0]._id);
      setActiveProducts(
        products.filter((prod) => prod.categories._ref === categories[0]._id)
      );
    };
    setCategory();
  }, []);

  // handling category change selection
  const handleTabSet = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => {
    const el = (e.target as HTMLElement).textContent;
    setSelectedTab(el);
    setActiveCategory(id);
    setActiveProducts(products.filter((prod) => prod.categories._ref === id));
  };

  return (
    <>
      <main className='relative h-[200vh] bg-[#E7ECEC]'>
        <Landing />
      </main>
      <section className='relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]'>
        <CartIcon />
        <div className='space-y-10 py-16'>
          <h1 className='text-center text-4xl font-medium tracking-wide text-white md:text-5xl'>
            New Promos
          </h1>
          <div className='flex flex-col items-center gap-16   border-[#35383C]'>
            <div className='flex'>
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`cursor-pointer whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base  ${
                    selectedTab === category.title
                      ? "borderGradient bg-[#35383c] text-white"
                      : "border-b-2 border-[#35383C] text-[#747474]"
                  }`}
                  onClick={(e) => handleTabSet(e, category._id)}
                >
                  {category.title}
                </div>
              ))}
            </div>

            <div>
              {activeProducts.length > 1 && (
                <SelectedProduct activeProducts={activeProducts} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
