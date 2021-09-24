import React, { useCallback } from "react";
import SvgDelete from "@svg/Icon/SvgDelete";
import { TouchableOpacity, Platform, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScaledSheet } from "react-native-size-matters";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "@utils/colors";

interface PropsBack {
  svgBack?: any;
  color?: string;
  onPress?: any;
  style?: ViewStyle;
}

const ButtonBack = (props: PropsBack) => {
  const navigation = useNavigation();

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onPress = props.onPress ? props.onPress : onGoBack;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.container, props.style]}
    >
      {props.svgBack ? (
        props.svgBack
      ) : (
        <SvgDelete color={props.color ? props.color : colors.black} />
      )}
    </TouchableOpacity>
  );
};
export default ButtonBack;

const styles = ScaledSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginTop: Platform.OS === "ios" ? getStatusBarHeight() + 27 : 27,
    marginLeft: 12,
  },
});
