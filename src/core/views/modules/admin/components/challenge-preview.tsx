"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/core/views/components/ui/dialog";
import { Button } from "@/core/views/components/ui/button";
import { ChallengeCardPreview } from "@/core/views/modules/admin/components/challenge-card-preview";
import type { FormValues } from "@/core/views/modules/admin/forms/create-challenge-form";
import type { Session } from "next-auth";
import type { ChallengeSolutionDTO } from "@/core/infrastructure/dto/challenge.solution.dto";

type Props = {
  currentValues: FormValues;
};

// Rajouter les button de téléchargement figma et starter code

export const ChallengePreview = ({ currentValues }: Props) => {
  const session_mock = {} as Session;
  const completedChallenges = [] as ChallengeSolutionDTO[];
  const challenge_mock = {
    ...currentValues,
    id: "1",
    slug: "slug",
    points: 0,
    createdById: "1",
    assets_presentation: [],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-12">Preview</Button>
      </DialogTrigger>

      <DialogContent className="data-[state=open]:animate-contentShow rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <ChallengeCardPreview
          currentValues={challenge_mock}
          completedChallenges={completedChallenges}
          session={session_mock}
        />
        {/*<div className="container mx-auto px-4 py-2">
            <DialogTitle className="text-mauve12 m-0 flex gap-4  text-[17px] font-medium">
              <h2 className="mb-4 text-2xl font-bold">{name} preview</h2>
              <span>{premium ? "PREMIUM" : "FREE"}</span>
            </DialogTitle>
            <DialogDescription className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
              <div className="h-56 bg-cover bg-center">
                <img
                  src="https://source.unsplash.com/random/?sky"
                  className="h-56 w-full rounded-t-md opacity-75"
                  alt="image du challenge"
                />
              </div>
              <div className="rounded-lg bg-white p-4 shadow">
                <div className="flex justify-between pb-8">
                  <span>{difficulty}</span>
                  <span>{language}</span>
                </div>
                <div className="overflow-hidden overflow-y-auto ">
                  <p className="max-h-[100px] text-gray-600">{description}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <div className="mt-4 flex gap-8">
                  <a
                    href={starter_code_path_file}
                    target="_blank"
                    className=" flex items-center rounded-md border-2 border-transparent p-2 text-gray-600 transition-colors duration-500 hover:border-blue-500 "
                  >
                    <span className="mr-2">Download starter code</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20">
                      <g fill="#000000" data-darkreader-inline-fill="">
                        <path
                          fill-rule="evenodd"
                          d="M11 3h-1a4.002 4.002 0 0 0-3.874 3H6a4 4 0 1 0 0 8h8a4 4 0 0 0 .899-7.899A4.002 4.002 0 0 0 11 3M6.901 7l.193-.75A3.002 3.002 0 0 1 10 4h1c1.405 0 2.614.975 2.924 2.325l.14.61l.61.141A3.001 3.001 0 0 1 14 13H6a3 3 0 1 1 0-6z"
                          clip-rule="evenodd"
                        ></path>
                        <path d="M10 10a.5.5 0 0 1 1 0v7.5a.5.5 0 0 1-1 0z"></path>
                        <path d="M12.688 15.11a.5.5 0 0 1 .624.78l-2.5 2a.5.5 0 1 1-.624-.78z"></path>
                        <path d="M7.688 15.89a.5.5 0 0 1 .624-.78l2.5 2a.5.5 0 1 1-.624.78z"></path>
                      </g>
                    </svg>
                  </a>
                  <a
                    href={starter_figma_path_file}
                    target="_blank"
                    className="ml-4 flex items-center rounded-md border-2 border-transparent p-2 text-gray-600 transition-colors duration-500 hover:border-blue-500"
                  >
                    <span className="mr-2">Download Figma</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 128 128">
                      <path
                        fill="#0acf83"
                        d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129m0 0"
                        data-darkreader-inline-fill=""
                      ></path>
                      <path
                        fill="#a259ff"
                        d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5m0 0"
                        data-darkreader-inline-fill=""
                      ></path>
                      <path
                        fill="#f24e1e"
                        d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5m0 0"
                        data-darkreader-inline-fill=""
                      ></path>
                      <path
                        fill="#ff7262"
                        d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0"
                        data-darkreader-inline-fill=""
                      ></path>
                      <path
                        fill="#1abcfe"
                        d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5S76.6 43 88.5 43S110 52.6 110 64.5m0 0"
                        data-darkreader-inline-fill=""
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </DialogDescription>
          </div>*/}
      </DialogContent>
    </Dialog>
  );
};
