import axios from "axios";

export async function fetchPostJSON(url: string, { cartItems }: Data2) {
  try {
    console.log("started");
    const response = await axios.post(url, { cartItems });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}
