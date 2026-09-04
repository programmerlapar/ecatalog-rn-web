import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import _rem from "../constant/adjustedWindow";
import { DarkAccent, MutedTextColor } from "../constant/ColorsConst";
import useDimens from "../constant/useDimens";

const Loading = () => {
  const [_width, _height, isWeb] = useDimens();
  return (
    <View style={styles.main} accessibilityRole="progressbar" accessibilityLabel="Memuat menu">
      <Image
        accessibilityLabel="Ilustrasi donat"
        style={[styles.image, { height: isWeb ? 180 : 140, width: isWeb ? 180 : 140 }]}
        source={require("../assets/donut.png")}
      />
      <Text style={[styles.text, { fontSize: isWeb ? 18 : _rem(10) }]}>Memuat menu...</Text>
      <ActivityIndicator color={DarkAccent} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  main: { flex: 1, minHeight: 420, alignItems: "center", justifyContent: "center", backgroundColor: "#fbfaf6" },
  image: { marginBottom: 18 },
  text: { color: MutedTextColor, fontWeight: "600", marginBottom: 10 },
});
