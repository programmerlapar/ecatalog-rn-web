import CategoryList, { isCategorySelected } from "./CategoryList";

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

describe("CategoryList web link styles", () => {
  it("passes a plain style object to the router link", () => {
    const link = CategoryList({
      cid: "2",
      image: "image.png",
      item: { cid: "2" },
      onPress: jest.fn(),
      selectedCategory: null,
      title: "Dessert",
    });

    expect(Array.isArray(link.props.style)).toBe(false);
  });
});
