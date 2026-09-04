describe("Dashboard responsive product grid", () => {
  let width;
  let flatListType;

  const loadDashboard = () => {
    jest.resetModules();

    jest.doMock("react-native", () => {
      const React = require("react");
      const createHost = (name) => ({ children, ...props }) =>
        React.createElement(name, props, children);
      flatListType = () => null;

      return {
        FlatList: flatListType,
        ScrollView: createHost("scroll-view"),
        StyleSheet: { create: (styles) => styles },
        Text: createHost("text"),
        TouchableOpacity: createHost("touchable"),
        View: createHost("view"),
      };
    });
    jest.doMock("react", () => {
      const React = jest.requireActual("react");
      return {
        ...React,
        useEffect: () => {},
        useState: (initialValue) => [
          initialValue === true
            ? false
            : typeof initialValue === "function"
              ? initialValue()
              : initialValue,
          () => {},
        ],
      };
    });
    jest.doMock("react-redux", () => ({
      useDispatch: () => () => Promise.resolve(),
      useSelector: (selector) =>
        selector({
          cart: { orderItems: [] },
          menu: {
            availableMenu: { meals: [{ idMeal: "1", strMeal: "Pasta", strMealThumb: "pasta.png" }] },
            categoryList: { categories: [] },
            isFetching: false,
            latestMenu: { meals: [] },
          },
        }),
    }));
    jest.doMock("../constant/useDimens", () => () => [width, 600, true]);
    jest.doMock("../components/BottomSheet", () => () => null);
    jest.doMock("../components/Cart", () => () => null);
    jest.doMock("../components/CategoryList", () => () => null);
    jest.doMock("../components/Loading", () => () => null);
    jest.doMock("../components/ProductList", () => () => null);
    jest.doMock("../components/ProductsModal", () => () => null);
    jest.doMock("../store/actions/menu", () => ({
      fetchCategory: () => ({ type: "FETCH_CATEGORY" }),
      fetchLatestMenu: () => ({ type: "FETCH_LATEST_MENU" }),
    }));
    jest.doMock("../assets/paket_1.jpg", () => "paket-1.jpg");
    jest.doMock("../assets/paket_2.png", () => "paket-2.png");
    jest.doMock("../assets/paket_3.jpeg", () => "paket-3.jpeg");

    const Dashboard = require("./Dashboard").default;

    return { Dashboard };
  };

  const findProductGrid = (element) => {
    if (!element || typeof element !== "object") {
      return null;
    }
    if (element.type === flatListType && element.props.numColumns) {
      return element;
    }
    const children = element.props?.children;
    if (Array.isArray(children)) {
      for (const child of children) {
        const match = findProductGrid(child);
        if (match) return match;
      }
    }
    return findProductGrid(children);
  };

  it("remounts the product grid when responsive columns change", () => {
    width = 800;
    const { Dashboard } = loadDashboard();
    const wideGrid = findProductGrid(Dashboard({}));

    width = 600;
    const narrowGrid = findProductGrid(Dashboard({}));

    expect(wideGrid.props.numColumns).toBe(4);
    expect(narrowGrid.props.numColumns).toBe(2);
    expect(wideGrid.key).not.toBe(narrowGrid.key);
  });
});
