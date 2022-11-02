import axios from "axios";

export async function fetchPostJSON(url: string, { cartItems }: Data2) {
  try {
    const { data } = await axios.post(url, { cartItems });
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}
