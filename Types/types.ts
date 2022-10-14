export type LayoutType = {
  children: JSX.Element;
  title: string;
};

export interface ButtonProps {
  title: string;
  width?: string;
  padding?: string;
  loading?: boolean;
  noIcon?: boolean;
  onClick?: () => void;
}
