import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import FONTS from "@utils/fonts";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import _ from "lodash";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ButtonPrimary from "@elements/Button/ButtonPrimary";

interface Props {
  title?: string;
  modalHeight?: number;
  visible?: boolean;
  HeaderComponent?: any;
  onClose?: any;
  handleStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  titleButton?: string;
  today?: boolean;
  textToday?: string;
  monthNames?: [string];
  monthNamesShort?: [string];
  dayNames?: [string];
  dayNamesShort?: [string];
  maxDate?: any;
  minDate?: any;
  hideArrows?: boolean;
  onOverlayPress?: () => void;
  onPress?: () => void;
  onApply?: any;
  onSelect?: any;
}
export default (props: Props) => {
  const {
    title,
    visible,
    HeaderComponent,
    onOverlayPress,
    modalStyle,
    handleStyle,
    onPress,
    onClose,
    onSelect,
    onApply,
    titleButton,
    today,
    textToday,
    monthNames,
    monthNamesShort,
    dayNames,
    dayNamesShort,
    maxDate,
    minDate,
    hideArrows,
  } = props;

  const [endDate, setEndDate] = useState<any>(moment().format("YYYY-MM-DD"));
  const date = moment().format();

  LocaleConfig.locales.en = LocaleConfig.locales[""];
  LocaleConfig.locales.fr = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    dayNames: ["S", "M", "T", "W", "T", "F", "S"],
    dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  };

  LocaleConfig.defaultLocale = "fr";

  const markEndDate = _.isEmpty(endDate)
    ? moment().format("YYYY-MM-DD")
    : endDate.dateString;

  const headerComponent = () => {
    return (
      <View style={styles.headerModal}>
        <Text style={styles.txtTitle}>{title}</Text>
        <View style={styles.setRow}>
          {today && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setEndDate({
                  year: new Date().getFullYear(),
                  month: new Date().getMonth() + 1,
                  day: new Date().getDate(),
                })
              }
              style={styles.todayView}
            >
              <Text style={styles.txtToday}>{textToday}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <Modal statusBarTranslucent={true} transparent={true} visible={visible}>
      <View style={styles.modalStyle}>
        <View style={styles.calendarView}>
          <Calendar
            firstDay={1}
            current={date}
            maxDate={maxDate}
            enableSwipeMonths={true}
            minDate={minDate}
            onDayPress={async (item: any) => {
              setEndDate(item);
            }}
            markedDates={{
              [markEndDate]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
            theme={{
              arrowColor: "black",
              "stylesheet.calendar.header": {
                week: {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 16,
                  marginTop: 24,
                  marginBottom: 14,
                },
                dayHeader: {
                  fontFamily: FONTS.MUKTA.Regular,
                  fontSize: 12,
                },
              },
              textDayFontFamily: FONTS.MUKTA.Bold,
              textDayFontSize: 12,
              textMonthFontWeight: "bold",
              textMonthFontFamily: FONTS.MUKTA.Bold,
              textMonthFontSize: 20,
              textDayHeaderFontFamily: FONTS.MUKTA.Regular,
              textDayHeaderFontSize: 12,
              monthTextColor: colors.grey1,
              dayTextColor: colors.grey1,
              todayTextColor: colors.purplePlum,
              textDisabledColor: colors.nobel,
              textDayFontWeight: "bold",
              selectedDayTextColor: colors.white,
              selectedDayBackgroundColor: colors.purplePlum,
            }}
          />
          <View style={styles.buttonView}>
            <ButtonPrimary
              onPress={() => {
                onSelect(endDate);
                onApply();
              }}
              title={"Done"}
              style={styles.button}
              titleStyle={styles.textButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "rgba(51, 51, 51, 0.7)",
    flex: 1,
    justifyContent: "flex-end",
  },
  handleStyle: {
    height: 0,
  },
  headerModal: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 14,
    paddingHorizontal: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomColor: colors.snow,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtTitle: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 28,
    lineHeight: 42,
    color: colors.grey1,
  },
  svgView: {
    width: 40,
    height: 40,
    alignItems: "flex-end",
    paddingTop: 8,
  },
  buttonView: {
    paddingHorizontal: 24,
  },
  button: {
    width: "100%",
    backgroundColor: colors.emerald,
    marginTop: 20,
  },
  textButton: {
    color: colors.white,
  },
  setRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  todayView: {
    width: 69,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purplePlum,
    borderRadius: 15,
  },
  txtToday: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 12,
    color: colors.white,
  },
  calendarView: {
    paddingBottom: Platform.OS === "ios" ? getBottomSpace() + 12 : 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
});
