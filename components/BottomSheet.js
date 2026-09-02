import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { DarkAccent } from "../constant/ColorsConst";
import { cartTotal } from "../constant/function";
import ProductsModal from "./ProductsModal";

const BottomSheet = ({
  modalHandler,
  modalVisible,
  width,
  height,
  isWeb,
  productModal,
  productModalHandler,
  price,
  product,
}) => {
  const order = useSelector((state) => state.cart.orderItems);
  const [selectedP, setSelectedP] = React.useState([]);
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
    <Modal
      onRequestClose={modalHandler}
      visible={modalVisible}
      animationType="fade"
      transparent
    >
      {productModal == true && (
        <ProductsModal
          price={price}
          productModal={productModal}
          productModalHandler={productModalHandler}
          product={product}
        />
      )}

      <TouchableWithoutFeedback onPress={modalHandler}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.1)",
          }}
        >
          <View
            style={[
              styles.container,
              {
                width: isWeb ? width / 2 : "100%",
                height: "50%",
                left: isWeb ? 20: 0,
              },
            ]}
          >
            <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
              <Text style={styles.headerText}>Keranjang</Text>
            </View>
            <ScrollView style={{ padding: 20 }}>
              <FlatList
                scrollEnabled={true}
                data={orderList}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        productModalHandler(item);
                      }}
                    >
                      <View
                        key={index}
                        style={
                          {
                            // justifyContent: "flex-start",
                          }
                        }
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            // alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Text style={styles.contentText}>{item.qty}</Text>
                            <Text style={styles.contentText}>
                              {item.strMeal}
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.contentText}>
                              Rp. {cartTotal(item.total)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "gold",
              }}
            >
              <Text
                style={[
                  styles.headerText,
                  { padding: 20, color: DarkAccent, fontWeight: "bold" },
                ]}
              >
                {getCartItemsCount()} Items
              </Text>
              <Text
                style={[
                  styles.headerText,
                  { padding: 20, color: DarkAccent, fontWeight: "bold" },
                ]}
              >
                Total Rp. {getTotalPrice()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: DarkAccent,
    justifyContent: "space-between",
  },
  imageBg: {
    backgroundColor: "blue",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    marginBottom: 5,
  },
  contentText: {
    color: "white",
    fontSize: 16,
    marginRight: 5,
  },
});
