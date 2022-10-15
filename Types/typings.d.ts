type LayoutType = {
  children: JSX.Element;
  title: string;
};

interface ButtonProps {
  title: string;
  width?: string;
  padding?: string;
  loading?: boolean;
  noIcon?: boolean;
  onClick?: () => void;
}

interface CategoryProps {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "category";
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
}

interface Image {
  _key: string;
  _type: "image";
  asset: {
    url: string;
  };
}
interface ProductsProps {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "product";
  categories?: {
    ref: string;
    _type: "reference";
  };
  price: number;
  image?: Image[];
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
  description?: string;
}

interface CatProps {
  categories: CategoryProps[];
  products: ProductsProps;
}
