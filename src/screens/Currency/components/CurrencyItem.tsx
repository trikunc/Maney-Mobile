import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";

interface Props {
  style?: object;
  id?: string;
  name?: string;
  description?: string;
  currency?: string;
  code?: string;
  onPress?: () => void;
}

const CurrencyItem = ({
  style,
  id,
  name,
  description,
  currency,
  code,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View key={id} style={[styles.container, style]}>
        <View>
          <Text size={16} lineHeight={22}>
            {name}
          </Text>
          <Text marginTop={4} size={13} lineHeight={18} color={colors.grey3}>
            {description}
          </Text>
        </View>
        <Text bold size={17} lineHeight={22} color={colors.grey2}>
          {currency}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CurrencyItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
