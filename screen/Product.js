import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
  const [error, setError] = useState(false);
  const [requesting, setRequesting] = useState(true);

  useEffect(() => {
    setError(false);
    setRequesting(true);
    dispatch(isLoadingHandler(true));
    dispatch(fetchDetailMenu(id))
      .catch(() => setError(true))
      .finally(() => setRequesting(false));
  }, [dispatch, id]);

  const detailReady = menuDetails?.strMeal && String(menuDetails.idMeal) === String(id);

  if (error || (!requesting && !detailReady)) {
    return (
      <View style={styles.errorState}>
        <Text style={styles.errorTitle}>Hidangan tidak bisa dimuat</Text>
        <Text style={styles.errorText}>Coba kembali ke menu dan pilih hidangan lain.</Text>
        <Link accessibilityRole="link" to="/" style={styles.backButton}>
          <Text style={styles.backButtonText}>Kembali ke menu</Text>
        </Link>
      </View>
    );
  }

  if (requesting || loading || !detailReady) {
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
            style={[styles.image, { width: isWeb ? Math.min(_width * 0.42, 430) : "100%", height: isWeb ? Math.min(_width * 0.42, 430) : undefined }]}
          />
          <View style={[styles.details, !isWeb && styles.mobileDetails]}>
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
    aspectRatio: 1,
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
  mobileDetails: {
    width: "100%",
  },
  errorState: {
    alignItems: "center",
    backgroundColor: BackgroundColor,
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  errorTitle: {
    color: DarkAccent,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  errorText: {
    color: LittleDarkAccent,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: AccentColor,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 44,
    paddingHorizontal: 18,
    textDecorationLine: "none",
  },
  backButtonText: {
    color: DarkAccent,
    fontSize: 13,
    fontWeight: "800",
  },
});
