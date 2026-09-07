import catalog from "./data.json";
import { categories, products, productsForCategory } from "./catalog";

describe("catalog category links", () => {
  it("links every product to an existing category id", () => {
    const categoryIds = new Set(categories.map((category) => category.cid));

    expect(products).toHaveLength(catalog.products.length);
    expect(products.every((product) => categoryIds.has(product.categoryId))).toBe(
      true
    );
  });

  it("filters products by the category id rather than display text", () => {
    const bawahanProducts = productsForCategory("3");

    expect(bawahanProducts).toHaveLength(catalog.products.length);
    expect(bawahanProducts.every((product) => product.categoryId === "3")).toBe(
      true
    );
  });

  it("returns no products for a valid but unpopulated category", () => {
    expect(productsForCategory("1")).toEqual([]);
  });
});
