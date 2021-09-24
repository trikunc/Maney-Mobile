import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ICON } from "@svg/Icon";
import Text from "@elements/Text";
import { currencyFormat } from "@utils/formatNumber";
import colors from "@utils/colors";
import FONTS from "@utils/fonts";
import { widthScreen } from "@utils/dimensions";
import { CURRENCY } from "@store/models";

interface Props {
  style?: object;
  income?: number;
  expense?: number;
  currency: CURRENCY;
  onPressIncome?: () => void;
  onPressExpense?: () => void;
}

export default ({
  style,
  income,
  expense,
  currency,
  onPressIncome,
  onPressExpense,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onPressIncome}
        activeOpacity={0.7}
        style={styles.box}
      >
        <View style={styles.setRow}>
          <View>{ICON.income}</View>
          <Text style={styles.textIncome}>Income</Text>
        </View>
        <Text style={styles.textAmountIncome}>
          {currencyFormat(income ? income : 0, currency)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressExpense}
        activeOpacity={0.7}
        style={styles.box}
      >
        <View style={styles.setRow}>
          <View>{ICON.expense}</View>
          <Text style={styles.textExpense}>Expense</Text>
        </View>
        <Text style={styles.textAmountExpense}>
          -{currencyFormat(expense ? expense : 0, currency)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    width: widthScreen / 2.3,
    height: 80,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
  textIncome: {
    fontSize: 16,
    color: colors.grey1,
    marginLeft: 4,
  },
  textExpense: {
    fontSize: 16,
    color: colors.grey1,
    marginLeft: 4,
  },
  textAmountIncome: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 22,
    lineHeight: 37,
    color: colors.bleuDeFrance,
  },
  textAmountExpense: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 22,
    lineHeight: 37,
    color: colors.redCrayola,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
