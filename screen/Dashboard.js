import React, { useEffect, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import BottomSheet from "../components/BottomSheet";
import Cart from "../components/Cart";
import CategoryList from "../components/CategoryList";
import Loading from "../components/Loading";
import ProductList from "../components/ProductList";
import ProductsModal from "../components/ProductsModal";
import SideBar from "../components/Sidebar";
import { DarkAccent, LittleDarkAccent } from "../constant/ColorsConst";
import priceInt, { cartTotal } from "../constant/function";
import { HEADER_MARGIN, isMobile } from "../constant/isMobile";
import useDimens from "../constant/useDimens";
import data from "../data/data.json";
import { fetchAllMenu, fetchCategory, fetchMenu } from "../store/actions/menu";

const PADDING_LEFT = "20%";

const Dashboard = () => {
  const availCat = useSelector((state) => state.menu.categoryList);
  const availLatMenu = useSelector((state) => state.menu.latestMenu);
  const availMenu = useSelector((state) => state.menu.availableMenu);
  const loading = useSelector((state) => state.menu.isFetching);
  const order = useSelector((state) => state.cart.orderItems);
  const availablePromo = data.Promo;
  const [promo, setPromo] = useState(availablePromo);
  const [_width, _height, isWeb] = useDimens();
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [meals, setMeals] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const slide = React.useRef(new Animated.Value(-100)).current;
  const slideAnim = () => {
    Animated.spring(slide, {
      toValue: 0,
      // tension: 2,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.back,
    }).start();
  };

  const BASE_PRICE = priceInt(15000, 60000);
  const PRICE = cartTotal(BASE_PRICE);

  const dispatch = useDispatch();
  const _rem = (size) => {
    if (_height > _width) {
      return ((size * _width) / 380) * 2;
    } else {
      return (size * _height) / 380;
    }
  };

  // const fetchNewManu = useCallback(async () => {
  //   // await dispatch(isLoadingHandler());

  //   // dispatch(fetchLatestMenu());
  // }, []);

  useEffect(async () => {
    // await fetchNewManu();
    await dispatch(fetchCategory());
    await dispatch(fetchMenu("starter"));
  }, []);

  const modalHandler = async () => {
    setModalVisible(!modalVisible);
  };

  const productModalHandler = (item) => {
    setProductModal(!productModal);
    if (productModal === false) {
      setSelectedProduct(item);
    }
  };

  const selectedCategoryHandler = (category) => {
    setSelectedCategory(category);
    dispatch(fetchAllMenu(category.strCategory.toLowerCase()));
    setMeals(true);
  };
  return (
    <View style={{ flex: 1 }}>
      {!loading ? (
        <View>
          <ProductsModal
            price={BASE_PRICE}
            productModal={productModal}
            productModalHandler={productModalHandler}
            product={selectedProduct}
          />
          <BottomSheet
            modalHandler={modalHandler}
            modalVisible={modalVisible}
            price={BASE_PRICE}
            productModal={productModal}
            product={selectedProduct}
            productModalHandler={productModalHandler}
            width={_width}
            height={_height}
            isWeb={isWeb}
          />
          {order.length > 0 ? (
            <Cart
              productModal={productModal}
              productModalHandler={productModalHandler}
              cartItems={cartItems}
              onPress={modalHandler}
              style={[
                Bar(isWeb).bar,
                {
                  bottom: isWeb ? 20 : 75,
                  top: null,
                  marginVertical: isMobile ? null : 5,
                  width: isWeb ? "16%" : "70%",
                },
              ]}
              size={isWeb ? _width * 0.02 : _width * 0.06}
            />
          ) : null}
          <View
            style={{
              zIndex: 3,
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SideBar
              style={Bar(isWeb).bar}
              size={isWeb ? _width * 0.03 : _width * 0.06}
              cartHandler={() => setVisible(!visible)}
              badgeData={cartItems.length}
            />
          </View>
          <View style={[styles.body]}>
            <View
              style={{
                // flex: 1,
                // height: _height / 1.8,
                // width: _width * 0.8,
                // alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
                // flexGrow: 1,
              }}
            >
              <Fade right>
                <View style={styles.headerFlatlist}>
                  <Text
                    style={{
                      ...styles.headerFlatlist,
                      paddingLeft: isWeb ? PADDING_LEFT : null,
                      fontSize: isWeb ? _rem(22) : _rem(12),
                      color: LittleDarkAccent,
                      marginTop: 10,
                    }}
                  >
                    Promo Saat ini
                  </Text>
                </View>
              </Fade>
              <Slide bottom cascade>
                <FlatList
                  data={promo}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={{
                    paddingLeft: isWeb ? PADDING_LEFT : null,
                  }}
                  keyExtractor={(item) => item.pid}
                  renderItem={({ item }) => {
                    return (
                      <ProductList
                        style={{
                          width: !isWeb ? 150 : _width / 6,
                          height: !isWeb ? 350 / 2 : _width / 5 - 20,
                        }}
                        fontSize={!isWeb ? _rem(5) : _rem(8)}
                        title={item.title}
                        // imagePath={require(`../assets/${item.image_link}`)}
                        price={PRICE}
                        onPress={() => { }}
                        item={item}
                      />
                    );
                  }}
                />
              </Slide>
            </View>
            <View style={styles.headerFlatlist}>
              <Fade right>
                <Text
                  style={[
                    styles.headerFlatlistText,
                    {
                      fontSize: isWeb ? _rem(22) : _rem(12),
                      paddingVertical: 10,
                      paddingLeft: isWeb ? PADDING_LEFT : null,
                      color: LittleDarkAccent,
                    },
                  ]}
                >
                  Pilih kategori favoritmu!
                </Text>
              </Fade>
            </View>
            <Slide bottom cascade>
              <FlatList
                horizontal
                contentContainerStyle={{
                  flex: 1,
                  paddingTop: 20,
                  paddingLeft: isWeb ? PADDING_LEFT : null,
                }}
                data={availCat.categories}
                keyExtractor={(item) => item.idCategory}
                showsHorizontalScrollIndicator={isWeb ? false : true}
                renderItem={({ item }) => (
                  <CategoryList
                    fontSize={isWeb ? _rem(8) : _rem(5)}
                    title={item.strCategory.toUpperCase()}
                    image={item.strCategoryThumb}
                    style={{
                      width: !isMobile ? _width / 8 - 20 : _width / 4 - 20,
                      height: !isMobile ? _width / 8 - 20 : _width / 4 - 20,
                      marginVertical: isWeb ? 10 : null,
                    }}
                    idCategory={item.idCategory}
                    onPress={() => {
                      selectedCategoryHandler(item);
                    }}
                    selectedCategory={selectedCategory}
                    item={item}
                  />
                )}
              />
            </Slide>
            {!meals ? (
              <Slide right cascade>
                <View style={styles.headerFlatlist}>
                  <Text
                    style={{
                      ...styles.headerFlatlist,
                      fontSize: isWeb ? _rem(22) : _rem(12),
                      color: LittleDarkAccent,
                      paddingLeft: isWeb ? PADDING_LEFT : null,
                    }}
                  >
                    Latest Menu
                  </Text>
                </View>
                <FlatList
                  contentContainerStyle={{
                    // marginHorizontal: !isWeb ? null : 100,
                    // paddingBottom: "25%",
                    justifyContent: isWeb ? null : "center",
                    alignItems: "center",
                    paddingLeft: isWeb ? PADDING_LEFT : null,
                  }}
                  scrollEnabled
                  showsVerticalScrollIndicator={false}
                  numColumns={isMobile ? 2 : 4}
                  // horizontal
                  // data={products.reverse().slice(0, 8)}
                  data={availMenu.meals}
                  // data={products}
                  keyExtractor={(item, index) => item.idMeal}
                  renderItem={({ item }) => (
                    <ProductList
                      style={{
                        width: !isWeb ? 150 : _width / 6,
                        height: !isWeb ? 350 / 2 : _width / 5 - 20,
                      }}
                      fontSize={!isWeb ? _rem(5) : _rem(8)}
                      title={item.strMeal}
                      image={item.strMealThumb}
                      price={PRICE}
                      onPress={() => productModalHandler(item)}
                      item={item}
                    />
                  )}
                />
              </Slide>
            ) : (
              <Slide bottom cascade>
                <FlatList
                  ListHeaderComponent={
                    <Slide right>
                      <Text
                        style={{
                          fontSize: isWeb ? _rem(22) : _rem(12),
                          color: LittleDarkAccent,
                        }}
                      >
                        {selectedCategory.strCategory}
                      </Text>
                    </Slide>
                  }
                  ListHeaderComponentStyle={{
                    alignSelf: "flex-start",
                    marginHorizontal: 20,
                  }}
                  contentContainerStyle={{
                    justifyContent: isWeb ? null : "center",
                    alignItems: "center",
                    paddingLeft: isWeb ? PADDING_LEFT : null,
                  }}
                  style={{ marginBottom: 40 }}
                  scrollEnabled
                  showsVerticalScrollIndicator={false}
                  numColumns={isMobile ? 2 : 4}
                  data={availLatMenu.meals}
                  keyExtractor={(item, index) => item.idMeal}
                  renderItem={({ item }) => (
                    <ProductList
                      style={{
                        width: !isWeb ? 150 : _width / 6,
                        height: !isWeb ? 350 / 2 : _width / 5 - 20,
                      }}
                      fontSize={!isWeb ? _rem(5) : _rem(8)}
                      title={item.strMeal}
                      image={item.strMealThumb}
                      price={PRICE}
                      onPress={() => productModalHandler(item)}
                      item={item}
                    />
                  )}
                />
              </Slide>
            )}
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
    marginTop: HEADER_MARGIN + 20,
    backgroundColor: "#fafcfb",
    overflow: "visible",
  },
  headerFlatlist: {
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  headerFlatlistText: {
    color: DarkAccent,
  },
});
const Bar = (isWeb) =>
  StyleSheet.create({
    bar: {
      padding: isWeb ? 20 : 0,
      paddingVertical: isWeb ? null : 10,
      top: isWeb ? "40%" : null,
      left: isWeb ? 20 : null,
      right: isWeb ? null : null,
      bottom: isWeb ? null : 20,
      flexDirection: isWeb ? null : "row",
      justifyContent: isWeb ? null : "space-evenly",
      alignSelf: isWeb ? null : "center",
      width: isWeb ? null : "60%",
      marginHorizontal: 10,
    },
  });

export default Dashboard;
