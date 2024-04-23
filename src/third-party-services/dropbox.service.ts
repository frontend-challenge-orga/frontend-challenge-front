import { dropbox } from "@/config/libs/dropbox";

export async function getFileLink(pathFile: string) {
  try {
    const response = await dropbox.filesGetTemporaryLink({
      path: pathFile,
    });

    return response.result.link;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
