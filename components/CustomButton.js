import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { _adjustSizes } from "../constant/adjustedSizes";
import { AccentColor2, SurfaceColor } from "../constant/ColorsConst";

const CustomButton = ({ onPress, bgcolor = AccentColor2, textColor = SurfaceColor, style, title }) => {
  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[styles.touchable, style, { backgroundColor: bgcolor }]}>
      <Text
        style={[styles.text, { color: textColor }]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: _adjustSizes(18),
  },
  touchable: {
    alignSelf: "center",
    minHeight: 44,
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: _adjustSizes(14),
    paddingVertical: _adjustSizes(8),
    marginBottom: _adjustSizes(8),
  },
});
