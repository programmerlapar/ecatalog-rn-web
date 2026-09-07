import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import {
  AccentColor,
  BackgroundColor,
  BorderColor,
  DarkAccent,
  LittleDarkAccent,
  MutedTextColor,
  SurfaceColor,
} from "../constant/ColorsConst";
import { cartTotal } from "../constant/function";

const BottomSheet = ({ modalHandler, modalVisible, width, isWeb }) => {
  const order = useSelector((state) => state.cart.orderItems);
  const itemCount = order.reduce((total, item) => total + (item.qty || 0), 0);
  const total = order.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <Modal
      animationType="slide"
      onRequestClose={modalHandler}
      visible={modalVisible}
      transparent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={modalHandler}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <View style={[styles.container, { width: isWeb ? Math.min(width * 0.56, 560) : "100%" }]}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>Pesananmu</Text>
              <Text style={styles.headerHint}>{itemCount} item siap dinikmati</Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Tutup keranjang"
              onPress={modalHandler}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Tutup</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={order}
            keyExtractor={(item) => item.idMeal}
            contentContainerStyle={order.length ? styles.list : styles.emptyList}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Keranjang masih kosong</Text>
                <Text style={styles.emptyText}>Pilih hidangan dari menu untuk mulai memesan.</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemQuantity}>{item.qty}x</Text>
                  <Text numberOfLines={2} style={styles.itemTitle}>{item.strMeal}</Text>
                </View>
                <Text style={styles.itemPrice}>Rp {cartTotal(item.total)}</Text>
              </View>
            )}
          />

          <View style={styles.summary}>
            <View>
              <Text style={styles.summaryLabel}>Total pesanan</Text>
              <Text style={styles.summaryValue}>Rp {cartTotal(total)}</Text>
            </View>
            <TouchableOpacity accessibilityRole="button" style={styles.orderButton} onPress={modalHandler}>
              <Text style={styles.orderButtonText}>Selesai</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    backgroundColor: "rgba(20,35,31,0.48)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  container: {
    alignSelf: "center",
    backgroundColor: BackgroundColor,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "78%",
    minHeight: 260,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  handle: {
    alignSelf: "center",
    backgroundColor: BorderColor,
    borderRadius: 4,
    height: 4,
    marginBottom: 18,
    width: 42,
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerText: {
    color: DarkAccent,
    fontSize: 22,
    fontWeight: "800",
  },
  headerHint: {
    color: MutedTextColor,
    fontSize: 13,
    marginTop: 3,
  },
  closeButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  closeText: {
    color: DarkAccent,
    fontSize: 13,
    fontWeight: "800",
  },
  list: {
    paddingBottom: 18,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    color: DarkAccent,
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    color: MutedTextColor,
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
  },
  itemRow: {
    alignItems: "center",
    borderBottomColor: BorderColor,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 58,
    paddingVertical: 9,
  },
  itemInfo: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    paddingRight: 12,
  },
  itemQuantity: {
    color: DarkAccent,
    fontSize: 14,
    fontWeight: "800",
    marginRight: 10,
  },
  itemTitle: {
    color: LittleDarkAccent,
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  itemPrice: {
    color: DarkAccent,
    fontSize: 14,
    fontWeight: "800",
  },
  summary: {
    alignItems: "center",
    borderTopColor: BorderColor,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  summaryLabel: {
    color: MutedTextColor,
    fontSize: 12,
  },
  summaryValue: {
    color: DarkAccent,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 3,
  },
  orderButton: {
    backgroundColor: AccentColor,
    borderRadius: 12,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  orderButtonText: {
    color: DarkAccent,
    fontSize: 14,
    fontWeight: "800",
  },
});

export default BottomSheet;
