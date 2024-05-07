"use client";

import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { Checkbox } from "@/core/views/components/ui/checkbox";
import { updateFilter, type FilterKeyType } from "./update-filter";
import { filterType, filterDifficulty, filterLanguage } from "./data";

export const ChallengeFilter = () => {
  const [filter, setFilter] = useQueryStates(
    {
      type: parseAsArrayOf(parseAsString, "&").withDefault([]),
      difficulty: parseAsArrayOf(parseAsString, "&").withDefault([]),
      language: parseAsArrayOf(parseAsString, "&").withDefault([]),
    },
    { clearOnDefault: true },
  );

  const handleFilterChange = async (key: FilterKeyType, value: string) => {
    await setFilter((prev) => updateFilter(prev, key, value));
  };

  return (
    <div className={"flex flex-col"}>
      <div>
        <span className="text-lg font-semibold text-gray-800">Filter by: type</span>
        {filterType.map(({ type, label }) => (
          <div key={type} className={"flex gap-2"}>
            <Checkbox
              id={type}
              name="type"
              checked={filter.type?.includes(type)}
              onCheckedChange={() => handleFilterChange("type", type)}
            />
            <label className="text-sm font-semibold text-gray-700" htmlFor={type}>
              {label}
            </label>
          </div>
        ))}
      </div>

      <div>
        <span className="text-lg font-semibold text-gray-800">Filter by: difficulty</span>
        {filterDifficulty.map(({ difficulty, label }) => (
          <div key={difficulty} className={"flex gap-2"}>
            <Checkbox
              key={difficulty}
              name="difficulty"
              checked={filter.difficulty?.includes(difficulty)}
              onCheckedChange={() => handleFilterChange("difficulty", difficulty)}
            />
            <label className="text-sm font-semibold text-gray-700" htmlFor={difficulty}>
              {label}
            </label>
          </div>
        ))}
      </div>

      <div>
        <span className="text-lg font-semibold text-gray-800">Filter by: language</span>
        {filterLanguage.map(({ language, label }) => (
          <div key={language} className={"flex gap-2"}>
            <Checkbox
              key={language}
              name="language"
              checked={filter.language?.includes(language)}
              onCheckedChange={() => handleFilterChange("language", language)}
            />
            <label className="text-sm font-semibold text-gray-700" htmlFor={language}>
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
