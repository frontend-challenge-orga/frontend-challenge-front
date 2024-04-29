"use server";

import { adminAction } from "@/config/libs/next-safe-action";
import { getFileLink } from "@/core/infrastructure/services/dropbox.service";
import * as z from "zod";

const schema = z.object({
  pathFile: z.string(),
});

export const downloadFileAdminAction = adminAction(schema, async (data, _) => {
  await getFileLink(data.pathFile);
});
