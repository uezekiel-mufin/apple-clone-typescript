import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Toaster />
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default MyApp;
