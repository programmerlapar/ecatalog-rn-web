import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "react-router-dom";
import { _adjustSizes } from "../constant/adjustedSizes";
import { DarkAccent, LittleDarkAccent } from "../constant/ColorsConst";

const CategoryList = ({
  cid,
  style,
  onPress,
  image,
  title,
  fontSize,
  item,
  selectedCategory,
}) => {
  const selected = isCategorySelected(selectedCategory, item);
  return (
    <TouchableOpacity onPress={onPress}>
      <Link
        to={`/category/${cid}`}
        style={{ textDecoration: "none", flex: 1 }}
      >
        <View
          onMouseEnter={() => {}}
          style={[
            styles.container,
            {
              ...style,
              flex: 1,
              backgroundColor: selected ? DarkAccent : "white",
            },
          ]}
        >
          <Image
            source={{ uri: image }}
            style={{
              flex: 1,
              justifyContent: "center",
              width: "100%",
              height: style.height / 2,
              resizeMode: "contain",
              borderRadius: "50%",
            }}
          />
          <Text
            style={[
              styles.text,
              {
                fontSize,
                color: selected ? "white" : LittleDarkAccent,
              },
            ]}
          >
            {title}
          </Text>
        </View>
      </Link>
    </TouchableOpacity>
  );
};

export const isCategorySelected = (selectedCategory, item) =>
  selectedCategory?.cid != null &&
  item?.cid != null &&
  selectedCategory.cid === item.cid;

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: _adjustSizes(20),
    marginBottom: _adjustSizes(40),
    padding: 10,
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomLeftRadius: "10%",
    borderBottomRightRadius: "10%",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "2px 2px 5px rgb(0,0,0,0.5)",
  },
  text: {
    fontWeight: "600",
  },
});
