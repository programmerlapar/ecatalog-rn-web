import { isCategorySelected } from "./CategoryList";

describe("isCategorySelected", () => {
  it("matches categories by the catalog cid", () => {
    expect(isCategorySelected({ cid: "2" }, { cid: "2" })).toBe(true);
  });

  it("does not use the legacy idCategory field", () => {
    expect(
      isCategorySelected(
        { cid: "2", idCategory: "1" },
        { cid: "3", idCategory: "2" }
      )
    ).toBe(false);
  });
});
