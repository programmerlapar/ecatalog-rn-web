jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

jest.mock("react-native", () => {
  const React = require("react");
  const host = (name) => (props) => React.createElement(name, props, props.children);

  return {
    StyleSheet: { create: (styles) => styles },
    Text: host("text"),
    TouchableOpacity: host("button"),
    View: host("view"),
  };
});

import MenuBar from "./MenuBar";
import { SurfaceColor } from "../constant/ColorsConst";

describe("MenuBar", () => {
  it("uses readable controls on the dark web header", () => {
    const menu = MenuBar({
      _rem: () => 10,
      isWeb: true,
      menuHandler: jest.fn(),
      title: "Kontak",
    });
    const [text, icon] = menu.props.children.props.children;

    expect(text.props.style[1].color).toBe(SurfaceColor);
    expect(icon.props.color).toBe(SurfaceColor);
  });
});
