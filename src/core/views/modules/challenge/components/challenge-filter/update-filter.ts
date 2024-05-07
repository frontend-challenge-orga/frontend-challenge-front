export type FilterKeyType = "type" | "difficulty" | "language";

export interface FilterState {
  type: string[];
  difficulty: string[];
  language: string[];
}

export const updateFilter = (prev: FilterState, key: FilterKeyType, value: string) => {
  const prevValue = prev[key] ?? [];
  const newValue = prevValue.includes(value) ? prevValue.filter((v: string) => v !== value) : [...prevValue, value];

  return { ...prev, [key]: newValue };
};
