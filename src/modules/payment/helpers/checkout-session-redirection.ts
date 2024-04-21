import axios from "axios";
import { API_ENDPOINT } from "@/config/constants";

export async function checkoutSessionRedirection() {
  const response = await axios.post(API_ENDPOINT.CHECKOUT);

  if (response.status !== 200) {
    console.error(`Server responded with status code ${response.status}`);
    return;
  }

  const { url } = response.data;

  if (!url) {
    console.error("Invalid server response: No URL provided");
    return;
  }

  window.location.href = url;
}
