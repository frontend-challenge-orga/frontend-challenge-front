import type { Session } from "next-auth";

type Props = {
  isCompletedChallenge?: boolean;
  session?: Session | null;
};

export const ChallengeCardCompleted = ({ session, isCompletedChallenge }: Props) => {
  if (!session) return null;

  return (
    isCompletedChallenge && (
      <div className={"absolute bottom-6 left-0 right-0 flex justify-center items-center w-full"}>
        <div className={"flex items-center gap-2"}>
          <div className={"bg-green-500 text-white rounded-full p-2"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className={"text-white text-sm mt-2 font-semibold shadow"}>This challenge is completed !</p>
        </div>
      </div>
    )
  );
};
