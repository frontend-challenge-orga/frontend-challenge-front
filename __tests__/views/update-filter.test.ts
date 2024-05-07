import {
  updateFilter,
  type FilterKeyType,
  type FilterState,
} from "@/core/views/modules/challenge/components/challenge-filter/update-filter";

describe("updateFilter", () => {
  it("should add a new value to the filter", () => {
    const prev: FilterState = { type: [], difficulty: [], language: [] };
    const key: FilterKeyType = "type";
    const value = "newType";

    const result = updateFilter(prev, key, value);

    expect(result.type).toContain(value);
  });

  it("should remove an existing value from the filter", () => {
    const value = "existingType";
    const prev: FilterState = { type: [value], difficulty: [], language: [] };
    const key: FilterKeyType = "type";

    const result = updateFilter(prev, key, value);

    expect(result.type).not.toContain(value);
  });
});
