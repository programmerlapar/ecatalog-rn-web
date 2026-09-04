import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
  AccentColor,
  DarkAccent
} from "../constant/ColorsConst";
import { cartTotal } from "../constant/function";

const Cart = ({ size, style, onPress }) => {
  const order = useSelector((state) => state.cart.orderItems);

  let orderList = order.slice();

  function getCartItemsCount() {
    let itemCount = orderList.reduce((a, b) => a + (b.qty || 0), 0);

    return itemCount;
  }

  function getTotalPrice() {
    let total = orderList.reduce((a, b) => a + (b.total || 0), 0);
    return cartTotal(total);
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`Buka keranjang, ${getCartItemsCount()} item`}
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="cart-outline" size={size} color={AccentColor} />
        </View>
        <View>
          <Text style={styles.itemText}>
            {getCartItemsCount()} item di keranjang
          </Text>
          <Text style={styles.totalText}>
            Total Rp {getTotalPrice()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    minHeight: 64,
    position: Platform.OS === "web" ? "fixed" : "absolute",
    boxShadow: "0px 8px 22px rgba(32,49,45,0.22)",
    backgroundColor: DarkAccent,
    zIndex: 1,
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: "rgba(242,184,75,0.14)",
    borderRadius: 12,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  itemText: {
    color: "#d7e3dc",
    fontSize: 12,
    marginBottom: 4,
  },
  totalText: {
    color: "white",
    fontSize: 15,
    fontWeight: "800",
  },
});
