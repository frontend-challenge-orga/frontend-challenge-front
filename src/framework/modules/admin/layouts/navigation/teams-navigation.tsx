import { teams } from "@/framework/admin/layouts/sidebar/data";
import { cn } from "@/config/utils";

export const TeamsNavigation = () => {
  return (
    <li>
      <div className="text-xs font-semibold leading-6 text-indigo-200">
        Your teams
      </div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {teams.map((team) => (
          <li key={team.name}>
            <a
              href={team.href}
              className={cn(
                team.current
                  ? "bg-indigo-700 text-white"
                  : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                {team.initial}
              </span>
              <span className="truncate">{team.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};
