import { Dropbox } from "dropbox";
import { env } from "@/config/env";

export const dropbox = new Dropbox({
  accessToken: env.DROPBOX_ACCESS_TOKEN,
  fetch,
});
