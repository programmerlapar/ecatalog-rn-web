import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { BorderColor, DarkAccent, LittleDarkAccent, SurfaceColor, shadow } from "../constant/ColorsConst";
import { Link } from "../navigation";

const CategoryList = ({ cid, style = {}, onPress, image, title, fontSize = 12, item, selectedCategory }) => {
  const selected = isCategorySelected(selectedCategory, item);
  const linkInteraction = Platform.OS === "web" ? { onClick: onPress } : { onPress };

  return (
    <Link
      accessibilityRole="button"
      accessibilityLabel={`Pilih kategori ${title}`}
      accessibilityState={{ selected }}
      {...linkInteraction}
      style={[styles.link, { width: style.width || 96 }]}
      to={`/category/${cid}`}
    >
      <View style={[styles.container, { backgroundColor: selected ? DarkAccent : SurfaceColor }]}>
        <Image source={{ uri: image }} style={[styles.image, { height: style.height || 96 }]} />
        <Text numberOfLines={2} style={[styles.text, { color: selected ? SurfaceColor : LittleDarkAccent, fontSize }]}>
          {title}
        </Text>
      </View>
    </Link>
  );
};

export const isCategorySelected = (selectedCategory, item) =>
  selectedCategory?.cid != null && item?.cid != null && selectedCategory.cid === item.cid;

export default CategoryList;

const styles = StyleSheet.create({
  link: {
    marginHorizontal: 6,
    marginBottom: 12,
    textDecorationLine: "none",
  },
  container: {
    alignItems: "center",
    borderColor: BorderColor,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    overflow: "hidden",
    paddingBottom: 11,
    boxShadow: shadow(2),
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    backgroundColor: "#e8eee9",
  },
  text: {
    fontWeight: "800",
    letterSpacing: 0.3,
    marginTop: 9,
    paddingHorizontal: 5,
    textAlign: "center",
  },
});
