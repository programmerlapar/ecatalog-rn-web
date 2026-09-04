import React from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { editOrder } from "../store/actions/cart";
import {
  AccentColor,
  AccentColor2,
  BackgroundColor,
  DarkAccent,
  LittleDarkAccent,
  MutedTextColor,
  SurfaceColor,
} from "../constant/ColorsConst";

const ProductsModal = ({ productModal, productModalHandler, product = {}, price }) => {
  const order = useSelector((state) => state.cart.orderItems);
  const dispatch = useDispatch();
  const quantity = order.find((item) => item.idMeal === product.idMeal)?.qty || 0;

  if (!product.idMeal) {
    return null;
  }

  const changeQuantity = (action) => {
    dispatch(editOrder(action, product.idMeal, price, product.strMeal, product.strMealThumb));
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={productModalHandler}
      transparent
      visible={productModal}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={productModalHandler}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
         <View style={styles.dialog}>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Tutup detail hidangan"
              onPress={productModalHandler}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
            <Image
              accessibilityLabel={`${product.strMeal} gambar`}
              source={{ uri: product.strMealThumb }}
              style={styles.image}
            />
            <Text style={styles.title}>{product.strMeal}</Text>
            <Text style={styles.price}>Rp {price?.toLocaleString("id-ID")}</Text>
            <Text style={styles.instruction}>Atur jumlah pesanan</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Kurangi ${product.strMeal}`}
                accessibilityState={{ disabled: quantity === 0 }}
                disabled={quantity === 0}
                onPress={() => changeQuantity("-")}
                style={[styles.quantityButton, quantity === 0 && styles.disabledButton]}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <View accessibilityLiveRegion="polite" style={styles.quantityValue}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Tambah ${product.strMeal}`}
                onPress={() => changeQuantity("+")}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
    alignItems: "center",
    backgroundColor: BackgroundColor,
    borderRadius: 24,
    maxHeight: "90%",
    maxWidth: 420,
    width: "100%",
    elevation: 10,
    boxShadow: "0px 10px 30px rgba(20,35,31,0.24)",
  },
  content: {
    alignItems: "center",
    padding: 22,
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
  image: {
    backgroundColor: "#e8eee9",
    borderRadius: 16,
    height: 220,
    marginBottom: 16,
    width: 220,
  },
  title: {
    color: DarkAccent,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  price: {
    color: AccentColor2,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 6,
  },
  instruction: {
    color: LittleDarkAccent,
    fontSize: 13,
    marginTop: 20,
  },
  quantityControl: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 9,
  },
  quantityButton: {
    alignItems: "center",
    backgroundColor: AccentColor2,
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    width: 52,
  },
  disabledButton: {
    backgroundColor: "#c8cfca",
  },
  quantityValue: {
    alignItems: "center",
    backgroundColor: SurfaceColor,
    borderColor: "#d9e0da",
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 64,
  },
  quantityText: {
    color: DarkAccent,
    fontSize: 18,
    fontWeight: "800",
  },
  quantityButtonText: {
    color: SurfaceColor,
    fontSize: 23,
    fontWeight: "700",
  },
});

export default ProductsModal;
