
export interface ITransactionRequestState {
  walletId: number,
  tabLabel: string,
  from: string,
  to: string,
  page: number,
  limit: number
}
export interface IUpdateTransactionRequest {
  id: number,
  balanceAdd: number,
  balanceMinus: number,
  balance: number,
  categoryId: number,
  walletId: number,
  walletFromId: number,
  walletToId: number,
  date: string,
  note: string,
  type: string
}
export interface ITransactionSateReq {
  payload: ITransactionRequestState;
}