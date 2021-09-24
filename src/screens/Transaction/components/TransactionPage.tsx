import React, { memo, useCallback } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { heightScreen, widthScreen } from "@utils/dimensions";
import TransactionEmpty from "@components/TransactionEmpty";
import keyExtractor from "@utils/keyExtractor";
import BoxTransactionItem from "@components/BoxTransactionItem";
import { getBottomSpace } from "react-native-iphone-x-helper";
import TotalTransactionItem from "@components/TotalTransactionItem";
import { CURRENCY } from "@store/models";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "@utils/routes";

interface Props {
  tabLabel?: string;
  data?: any;
  income?: number;
  expense?: number;
  currency: CURRENCY;
  disableLoadMore?: boolean;
  onAddTransaction?: () => void;
  onLoadMore?: () => void;
  onRefresh?: () => void;
}

const TransactionPage = memo(
  ({
    income,
    expense,
    data,
    currency,
    disableLoadMore,
    onAddTransaction,
    onLoadMore,
    onRefresh,
  }: Props) => {
    const { navigate } = useNavigation();
    const listEmptyComponent = () => {
      return (
        <View>
          <TotalTransactionItem
            style={styles.transactionEmpty}
            currency={currency}
          />
          <TransactionEmpty
            onPress={() => onAddTransaction && onAddTransaction()}
          />
        </View>
      );
    };

    const onPressIncome = useCallback(() => {
      navigate(ROUTES.ChartAnalysis, { income: true });
    }, []);

    const onPressExpense = useCallback(() => {
      navigate(ROUTES.ChartAnalysis, { income: false });
    }, []);

    const listHeaderComponent = useCallback(() => {
      return (
        <TotalTransactionItem
          style={styles.transactionEmpty}
          income={income}
          expense={expense}
          currency={currency}
          onPressIncome={onPressIncome}
          onPressExpense={onPressExpense}
        />
      );
    }, [income, expense, currency]);

    const renderItem = useCallback(
      ({ item }) => {
        return (
          <BoxTransactionItem
            style={styles.item}
            {...item}
            currency={currency}
          />
        );
      },
      [currency]
    );

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListHeaderComponent={data.length !== 0 ? listHeaderComponent : null}
          ListEmptyComponent={listEmptyComponent}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={disableLoadMore ? null : onLoadMore}
          onEndReachedThreshold={0.001}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  }
);

export default TransactionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: heightScreen,
    width: widthScreen,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    alignItems: "stretch",
    paddingTop: 16,
    paddingBottom: getBottomSpace() + 230,
  },
  transactionEmpty: {
    marginBottom: 12,
  },
  item: {
    marginBottom: 8,
  },
});
