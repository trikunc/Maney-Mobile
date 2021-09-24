import React, { memo, useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import colors from "@utils/colors";
import ROUTES from "@utils/routes";
import HeaderButton from "@elements/Header/HeaderButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import { ICON } from "@svg/Icon";
import FONTS from "@utils/fonts";
import Text from "@elements/Text";
import { currencyFormat } from "@utils/formatNumber";
import TransactionPage from "@screens/Transaction/components/TransactionPage";
import ButtonIconBig from "@elements/Button/ButtonIconBig";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ScrollableTab from "@elements/ScrollableTab";
import { useSelector, useDispatch } from "react-redux";
import { IMasterState } from "@store/models/reducers/master";
import { IDataState } from "@store/models/reducers/data";
import moment, { Moment } from "moment";
import { onTransactionRequest } from "../../store/actions/transactionAction";
import { ITransactionRequestState } from "@store/models/actions/transaction";
import { CURRENCY, TRANSACTION, TYPE_WALLET, WALLET } from "@store/models";
import { ILoading } from "@store/models/reducers/loading";
import LoadingView from "@elements/LoadingView";
import ModalFrequency from "@components/ModalFrequency";
import ModalSlideBottom from "@elements/ModalSlideBottom";

interface IState {
  dataReducer: IDataState;
  loadingReducer: ILoading;
  masterReducer: IMasterState;
}

interface calender {
  id: number;
  title: string;
}

enum Frequence {
  month = "month",
  year = "year",
  week = "week",
}

enum FrequenceDateFormat {
  month = "YYYY/MM",
  year = "YYYY",
  week = "YYYY/MM/DD",
}

const Transaction = memo(({ route }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currency, setCurrency] = useState<CURRENCY>();
  const [wallet, setWallet] = useState<WALLET>();
  const [frequency, setFrequency] = useState<Frequence>(Frequence.month);
  const [tabLabelFormat, setTabLabelFormat] = useState<FrequenceDateFormat>(
    FrequenceDateFormat.month
  );

  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const transactions = useSelector(
    (state: IState) => state.dataReducer.transactions
  );
  const loading = useSelector(
    (state: IState) => state.loadingReducer.isLoading
  );
  const user = useSelector((state: IState) => state.masterReducer.user);

  useFocusEffect(
    React.useCallback(() => {
      if (
        route &&
        route.params &&
        route.params.wallet &&
        route.params.wallet.id != -1
      ) {
        // Get transactions of selected wallet
        for (let i = 0; i < wallets.length; i++) {
          if (route.params.wallet.id == wallets[i].id) {
            setWallet(wallets[i]);
          }
        }
        initialized(route.params.wallet.id);
      } else {
        // Get transactions of all wallet
        let balance = 0;
        for (let i = 0; i < wallets.length; i++) {
          balance += wallets[i].balance;
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
          balance: balance,
          typeWalletId: -1,
          typeWallet: type_wallet,
        };
        setWallet(walletAll);
        initialized(-1);
      }
      user && setCurrency(user.currency);
    }, [route.params?.wallet, wallets, user])
  );

  const initialized = async (walletId: number) => {
    let page = 0;
    let limit = 10;
    let actionData: ITransactionRequestState;

    let tab1Time = moment();
    actionData = {
      walletId,
      tabLabel: tab1Time.format(tabLabelFormat),
      from: tab1Time.startOf(frequency).format("YYYY-MM-DD 00:00:00"),
      to: tab1Time.endOf(frequency).format("YYYY-MM-DD 23:59:59"),
      page: page,
      limit: limit,
    };
    await dispatch(onTransactionRequest(actionData));

    let tab2Time = moment().subtract(1, frequency);
    actionData = {
      walletId,
      tabLabel: tab2Time.format(tabLabelFormat),
      from: tab2Time.startOf(frequency).format("YYYY-MM-DD 00:00:00"),
      to: tab2Time.endOf(frequency).format("YYYY-MM-DD 23:59:59"),
      page: page,
      limit: limit,
    };
    await dispatch(onTransactionRequest(actionData));

    let tab3Time = moment().subtract(2, frequency);
    actionData = {
      walletId,
      tabLabel: tab3Time.format(tabLabelFormat),
      from: tab3Time.startOf(frequency).format("YYYY-MM-DD 00:00:00"),
      to: tab3Time.endOf(frequency).format("YYYY-MM-DD 23:59:59"),
      page: page,
      limit: limit,
    };
    await dispatch(onTransactionRequest(actionData));
  };

  const onChangeFrequency = async (frequency: calender) => {
    close();
    if (!frequency) {
      return;
    }
    switch (frequency.title) {
      case "Weekly":
        setFrequency(Frequence.week);
        setTabLabelFormat(FrequenceDateFormat.week);
        break;
      case "Monthly":
        setFrequency(Frequence.month);
        setTabLabelFormat(FrequenceDateFormat.month);
        break;
      case "Yearly":
        setFrequency(Frequence.year);
        setTabLabelFormat(FrequenceDateFormat.year);
        break;
      default:
        return;
    }
    // TODO:
    //initialized(wallet ? wallet.id : -1);
  };

  // TODO:
  //React.useLayoutEffect(() => {
  //  navigation.setOptions({
  //    headerRight: () => (
  //      <HeaderButton
  //        icon={ICON.whiteCalendar}
  //        onPress={open}
  //      />
  //    ),
  //  });
  //}, [frequency]);

  // handler follow form UI
  function setDataUI(dataArray: Array<TRANSACTION>) {
    let title = moment(dataArray[0]?.date).format("DD/MM/YYYY");
    let content = [];
    let data = [];
    for (let i = 0; i < dataArray.length; i++) {
      if (moment(dataArray[i]?.date).format("DD/MM/YYYY") == title) {
        content.push({
          id: dataArray[i]?.id,
          note: dataArray[i]?.note,
          date: dataArray[i]?.date,
          balance: dataArray[i]?.balance,
          income: dataArray[i]?.type == "income" ? true : false,
          category: dataArray[i]?.category,
          walletId: dataArray[i]?.walletId,
          type: dataArray[i]?.type,
        });
      } else {
        data.push({ title: title, content: content });
        title = moment(dataArray[i]?.date).format("DD/MM/YYYY");
        content = [];
        content.push({
          id: dataArray[i]?.id,
          note: dataArray[i]?.note,
          date: dataArray[i]?.date,
          balance: dataArray[i]?.balance,
          income: dataArray[i]?.type == "income" ? true : false,
          category: dataArray[i]?.category,
          walletId: dataArray[i]?.walletId,
          type: dataArray[i]?.type,
        });
      }
    }

    if (content.length > 0) {
      data.push({ title: title, content: content });
    }
    return data;
  }

  const onChooseWallet = useCallback(() => {
    const params = { wallet: wallet, route: ROUTES.Transaction };
    navigation.navigate(ROUTES.AddTransactionWallets, params);
  }, [wallet]);

  const onCreateTransaction = useCallback(() => {
    const params = { route: ROUTES.Transaction };
    navigation.navigate(ROUTES.CreateTransaction, params);
  }, []);

  // TODO
  //async function onLoadMore(
  //  currentPage: number,
  //  total: number,
  //  date: Moment,
  //  type: number,
  //) {
  //  let to = "2021-12-30", from = "2020-12-30";
  //  switch (type) {
  //    case 0:
  //      to = date.endOf("week").format("YYYY-MM-DD 23:59:59");
  //      from = date.startOf("week").format("YYYY-MM-DD 00:00:00");
  //      break;
  //    case 1:
  //      to = date.endOf("month").format("YYYY-MM-DD 23:59:59");
  //      from = date.startOf("month").format("YYYY-MM-DD 00:00:00");
  //      break;
  //    case 2:
  //      to = date.endOf("year").format("YYYY-MM-DD 23:59:59");
  //      from = date.startOf("year").format("YYYY-MM-DD 00:00:00");
  //      break;
  //    default:
  //      break;
  //  }
  //  if (total > (currentPage + 1) * 6) { // ???? Sao lai co cong thuc nay
  //    console.log("Start load more");
  //    // TODO: Max page
  //    setDisableLoadMore(true);
  //    // Load tab current month
  //    const actionData: ITransactionRequestState = {
  //      walletId: wallet ? wallet.id : -1,
  //      tabLabel: date.format("YYYY/MM"),
  //      limit: 10,
  //      page: currentPage + 1,
  //      from,
  //      to
  //    };
  //    await dispatch(onTransactionRequest(actionData));
  //    setDisableLoadMore(false);
  //  }
  //}

  /**
   *  Render tab content
   */
  const renderTransactionPage = useCallback(
    (date: Moment, page: number) => {
      const walletId = wallet ? wallet.id : -1;
      let data = transactions.find((item) => {
        return (
          item.tabLabel == date.format("YYYY/MM") && item.walletId == walletId
        );
      });

      if (!data) {
        return <View />;
      }

      let dataUI: any = [];
      if (data?.items) {
        dataUI = setDataUI(data?.items);
      }
      return (
        <TransactionPage
          income={data?.income || 0}
          expense={data?.expense || 0}
          data={dataUI}
          onLoadMore={() => {
            // TODO:
            //onLoadMore(data?.currentPage || 0, data?.total || 0, date, page)
          }}
          onRefresh={() => {
            /* TODO */
          }}
          disableLoadMore={true && data.fetching} // TODO: Temporary disable load more
          onAddTransaction={() => onCreateTransaction()}
          currency={currency}
        />
      );
    },
    [transactions, frequency, currency]
  );

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.emerald}
        barStyle={"light-content"}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onChooseWallet}
          activeOpacity={0.7}
          style={styles.setRow}
        >
          {
            <>
              <Text size={14} marginRight={14} color={colors.white}>
                {wallet?.name}
              </Text>
              {ICON.whiteRightArrow}
            </>
          }
        </TouchableOpacity>
        {currency ? (
          <Text size={28} lineHeight={34} color={colors.white} marginTop={8}>
            {currencyFormat(wallet?.balance, currency)}
          </Text>
        ) : null}
      </View>
      <ScrollableTab
        titles={[
          moment().subtract(2, frequency).format(tabLabelFormat),
          moment().subtract(1, frequency).format(tabLabelFormat),
          moment().format(tabLabelFormat),
        ]}
      >
        {renderTransactionPage(moment().subtract(2, frequency), 0)}
        {renderTransactionPage(moment().subtract(1, frequency), 0)}
        {renderTransactionPage(moment(), 0)}
      </ScrollableTab>
      <ButtonIconBig
        onPress={onCreateTransaction}
        icon={ICON.add}
        style={styles.buttonAddTransaction}
      />
      {loading ? <LoadingView /> : null}
      {/* <Modal
        visible={visible}
        onRequestClose={close}
        transparent
        animationType={"none"}
      >
        <ModalSlideBottom onClose={close} transY={transY}>
          <ModalFrequency
            onChangeFrequency={(frequency) => onChangeFrequency(frequency)}
          />
        </ModalSlideBottom> */}
      {/* </Modal> */}
    </View>
  );
});

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  header: {
    backgroundColor: colors.emerald,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
  },
  buttonAddTransaction: {
    position: "absolute",
    width: 56,
    height: 56,
    right: 16,
    bottom: getBottomSpace() + 24,
  },
});
