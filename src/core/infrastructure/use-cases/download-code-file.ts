import { downloadFileAction } from "@/core/views/actions/challenge/download-file";

export async function downloadCodeFile(pathFile: string) {
  const { data } = await downloadFileAction({
    pathFile,
    type: "starter",
  });

  if (!data) return console.log("Error downloading file");

  window.location.href = data.starter_file_url;
}
