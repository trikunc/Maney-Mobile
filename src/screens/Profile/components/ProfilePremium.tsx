import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import FONTS from "@utils/fonts";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import HeaderBackGround from "@elements/Header/HeaderBackGround";
import HeaderButton from "@elements/Header/HeaderButton";
import { ICON } from "@svg/Icon";
import { IMAGE_ICON } from "@assets/Icon";
import SettingItem from "./SettingItem";
import ROUTES from "@utils/routes";
import { getBottomSpace } from "react-native-iphone-x-helper";

export interface USERS {
  id: string;
  uid: string;
  uuid: string;
  currencyId: string;
  name: string;
  email: string;
  avatar: string;
  pin: string;
  isDarkMode: boolean;
}

export const USER_EXAMPLE_DATA = {
  name: "Jeff Cunningham",
  email: "mail@company.com",
  isDarkMode: false,
};

const ProfilePremium = memo(() => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const name = "Jeff Cunningham";
  const email = "mail@company.com";
  const avatar = "";

  const onPressEdit = useCallback(() => {}, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerTitleAlign: "center",
      headerTintColor: colors.white,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
      headerBackground: () => (
        <HeaderBackGround style={styles.headerBackGround} />
      ),
      headerRight: () => (
        <HeaderButton onPress={onPressEdit} icon={ICON.whiteEdit} />
      ),
    });
  }, []);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const onPressGeneral = useCallback(() => {}, []);

  const onPressWallet = useCallback(() => {
    navigation.navigate(ROUTES.MyWallets);
  }, []);

  const onPressCurrency = useCallback(() => {
    navigation.navigate(ROUTES.Currency);
  }, []);

  const onPressCategories = useCallback(() => {}, []);

  const onPressSecurity = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.emerald}
        barStyle={"light-content"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.contentView}
      >
        <View style={styles.avatarView}>
          <Image
            style={styles.avatar}
            source={
              !!avatar && avatar !== null
                ? { uri: avatar }
                : IMAGE_ICON.profileGuest
            }
          />
          <View style={styles.premiumView}>{ICON.award}</View>
        </View>
        <Text
          marginTop={4}
          center
          size={22}
          lineHeight={37}
          color={colors.white}
          bold
        >
          {name}
        </Text>
        <Text center size={16} lineHeight={22} color={colors.white} regular>
          {email}
        </Text>
        <View style={styles.box}>
          <SettingItem
            enable={isEnabled}
            onSwitch={toggleSwitch}
            icon={"moon"}
            title={"Darkmode"}
            isSwitch={true}
          />
          <Text
            color={colors.grey3}
            size={17}
            lineHeight={22}
            marginTop={36}
            bold
          >
            Account Settings
          </Text>
          <SettingItem
            onPress={onPressGeneral}
            icon={"details"}
            title={"General"}
          />
          <SettingItem
            onPress={onPressWallet}
            icon={"wallet"}
            title={"Wallet"}
          />
          <SettingItem
            onPress={onPressCurrency}
            icon={"currency"}
            title={"Currency"}
            currency={"USD"}
          />
          <SettingItem
            onPress={onPressCategories}
            icon={"list"}
            title={"Categories"}
          />
          <SettingItem
            onPress={onPressSecurity}
            icon={"lock"}
            title={"Security"}
          />
        </View>
      </ScrollView>
    </View>
  );
});

export default ProfilePremium;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerTitleStyle: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontSize: 17,
    fontWeight: "600",
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerBackGround: {
    backgroundColor: colors.emerald,
  },
  contentView: {
    flex: 1,
    backgroundColor: colors.emerald,
  },
  avatarView: {
    marginTop: 24,
    borderRadius: 80,
    alignItems: "center",
    alignSelf: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  premiumView: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: colors.purplePlum,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  box: {
    backgroundColor: colors.white,
    paddingRight: 24,
    paddingLeft: 27,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 10,
    flex: 1,
    paddingBottom: getBottomSpace(),
  },
});
