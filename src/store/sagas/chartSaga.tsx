/* Redux saga class
 */
import { put, takeEvery } from "redux-saga/effects";

import { Alert } from "react-native";
// @ts-ignore
import { disableLoader, enableLoader } from "@actions/loaderActions";
import { apiChartGetTransactionAllWallet, apiChartGetTransactionByWallet } from "@api/index";
import { onChartAllWalletByMonthResponse, onCharttAllWalletByMonthRequest } from "../actions/chartAction";
import * as types from '../actions/types';
import { ChartInMonth } from "@store/models/reducers/chart";
import { CHART } from "@store/models";

function* chartGetTransactionAllWalletAsync({payload} : ReturnType<typeof onCharttAllWalletByMonthRequest>) {
  yield put(enableLoader());
  let response: any;
  if (payload.walletId == -1){
    response = yield apiChartGetTransactionAllWallet(payload);
  } else{
    response = yield apiChartGetTransactionByWallet(payload);
  }

  if (response) {
    yield put(disableLoader());
    const responseAction : ChartInMonth = {
      month: payload.month,
      year: payload.year,
      walletId: payload.walletId,
      dailyChartData: response.dailyChartData,
      categoryChartData: response.categoryChartData,
    };
    yield put(onChartAllWalletByMonthResponse(responseAction));
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert("FETCH CHART ERROR", response.message);
    }, 200);
  }
}

export const chartSaga = [
  takeEvery(types.CHART_ALL_WALLET_BY_MONTH_REQUEST, chartGetTransactionAllWalletAsync),
]
  
