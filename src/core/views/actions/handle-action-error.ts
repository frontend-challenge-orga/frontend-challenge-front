import { ServerActionError } from "@/config/libs/next-safe-action";

export function handleActionError(error: Error) {
  if (error instanceof ServerActionError) {
    throw new ServerActionError(error.message);
  } else {
    throw error;
  }
}
