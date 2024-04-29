import { checkValidityOfDesignCreditBalance } from "@/core/infrastructure/use-cases/check-validity-of-design-credit-balance";
import { downloadFileAction } from "@/core/views/actions/challenge/download-file";
import type { Session } from "next-auth";

export async function downloadFigmaFile(session: Session, pathFile: string) {
  const balance = checkValidityOfDesignCreditBalance(
    session.user.credit_design_amount,
  );

  if (
    balance?.status === "error" &&
    session.user.subscription_duration !== "YEARLY"
  ) {
    throw new Error(balance.message);
  }

  const { data } = await downloadFileAction({
    pathFile,
    type: "figma",
  });

  if (!data) return console.log("Error downloading file");

  window.location.href = data.starter_file_url;
}
