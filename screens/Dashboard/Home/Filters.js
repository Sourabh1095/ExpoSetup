import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, Fragment, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import CustomCalendar from "../../../components/reusable/CustomCalendar";
import RootView from "../../../components/util/RootView";
import HeaderComp from "../../../components/util/HeaderComp";
import { GlobalStyles } from "../../../components/styles/globalStyles";
import Label from "../../../components/util/Label";
import DropdownComp from "../../../components/util/DropdownComp";
import { setFilter, clearFilter } from "../../../redux/slices/filter";
import Button from "../../../components/util/Button";
import { height } from "../../../components/util/Dimensions";
import category from "../../../json/category";
import { categoryState } from "../../../redux/slices/catFav";

const data2 = [
  {
    id: 1,
    value: "Price- high to low",
  },
  {
    id: 2,
    value: "Price- low to high",
  },
];

const data3 = [
  {
    id: 1,
    value: "Ratings- high to low",
  },
  {
    id: 2,
    value: "Ratings- low to high",
  },
];

export default function Filters({ navigation }) {
  const gStyle = GlobalStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { propertyType, price, ratings, currentMonth, dateRange, filter } =
    useSelector((state) => state.filter);
  const selectedCat = useSelector((state) => state.catFav.category);

  //state
  const [monthYear, setMonthYear] = useState([]);
  const [focus1, setIsFocus1] = useState(false);
  const [focus2, setIsFocus2] = useState(false);
  const [focus3, setIsFocus3] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0);

  // Function to generate monthYearArray
  const generateMonthYearArray = () => {
    const currentYear = moment().year();
    return Array(16)
      .fill()
      .map((_, index) => {
        const currentMonth = moment().clone().add(index, "months");
        const januaryOfCurrentYear = moment([currentYear, 0]);
        const monthDiff = currentMonth.diff(januaryOfCurrentYear, "months");
        return {
          label: currentMonth.format("MMMM YYYY"),
          value: monthDiff,
        };
      });
  };

  //for setting current month if date range is selected or else default to current month
  useEffect(() => {
    const generatedArray = generateMonthYearArray();
    setMonthYear(generatedArray);
    const defaultMonth = generatedArray.find(
      (item) => item.label === moment().format("MMMM YYYY")
    );
    if (dateRange == {}) {
      dispatch(setFilter({ currentMonth: defaultMonth }));
    } else {
      const currentM = Object.keys(dateRange)[0];
      const startMonth = moment(currentM).format("MMMM YYYY");
      const selectedM = generatedArray.find((item) => item.label == startMonth);
      dispatch(setFilter({ currentMonth: selectedM }));
    }
  }, [dispatch]);

  // Function to reset filters and trigger screen reload
  const resetFilters = () => {
    dispatch(clearFilter());
    const generatedArray = generateMonthYearArray();
    setMonthYear(generatedArray);
    const defaultMonth = generatedArray.find(
      (item) => item.label === moment().format("MMMM YYYY")
    );
    dispatch(setFilter({ currentMonth: defaultMonth }));
    dispatch(categoryState(category[0]));
    setCalendarKey((prevKey) => prevKey + 1); // Toggle reloadScreen state
  };

  //on submit
  const onSubmit = () => {
    dispatch(setFilter({ filter: true }));
    if (propertyType == null) {
      dispatch(categoryState(selectedCat));
    } else {
      dispatch(categoryState(propertyType));
    }
    navigation.navigate("HomeNavigator");
  };

  return (
    <RootView>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* header starts */}
        <View style={gStyle.flexBetween}>
          <HeaderComp title={"Filter"} style={gStyle.flexStyle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../../../assets/back.png")}
                resizeMode="contain"
                style={gStyle.back}
              />
            </TouchableOpacity>
          </HeaderComp>
          <TouchableOpacity onPress={resetFilters}>
            <Text
              style={[
                gStyle.property,
                {
                  color: theme.colors.primary,
                  textDecorationLine: "underline",
                  marginTop: 5,
                },
              ]}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        {/* header and reset ends */}

        {/* Calendar view starts */}
        <Fragment>
          <CustomCalendar
            key={calendarKey}
            data={monthYear}
            currentMonth={currentMonth}
            selectedDates={dateRange}
          />
        </Fragment>
        {/* Calendar view ends */}

        {/* Dropdown starts */}
        <View>
          {/* category */}
          <View style={gStyle.marginTop}>
            <Label label={"Property Type"} />
            <DropdownComp
              data={category}
              drpValue={propertyType}
              setDrpValue={(value) => {
                dispatch(setFilter({ propertyType: value }));
              }}
              labelField="value"
              valueField="id"
              rightIcon={true}
              borderWidth={propertyType == null ? 0.5 : 1}
              focus={focus1}
              setIsFocus={setIsFocus1}
            />
          </View>

          {/* price */}
          <View style={gStyle.marginTop}>
            <Label label={"Price"} />
            <DropdownComp
              data={data2}
              drpValue={price}
              setDrpValue={(value) => dispatch(setFilter({ price: value }))}
              labelField="value"
              valueField="id"
              rightIcon={true}
              borderWidth={price == null ? 0.5 : 1}
              focus={focus2}
              setIsFocus={setIsFocus2}
            />
          </View>

          {/* Rating */}
          <View style={gStyle.marginTop}>
            <Label label={"Ratings"} />
            <DropdownComp
              data={data3}
              drpValue={ratings}
              setDrpValue={(value) => dispatch(setFilter({ ratings: value }))}
              labelField="value"
              valueField="id"
              rightIcon={true}
              borderWidth={ratings == null ? 0.5 : 1}
              focus={focus3}
              setIsFocus={setIsFocus3}
            />
          </View>
        </View>
        {/* Dropdown ends */}

        <Button
          text={"Continue"}
          style={{ marginVertical: height * 0.04 }}
          onPress={onSubmit}
          disabled={
            propertyType == null &&
            price == null &&
            ratings == null &&
            Object.keys(dateRange).length == 0
              ? true
              : false
          }
        />
      </ScrollView>
    </RootView>
  );
}

const styles = StyleSheet.create({});
