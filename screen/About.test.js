jest.mock("../assets/cafe.png", () => "cafe-logo");

import About from "./About";

const collectText = (node) => {
  if (typeof node === "string") {
    return [node];
  }

  if (!node || !node.props) {
    return [];
  }

  return (Array.isArray(node.props.children)
    ? node.props.children
    : [node.props.children]
  ).flatMap(collectText);
};

describe("About Cafe screen", () => {
  it("renders cafe information instead of repeated placeholders", () => {
    const screen = About();
    const text = collectText(screen).filter((value) => value !== undefined);

    expect(text).not.toContain("AboutScreen");
    expect(text).toContain("Snow Motion Cafe");
    expect(text.join(" ")).toContain("Didirikan pada tahun 2020");
  });
});
