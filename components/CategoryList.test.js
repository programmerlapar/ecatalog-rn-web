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

describe("CategoryList navigation", () => {
  it("links a category card to its category route", () => {
    jest.resetModules();
    jest.doMock("react-native", () => {
      const React = require("react");
      const host = (tag) => ({ children, ...props }) =>
        React.createElement(tag, props, children);

      return {
        Dimensions: { get: () => ({ width: 800, height: 600 }) },
        Image: host("img"),
        StyleSheet: { create: (styles) => styles },
        Text: host("span"),
        TouchableOpacity: host("button"),
        View: host("div"),
      };
    });
    jest.doMock("../navigation", () => {
      const React = require("react");
      return {
        Link: ({ children, to }) =>
          React.createElement("a", { href: to }, children),
      };
    });

    const React = require("react");
    const { renderToStaticMarkup } = require("react-dom/server");
    const CategoryList = require("./CategoryList").default;
    const markup = renderToStaticMarkup(
      React.createElement(CategoryList, {
        cid: "drinks",
        fontSize: 12,
        image: "drinks.png",
        item: { cid: "drinks" },
        onPress: () => {},
        selectedCategory: null,
        style: { height: 100, width: 100 },
        title: "Drinks",
      })
    );

    expect(markup).toContain('href="/category/drinks"');
  });
});
