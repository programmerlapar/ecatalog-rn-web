import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AccentColor2, BorderColor, MutedTextColor, SurfaceColor } from "../constant/ColorsConst";

const SOCIAL_LINKS = [
  { label: "Facebook", icon: "logo-facebook", link: "https://web.facebook.com/bajubayiluwuk/shop/" },
  { label: "Instagram", icon: "logo-instagram", link: "https://www.instagram.com/bajubayiluwuk" },
  {
    label: "WhatsApp",
    icon: "logo-whatsapp",
    link: "https://wa.me/+6285343638747?text=Kak+Kiki+saya+mau+ecer+baju+nih..",
  },
];

const SideBar = ({ style, size = 22 }) => {
  return (
    <View style={[styles.sidebar, style]}>
      <Text style={styles.label}>Ikuti kami</Text>
      {SOCIAL_LINKS.map((social) => (
        <TouchableOpacity
          key={social.label}
          accessibilityRole="link"
          accessibilityLabel={`Buka ${social.label}`}
          onPress={() => Linking.openURL(social.link)}
          style={styles.socialButton}
        >
          <Ionicons name={social.icon} size={size} color={AccentColor2} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  sidebar: {
    alignItems: "center",
    backgroundColor: SurfaceColor,
    borderColor: BorderColor,
    borderRadius: 18,
    borderWidth: 1,
    boxShadow: "0px 6px 18px rgba(32,49,45,0.12)",
    padding: 8,
  },
  label: {
    color: MutedTextColor,
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 4,
    transform: [{ rotate: "-90deg" }],
  },
  socialButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    minWidth: 44,
  },
});
