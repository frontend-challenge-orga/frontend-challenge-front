import { dropbox } from "@/config/libs/dropbox";

export async function getTemporaryFileLink(pathFile: string) {
  const response = await dropbox.filesGetTemporaryLink({
    path: pathFile,
  });

  return response.result.link;
}
