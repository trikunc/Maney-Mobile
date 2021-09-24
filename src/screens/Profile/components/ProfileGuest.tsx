import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import FONTS from "@utils/fonts";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import ButtonPrimary from "@elements/Button/ButtonPrimary";
import { IMAGE_ICON } from "@assets/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { widthScreen } from "@utils/dimensions";
import { removeGuestData } from "../../../utils/store/Store";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ROUTES from "@utils/routes";

const ProfileGuest = memo(() => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerTitleAlign: "center",
      headerTintColor: colors.grey2,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
    });
  }, []);

  const onLogout = useCallback(async () => {
    await removeGuestData();
    navigation.navigate(ROUTES.Login);
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle={"dark-content"}
      />
      <Image style={styles.image} source={IMAGE_ICON.profileGuest} />
      <Text bold marginTop={4} size={22} lineHeight={37}>
        Guest
      </Text>
      <Text bold size={17} lineHeight={22} color={colors.grey3}>
        You haven’t log in yet.
      </Text>
      <ButtonPrimary
        onPress={onLogout}
        style={styles.buttonLogin}
        title={"Sign In"}
      />
      <View style={styles.signUpView}>
        <TouchableOpacity onPress={onLogout} activeOpacity={0.7}>
          <Text regular lineHeight={22} size={16}>
            Don’t have an account?
            <Text semiBold color={colors.purplePlum}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ProfileGuest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  headerTitleStyle: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontSize: 17,
    fontWeight: "600",
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.snow,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 24,
  },
  buttonLogin: {
    width: 172,
    marginTop: 16,
  },
  signUpView: {
    paddingBottom: Platform.OS === "ios" ? getBottomSpace() + 30 : 30,
    bottom: Platform.OS === "ios" ? getBottomSpace() + 12 : 12,
    position: "absolute",
    alignItems: "center",
    width: widthScreen,
  },
});
