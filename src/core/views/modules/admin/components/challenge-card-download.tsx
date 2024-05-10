import Link from "next/link";
import { FigmaIcon } from "@/core/views/components/icons/figma";
import { DownloadIcon } from "@/core/views/components/icons/download";
import type { FormValues } from "@/core/views/modules/admin/forms/create-challenge-form";

type Props = {
  currentValues: FormValues;
};

export const ChallengeCardDownload = ({ currentValues }: Props) => {
  const { starter_code_path_file, starter_figma_path_file } = currentValues;

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="mt-4 flex gap-8">
        <Link
          href={starter_code_path_file}
          target="_blank"
          className=" flex items-center rounded-md border-2 border-transparent p-2 text-gray-600 transition-colors duration-500 hover:border-blue-500 "
        >
          <span className="mr-2">Download starter code</span>
          <DownloadIcon className={"w-6 h-6"} />
        </Link>
        <Link
          href={starter_figma_path_file}
          target="_blank"
          className="ml-4 flex items-center rounded-md border-2 border-transparent p-2 text-gray-600 transition-colors duration-500 hover:border-blue-500"
        >
          <span className="mr-2">Download Figma</span>
          <FigmaIcon className={"w-6 h-6"} />
        </Link>
      </div>
    </div>
  );
};
