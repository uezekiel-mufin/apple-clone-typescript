import axios from "axios";

export async function fetchPostJSON(url: string, data?: {}) {
  try {
    const response = await axios(url, {
      method: "POST",

      // cache:'no-cache',
      // credentials:'same-origin',
      headers: {
        "Content-Type": "application/json",
        //'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect:'follow',
      // referrerPolicy:'no-referrer',
      // body:JSON.stringify(data || {})
    });
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw err;
  }
}
