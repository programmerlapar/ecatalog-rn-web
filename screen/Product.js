import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import {
  AccentColor,
  BackgroundColor,
  DarkAccent,
  LittleDarkAccent,
  SurfaceColor,
} from "../constant/ColorsConst";
import { Link } from "../navigation";
import { fetchDetailMenu, isLoadingHandler } from "../store/actions/menu";
import useDimens from "../constant/useDimens";

const Product = ({ match, rem }) => {
  const menuDetails = useSelector((state) => state.menu.detailMenu);
  const loading = useSelector((state) => state.menu.isFetching);
  const [_width, , isWeb] = useDimens();
  const dispatch = useDispatch();
  const id = match.params.id;

  useEffect(() => {
    dispatch(isLoadingHandler(true));
    dispatch(fetchDetailMenu(id));
  }, [dispatch, id]);

  if (loading || !menuDetails?.strMeal) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <Link accessibilityRole="link" style={styles.backLink} to="/">
          <Ionicons name="arrow-back" size={17} color={DarkAccent} />
          <Text style={styles.backText}>Kembali ke menu</Text>
        </Link>
        <View style={[styles.box, isWeb ? styles.webBox : styles.mobileBox]}>
          <Image
            accessibilityLabel={`${menuDetails.strMeal} gambar`}
            source={{ uri: menuDetails.strMealThumb }}
            style={[styles.image, { width: isWeb ? Math.min(_width * 0.42, 430) : _width - 48, height: isWeb ? 430 : _width - 48 }]}
          />
          <View style={styles.details}>
            <Text style={[styles.title, { fontSize: isWeb ? 31 : rem(12) }]}>{menuDetails.strMeal}</Text>
            <Text style={styles.label}>Tentang hidangan</Text>
            <Text style={styles.description}>{menuDetails.strInstructions}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  page: {
    backgroundColor: BackgroundColor,
    flexGrow: 1,
    padding: 24,
  },
  content: {
    alignSelf: "center",
    maxWidth: 1120,
    width: "100%",
  },
  backLink: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 22,
    minHeight: 44,
    textDecorationLine: "none",
  },
  backText: {
    color: DarkAccent,
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 8,
  },
  box: {
    alignItems: "center",
    backgroundColor: SurfaceColor,
    borderRadius: 24,
    padding: 18,
    elevation: 4,
    boxShadow: "0px 8px 24px rgba(32,49,45,0.1)",
  },
  webBox: {
    flexDirection: "row",
    gap: 30,
  },
  mobileBox: {
    padding: 12,
  },
  image: {
    backgroundColor: "#e8eee9",
    borderRadius: 18,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
  },
  title: {
    color: DarkAccent,
    fontWeight: "800",
    lineHeight: 38,
  },
  label: {
    color: AccentColor,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 25,
    textTransform: "uppercase",
  },
  description: {
    color: LittleDarkAccent,
    fontSize: 15,
    lineHeight: 24,
  },
});
