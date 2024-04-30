import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import React, { useRef, Fragment, useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector, useDispatch } from "react-redux";

import { useTheme } from "@react-navigation/native";
import { GlobalStyles } from "../styles/globalStyles";
import { setFilter } from "../../redux/slices/filter";

const testIDs = {
  menu: {
    CONTAINER: "menu",
    CALENDARS: "calendars_btn",
    CALENDAR_LIST: "calendar_list_btn",
    HORIZONTAL_LIST: "horizontal_list_btn",
    AGENDA: "agenda_btn",
    EXPANDABLE_CALENDAR: "expandable_calendar_btn",
    WEEK_CALENDAR: "week_calendar_btn",
    TIMELINE_CALENDAR: "timeline_calendar_btn",
    PLAYGROUND: "playground_btn",
  },
  calendars: {
    CONTAINER: "calendars",
    FIRST: "first_calendar",
    LAST: "last_calendar",
  },
  calendarList: { CONTAINER: "calendarList" },
  horizontalList: { CONTAINER: "horizontalList" },
  agenda: {
    CONTAINER: "agenda",
    ITEM: "item",
  },
  expandableCalendar: { CONTAINER: "expandableCalendar" },
  weekCalendar: { CONTAINER: "weekCalendar" },
};

export default function CustomCalendar({ data, currentMonth, selectedDates }) {
  const theme = useTheme();
  const gStyle = GlobalStyles();
  const dispatch = useDispatch();

  //state
  const [minDate, setMinDate] = useState(moment().format("YYYY-MM-DD"));

  const customHeaderProps = useRef();

  useEffect(() => {
    if (selectedDates != undefined || selectedDates != null) {
      setMinDate(Object.keys(selectedDates)[0]);
    }
  }, []);

  //next arrow button function
  const moveNext = () => {
    const maxSelectableMonthIndex = data.findIndex(
      (item) => item.label == moment().add(15, "months").format("MMMM YYYY")
    );

    const currentMonthIndex = data.findIndex(
      (item) => item.label == currentMonth.label
    );

    // Check if the current month index is greater than or equal to the maximum selectable month index
    if (currentMonthIndex >= maxSelectableMonthIndex) {
      Alert.alert(
        "Cannot go to next month",
        "Dates beyond this is not available as of now."
      );
      return;
    }
    setCustomHeaderNewMonth("add");
  };

  //previous arrow button function
  const movePrevious = () => {
    const currentMonthIndex = data.findIndex(
      (item) => currentMonth.label == moment().format("MMMM YYYY")
    );

    // Check if the current month index is already the earliest selectable month
    if (currentMonthIndex === 0) {
      Alert.alert(
        "Cannot go to previous month",
        "You are already viewing the earliest selectable month."
      );
      return;
    }
    setCustomHeaderNewMonth("sub");
  };

  //function for custom header month after arrows as well as dropdown selection
  const setCustomHeaderNewMonth = (next) => {
    const add =
      next == "add" ? 1 : next == "sub" ? -1 : next.value - currentMonth.value;
    const month = new Date(customHeaderProps?.current?.month);
    const newMonth = new Date(month.setMonth(month.getMonth() + add));
    customHeaderProps?.current?.addMonth(add);
    dispatch(
      setFilter({
        currentMonth: data.filter(
          (item) => item.label == moment(newMonth).format("MMMM YYYY")
        )[0],
      })
    );
  };

  // Function to get all dates between two dates
  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = moment(startDate);

    // to add all the dates between start and end date
    while (currentDate <= moment(endDate)) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.clone().add(1, "day");
    }

    return dates;
  };

  // Function to handle date selection
  const handleDateSelect = (date) => {
    let newSelectedDates = { ...selectedDates };

    const today = moment().format("YYYY-MM-DD");
    if (moment(date).isBefore(today)) {
      Alert.alert("Error", "You cannot select a past date!");
      return;
    }

    // Toggle selection for the clicked date
    if (Object.keys(newSelectedDates).length == 0) {
      newSelectedDates[date] = {
        startingDay: true,
        color: theme.colors.primary,
        textColor: theme.colors.white,
      };
    } else if (Object.keys(newSelectedDates).length > 2) {
      newSelectedDates = {};
    } else {
      if (moment(date).isSameOrBefore(Object.keys(newSelectedDates)[0])) {
        Alert.alert("Error", "You cannot select date prior to start date!");
        return;
      }

      newSelectedDates[date] = {
        endingDay: true,
        color: theme.colors.primary,
        textColor: theme.colors.white,
      };
    }

    //to apply properties to all the dates of range including start and end date
    if (Object.keys(newSelectedDates).length == 2) {
      const range = getDatesBetween(
        Object.keys(newSelectedDates)[0],
        Object.keys(newSelectedDates)[1]
      );
      range.map((item, index) => {
        newSelectedDates[item] = {
          startingDay: index == 0 ? true : undefined,
          endingDay: index == range.length - 1 ? true : undefined,
          color:
            index == 0 || index == range.length - 1
              ? theme.colors.primary
              : theme.colors.secondary,
          textColor:
            index == 0 || index == range.length - 1
              ? theme.colors.white
              : theme.colors.black,
        };
      });
    }

    // dispatch(setFilter({ selectedDates: newSelectedDates }));
    dispatch(setFilter({ dateRange: newSelectedDates }));
  };

  //UI of custom header of calendar
  const renderCalendarWithCustomHeader = () => {
    const CustomHeader = React.forwardRef((props, ref) => {
      customHeaderProps.current = props;

      const weekdays = moment.weekdaysShort();

      return (
        <View ref={ref} {...props} style={gStyle.marginTop}>
          <View style={[gStyle.flexBetween, { paddingHorizontal: 16 }]}>
            <Dropdown
              data={data}
              value={currentMonth}
              onChange={(value) => {
                setCustomHeaderNewMonth(value);
              }}
              labelField="label"
              valueField="value"
              style={{ flexGrow: 1, maxWidth: 160 }}
              fontFamily={theme.fonts.regular}
              selectedTextStyle={{ fontSize: 20 }}
              renderRightIcon={() => (
                <AntDesign name={"caretdown"} size={16} color="black" />
              )}
            />
            <View style={gStyle.flexStyle}>
              <TouchableOpacity
                onPress={movePrevious}
                style={{ marginRight: 15 }}
              >
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={theme.colors.placeholder}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={moveNext}>
                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color={theme.colors.placeholder}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.weekdayHeader}>
            {weekdays.map((day, index) => (
              <Text
                key={index}
                style={{ fontFamily: theme.fonts.regular, fontSize: 18 }}
              >
                {day[0]}
              </Text>
            ))}
          </View>
        </View>
      );
    });

    return (
      <Fragment>
        <Calendar
          initialDate={minDate}
          testID={testIDs.calendars.LAST}
          style={[styles.calendar]}
          customHeader={CustomHeader}
          hideExtraDays={true}
          markedDates={{ ...selectedDates }}
          markingType="period"
          onDayPress={(day) => handleDateSelect(day.dateString)}
          theme={{ textDayFontFamily: "HRegular", textDayFontSize: 18 }}
        />
      </Fragment>
    );
  };
  return renderCalendarWithCustomHeader();
}

const styles = StyleSheet.create({
  weekdayHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
});
