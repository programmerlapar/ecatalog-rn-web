import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AccentColor2, BackgroundColor, DarkAccent, MutedTextColor } from "../constant/ColorsConst";
import SocialCard from "./SocialCard";

export const CustomModal = ({ modalVisible, modalHandler, width, bgColor, body }) => {
  return (
    <Modal animationType="fade" onRequestClose={modalHandler} transparent visible={modalVisible}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={modalHandler}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={[styles.dialog, { backgroundColor: bgColor || BackgroundColor, width: width || "90%" }]}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Tutup jendela"
            onPress={modalHandler}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Tutup</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
            {body}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export const ContactModal = ({ fontSize, _rem, isWeb }) => {
  const links = [
    { title: "Facebook", icon: "logo-facebook", color: "#3b5998", link: "https://web.facebook.com/bajubayiluwuk/shop/" },
    { title: "Instagram", icon: "logo-instagram", color: AccentColor2, link: "https://www.instagram.com/bajubayiluwuk" },
    { title: "WhatsApp", icon: "logo-whatsapp", color: "#218c4b", link: "https://wa.me/+6285343638747?text=Kak+Kiki+saya+mau+ecer+baju+nih.." },
  ];

  return (
    <View style={styles.contact}>
      <Text style={[styles.contactHeading, { fontSize }]}>Hubungi kami</Text>
      <Text style={styles.contactDescription}>Kami siap membantu lewat kanal pilihanmu.</Text>
      {links.map((social) => (
        <SocialCard
          key={social.title}
          link={social.link}
          isWeb={isWeb}
          _rem={_rem}
          title={social.title}
          icon={social.icon}
          color={social.color}
          bgcolor="#edf2ed"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  backdrop: {
    backgroundColor: "rgba(20,35,31,0.62)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  dialog: {
    borderRadius: 24,
    maxHeight: "82%",
    maxWidth: 560,
    padding: 18,
    elevation: 10,
    boxShadow: "0px 10px 30px rgba(20,35,31,0.24)",
  },
  closeButton: {
    alignSelf: "flex-end",
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  closeText: {
    color: MutedTextColor,
    fontSize: 13,
    fontWeight: "800",
  },
  body: {
    alignItems: "center",
    padding: 12,
  },
  contact: {
    alignItems: "center",
    width: "100%",
  },
  contactHeading: {
    color: DarkAccent,
    fontWeight: "800",
  },
  contactDescription: {
    color: MutedTextColor,
    fontSize: 13,
    marginBottom: 10,
    marginTop: 6,
    textAlign: "center",
  },
});
