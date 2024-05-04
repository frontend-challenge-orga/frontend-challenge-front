"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/core/views/components/ui/card";
import { Typography } from "@/core/views/components/typography";
import { DownloadStarterFileForm } from "@/core/views/modules/challenge/forms/download-starter-file-form";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type Props = {
  challenge: ChallengeDTO;
};

export const DownloadStarterFile = ({ challenge }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Download starter files</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography.Paragraph>
          Includes assets, JPG images of the design files, and a basic style guide. There’s also a README to help you
          get started.
        </Typography.Paragraph>
      </CardContent>
      <CardFooter>
        <DownloadStarterFileForm challengeId={challenge.id} starter_code_path_file={challenge.starter_code_path_file} />
      </CardFooter>
    </Card>
  );
};
