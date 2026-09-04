import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Route } from "react-router";
import { ContactModal, CustomModal } from "../components/CustomModal";
import MenuBar from "../components/MenuBar";
import { AccentColor, DarkAccent, LittleDarkAccent, SurfaceColor } from "../constant/ColorsConst";
import useDimens from "../constant/useDimens";
import { Link, Router } from "../navigation";
import About from "./About";
import Dashboard from "./Dashboard";
import Drawer from "./Drawer";
import Product from "./Product";

const Home = () => {
  const [_width, _height, isWeb] = useDimens();
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [buttonModal, setButtonModal] = useState(0);
  const slide = useRef(new Animated.Value(-280)).current;

  const rem = (size) => (isWeb ? (size * _height) / 380 : ((size * _width) / 380) * 2);
  const showDrawer = () => {
    setDrawerVisible(true);
    Animated.spring(slide, {
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start();
  };
  const hideDrawer = () => {
    Animated.timing(slide, {
      toValue: -280,
      duration: 180,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(() => setDrawerVisible(false));
  };
  const openModal = (modal) => {
    setButtonModal(modal);
    setModalVisible(true);
    setDrawerVisible(false);
  };

  return (
    <Router>
      <View style={styles.app}>
        <View style={styles.topRule} />
        <View style={styles.header}>
          <Link accessibilityRole="link" style={styles.brandLink} to="/">
            <Image accessibilityLabel="Logo Snow Motion Cafe" source={require("../assets/cafe.png")} style={styles.logo} />
            <View>
              <Text style={styles.eyebrow}>E-CATALOGUE</Text>
              <Text style={styles.brandName}>Snow Motion Cafe</Text>
            </View>
          </Link>
          {isWeb ? (
            <View style={styles.webNavigation}>
              <MenuBar title="Tentang Kami" menuHandler={() => openModal(1)} isWeb _rem={rem} />
              <MenuBar title="Kontak" menuHandler={() => openModal(2)} isWeb _rem={rem} />
            </View>
          ) : (
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Buka menu" onPress={showDrawer} style={styles.menuButton}>
              <Ionicons name="menu-outline" size={27} color={SurfaceColor} />
              <Text style={styles.menuButtonText}>Menu</Text>
            </TouchableOpacity>
          )}
        </View>

        <CustomModal
          modalHandler={() => {
            setModalVisible(false);
            setButtonModal(0);
          }}
          modalVisible={modalVisible}
          bgColor={SurfaceColor}
          width={isWeb ? _width / 2 : _width * 0.9}
          body={
            buttonModal === 1 ? (
              <View style={styles.aboutModal}>
                <Text style={styles.modalTitle}>Snow Motion Cafe</Text>
                <View style={styles.modalRule} />
                <Text style={styles.modalCopy}>
                  Snow Motion Cafe adalah Cafe yang dengan vibe modern, dan design interior yang kece banget. Didirikan pada tahun 2020.
                </Text>
                <Text style={styles.quote}>
                  “Don’t give up when you still have something to give. Nothing is really over until the moment you stop trying”
                </Text>
                <Text style={styles.quoteAuthor}>- Brian Dyson -</Text>
              </View>
            ) : buttonModal === 2 ? (
              <ContactModal _rem={rem} isWeb={isWeb} fontSize={isWeb ? 17 : rem(10)} />
            ) : null
          }
        />

        <Drawer
          slide={slide}
          drawerHandler={hideDrawer}
          slideAnim={showDrawer}
          visible={drawerVisible}
          _width={_width}
          _height={_height}
          modalHandler={openModal}
          isWeb={isWeb}
          _rem={rem}
        />

        <View style={styles.routeContent}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/category/:id" render={({ match }) => <Dashboard categoryId={match.params.id} />} />
          <Route path="/about" component={About} />
          <Route path="/product/:id" component={({ match }) => <Product rem={rem} match={match} />} />
        </View>

        <View style={styles.footer}>
          <Image accessibilityLabel="Logo Snow Motion Cafe" source={require("../assets/cafe.png")} style={styles.footerLogo} />
          <View>
            <Text style={styles.footerBrand}>Snow Motion Cafe</Text>
            <Text style={styles.footerCopy}>COPYRIGHT 2020 · ALL RIGHTS RESERVED</Text>
          </View>
        </View>
      </View>
    </Router>
  );
};

export default Home;

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  app: {
    backgroundColor: "#fbfaf6",
    flex: 1,
    minHeight: height,
  },
  topRule: {
    backgroundColor: AccentColor,
    height: 6,
  },
  header: {
    alignItems: "center",
    backgroundColor: DarkAccent,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 78,
    paddingHorizontal: 24,
    zIndex: 4,
    boxShadow: "0px 4px 14px rgba(32,49,45,0.14)",
  },
  brandLink: {
    alignItems: "center",
    flexDirection: "row",
    textDecorationLine: "none",
  },
  logo: {
    height: 48,
    marginRight: 12,
    width: 48,
  },
  eyebrow: {
    color: "#b9ccc3",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  brandName: {
    color: SurfaceColor,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 2,
  },
  webNavigation: {
    alignItems: "center",
    flexDirection: "row",
  },
  menuButton: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 48,
    paddingHorizontal: 8,
  },
  menuButtonText: {
    color: SurfaceColor,
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 5,
  },
  routeContent: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
    backgroundColor: DarkAccent,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 92,
    paddingHorizontal: 20,
  },
  footerLogo: {
    height: 38,
    marginRight: 12,
    width: 38,
  },
  footerBrand: {
    color: SurfaceColor,
    fontSize: 13,
    fontWeight: "800",
  },
  footerCopy: {
    color: "#b9ccc3",
    fontSize: 10,
    letterSpacing: 0.5,
    marginTop: 4,
  },
  aboutModal: {
    alignItems: "center",
    maxWidth: 460,
  },
  modalTitle: {
    color: LittleDarkAccent,
    fontSize: 21,
    fontWeight: "800",
  },
  modalRule: {
    backgroundColor: AccentColor,
    height: 3,
    marginVertical: 12,
    width: 42,
  },
  modalCopy: {
    color: LittleDarkAccent,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },
  quote: {
    color: DarkAccent,
    fontSize: 14,
    fontStyle: "italic",
    lineHeight: 21,
    marginTop: 22,
    textAlign: "center",
  },
  quoteAuthor: {
    color: LittleDarkAccent,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
  },
});
