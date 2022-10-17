import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Toaster />
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
