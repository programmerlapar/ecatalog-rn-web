import {
  fetchAllMenu,
  fetchDetailMenu,
  fetchLatestMenu,
  IS_LOADING,
  IS_LOADING_FALSE,
  SET_LATEST_MENU,
} from "./menu";

describe("menu requests", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("returns latest menu data and stores it", async () => {
    const response = { meals: [{ idMeal: "1" }] };
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => response });
    const dispatch = jest.fn();

    await expect(fetchLatestMenu()(dispatch)).resolves.toEqual(response);

    expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?f=d");
    expect(dispatch).toHaveBeenNthCalledWith(1, { type: IS_LOADING, isFetching: true });
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: SET_LATEST_MENU, latestMenu: response });
  });

  it("clears loading and rejects when a menu request fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 503 });
    const dispatch = jest.fn();

    await expect(fetchAllMenu("Dessert")(dispatch)).rejects.toThrow("Menu request failed with status 503");

    expect(dispatch).toHaveBeenLastCalledWith({ type: IS_LOADING_FALSE, isFetching: false });
  });

  it("rejects an empty detail response instead of leaving the detail screen loading", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ meals: [] }) });
    const dispatch = jest.fn();

    await expect(fetchDetailMenu("missing")(dispatch)).rejects.toThrow("Menu detail not found");

    expect(dispatch).toHaveBeenLastCalledWith({ type: IS_LOADING_FALSE, isFetching: false });
  });
});
