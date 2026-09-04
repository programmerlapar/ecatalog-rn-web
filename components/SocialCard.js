import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DarkAccent, BorderColor } from "../constant/ColorsConst";

const SocialCard = ({ icon, title, color, link }) => {
  return (
    <TouchableOpacity
      accessibilityRole="link"
      accessibilityLabel={`Buka ${title}`}
      activeOpacity={0.75}
      onPress={() => Linking.openURL(link)}
      style={styles.socialCard}
    >
      <Ionicons name={icon} size={22} color={color} />
      <Text style={styles.text}>{title}</Text>
      <Ionicons name="arrow-forward" size={16} color={DarkAccent} />
    </TouchableOpacity>
  );
};

export default SocialCard;

const styles = StyleSheet.create({
  socialCard: {
    alignItems: "center",
    borderColor: BorderColor,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    minHeight: 48,
    paddingHorizontal: 14,
    width: "100%",
  },
  text: {
    color: DarkAccent,
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 12,
  },
});
