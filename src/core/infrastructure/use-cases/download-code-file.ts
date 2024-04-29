import { downloadFileAction } from "@/core/views/actions/challenge/download-file";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

export async function downloadCodeFile(challenge: ChallengeDTO) {
  const { data } = await downloadFileAction({
    pathFile: challenge.starter_code_path_file,
    type: "starter",
  });

  if (!data) return console.log("Error downloading file");

  window.location.href = data.starter_file_url;
}
