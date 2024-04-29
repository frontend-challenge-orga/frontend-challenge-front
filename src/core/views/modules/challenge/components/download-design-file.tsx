"use client";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/views/components/ui/card";
import { ButtonSubmit } from "@/core/views/components/ui/button-submit";
import { Typography } from "@/core/views/components/typography";

import type { Challenge } from "@prisma/client";
import type { Session } from "next-auth";

import { downloadFigmaFile } from "@/core/infrastructure/use-cases/download-figma-file";
import { ChallengeDTO } from "@/core/infrastructure/dto/challenge.dto";

type Props = {
  session: Session;
  challenge: ChallengeDTO;
};

export const DownloadDesignFile = ({ session, challenge }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDownload = async () => {
    startTransition(async () => {
      try {
        await downloadFigmaFile(session, challenge);
      } catch (e) {
        if (e instanceof Error) setErrorMessage(e.message);
      }
    });
  };

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
        <ButtonSubmit onClick={handleDownload} isPending={isPending}>
          Figma
        </ButtonSubmit>
        {errorMessage && (
          <Typography.Paragraph>{errorMessage}</Typography.Paragraph>
        )}
      </CardFooter>
    </Card>
  );
};
