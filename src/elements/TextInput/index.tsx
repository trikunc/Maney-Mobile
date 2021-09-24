import * as React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import { useState } from "react";
import colors from "@utils/colors";
import Text from "@elements/Text";
import FONTS from "@utils/fonts";

export interface Props {
  style?: object;
  label?: string;
  iconLeft?: any;
  iconRight?: any;
  value?: string;
  optional?: boolean;
  editable?: boolean;
  notice?: string;
  error?: boolean;
  correct?: boolean;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onChangeText?: (text: string) => void;
}
//TODO Element Text Input

export default ({
  style,
  label,
  iconLeft,
  iconRight,
  optional,
  notice,
  error,
  correct,
  editable,
  onFocus,
  onBlur,
  value,
  onChangeText,
  ...props
}: Props) => {
  const [focused, setFocus] = useState<boolean>(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(false);
    onBlur && onBlur(e);
  };
  const borderStyle =
    editable === false && value !== "" && !focused
      ? {
          borderWidth: 0,
          borderColor: colors.parisWhite,
          backgroundColor: colors.snow,
          color: colors.grey2Opacity,
        }
      : correct
      ? { borderWidth: 2, borderColor: colors.bleuDeFrance }
      : error
      ? { borderWidth: 2, borderColor: colors.redCrayola }
      : focused
      ? { borderWidth: 2, borderColor: colors.emerald }
      : { borderWidth: 1, borderColor: colors.parisWhite };

  const labelStyle =
    editable === false
      ? { color: colors.grey2Opacity }
      : { color: colors.grey2 };

  const noticeStyle = error
    ? { color: colors.redCrayola }
    : correct
    ? { color: colors.bleuDeFrance }
    : { color: colors.white };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.textLabel, labelStyle]}>{label} </Text>}
      <TextInput
        style={[styles.textInput, borderStyle]}
        selectionColor={colors.grey2}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholderTextColor={colors.grey3}
        returnKeyType={"done"}
        {...props}
      />
      {!!optional && value === "" ? (
        <Text style={styles.textOptional}>Optional</Text>
      ) : null}
      {notice && (
        <Text style={[styles.textNotice, noticeStyle]}>{notice} </Text>
      )}
      <View style={styles.rightView}>{iconRight && iconRight}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 313,
  },
  textInput: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.grey1,
    paddingLeft: 16,
    paddingRight: 44,
  },
  rightView: {
    position: "absolute",
    flexDirection: "row",
    right: 12,
    top: "40%",
  },
  textLabel: {
    fontFamily: FONTS.MUKTA.Regular,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  textNotice: {
    fontFamily: FONTS.MUKTA.Regular,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
  },
  textOptional: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontWeight: "500",
    fontSize: 14,
    color: colors.parisWhite,
    position: "absolute",
    top: "40%",
    right: 44,
  },
});
