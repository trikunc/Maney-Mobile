import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import FONTS from "@utils/fonts";
import TransactionItem from "./TransactionItem";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "@utils/routes";

interface Props {
  style?: object;
  title?: string;
  currency?: string;
  content?: [];
}

export default ({ title, content, style, currency }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.setRowLine}>
        <Text style={styles.textTitle}>{title}</Text>
      </View>
      <View style={styles.padding}>
        {content &&
          content.map((item: any, index: number) => {
            const onPressEditTransaction = () => {
              navigation.navigate(ROUTES.EditTransaction, item);
            };
            return (
              <TransactionItem
                onPress={onPressEditTransaction}
                currency={currency}
                {...item}
                key={index}
              />
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  setRowLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.snow,
    paddingBottom: 16,
  },
  textTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.grey1,
    fontFamily: FONTS.MUKTA.Bold,
  },
  padding: {
    paddingHorizontal: 16,
  },
});
