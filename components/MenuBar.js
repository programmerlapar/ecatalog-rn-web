import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DarkAccent, MutedTextColor, SurfaceColor } from "../constant/ColorsConst";

const MenuBar = ({ menuHandler, _rem, isWeb, title, fontSize }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      activeOpacity={0.7}
      onPress={menuHandler}
      style={[styles.button, { minWidth: isWeb ? 112 : 190 }]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.text,
            {
              color: isWeb ? SurfaceColor : DarkAccent,
              fontSize: fontSize || (isWeb ? _rem(10) : _rem(8)),
            },
          ]}
        >
          {title}
        </Text>
        <Ionicons name="chevron-forward" size={16} color={isWeb ? SurfaceColor : MutedTextColor} />
      </View>
    </TouchableOpacity>
  );
};

export default MenuBar;

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  text: {
    color: "#20312d",
    fontWeight: "700",
  },
});
