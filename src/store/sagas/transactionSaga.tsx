/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';
// @ts-ignore
import isEmpty from "lodash.isempty";
// @ts-ignore
import { apiDeleteTransaction, apiGetTransactionWalletByDate, apiUpdateTransaction } from '@api/index';
import { onTransactionResponse, onTransactionRequest, onUpdateTransactionRequest, onUpdateTransactionResponse, onDeleteTransactionResponse, onDeleteTransactionRequest } from '../../store/actions/transactionAction';
import { ITransactionsState } from '@store/models/reducers/transactions';
import { onFetchingLoadmore } from '../../store/actions/commonActions';
import { enableLoader, disableLoader } from '../../store/actions/loaderActions';
import * as types from "../actions/types";
/**
 * Get transactions data with paging
 * @param { paypload }
 */
function* transactionAsync({ payload }: ReturnType<typeof onTransactionRequest>) {
  const { walletId, tabLabel, page, limit, from, to } = payload;

  // Set tab is loading
  yield put(onFetchingLoadmore(payload))

  let body = {};
  if (walletId == -1) {
    body = { from, to, page, limit };
  } else {
    body = { id: walletId, from, to, page, limit }
  }
  const response = yield apiGetTransactionWalletByDate(body);
  const { wallet, total, transactions } = response;

  if (total && transactions) {
    const newPayload: ITransactionsState = {
      walletId: !isEmpty(wallet) ? wallet.id : -1,
      tabLabel: tabLabel,
      fetching: false,
      limit: limit,
      total: total.total || 0,
      page: page,
      currentPage: page,
      income: total.income || 0,
      expense: total.expense || 0,
      items: transactions
    }
    yield put(onTransactionResponse(newPayload));
  } else {
    setTimeout(() => {
      Alert.alert('FETCH TRANSACTION ERROR', response.message);
    }, 200);
  }
}
function* updateTransactionAsync({ payload }: ReturnType<typeof onUpdateTransactionRequest>) {
  yield put(enableLoader())
  const response = yield apiUpdateTransaction(payload);
  const { transaction, wallets, transactions } = response;
  if (transaction) {
    yield put(onUpdateTransactionResponse(transaction, wallets, transactions));
    yield put(disableLoader());
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert('FETCH TRANSACTION ERROR', response.message);
    }, 200);
  }
}
function* deleteTransactionAsync({ payload, balanceWallet }: ReturnType<typeof onDeleteTransactionRequest>) {
  yield put(enableLoader())
  const response = yield apiDeleteTransaction({ id: payload.id, walletId: payload.walletId, type: payload.type, balance: payload.balance, balanceWallet });
  const { code, wallets, transactions } = response;
  if (code) {
    yield put(onDeleteTransactionResponse(payload, wallets, transactions));
    yield put(disableLoader());
  } else {
    yield put(disableLoader());
    setTimeout(() => {
      Alert.alert('FETCH TRANSACTION ERROR', response.message);
    }, 200);
  }
}

export const transactionSaga = [
  takeEvery(types.TRANSACTION_REQUEST, transactionAsync),
  takeEvery(types.UPDATE_TRANSACTION_REQUEST, updateTransactionAsync),
  takeEvery(types.DELETE_TRANSACTION_REQUEST, deleteTransactionAsync),
]
