import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cartTotal } from "../constant/function";
import {
  AccentColor,
  AccentColor2,
  BorderColor,
  DarkAccent,
  LittleDarkAccent,
  MutedTextColor,
  SurfaceColor,
  shadow,
} from "../constant/ColorsConst";
import { Link } from "../navigation";

const ProductList = ({ style = {}, fontSize = 14, title, image, imagePath, price, onPress, item }) => {
  const [expanded, setExpanded] = React.useState(false);
  const canOrder = typeof onPress === "function";
  const canViewDetails = Boolean(item?.idMeal);
  const cardHeight = style.height || 240;
  const imageHeight = Math.max(110, cardHeight * 0.58);

  const toggleDetails = () => {
    if (canOrder || canViewDetails) {
      setExpanded((current) => !current);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        accessibilityRole={canOrder || canViewDetails ? "button" : "image"}
        accessibilityLabel={title}
        accessibilityState={{ expanded }}
        activeOpacity={0.88}
        disabled={!canOrder && !canViewDetails}
        onPress={toggleDetails}
      >
        <View style={[styles.card, style, { height: cardHeight }]}>
          <Image
            accessibilityLabel={`${title} gambar`}
            source={image ? { uri: image } : imagePath}
            style={[styles.image, { height: imageHeight }]}
          />
          <View style={styles.content}>
            <Text numberOfLines={2} style={[styles.title, { fontSize }]}>
              {title}
            </Text>
            {price !== undefined && (
              <Text style={[styles.price, { fontSize: Math.max(13, fontSize) }]}>
                Rp {cartTotal(price)}
              </Text>
            )}
          </View>
          {(canOrder || canViewDetails) && (
            <View style={styles.disclosure}>
              <Text style={styles.disclosureText}>
                {expanded ? "Tutup" : "Lihat pilihan"}
              </Text>
              <Ionicons
                name={expanded ? "chevron-up" : "chevron-down"}
                size={16}
                color={MutedTextColor}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.actionRow}>
          {canOrder && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`Tambah ${title} ke keranjang`}
              onPress={onPress}
              style={styles.primaryAction}
            >
              <Ionicons name="cart-outline" size={16} color={SurfaceColor} />
              <Text style={styles.primaryActionText}>Tambah</Text>
            </TouchableOpacity>
          )}
          {canViewDetails && (
            <Link
              accessibilityRole="button"
              accessibilityLabel={`Lihat detail ${title}`}
              style={styles.secondaryAction}
              to={`/product/${item.idMeal}`}
            >
              <Text style={styles.secondaryActionText}>Detail</Text>
              <Ionicons name="arrow-forward" size={16} color={DarkAccent} />
            </Link>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 8,
    marginBottom: 18,
  },
  card: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: SurfaceColor,
    borderWidth: 1,
    elevation: 3,
    borderColor: BorderColor,
    boxShadow: shadow(3),
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    backgroundColor: "#e8eee9",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 6,
  },
  title: {
    color: LittleDarkAccent,
    fontWeight: "700",
    lineHeight: 20,
  },
  price: {
    color: AccentColor2,
    fontWeight: "800",
    marginTop: 5,
  },
  disclosure: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingBottom: 11,
  },
  disclosureText: {
    color: MutedTextColor,
    fontSize: 12,
    fontWeight: "600",
  },
  actionRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    marginTop: -2,
    padding: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: DarkAccent,
    boxShadow: shadow(3, 0.18),
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: AccentColor2,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 10,
  },
  primaryActionText: {
    color: SurfaceColor,
    fontSize: 13,
    fontWeight: "800",
  },
  secondaryAction: {
    alignItems: "center",
    backgroundColor: AccentColor,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 10,
  },
  secondaryActionText: {
    color: DarkAccent,
    fontSize: 13,
    fontWeight: "800",
  },
});

export default ProductList;
