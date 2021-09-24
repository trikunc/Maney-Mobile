import React, { memo, useState, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "@elements/Text";
import colors from "@utils/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { currencyFormat } from "@utils/formatNumber";
import FocusAwareStatusBar from "@elements/StatusBar/FocusAwareStatusBar";
import BoxTransactionItem from "@components/BoxTransactionItem";
import { getBottomSpace } from "react-native-iphone-x-helper";
import keyExtractor from "@utils/keyExtractor";
import LoadingView from "@elements/LoadingView";
import { CURRENCY, TYPE_WALLET } from "@store/models";
import { useSelector, useDispatch } from "react-redux";
import { IMasterState } from "../../store/models/reducers/master";

interface IState {
  masterReducer: IMasterState;
}

const ChartTransaction = memo(() => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<any>([]);
  const [balance, setBalance] = useState<number>(0);
  const user = useSelector((state: IState) => state.masterReducer.user);
  const [currency, setCurrency] = useState<CURRENCY>(user.currency);

  useFocusEffect(
    React.useCallback(() => {
      initialized();
    }, [user])
  );

  const initialized = async () => {
    try {
      // TODO: FILL REAL DATA FROM SERVER
      // setBalance(12864);

      // TODO: FILL REAL DATA FROM SERVER
      // (!)Transaction list item format
      // [
      //   {
      //     title: "Today 02, December",
      //     content: [
      //       {
      //         id: "3",
      //         icon: "tShirt", // key code
      //         title: "Shopping at Tokyo Life1",
      //         date: "15 Dec 2020",
      //         balance: 428000,
      //         income: true,
      //       },
      //     ],
      //   },
      // ]
      // setTransactions(
      // );

      setLoading(false);
    } catch (e) {}
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Shopping",
    });
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <BoxTransactionItem style={styles.item} {...item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={colors.emerald}
        barStyle={"light-content"}
      />
      <View style={styles.containerUnderHeader}>
        <Text bold lineHeight={34} size={28} color={colors.white} marginTop={8}>
          {currencyFormat(balance, currency)}
        </Text>
      </View>
      {loading ? (
        <LoadingView isLoading={loading} />
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
});

export default ChartTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  contentContainerStyle: {
    alignItems: "stretch",
    paddingBottom: getBottomSpace() + 16,
  },
  containerUnderHeader: {
    backgroundColor: colors.emerald,
    alignItems: "center",
  },
  item: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
});
