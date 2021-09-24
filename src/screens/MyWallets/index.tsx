import React, { memo, useCallback, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Text from "@elements/Text";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import colors from "@utils/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import HeaderButton from "@elements/Header/HeaderButton";
import { ICON } from "@svg/Icon";
import WalletItem from "@components/WalletItem";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { currencyFormat } from "@utils/formatNumber";
import LoadingView from "@elements/LoadingView";
import ROUTES from "@utils/routes";
import AdBanner from "@components/AdBanner";
import { useSelector } from "react-redux";
import { IDataState } from "@store/models/reducers/data";
import { CURRENCY } from "@store/models";
import { IMasterState } from "../../store/models/reducers/master";
import { ILoading } from "@store/models/reducers/loading";

interface IState {
  dataReducer: IDataState;
  masterReducer: IMasterState;
  loadingReducer: ILoading;
}

const MyWallets = memo(() => {
  const navigation = useNavigation();
  const [currency, setCurrency] = useState<CURRENCY>();
  const [amount, setAmount] = useState<number>(0);

  const scrollY = useRef(new Animated.Value(0)).current;
  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const user = useSelector((state: IState) => state.masterReducer.user);

  const loading = useSelector(
    (state: IState) => state.loadingReducer.isLoading
  );

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { scrollY } } }],
    {
      useNativeDriver: true,
    }
  );

  const onPressAdd = useCallback(() => {
    const params = { route: ROUTES.MyWallets };
    navigation.navigate(ROUTES.CreateAssets, params);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderButton icon={ICON.whiteBackArrow} />,
      headerRight: () => <HeaderButton onPress={onPressAdd} icon={ICON.add} />,
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, [wallets])
  );

  const initialized = async () => {
    try {
      let balance = 0;
      for (let i = 0; i < wallets.length; i++) {
        balance += wallets[i].balance;
      }
      setAmount(balance);
      setCurrency(user.currency);
    } catch (e) {}
  };

  const opacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0.7, 0],
  });
  const blOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
  });
  const scale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.7],
  });

  const onPressWallet = useCallback((item: any) => {
    const res = item;
    navigation.navigate(ROUTES.MyWalletsEdit, res);
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.emerald}
        barStyle={"light-content"}
      />
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            bounces={false}
            contentContainerStyle={styles.contentContainerStyle}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollY } },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            <View style={styles.topView}>
              <Animated.Text
                style={[
                  styles.textTotal,
                  {
                    opacity: opacity,
                    transform: [{ scale: scale }],
                  },
                ]}
              >
                Total balance
              </Animated.Text>
              {currency ? (
                <Animated.Text
                  style={[
                    styles.textBalance,
                    {
                      opacity: blOpacity,
                      transform: [{ scale: scale }],
                    },
                  ]}
                >
                  {currencyFormat(amount, currency)}
                </Animated.Text>
              ) : null}
            </View>
            <Animated.View style={styles.contentStyle}>
              <Text bold marginLeft={32} size={18} marginTop={24}>
                Available wallets
              </Text>
              {wallets.map((item: any, index: number) => {
                return (
                  <View key={index} style={styles.item}>
                    <WalletItem
                      onPressWallet={() => onPressWallet(item)}
                      style={styles.walletItem}
                      currency={currency}
                      scrollY={scrollY}
                      {...item}
                    />
                  </View>
                );
              })}
            </Animated.View>
          </Animated.ScrollView>
        </>
      )}
      <AdBanner />
    </View>
  );
});

export default MyWallets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  walletItem: {
    alignSelf: "center",
    marginTop: 16,
    width: "100%",
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
  contentStyle: {
    backgroundColor: colors.white,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: -20,
  },
  textTotal: {
    marginTop: 24,
    fontSize: 17,
    lineHeight: 24,
    alignSelf: "center",
    color: colors.white,
  },
  textBalance: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    alignSelf: "center",
    color: colors.white,
  },
  item: {
    paddingHorizontal: 32,
  },
  topView: {
    backgroundColor: colors.emerald,
    paddingBottom: 30,
  },
});
