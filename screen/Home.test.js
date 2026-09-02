describe("Home entry router", () => {
  const loadHome = (platform) => {
    jest.resetModules();

    const webRouter = jest.fn(({ children }) => children);
    const nativeRouter = jest.fn(({ children }) => children);
    const webLink = ({ children }) => children;
    const nativeLink = ({ children }) => children;

    jest.doMock("react-native", () => {
      const React = require("react");
      const createHost = () => ({ children }) =>
        React.createElement(React.Fragment, null, children);

      return {
        Animated: {
          Value: class {
            constructor(value) {
              this.value = value;
            }
          },
        },
        Button: createHost(),
        Dimensions: {
          get: () =>
            platform === "web"
              ? { width: 800, height: 600 }
              : { width: 400, height: 800 },
        },
        Easing: { back: "back", linear: "linear" },
        Image: createHost(),
        Platform: { OS: platform },
        StyleSheet: { create: (styles) => styles },
        Text: createHost(),
        TouchableOpacity: createHost(),
        View: createHost(),
      };
    });
    jest.doMock("@expo/vector-icons", () => ({ Ionicons: () => null }));
    jest.doMock("../assets/cafe.png", () => "cafe.png");
    jest.doMock("../constant/useDimens", () => () =>
      platform === "web" ? [800, 600, true] : [400, 800, false]
    );
    jest.doMock("../components/CustomModal", () => ({
      ContactModal: () => null,
      CustomModal: () => null,
    }));
    jest.doMock("../components/MenuBar", () => () => null);
    jest.doMock("../screen/Drawer", () => () => null);
    jest.doMock("../screen/Dashboard", () => () => null);
    jest.doMock("../screen/About", () => () => null);
    jest.doMock("../screen/Product", () => () => null);
    jest.doMock("react-router", () => ({
      Route: () => null,
    }));
    jest.doMock("react-router-dom", () => ({
      BrowserRouter: webRouter,
      Link: webLink,
      Route: () => null,
    }));
    jest.doMock("react-router-native", () => ({
      NativeRouter: nativeRouter,
      Link: nativeLink,
    }));

    const React = require("react");
    const { renderToStaticMarkup } = require("react-dom/server");
    const Home = require("./Home").default;

    renderToStaticMarkup(React.createElement(Home));

    return { webRouter, nativeRouter };
  };

  it("mounts the web router for the web entry", () => {
    const { webRouter, nativeRouter } = loadHome("web");

    expect(webRouter).toHaveBeenCalled();
    expect(nativeRouter).not.toHaveBeenCalled();
  });

  it("mounts the native router for a native entry", () => {
    const { webRouter, nativeRouter } = loadHome("ios");

    expect(nativeRouter).toHaveBeenCalled();
    expect(webRouter).not.toHaveBeenCalled();
  });
});
