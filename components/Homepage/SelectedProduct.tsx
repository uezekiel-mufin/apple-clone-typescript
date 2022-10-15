import Image from "next/image";
import React from "react";

const SelectedProduct = ({ activeProducts }: ActiveProductsProps) => {
  console.log(activeProducts);
  return (
    <div className='text-white'>
      {activeProducts.map((product: ProductsProps) => (
        <div key={product._id}>
          <Image
            src={product.image[0].asset.url}
            alt={product.title}
            layout='fill'
          />
        </div>
      ))}
      this is it
    </div>
  );
};

export default SelectedProduct;
