import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FONTS from "@utils/fonts";
import Text from "@elements/Text";
import colors from "@utils/colors";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import ButtonPrimary from "@elements/Button/ButtonPrimary";
// @ts-ignore
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
import ROUTES from "@utils/routes";
import HeaderList from "@screens/Dashboard/components/HeaderList";
import ButtonPrimaryIcon from "@elements/Button/ButtonPrimaryIcon";
import { ICON } from "@svg/Icon";
import SvgBell from "@svg/Icon/SvgBell";
import SvgClose from "@svg/Icon/SvgClose";
import ButtonIconBig from "@elements/Button/ButtonIconBig";
import LoadingView from "@elements/LoadingView";
import TransactionItem from "@components/BoxTransactionItem/TransactionItem";
// @ts-ignore
import { useDispatch, useSelector } from "react-redux";
import { IMasterState } from "@store/models/reducers/master";
import { IDataState } from "@store/models/reducers/data";
import { ILoading } from "@store/models/reducers/loading";
import AdBanner from "@components/AdBanner";
import { WALLET } from "@store/models";
import TransactionEmpty from "@components/TransactionEmpty";
import { getBottomSpace } from "react-native-iphone-x-helper";

interface IState {
  loadingReducer: ILoading;
  masterReducer: IMasterState;
  dataReducer: IDataState;
}

const Dashboard = memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState<boolean>(true);

  const loading = useSelector(
    (state: IState) => state.loadingReducer.isLoading
  );

  const user = useSelector((state: IState) => state.masterReducer.user);

  // const [wallets] = useState(MY_WALLET_DATA); //Debug purpose
  const wallets = useSelector((state: IState) => state.dataReducer.wallets);

  const walletData = [...wallets, { defaultWallet: true }];

  // const latestTransactions = LATEST_TRANSACTION_EXAMPLE_DATA; //Debug purpose
  const latestTransactions = useSelector(
    (state: IState) => state.dataReducer.latestTransactions
  );

  const onCreateAssets = useCallback(() => {
    const params = { route: ROUTES.Dashboard };
    navigation.navigate(ROUTES.CreateAssets, params);
  }, []);

  const onAddTransaction = useCallback(() => {
    const params = { route: ROUTES.Dashboard };
    navigation.navigate(ROUTES.CreateTransaction, params);
  }, []);

  const onNotification = useCallback(() => {}, []);

  const onCloseNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  const onPressWallet = useCallback(
    (item: WALLET) => {
      let params = { wallet: item };
      navigation.navigate(ROUTES.Transaction, params);
    },
    [wallets, latestTransactions]
  );

  const onClickAddWallet = useCallback(() => {
    navigation.navigate(ROUTES.CreateAssets);
  }, [navigation]);

  const onPressSeeAll = useCallback(() => {
    navigation.navigate(ROUTES.MyWallets);
  }, []);

  const onPressSeeAllTransaction = useCallback(() => {
    navigation.navigate(ROUTES.Transaction);
  }, []);

  const assetsNone = () => {
    return (
      <View style={styles.assetsNone}>
        <Text
          size={22}
          lineHeight={37}
          bold
          center
          color={colors.grey1}
          marginHorizontal={16}
        >
          You don’t have any wallets!
        </Text>
        <ButtonPrimary
          onPress={onCreateAssets}
          title={"Create Now"}
          titleStyle={styles.textCreateNow}
          style={styles.buttonCreate}
        />
      </View>
    );
  };

  const renderNoneTransactions = () => {
    return <TransactionEmpty onPress={() => onAddTransaction()} />;
  };

  const renderLatestTransactions = () => {
    return (
      <View style={styles.latestTransactions}>
        <View style={styles.setRowLine}>
          <Text size={18} lineHeight={24} semiBold color={colors.grey1}>
            Latest Transactions
          </Text>
          <TouchableOpacity
            onPress={onPressSeeAllTransaction}
            activeOpacity={0.7}
          >
            <Text size={17} lineHeight={24} semiBold color={colors.purplePlum}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          {latestTransactions.map((item: any, index: number) => {
            if (!user) return null;
            const onPressEditTransaction = () => {
              navigation.navigate(ROUTES.EditTransaction, item);
            };
            return (
              <TransactionItem
                onPress={onPressEditTransaction}
                {...item}
                key={index}
                currency={user.currency}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle={"dark-content"}
      />
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.topView}>
              <Text size={18} lineHeight={24} semiBold color={colors.grey1}>
                My Wallets
              </Text>
              {wallets.length !== 0 && (
                <TouchableOpacity onPress={onPressSeeAll} activeOpacity={0.7}>
                  <Text
                    size={17}
                    lineHeight={24}
                    semiBold
                    color={colors.purplePlum}
                    style={{ fontFamily: FONTS.MUKTA.Bold }}
                  >
                    See All
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {wallets.length === 0 ? (
              assetsNone()
            ) : (
              <>
                {user && (
                  <HeaderList
                    onClickAddWallet={onClickAddWallet}
                    onPressWallet={onPressWallet}
                    walletData={walletData}
                    currency={user.currency}
                  />
                )}
                <View style={{ marginBottom: 16 }}>
                  {latestTransactions.length === 0
                    ? renderNoneTransactions()
                    : // : renderNoneTransactions()
                      renderLatestTransactions()}
                </View>
              </>
            )}
          </ScrollView>
          {showNotification && wallets.length !== 0 && (
            <View style={styles.notificationBox}>
              <Text
                size={17}
                lineHeight={22}
                color={colors.grey1}
                marginHorizontal={40}
                semiBold
                center
              >
                Turn on notifications to get notified instantly
              </Text>
              <ButtonPrimaryIcon
                underlayColor={colors.mediumAquamarine}
                onPress={onNotification}
                titleStyle={styles.textNotification}
                style={styles.buttonNotification}
                title={"Turn on notifications"}
                iconRight={<SvgBell />}
              />
              <TouchableOpacity
                style={styles.svgClose}
                onPress={onCloseNotification}
                activeOpacity={1}
              >
                <SvgClose />
              </TouchableOpacity>
            </View>
          )}
          {latestTransactions.length !== 0 && (
            <ButtonIconBig
              onPress={onAddTransaction}
              icon={ICON.add}
              style={styles.buttonAddTransaction}
            />
          )}
        </>
      )}
      <AdBanner />
    </View>
  );
});

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 18,
    alignItems: "center",
  },
  assetsNone: {
    backgroundColor: colors.white,
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 23,
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 16,
  },
  buttonCreate: {
    width: 172,
    marginTop: 16,
  },
  textCreateNow: {
    fontFamily: FONTS.MUKTA.Bold,
    fontSize: 16,
  },
  notificationBox: {
    backgroundColor: colors.honeyDrew,
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: "center",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: getBottomSpace() + 18,
  },
  textNotification: {
    fontFamily: FONTS.MUKTA.Regular,
    fontWeight: "500",
    fontSize: 14,
  },
  buttonNotification: {
    marginTop: 12,
    width: 172,
    height: 36,
  },
  svgClose: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  latestTransactions: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  setRowLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.snow,
    paddingBottom: 16,
  },
  buttonAddTransaction: {
    position: "absolute",
    width: 56,
    height: 56,
    right: 8,
    bottom: getBottomSpace() + 24,
    marginBottom: 0,
  },
});
