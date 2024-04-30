import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Surface } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import RootView from "../../../components/util/RootView";
import HeaderComp from "../../../components/util/HeaderComp";
import { GlobalStyles } from "../../../components/styles/globalStyles";
import HeaderSub from "../../../components/util/HeaderSub";
import Search from "../../../components/util/Search";
import category from "../../../json/category";
import property from "../../../json/property";
import {
  categoryState,
  addFavorite,
  removeFavorite,
} from "../../../redux/slices/catFav";

export default function Home({ navigation }) {
  const gStyle = GlobalStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const selectedCat = useSelector((state) => state.catFav.category);
  const favorites = useSelector((state) => state.catFav.favorites);
  const { dateRange, propertyType, price, ratings, filter } = useSelector(
    (state) => state.filter
  );

  //empty component
  const EmptyComponent = () => {
    return (
      <View style={[gStyle.centerView, gStyle.marginTop]}>
        <Image
          source={require("../../../assets/noItem.png")}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontFamily: theme.fonts.regular,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Currently no studios available for viewing.{`\n`} Please check back in
          a few days.
        </Text>
      </View>
    );
  };

  //for adding favorites
  const onFav = (item) => {
    const length = favorites.filter((value) => value.id == item.id).length;
    if (length == 0) {
      dispatch(addFavorite(item));
    } else {
      dispatch(removeFavorite(item));
    }
  };

  //for auto scroll of horizontal category list based on index
  const flatListRef = useRef(null);

  const scrollToSelectedItem = () => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: selectedCat.id - 1,
          viewPosition: 0, // Position of the item in the view (0 for top, 0.5 for center, 1 for bottom)
        });
      }
    }, 500);
  };

  useEffect(() => {
    scrollToSelectedItem();
  }, [selectedCat]);

  return (
    <RootView viewStyle={{ paddingBottom: 0 }}>
      {/* header and sub heading starts */}
      <View style={[gStyle.flexStyle, { justifyContent: "space-between" }]}>
        <HeaderComp title={"Studios"} />
        <Surface elevation={3} style={gStyle.notificationElevation}>
          <Ionicons
            name="notifications"
            size={24}
            color={theme.colors.primary}
            onPress={() => navigation.navigate("Notification")}
          />
        </Surface>
      </View>
      <HeaderSub subTitle={"Mumbai"} />
      {/* header and sub heading ends */}

      <Search navigation={navigation} />

      {/* Category horizontal starts */}
      <View>
        <FlatList
          ref={flatListRef}
          data={category}
          key={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          onScrollToIndexFailed={scrollToSelectedItem}
          horizontal
          contentContainerStyle={gStyle.marginTop}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryView}
              onPress={() => dispatch(categoryState(item))}
            >
              <View
                style={{
                  borderWidth: selectedCat.value == item.value ? 1.5 : 0,
                  marginBottom: 5,
                  borderRadius: 35,
                  borderColor: theme.colors.primary,
                }}
              >
                <Image source={item.logo} style={gStyle.categoryLogo} />
              </View>
              <Text
                style={[
                  gStyle.categoryText,
                  selectedCat.value == item.value && {
                    fontFamily: theme.fonts.bold,
                    color: theme.colors.black,
                  },
                ]}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Category horizontal ends */}

      {/* property listing Starts */}
      <FlatList
        data={
          property[
            Object.keys(property).filter((item) => item == selectedCat?.value)
          ]
        }
        showsVerticalScrollIndicator={false}
        key={(item) => item.id}
        ListEmptyComponent={<EmptyComponent />}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <View style={[gStyle.marginTop, { flexDirection: "row" }]}>
            {/* property image starts */}
            <ImageBackground source={item.image} style={styles.propertyImg}>
              <View style={{ alignItems: "flex-start" }}>
                <View style={{ margin: 8, borderRadius: 16 }}>
                  <Text style={[gStyle.categoryText1, styles.categoryText1]}>
                    {selectedCat.value}
                  </Text>
                </View>
              </View>
              <View style={styles.fav}>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.colors.white,
                    padding: 4,
                    borderRadius: 16,
                  }}
                  onPress={() => onFav(item)}
                >
                  <Ionicons
                    name={
                      favorites.filter((value) => value.id == item.id).length >
                      0
                        ? "heart"
                        : "heart-outline"
                    }
                    size={22}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            {/* property image ends */}

            {/* property detail starts */}
            <View style={styles.propertyCont}>
              <View>
                <View style={gStyle.flexBetween}>
                  <Text style={gStyle.property}>{item.name}</Text>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.bold,
                      fontSize: 18,
                    }}
                  >
                    {`★`} {item.rating}
                  </Text>
                </View>
                <Text style={gStyle.area}>
                  {item.area}, {item.city}
                </Text>
              </View>
              <Text style={gStyle.property}>
                <Text style={{ fontSize: 26 }}>{`\u20B9`} </Text>
                {item.price}/- <Text style={gStyle.area}>(For 12 hours)</Text>
              </Text>
            </View>
            {/* property detail ends */}
          </View>
        )}
      />
      {/* property listing ends */}
    </RootView>
  );
}

const styles = StyleSheet.create({
  categoryView: { marginRight: 20, alignItems: "center" },
  propertyImg: {
    width: 140,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
  },
  fav: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    margin: 8,
  },
  propertyCont: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  categoryText1: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    overflow: "hidden",
  },
});
