import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";
import HeaderButton from "@elements/Header/HeaderButton";
import WalletTypeItem from "@components/WalletTypeItem";
import ROUTES from "@utils/routes";
import { useSelector } from "react-redux";
import { IDataState } from "@store/models/reducers/data";
import { TYPE_WALLET, WALLET } from "@store/models";

interface IState {
  dataReducer: IDataState;
}

const AddTransactionWallets = memo(({ route }: any) => {
  const navigation = useNavigation();
  const [wallet, setWallet] = useState<WALLET>();
  const [goback, setGoBack] = useState<string>(ROUTES.CreateTransaction);
  const [type, setType] = useState<number>(0);

  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const [walletsAll, setWalletsAll] = useState<Array<WALLET>>();
  const disabled = wallet?.id === undefined;

  React.useEffect(() => {
    if (route.params?.route) {
      setGoBack(route.params?.route);
    } else {
      setGoBack(ROUTES.CreateTransaction);
    }
    if (route.params?.wallet) {
      setWallet(route.params?.wallet);
    }
    if (route.params?.type) {
      setType(route.params?.type);
    }
    let type_wallet: TYPE_WALLET = {
      id: -1,
      name: "",
      icon: "wallet",
    };
    let walletAll: WALLET = {
      id: -1,
      userId: "",
      name: "All wallet",
      balance: route.params?.wallet?.balance,
      typeWalletId: -1,
      typeWallet: type_wallet,
    };
    let allWallet: Array<WALLET> = [];
    if (route.params?.route == ROUTES.Transaction) {
      allWallet.push(walletAll);
    }
    wallets.map((item) => {
      allWallet.push(item);
    });
    setWalletsAll(allWallet);
  }, [route.params?.wallet, route.params?.route]);

  React.useLayoutEffect(() => {
    const textDoneStyle = disabled
      ? { color: colors.grey3 }
      : { color: colors.purplePlum };

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
  }, [disabled, wallet]);

  const onDone = useCallback(() => {
    let params: object;
    if (type == 1) {
      params = { walletFrom: wallet };
    } else {
      if (type == 2) {
        params = { walletTo: wallet };
      } else {
        params = { wallet: wallet };
      }
    }
    navigation.navigate(goback, params);
  }, [wallet]);

  const onPress = useCallback((item) => {
    setWallet(item);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        {walletsAll &&
          walletsAll.map((item: any, index: number) => {
            return (
              <WalletTypeItem
                isChose={wallet?.id}
                id={item.id}
                onPress={() => onPress(item)}
                wallet={item}
                key={index}
              />
            );
          })}
      </View>
    </View>
  );
});

export default AddTransactionWallets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
    paddingHorizontal: 31,
  },
  contentView: {
    marginTop: 24,
    paddingLeft: 16,
    paddingRight: 18,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
});
