"use client";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/views/components/ui/card";
import { Typography } from "@/core/views/components/typography";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { downloadCodeFile } from "@/core/infrastructure/use-cases/download-code-file";
import type { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type Props = {
  challenge: ChallengeDTO;
};

export const DownloadStarterFile = ({ challenge }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDownload = async () => {
    startTransition(async () => {
      try {
        await downloadCodeFile(challenge.starter_code_path_file);
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Download starter files</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography.Paragraph>
          Includes assets, JPG images of the design files, and a basic style
          guide. There’s also a README to help you get started.
        </Typography.Paragraph>
      </CardContent>
      <CardFooter>
        <ButtonSubmit onClick={handleDownload} isPending={isPending}>
          Starter code
        </ButtonSubmit>
        {errorMessage && (
          <Typography.Paragraph>{errorMessage}</Typography.Paragraph>
        )}
      </CardFooter>
    </Card>
  );
};
