import {
  fetchAllMenu,
  fetchCategory,
  fetchDetailMenu,
  fetchLatestMenu,
  fetchMenu,
  IS_LOADING,
  IS_LOADING_FALSE,
  SET_CATEGORY,
  SET_DETAIL_MENU,
  SET_LATEST_MENU,
  SET_MENU,
} from "./menu";

describe("Food API menu actions", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetches categories and resolves with the API response", async () => {
    const response = { categories: [{ idCategory: "1" }] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    });
    const dispatch = jest.fn();

    await expect(fetchCategory()(dispatch)).resolves.toEqual(response);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: IS_LOADING, isFetching: true });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: SET_CATEGORY,
      categoryList: response,
    });
    expect(dispatch).toHaveBeenLastCalledWith({
      type: IS_LOADING_FALSE,
      isFetching: false,
    });
  });

  it("fetches the latest meals from the search endpoint", async () => {
    const response = { meals: [{ idMeal: "52772" }] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    });
    const dispatch = jest.fn();

    await expect(fetchLatestMenu()(dispatch)).resolves.toEqual(response);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=d"
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_LATEST_MENU,
      latestMenu: response,
    });
  });

  it("fetches meals for a selected category", async () => {
    const response = { meals: [{ idMeal: "52772" }] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    });
    const dispatch = jest.fn();

    await expect(fetchMenu("Chicken")(dispatch)).resolves.toEqual(response);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_MENU,
      availableMenu: response,
    });
  });

  it("stores selected-category meals in the latest menu slot for the dashboard", async () => {
    const response = { meals: [{ idMeal: "52772" }] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    });
    const dispatch = jest.fn();

    await expect(fetchAllMenu("Chicken")(dispatch)).resolves.toEqual(response);

    expect(dispatch).toHaveBeenCalledWith({
      type: SET_LATEST_MENU,
      latestMenu: response,
    });
  });

  it("fetches a meal detail and rejects an empty detail response", async () => {
    const response = { meals: [{ idMeal: "52772", strMeal: "Teriyaki Chicken" }] };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    });
    const dispatch = jest.fn();

    await expect(fetchDetailMenu("52772")(dispatch)).resolves.toEqual(response);
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_DETAIL_MENU,
      detailMenu: response.meals[0],
      isFetching: false,
    });

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ meals: [] }),
    });
    const emptyDispatch = jest.fn();

    await expect(fetchDetailMenu("missing")(emptyDispatch)).rejects.toThrow(
      "Menu detail not found"
    );
    expect(emptyDispatch).toHaveBeenLastCalledWith({
      type: IS_LOADING_FALSE,
      isFetching: false,
    });
  });

  it("rejects failed API responses and clears loading", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 503 });
    const dispatch = jest.fn();

    await expect(fetchMenu("Chicken")(dispatch)).rejects.toThrow(
      "Menu request failed with status 503"
    );
    expect(dispatch).toHaveBeenLastCalledWith({
      type: IS_LOADING_FALSE,
      isFetching: false,
    });
  });
});
