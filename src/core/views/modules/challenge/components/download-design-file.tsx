"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/views/components/ui/card";
import { DownloadDesignFileForm } from "@/core/views/modules/challenge/forms/download-design-file-form";
import { Typography } from "@/core/views/components/typography";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type Props = {
  challenge: ChallengeDTO;
};

export const DownloadDesignFile = ({ challenge }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Download design file</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography.Paragraph>
          We have Figma versions available. Using the design file will help you
          build more accurate solutions.
        </Typography.Paragraph>
      </CardContent>
      <CardFooter>
        <DownloadDesignFileForm
          challengeId={challenge.id}
          starter_figma_path_file={challenge.starter_figma_path_file}
        />
      </CardFooter>
    </Card>
  );
};
