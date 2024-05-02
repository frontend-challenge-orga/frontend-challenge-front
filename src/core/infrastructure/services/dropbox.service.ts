import { dropbox } from "@/config/libs/dropbox";

interface IDropboxService {
  getTemporaryFileLink: (pathFile: string) => Promise<string>;
}

export const dropboxService: IDropboxService = {
  getTemporaryFileLink: async (pathFile: string) => {
    const response = await dropbox.filesGetTemporaryLink({
      path: pathFile,
    });

    return response.result.link;
  },
};
