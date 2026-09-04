import React from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MenuBar from "../components/MenuBar";
import { BackgroundColor, BorderColor, DarkAccent, MutedTextColor } from "../constant/ColorsConst";

const Drawer = ({ visible, _width, _height, drawerHandler, modalHandler, slide, isWeb, _rem, slideAnim }) => {
  return (
    <Modal onShow={slideAnim} onRequestClose={drawerHandler} visible={visible} transparent>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={drawerHandler}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.drawerContainer, { height: _height, transform: [{ translateX: slide }] }]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.title}>Menu</Text>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Tutup menu" onPress={drawerHandler} style={styles.closeButton}>
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rule} />
          <MenuBar title="Tentang Kami" menuHandler={() => modalHandler(1)} isWeb={isWeb} _rem={_rem} />
          <MenuBar title="Kontak" menuHandler={() => modalHandler(2)} isWeb={isWeb} _rem={_rem} />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "rgba(20,35,31,0.52)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  drawerContainer: {
    backgroundColor: BackgroundColor,
    elevation: 12,
    paddingHorizontal: 20,
    paddingTop: 34,
    position: "absolute",
    right: 0,
    top: 0,
    width: 290,
    boxShadow: "-8px 0px 24px rgba(20,35,31,0.18)",
  },
  drawerHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: DarkAccent,
    fontSize: 24,
    fontWeight: "800",
  },
  closeButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  closeText: {
    color: MutedTextColor,
    fontSize: 13,
    fontWeight: "800",
  },
  rule: {
    backgroundColor: BorderColor,
    height: 1,
    marginBottom: 16,
    marginTop: 14,
  },
});

export default Drawer;
