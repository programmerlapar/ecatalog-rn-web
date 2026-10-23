import { categoriesFromApi, mealsFromApi } from "./food";

describe("Food API data", () => {
  it("normalizes TheMealDB categories without changing their food identity", () => {
    expect(
      categoriesFromApi({
        categories: [
          {
            idCategory: "1",
            strCategory: "Beef",
            strCategoryThumb: "beef.png",
          },
        ],
      })
    ).toEqual([
      {
        cid: "1",
        title: "Beef",
        image_link: "beef.png",
      },
    ]);
  });

  it("uses the meals returned by the Food API for the menu", () => {
    const meals = [{ idMeal: "52772", strMeal: "Teriyaki Chicken" }];

    expect(mealsFromApi({ meals })).toEqual(meals);
  });
});
