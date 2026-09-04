import { Platform } from "react-native";

const isWeb = Platform.OS === "web";
const navigation = isWeb
  ? require("react-router-dom")
  : require("react-router-native");

export const Router = isWeb
  ? navigation.BrowserRouter
  : navigation.NativeRouter;
export const Link = navigation.Link;
