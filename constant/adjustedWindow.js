import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const window = Dimensions.get("window");
export const screen = Dimensions.get("screen");

const _dimens = () => {
  const [_dimensions, setDimensions] = useState({ window, screen });
  const onChangeDimens = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", onChangeDimens);
    return () => {
      subscription?.remove?.();
    };
  }, []);

  return _dimensions;
};

const _rem = (size) => {
  const dimensions = _dimens();
  const base = Math.min(dimensions.window.width, dimensions.window.height);
  return (size * base) / 380;
};

export default _rem;
