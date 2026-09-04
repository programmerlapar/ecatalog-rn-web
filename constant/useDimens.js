import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default () => {
    const [_dimensions, setDimensions] = useState({ window, screen });
    const _width = _dimensions.window.width;
    const _height = _dimensions.window.height;
  
    const isWeb = Platform.OS === "web";
  
    const onChangeDimens = ({ window, screen }) => {
      setDimensions({ window, screen });
    };
  
    useEffect(() => {
      const subscription = Dimensions.addEventListener("change", onChangeDimens);
      return () => {
        subscription?.remove?.();
      };
    }, []);

    return [_width, _height, isWeb, _dimensions]
}
