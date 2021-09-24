import React, { memo, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ScrollableTab from "@elements/ScrollableTab";
import ROUTES from "@utils/routes";
import HeaderButton from "@elements/Header/HeaderButton";
import { ICON } from "@svg/Icon";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import LoadingView from "@elements/LoadingView";
import StatisticPage from "@screens/Chart/components/StatisticPage";
import { currencyFormat } from "@utils/formatNumber";
import ModalSlideBottom from "@elements/ModalSlideBottom";
import ModalFrequency from "@components/ModalFrequency";
import moment, { Moment } from "moment";
import { IDataState } from "@store/models/reducers/data";
import { ILoading } from "@store/models/reducers/loading";
import { useSelector, useDispatch } from "react-redux";
import { IChartStateRequest } from "@store/models/actions/chart";
import { onCharttAllWalletByMonthRequest } from "../../store/actions/chartAction";
import { IChartData } from "@store/models/reducers/chart";
import { CHART, CURRENCY, WALLET } from "@store/models";
import { IMasterState } from "../../store/models/reducers/master";

interface IState {
  dataReducer: IDataState;
  loadingReducer: ILoading;
  chartReducer: IChartData;
  masterReducer: IMasterState;
}

const Chart = memo(({ route }: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [walletId, setWalletId] = useState<number>(-1);
  const [walletName, setWalletName] = useState<string>("All wallet");
  const [wallet, setWallet] = useState<WALLET>();
  const [balance, setBalance] = useState<number>(0);
  const [frequency, setFrequency] = useState<object>({});
  const [monthCurrent] = useState<Moment>(moment(new Date()));
  const [monthPrev1] = useState<Moment>(
    moment(new Date()).subtract(1, "month")
  );
  const [monthPrev2] = useState<Moment>(
    moment(new Date()).subtract(2, "month")
  );
  const loading = false;
  //  useSelector(
  //   (state: IState) => state.loadingReducer.isLoading
  // );
  const user = useSelector((state: IState) => state.masterReducer.user);
  const [currency] = useState<CURRENCY>(user.currency);

  const wallets = useSelector((state: IState) => state.dataReducer.wallets);
  const chartData = useSelector(
    (state: IState) => state.chartReducer.chartData
  );

  useFocusEffect(
    React.useCallback(() => {
      if (route && route.params && route.params.wallet) {
        setWallet(route.params.wallet);
        setWalletName(route.params.wallet.name);
        setBalance(route.params.wallet.balance);
        setWalletId(route.params.wallet.id);
        initialized(route.params.wallet.id);
      } else {
        let balance = 0;
        for (let i = 0; i < wallets.length; i++) {
          balance += wallets[i].balance;
        }
        setBalance(balance);
        setWalletName("All Wallet");
        setWalletId(-1);
        initialized(-1);
      }
    }, [route.params?.wallet, user])
  );

  const initialized = async (walletId: number) => {
    let actionData: IChartStateRequest;
    actionData = {
      walletId,
      year: monthCurrent.format("YYYY"),
      month: monthCurrent.format("MM"),
    };
    dispatch(onCharttAllWalletByMonthRequest(actionData));
    actionData = {
      walletId,
      year: monthPrev1.format("YYYY"),
      month: monthPrev1.format("MM"),
    };
    dispatch(onCharttAllWalletByMonthRequest(actionData));
    actionData = {
      walletId,
      year: monthPrev2.format("YYYY"),
      month: monthPrev2.format("MM"),
    };
    dispatch(onCharttAllWalletByMonthRequest(actionData));
  };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButton icon={ICON.whiteCalendar} onPress={open} />
  //     ),
  //   });
  // }, []);

  const onChooseWallet = useCallback(() => {
    const params = { wallet: wallet, route: ROUTES.Chart };
    navigation.navigate(ROUTES.AddTransactionWallets, params);
  }, [wallet]);

  const onChangeFrequency = (frequency: any) => {
    close();
    setFrequency(frequency);
  };

  function setDataChartUI(
    data: Array<CHART>,
    incomArr: Array<number>,
    expenseArr: Array<number>
  ) {
    console.log("minh", data);
    let totalIn = 0;
    let totalEx = 0;
    let ArrIncome = incomArr;
    let ArrExpense = expenseArr;
    for (let i = 0; i < data.length; i++) {
      let index = Number(moment(data[i].transactionDate).format("DD"));
      ArrIncome[index - 1] = data[i].totalIncome;
      ArrExpense[index - 1] = data[i].totalExpense;
      totalIn = totalIn + data[i].totalIncome;
      totalEx = totalEx + data[i].totalExpense;
    }
    let dataReturn = {
      dataIncome: ArrIncome,
      dataExpense: ArrExpense,
      totalIncome: totalIn,
      totalExpense: totalEx,
    };
    return dataReturn;
  }

  const renderStatisticPage = useCallback(
    (date: Moment) => {
      const month: string = date.format("MM");
      const year: string = date.format("YYYY");
      const chartElement = chartData.find((item) => {
        return (
          item.month == month && item.year == year && item.walletId == walletId
        );
      });
      let category = [];
      let incomeArr = [];
      let expenseArr = [];
      for (let i = 1; i <= date.daysInMonth(); i++) {
        category.push(`${i}`);
        incomeArr.push(0);
        expenseArr.push(0);
      }
      const dataUI: any = setDataChartUI(
        chartElement?.dailyChartData || [],
        incomeArr,
        expenseArr
      );
      return (
        <StatisticPage
          walletId={walletId}
          currency={currency}
          income={dataUI?.totalIncome}
          expense={dataUI?.totalExpense}
          category={category}
          incomeArr={dataUI?.dataIncome}
          expenseArr={dataUI?.dataExpense}
          isNull={false}
        />
      );
    },
    [chartData]
  );

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
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={onChooseWallet}
                activeOpacity={0.7}
                style={styles.setRow}
              >
                {
                  <>
                    <Text size={14} marginRight={14} color={colors.white}>
                      {walletName}
                    </Text>
                    {false && ICON.whiteRightArrow}
                  </>
                }
              </TouchableOpacity>
              {currency ? (
                <Text
                  bold
                  lineHeight={34}
                  size={28}
                  color={colors.white}
                  marginTop={8}
                >
                  {currencyFormat(balance, currency)}
                </Text>
              ) : null}
            </View>
            <ScrollableTab
              titles={[
                monthPrev2.format("YYYY/MM"),
                monthPrev1.format("YYYY/MM"),
                monthCurrent.format("YYYY/MM"),
              ]}
            >
              {renderStatisticPage(monthPrev2)}
              {renderStatisticPage(monthPrev1)}
              {renderStatisticPage(monthCurrent)}
            </ScrollableTab>
          </ScrollView>
        </>
      )}
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
        </ModalSlideBottom>
      </Modal> */}
    </View>
  );
});

export default Chart;

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
});
