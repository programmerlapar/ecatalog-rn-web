jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null,
}));

jest.mock("react-native-web", () => {
  const React = require("react");
  const host = (name) => (props) => React.createElement(name, props, props.children);

  return {
    Linking: { openURL: jest.fn() },
    StyleSheet: { create: (styles) => styles },
    Text: host("text"),
    TouchableOpacity: host("button"),
    View: host("view"),
  };
});

import SideBar from "./Sidebar";
import { Linking } from "react-native-web";

const collectButtons = (node) => {
  if (Array.isArray(node)) {
    return node.flatMap(collectButtons);
  }

  if (!node || !node.props) {
    return [];
  }

  const children = Array.isArray(node.props.children)
    ? node.props.children
    : [node.props.children];

  return [
    ...(typeof node.props.onPress === "function" ? [node] : []),
    ...children.flatMap(collectButtons),
  ];
};

describe("Sidebar social navigation", () => {
  beforeEach(() => {
    Linking.openURL.mockClear();
  });

  it("opens the advertised Facebook, Instagram, and WhatsApp destinations", () => {
    const sidebar = SideBar({});
    const buttons = collectButtons(sidebar);

    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => button.props.onPress());

    expect(Linking.openURL.mock.calls).toEqual([
      ["https://web.facebook.com/bajubayiluwuk/shop/"],
      ["https://www.instagram.com/bajubayiluwuk"],
      ["https://wa.me/+6285343638747?text=Kak+Kiki+saya+mau+ecer+baju+nih.."],
    ]);
  });
});
