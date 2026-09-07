import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  AccentColor,
  BackgroundColor,
  DarkAccent,
  LittleDarkAccent,
  MutedSurfaceColor,
  MutedTextColor,
  SurfaceColor,
} from "../constant/ColorsConst";

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Tentang kami</Text>
        <Image
          accessibilityLabel="Logo Snow Motion Cafe"
          accessibilityRole="image"
          source={require("../assets/cafe.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Snow Motion Cafe</Text>
        <View style={styles.rule} />
        <Text style={styles.description}>
          Snow Motion Cafe adalah cafe dengan vibe modern dan desain interior yang kece banget. Didirikan pada tahun 2020.
        </Text>
        <View style={styles.note}>
          <Text style={styles.noteText}>Temukan menu favoritmu dan nikmati waktu yang lebih santai bersama kami.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: BackgroundColor,
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    backgroundColor: SurfaceColor,
    borderRadius: 24,
    maxWidth: 560,
    paddingHorizontal: 28,
    paddingVertical: 34,
    width: "100%",
    elevation: 4,
    boxShadow: "0px 8px 24px rgba(32,49,45,0.1)",
  },
  heading: {
    color: MutedTextColor,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  logo: {
    height: 112,
    marginBottom: 18,
    marginTop: 24,
    width: 112,
  },
  title: {
    color: DarkAccent,
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
  },
  rule: {
    backgroundColor: AccentColor,
    height: 3,
    marginVertical: 14,
    width: 42,
  },
  description: {
    color: LittleDarkAccent,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 470,
    textAlign: "center",
  },
  note: {
    backgroundColor: MutedSurfaceColor,
    borderRadius: 14,
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  noteText: {
    color: LittleDarkAccent,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
});
