import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import Loading from "../components/Loading";
import { AccentColor, LittleDarkAccent, shadow } from "../constant/ColorsConst";
import { HEADER_MARGIN } from "../constant/isMobile";
import useDimens from "../constant/useDimens";
import { Link } from "../navigation";
import { fetchDetailMenu, isLoadingHandler } from "../store/actions/menu";

const Product = ({ match, rem }) => {
  const menuDetails = useSelector((state) => state.menu.detailMenu);
  const [_width, _height, isWeb] = useDimens();
  const isLoadingStat = useSelector((state) => state.menu.isFetching);
  const id = match.params.id;
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(isLoadingHandler())
    await dispatch(fetchDetailMenu(id));
  }, []);

  return (
    <View>
      {!isLoadingStat ? (
        <Fade bottom>
          <View style={[styles.container]}>
            <Link
              to="/"
              style={{
                marginLeft: HEADER_MARGIN,
                textDecoration: "none",
                marginTop: HEADER_MARGIN / 4,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: AccentColor,
                  width: isWeb ? _width * 0.06 : _width * 0.18,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: shadow(2, 0.2),
                  borderRadius: 10,
                  paddingVertical: 5,
                }}
              >
                <Ionicons
                  name="ios-arrow-round-back"
                  size={15}
                  color="white"
                  style={{ marginRight: 5 }}
                />
                <Text style={{ color: "white" }}>Kembali</Text>
              </View>
            </Link>
            <View style={[styles.box]}>
              <View
                style={[
                  styles.imageContainer,
                  {
                    width: _height / 2,
                    height: _height / 2,
                  },
                ]}
              >
                <Image
                  source={{ uri: menuDetails.strMealThumb }}
                  style={styles.image}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: HEADER_MARGIN,
                  alignItems: isWeb ? "flex-start" : "center",
                  justifyContent: "center",
                  width: isWeb ? "50%" : "80%",
                }}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      marginTop: isWeb ? null : 10,
                      textAlign: isWeb ? "left" : "center",
                      fontSize: rem(12),
                    },
                  ]}
                >
                  {menuDetails.strMeal}
                </Text>
                <View
                  style={{
                    height: isWeb ? "50%" : null,
                    width: isWeb ? null : "100%",
                  }}
                >
                  <Text style={{ color: "gray" }}>Description:</Text>
                  <View
                    style={{
                      flex: 1,
                      marginVertical: 5,
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      boxShadow: shadow(5, 0.2),
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: isWeb ? 14 : rem(7),
                        textAlign: "justify",
                      }}
                    >
                      {menuDetails.strInstructions}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Fade>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: HEADER_MARGIN + 40 },
  box: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  imageContainer: {
    backgroundColor: "white",
    marginHorizontal: HEADER_MARGIN,
    boxShadow: shadow(6, 0.2),
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    color: LittleDarkAccent,
  },
});
