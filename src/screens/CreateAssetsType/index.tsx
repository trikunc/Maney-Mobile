import React, { memo, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";
import HeaderButton from "@elements/Header/HeaderButton";
import WalletTypeItem from "@components/WalletTypeItem";
import ROUTES from "@utils/routes";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import { useSelector } from "react-redux";
import { IMasterState } from "@store/models/reducers/master";
import { TYPE_WALLET } from "@store/models";
interface IState {
  masterReducer: IMasterState;
}

const CreateAssetsType = memo(({ route }: any) => {
  const navigation = useNavigation();
  const typeWallets = useSelector(
    (state: IState) => state.masterReducer.typeWallets
  );
  const [typeWallet, setTypeWallet] = useState<TYPE_WALLET>();
  const disabled = typeWallet === undefined;
  const [goBack, setGoBack] = useState<string>("");

  React.useEffect(() => {
    console.log("params: ", route.params);
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateAssets);
    }
    setTypeWallet(route.params?.typeWallet);
  }, [route.params?.route, route.params?.typeWallet]);

  React.useLayoutEffect(() => {
    const textDoneStyle = disabled
      ? { color: colors.grey3 }
      : { color: colors.purplePlum };

    const onDone = () => {
      const param = { typeWallet: typeWallet };
      navigation.navigate(goBack, param);
    };

    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          disabled={disabled}
          onPress={onDone}
          titleStyle={textDoneStyle}
          title={"Done"}
        />
      ),
    });
  }, [disabled, goBack, typeWallet]);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle={"dark-content"}
      />
      <View style={styles.contentView}>
        {typeWallets.map((item: any, index: number) => {
          const onPress = () => {
            setTypeWallet(item);
          };
          return (
            <WalletTypeItem
              isChose={typeWallet?.id}
              onPress={onPress}
              {...item}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
});

export default CreateAssetsType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  contentView: {
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 18,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginHorizontal: 16,
  },
});
