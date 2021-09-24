import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import FONTS from "@utils/fonts";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import HeaderButton from "@elements/Header/HeaderButton";
import { ICON } from "@svg/Icon";
import { IMAGE_ICON } from "@assets/Icon";
import SettingItem from "./SettingItem";
import ROUTES from "@utils/routes";
import ButtonPrimaryIcon from "@elements/Button/ButtonPrimaryIcon";
import { useSelector, useDispatch } from "react-redux";
import { IMasterState } from "../../../store/models/reducers/master";
import ConfirmDialog from "@elements/Dialog/ConfirmDialog";
import { removeAllData } from "../../../utils/store/Store";
interface IState {
  masterReducer: IMasterState;
}

const ProfileNormal = memo(() => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const user = useSelector((state: IState) => state.masterReducer.user);

  const onPressEdit = useCallback(() => {}, []);

  const onPressYes = async () => {
    setShowDialog(false);
    await removeAllData();
    navigation.navigate(ROUTES.Login);
  };

  const onPressNo = () => {
    setShowDialog(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerTitleAlign: "center",
      headerTintColor: colors.grey1,
      headerTitleStyle: styles.headerTitleStyle,
      headerStyle: styles.headerStyle,
      headerRight: () => (
        <HeaderButton onPress={onPressEdit} icon={ICON.edit} />
      ),
    });
  }, []);

  const onGetPremium = useCallback(() => {
    navigation.navigate(ROUTES.GetPremium);
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

  const onPressLogout = () => {
    setShowDialog(true);
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle={"dark-content"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.contentView}
      >
        <Image
          style={styles.avatar}
          source={
            !!user.avatar && user.avatar !== null
              ? { uri: user.avatar }
              : IMAGE_ICON.profileGuest
          }
        />
        <Text
          marginTop={4}
          center
          size={22}
          lineHeight={37}
          color={colors.grey1}
          bold
        >
          {user.name}
        </Text>
        <Text center size={16} lineHeight={22} color={colors.grey3} regular>
          {user.email || "Email@chuaco.dau"}
        </Text>
        <ButtonPrimaryIcon
          onPress={onGetPremium}
          iconLeft={ICON.whiteAward}
          style={styles.buttonGetPremium}
          title={"Get premium"}
        />
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
        <SettingItem onPress={onPressWallet} icon={"wallet"} title={"Wallet"} />
        <SettingItem
          onPress={onPressCurrency}
          icon={"currency"}
          title={"Currency"}
          currency={user?.currency?.currency}
        />
        <SettingItem
          onPress={onPressCategories}
          icon={"list"}
          title={"Categories"}
        />
        <SettingItem onPress={onPressLogout} icon={"lock"} title={"Logout"} />
      </ScrollView>
      <ConfirmDialog
        titleButton1={"Yes"}
        titleButton2={"No"}
        image={IMAGE_ICON.confuse}
        description={"Are you sure you want to logout?"}
        visible={showDialog}
        onTouchOutside={onPressNo}
        onButton1={onPressYes}
        onButton2={onPressNo}
      />
    </View>
  );
});

export default ProfileNormal;

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
    borderBottomWidth: 1,
    borderBottomColor: colors.snow,
  },
  headerBackGround: {
    backgroundColor: colors.white,
  },
  contentView: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  avatar: {
    marginTop: 24,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
  },
  buttonGetPremium: {
    width: 151,
    height: 46,
    alignSelf: "center",
    marginTop: 16,
  },
});
