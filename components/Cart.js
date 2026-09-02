import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
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
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <Ionicons name="md-cart" size={size} color="gold" />
        </View>
        <View>
          <Text style={{ color: "white", marginBottom: 5 }}>
            {getCartItemsCount()} item di keranjang
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Total: Rp.{getTotalPrice()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    borderRadius: 20,
    flex: 1,
    position: "fixed",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
    backgroundColor: DarkAccent,
    zIndex: 1,
  },
});
