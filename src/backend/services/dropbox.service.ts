import { Dropbox } from "dropbox";

class DropboxService {
  private dbx: Dropbox;

  constructor() {
    this.dbx = new Dropbox({
      accessToken: process.env.DROPBOX_ACCESS_TOKEN,
      fetch,
    });
  }

  async getFileLink(pathFile: string) {
    try {
      const response = await this.dbx.filesGetTemporaryLink({
        path: pathFile,
      });

      return response.result.link;
    } catch (error) {
      console.error(error);
    }
  }

  // Create function to upload file
}

const dropboxService = new DropboxService();
export default dropboxService;
