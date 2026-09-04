import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "../components/BottomSheet";
import Cart from "../components/Cart";
import CategoryList from "../components/CategoryList";
import Loading from "../components/Loading";
import ProductList from "../components/ProductList";
import ProductsModal from "../components/ProductsModal";
import {
  AccentColor,
  BackgroundColor,
  DarkAccent,
  LittleDarkAccent,
  MutedTextColor,
  MutedSurfaceColor,
  PrimaryColor,
} from "../constant/ColorsConst";
import priceInt, { cartTotal } from "../constant/function";
import useDimens from "../constant/useDimens";
import data from "../data/data.json";
import { fetchAllMenu, fetchCategory, fetchLatestMenu } from "../store/actions/menu";

const promoImages = {
  "paket_1.jpg": require("../assets/paket_1.jpg"),
  "paket_2.png": require("../assets/paket_2.png"),
  "paket_3.jpeg": require("../assets/paket_3.jpeg"),
};

const Dashboard = ({ categoryId }) => {
  const availCat = useSelector((state) => state.menu.categoryList);
  const availLatestMenu = useSelector((state) => state.menu.latestMenu);
  const availMenu = useSelector((state) => state.menu.availableMenu);
  const loading = useSelector((state) => state.menu.isFetching);
  const order = useSelector((state) => state.cart.orderItems);
  const promo = data.Promo || [];
  const [basePrice] = useState(() => priceInt(15000, 60000));
  const [_width, , isWeb] = useDimens();
  const [modalVisible, setModalVisible] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [meals, setMeals] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const dispatch = useDispatch();
  const rawCategories = availCat?.categories || [];

  useEffect(() => {
    dispatch(fetchCategory()).catch(() => {
      if (categoryId) {
        setMenuError(true);
        setMenuLoading(false);
      }
    });
    if (!categoryId) {
      setSelectedCategory(null);
      setMeals(false);
      setMenuLoading(true);
      setMenuError(false);
      dispatch(fetchLatestMenu())
        .catch(() => setMenuError(true))
        .finally(() => setMenuLoading(false));
    }
  }, [categoryId, dispatch, retryCount]);

  const categories = (availCat.categories || []).map((category) => ({
    ...category,
    cid: category.cid ?? category.idCategory,
    title: category.title ?? category.strCategory,
    image_link: category.image_link ?? category.strCategoryThumb,
  }));
  const menu = meals ? availLatestMenu?.meals || [] : availMenu?.meals || [];
  const columns = isWeb && _width >= 720 ? 4 : 2;
  const contentWidth = Math.min(_width, 1120) - (isWeb ? 64 : 32);
  const cardWidth = Math.max(0, Math.floor((contentWidth - columns * 16) / columns));
  const cardHeight = isWeb ? 292 : 238;

  useEffect(() => {
    if (!categoryId || !rawCategories.length) {
      return;
    }

    const category = rawCategories.find((item) =>
      String(item.cid || item.idCategory || item.id) === String(categoryId)
    );
    if (!category) {
      setMenuError(true);
      setMenuLoading(false);
      return;
    }

    setSelectedCategory({
      ...category,
      cid: category.cid || category.idCategory || category.id,
      title: category.title ?? category.strCategory,
      image_link: category.image_link ?? category.strCategoryThumb,
    });
    setMeals(true);
    setMenuLoading(true);
    setMenuError(false);
    dispatch(fetchAllMenu((category.title ?? category.strCategory).toLowerCase()))
      .catch(() => setMenuError(true))
      .finally(() => setMenuLoading(false));
  }, [categoryId, dispatch, rawCategories, retryCount]);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setMeals(true);
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setProductModal(true);
  };

  if (menuLoading || (loading && !menu.length && !categories.length)) {
    return <Loading />;
  }

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.content, isWeb && styles.webContent]}>
        <View style={styles.welcome}>
          <View style={styles.welcomeCopy}>
            <Text style={styles.welcomeTitle}>Temukan menu favoritmu</Text>
            <Text style={styles.welcomeDescription}>
              Pilih hidangan untuk dinikmati sekarang, lalu atur pesananmu dengan mudah.
            </Text>
          </View>
          <View style={styles.priceNote}>
            <Text style={styles.priceNoteLabel}>Mulai dari</Text>
            <Text style={styles.priceNoteValue}>Rp {cartTotal(basePrice)}</Text>
          </View>
        </View>

        <SectionTitle title="Promo pilihan" />
        <FlatList
          horizontal
          data={promo}
          keyExtractor={(item) => item.pid}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <ProductList
              imagePath={promoImages[item.image_link]}
              style={{ width: isWeb ? cardWidth : 220, height: isWeb ? 270 : 246 }}
              fontSize={isWeb ? 15 : 14}
              title={item.title}
            />
          )}
        />

        <SectionTitle title="Pilih kategori" subtitle="Cari berdasarkan yang sedang kamu inginkan." />
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.cid}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={({ item }) => (
            <CategoryList
              fontSize={isWeb ? 12 : 11}
              title={item.title}
              image={item.image_link}
              style={{ width: isWeb ? 112 : 88, height: isWeb ? 112 : 88 }}
              cid={item.cid}
              onPress={() => selectCategory(item)}
              selectedCategory={selectedCategory}
              item={item}
            />
          )}
        />

        <View style={styles.menuHeader}>
          <View>
            <SectionTitle title={meals ? selectedCategory?.title : "Menu terbaru"} />
            {!meals && <Text style={styles.menuHint}>Ketuk hidangan untuk melihat pilihan.</Text>}
          </View>
          {meals && <Text style={styles.menuCount}>{menu.length} pilihan</Text>}
        </View>

        {menuError ? (
          <View style={styles.errorState}>
            <Text style={styles.emptyTitle}>Menu belum bisa dimuat</Text>
            <Text style={styles.emptyText}>Periksa koneksi internetmu, lalu coba lagi.</Text>
            <TouchableOpacity accessibilityRole="button" onPress={() => setRetryCount((count) => count + 1)} style={styles.retryButton}>
              <Text style={styles.retryText}>Coba lagi</Text>
            </TouchableOpacity>
          </View>
        ) : menu.length ? (
          <FlatList
            data={menu}
            keyExtractor={(item) => item.idMeal}
            numColumns={columns}
            scrollEnabled={false}
            columnWrapperStyle={isWeb ? styles.column : undefined}
            contentContainerStyle={styles.productGrid}
            renderItem={({ item }) => (
              <ProductList
                style={{ width: cardWidth, height: cardHeight }}
                fontSize={isWeb ? 15 : 14}
                title={item.strMeal}
                image={item.strMealThumb}
                price={basePrice}
                onPress={() => selectProduct(item)}
                item={item}
              />
            )}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Belum ada menu di sini</Text>
            <Text style={styles.emptyText}>Coba pilih kategori lain untuk melihat hidangan yang tersedia.</Text>
          </View>
        )}
        </View>
      </ScrollView>

      {order.length > 0 && (
        <Cart
          onPress={() => setModalVisible(true)}
          size={24}
          style={[styles.cart, isWeb ? styles.webCart : styles.mobileCart]}
        />
      )}
      <ProductsModal
        price={basePrice}
        productModal={productModal}
        productModalHandler={() => setProductModal(false)}
        product={selectedProduct || {}}
      />
      <BottomSheet modalHandler={() => setModalVisible(false)} modalVisible={modalVisible} isWeb={isWeb} width={_width} />
    </View>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <View style={styles.sectionTitle}>
    <Text style={styles.sectionHeading}>{title}</Text>
    {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
  </View>
);

const styles = StyleSheet.create({
  page: {
    backgroundColor: BackgroundColor,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 88,
    paddingTop: 22,
  },
  webContent: {
    alignSelf: "center",
    maxWidth: 1120,
    paddingHorizontal: 32,
    width: "100%",
  },
  welcome: {
    alignItems: "center",
    backgroundColor: DarkAccent,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    overflow: "hidden",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  welcomeCopy: {
    flex: 1,
    paddingRight: 18,
  },
  welcomeTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
    lineHeight: 31,
  },
  welcomeDescription: {
    color: "#d7e3dc",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 500,
  },
  priceNote: {
    alignItems: "flex-end",
    borderLeftColor: "#587b70",
    borderLeftWidth: 1,
    paddingLeft: 20,
  },
  priceNoteLabel: {
    color: "#b9ccc3",
    fontSize: 12,
    fontWeight: "600",
  },
  priceNoteValue: {
    color: AccentColor,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  sectionTitle: {
    marginBottom: 12,
    marginTop: 10,
  },
  sectionHeading: {
    color: DarkAccent,
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    color: MutedTextColor,
    fontSize: 13,
    marginTop: 4,
  },
  horizontalList: {
    paddingBottom: 8,
    paddingRight: 8,
  },
  menuHeader: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  menuHint: {
    color: MutedTextColor,
    fontSize: 13,
    marginTop: -5,
  },
  menuCount: {
    color: PrimaryColor,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 16,
  },
  productGrid: {
    alignItems: "center",
    paddingTop: 4,
  },
  column: {
    justifyContent: "space-between",
    width: "100%",
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: MutedSurfaceColor,
    borderRadius: 16,
    marginTop: 4,
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  emptyTitle: {
    color: DarkAccent,
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    color: MutedTextColor,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    maxWidth: 360,
    textAlign: "center",
  },
  errorState: {
    alignItems: "center",
    backgroundColor: MutedSurfaceColor,
    borderRadius: 16,
    marginTop: 4,
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  retryButton: {
    backgroundColor: AccentColor,
    borderRadius: 10,
    marginTop: 16,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  retryText: {
    color: DarkAccent,
    fontSize: 13,
    fontWeight: "800",
  },
  cart: {
    backgroundColor: DarkAccent,
    borderRadius: 18,
    boxShadow: "0px 8px 22px rgba(32,49,45,0.22)",
    minHeight: 64,
    zIndex: 5,
  },
  webCart: {
    bottom: 24,
    right: 28,
    width: 250,
  },
  mobileCart: {
    bottom: 16,
    left: 16,
    right: 16,
  },
});

export default Dashboard;
