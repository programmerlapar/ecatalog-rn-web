import React, { useCallback } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Easing,
  View,
} from "react-native";
import {
  AccentColor2,
  DarkAccent,
  LittleDarkAccent,
} from "../constant/ColorsConst";
import { isMobile } from "../constant/isMobile";
import { Link } from "../navigation";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";

const { width, height } = Dimensions.get("window");
const ProductList = ({
  style,
  fontSize,
  title,
  image,
  imagePath,
  price,
  onPress,
  id,
  onClick,
  item,
}) => {
  const [pressed, setPressed] = React.useState(false);

  const SlideInView = useCallback(({ children, style }) => {
    const slideAnim = React.useRef(new Animated.Value(40)).current;
    Animated.spring(slideAnim, {
      toValue: 0,
      // tension: 2,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.back,
    }).start();

    return (
      <Animated.View
        style={{
          ...style,
          bottom: slideAnim,
          zIndex: -1,
          paddingBottom: 10,
        }}
      >
        {children}
      </Animated.View>
    );
  }, [pressed]);

  const SmallAnimView = ({ children }) => {
    const DEFAULT = style.height;
    const SMALLER = style.height * 0.96;
    const smallAnim = React.useRef(new Animated.Value(DEFAULT)).current;
    const smallAnimOut = React.useRef(new Animated.Value(SMALLER)).current;

    Animated.spring(smallAnim, {
      toValue: SMALLER,
      // tension: 2,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.back,
    }).start();

    Animated.spring(smallAnimOut, {
      toValue: DEFAULT,
      // tension: 2,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.back,
    }).start();

    return (
      <Animated.View
      // style={{ height: pressed ? smallAnim : smallAnimOut }}
      >
        {children}
      </Animated.View>
    );
  };

  return (
    <TouchableOpacity onPress={() => setPressed(!pressed)}>
      <SmallAnimView>
        <View
          style={[
            style,
            {
              flexGrow: 0,
              flexShrink: 1,
              marginHorizontal: 10,
              boxShadow: "0px 0px 5px rgba(0,0,0,.4)",
              marginTop: 20,
              marginBottom: 10,
              borderRadius: 10,
              borderBottomLeftRadius: pressed ? 0 : null,
              borderBottomRightRadius: pressed ? 0 : null,
              overflow: "hidden",
              backgroundColor: "white",
            },
          ]}
        >
          {/* <Link to={"/product/" + item.id} style={{textDecoration:"none", flex: 1,}}> */}
          <View
            // to={"/product/" + item.idMeal}
            style={{
              flex: 1,
              width: "100%",
              height: 250,
              overflow: "hidden",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={image ? { uri: image } : imagePath}
            />
          </View>

          {/* </Link> */}
          <View
            style={{
              justifyContent: "center",
              // alignItems: "center",
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[styles.text, styles.title, { fontSize }]}
            >
              {title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              // alignItems: "center",
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity>
                <Text
                  style={{
                    ...styles.text,
                    fontWeight: "bold",
                    fontSize,
                    color: DarkAccent,
                  }}
                >
                  Rp.{price}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onPress}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              style={[
                styles.text,
                styles.touchable,
                { fontSize: isMobile ? _rem(4) : _rem(6.5) },
              ]}
            >
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View> */}
          </View>
        </View>
      </SmallAnimView>
      {pressed ? (
        <SlideInView>
          <View
            style={[
              styles.bottomContainer,
              {
                borderBottomLeftRadius: pressed ? 10 : null,
                borderBottomRightRadius: pressed ? 10 : null,
                boxShadow: "0px 0px 5px rgba(0,0,0,.4)",
                width: style.width,
              },
            ]}
          >
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.bottomContainerText}>Add To Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Link to={"/product/" + item.idMeal} key={item.idMeal}>
                <Text style={styles.bottomContainerText}>Info</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </SlideInView>
      ) : null }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  touchable: {
    color: "white",
    paddingHorizontal: isMobile ? 5 : 5,
    paddingVertical: isMobile ? 3 : 5,
    backgroundColor: AccentColor2,
  },
  title: {
    fontSize: isMobile ? 9 : 18,
    color: LittleDarkAccent,
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowColor: "rgba(0,0,0,0.2)",
  },
  bottomContainer: {
    flex: 1,
    padding: 10,
    marginTop: -10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: DarkAccent,
  },
  bottomContainerText: {
    fontSize: isMobile ? 12 : 14,
    color: "white",
  },
});

export default ProductList;
