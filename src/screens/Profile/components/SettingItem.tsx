import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { ICON } from "@svg/Icon";
import Switch from "@elements/Switch";

interface Props {
  style?: object;
  icon?: string;
  title?: string;
  isSwitch?: boolean;
  enable?: boolean;
  currency?: string;
  onSwitch?: () => void;
  onPress?: () => void;
}

const SettingItem = ({
  style,
  icon,
  title,
  isSwitch,
  enable,
  currency,
  onSwitch,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, style]}
    >
      <View style={{ flex: 1 / 7, paddingBottom: 26, paddingTop: 22 }}>
        <View>{ICON[`${icon}`]}</View>
      </View>
      <View style={styles.content}>
        <Text regular size={16}>
          {title}
        </Text>
        {isSwitch ? (
          <View style={styles.switchView}>
            <Switch
              circleInActiveColor={colors.rum}
              backgroundInactive={colors.seLago}
              circleActiveColor={colors.white}
              backgroundActive={colors.emerald}
              enable={enable}
              onPress={onSwitch}
            />
          </View>
        ) : (
          <View style={styles.iconView}>
            {!!currency && currency !== "" ? (
              <View style={styles.currencyView}>
                <Text semiBold size={14} color={colors.grey1}>
                  {currency}
                </Text>
              </View>
            ) : null}
            <View>{ICON.rightArrow}</View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
  },
  content: {
    borderBottomWidth: 1,
    borderBottomColor: colors.whisper,
    width: "100%",
    flex: 1,
    paddingBottom: 26,
    paddingTop: 22,
    justifyContent: "center",
  },
  switchView: {
    position: "absolute",
    right: 0,
  },
  iconView: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  currencyView: {
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.grey5,
    marginRight: 22,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
