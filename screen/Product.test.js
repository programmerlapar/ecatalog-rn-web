describe("Product loading feedback", () => {
  it("keeps showing loading feedback when the loading flag is unknown", () => {
    jest.resetModules();
    const mockLoading = () => null;

    jest.doMock("react", () => {
      const React = jest.requireActual("react");
      return {
        ...React,
        useEffect: () => {},
        useState: (initialValue) => [initialValue === true ? false : initialValue, () => {}],
      };
    });
    jest.doMock("react-native", () => {
      const React = jest.requireActual("react");
      const createHost = (name) => ({ children, ...props }) => React.createElement(name, props, children);

      return {
        Image: createHost("image"),
        ScrollView: createHost("scroll-view"),
        StyleSheet: { create: (styles) => styles },
        Text: createHost("text"),
        View: createHost("view"),
      };
    });
    jest.doMock("@expo/vector-icons", () => ({ Ionicons: () => null }));
    jest.doMock("react-redux", () => ({
      useDispatch: () => jest.fn(),
      useSelector: (selector) =>
        selector({
          menu: {
            detailMenu: { idMeal: "1", strMeal: "Pasta" },
            isFetching: undefined,
          },
        }),
    }));
    jest.doMock("../components/Loading", () => mockLoading);
    jest.doMock("../constant/useDimens", () => () => [800, 600, true]);
    jest.doMock("../navigation", () => ({ Link: () => null }));
    jest.doMock("../store/actions/menu", () => ({
      fetchDetailMenu: () => ({ type: "FETCH_DETAIL_MENU" }),
      isLoadingHandler: () => ({ type: "IS_LOADING" }),
    }));

    const Product = require("./Product").default;
    const result = Product({ match: { params: { id: "1" } }, rem: (value) => value });

    expect(result.type).toBe(mockLoading);
  });
});
