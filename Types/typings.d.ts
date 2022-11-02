// import {
//   Component,
//   ComponentType,
//   HTMLAttributes,
//   InputHTMLAttributes,
// } from "react";

// declare namespace CurrencyFormat {
//   /**
//    * Available input type attributes which the component supports.
//    */
//   type InputType = "text" | "tel";

//   /**
//    * A value object containing the formatted value, the original value and the float value.
//    * @see {@link https://github.com/mohitgupta8888/react-currency-format#values-object}
//    */
//   interface Values {
//     formattedValue: string;
//     value: string;
//     floatValue: number;
//   }

//   // The component accepts all the props which can be given to a input or span based on displayType selected.
//   type DisplayTypeInput = InputHTMLAttributes<HTMLInputElement> & {
//     displayType?: "input";
//     customInput?: ComponentType<any>;
//   };

//   type DisplayTypeText = HTMLAttributes<HTMLSpanElement> & {
//     displayType?: "text";
//     customInput?: never;
//   };

//   /**
//    * Props accepted by the component.
//    * @see {@link https://github.com/mohitgupta8888/react-currency-format#props}
//    */
//   type StrictProps = Partial<{
//     thousandSeparator: string | boolean;
//     thousandSpacing: "2" | "2s" | "3" | "4";
//     decimalSeparator: string;
//     decimalScale: number;
//     fixedDecimalScale: boolean;
//     allowNegative: boolean;
//     prefix: string;
//     suffix: string;
//     value: number | string | null;
//     isNumericString: boolean;
//     type: InputType;
//     format: string | ((unformatedInput: string) => string);
//     removeFormatting: (formattedValue: string) => string;
//     mask: string | string[];
//     onValueChange: (values: Values) => void;
//     isAllowed: (values: Values) => boolean;
//     renderText: (formattedValue: string) => JSX.Element;
//   }> &
//     (DisplayTypeText | DisplayTypeInput);

//   /**
//    * Props accepted by the component and any other prop of the customInput.
//    */
//   type Props = StrictProps & {
//     [key: string]: unknown;
//   };
// }

// declare class CurrencyFormat extends Component<CurrencyFormat.Props> {}

// export = CurrencyFormat;

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
  onClick: () => void;
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
  stock: number;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "product";
  categories: {
    _ref: string;
    _type: "reference";
  };
  price: number;
  image: Image[];
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
  description?: string;
  quantityOrdered: number;
}

interface CatProps {
  categories: CategoryProps[];
  products: ProductsProps[];
}

type Data = {
  products: ProductsProps[];
  cartItems: ProductsProps[];
};
type Data2 = {
  cartItems: ProductsProps[];
};

interface ActiveProductsProps {
  activeProducts: ProductsProps[];
}

interface StripeProduct {
  id: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  currency: string;
  description: string;
  object: string;
  quantity: number;
  price: {
    unit_amount: number;
  };
}
