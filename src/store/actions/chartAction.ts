import * as types from './types';
import { USER } from '../models/index';
import { IChartStateRequest } from '@store/models/actions/chart';
import { ChartInMonth } from '@store/models/reducers/chart';

export function onCharttAllWalletByMonthRequest(payload: IChartStateRequest) {
  return {
    type: types.CHART_ALL_WALLET_BY_MONTH_REQUEST,
    payload,
  };
}

export function onChartAllWalletByMonthResponse(payload: ChartInMonth) {
  return {
    type: types.CHART_ALL_WALLET_BY_MONTH_RESPONSE,
    payload
  };
}
