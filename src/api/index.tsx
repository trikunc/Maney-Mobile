import { getToken } from "../utils/store/Store";

/*** MUST-CONFIG ***/
// export const SERVER_ADDRESS = "http://localhost:3000"; // emulator
export const SERVER_ADDRESS = "http://167.172.89.97:3000"; // expo go (real device)

export const BEARER = "Bearer";
export const API_ENDPOINT = SERVER_ADDRESS + "/api/";

const getParam = (method: string, data: any, token = null) => {
  return {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${BEARER} ${token}`,
    },
    body: data && JSON.stringify(data),
  };
};

const getParamFile = (method: string, data: any, token = null) => {
  return {
    method: method,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${BEARER} ${token}`,
    },
    body: data,
  };
};

/**
 * Send request
 */
export async function request(
  endpoint: string,
  method: string,
  body: any,
  navigate_token: any
) {
  try {
    const token = navigate_token !==null ? navigate_token : (await getToken());
    console.log('==API_ENDPOINT==', API_ENDPOINT + endpoint);
    let response = await fetch(
      API_ENDPOINT + endpoint,
      getParam(method, body, token)
    );

    console.log("REQUEST", method + " : " + API_ENDPOINT + endpoint);
    let data = await response.json();
    return handleError(data);
  } catch (error) {
    throw error;
  }
}

/**
 * Send request file
 */
export async function requestFile(
  endpoint: string,
  method: string,
  body: any,
  navigate_token: any
) {
  try {
    const token = navigate_token || (await getToken());
    let response = await fetch(
      API_ENDPOINT + endpoint,
      getParamFile(method, body, token)
    );
    let data = await response.json();
    return handleError(data);
  } catch (error) {
    throw error;
  }
}

/**
 * Handle error
 */
const handleError = (response: any) => {
  const status = response && response.status;
  if (!status) {
    throw {
      message: response.message,
      code: response.code,
    };
  } else {
    return response.result;
  }
};

// Login
export const apiSignIn = (body: any) => {
  return request("user/login", "POST", body, null);
};

// Get user by token
export const apiGetUserByToken = () => {
  return request("user/get/token", "GET", null, null);
};

// create wallet
export const apiCreateWallet = (body: any) => {
  return request("wallet/create", "POST", body, null);
};

// get list wallet
export const apiGetWallets = ({ page = 0, limit = 100 }) => {
  return request(`wallet/list/${page}/${limit}`, "GET", null, null);
};
//update wallet
/*
 */
export const apiUpdateWallet = (body: any) => {
  return request("wallet/update", "PUT", body, null);
};
//delete wallet
/*
 */
export const apiDeleteWallet = (body: any) => {
  return request("wallet/delete", "DELETE", body, null);
};
// create transaction
export const apiCreateTransaction = (body: any) => {
  return request("transaction/create", "POST", body, null);
};

// get list transaction
export const apiGetTransactions = ({ page = 0, limit = 100 }) => {
  return request(`transaction/list/${page}/${limit}`, "GET", null, null);
};

// TODO: (remove)
// get list transaction by date
// export const apiGetTransactionByDate = (body: any) => {
//   return request('transaction/list_by_date', 'POST', body, null);
// };

// get dashboard data (wallets & latest transaction)
export const apiGetDashboardInformation = () => {
  return request("user/dashboard", "GET", null, null);
};

// get list transaction by month
export const apiGetTransactionByMonth = ({
  year = "2020",
  month = "01",
  page = 0,
  limit = 100,
}) => {
  return request(
    `transaction/list/${year}/${month}/${page}/${limit}`,
    "GET",
    null,
    null
  );
};

export const apiGetTransactionWalletByMonth = ({
  walletId = 1,
  year = "2020",
  month = "01",
  page = 0,
  limit = 100,
}) => {
  return request(
    `wallet/get/${walletId}/transactions/${year}/${month}/${page}/${limit}`,
    "GET",
    null,
    null
  );
};
//Wallet git list transaction by Date
export const apiGetTransactionWalletByDate = (body: any) => {
  return request(`wallet/get_transactions_by_date`, "POST", body, null);
};
//update wallet
/*
 */
export const apiUpdateTransaction = (body: any) => {
  return request("transaction/update", "PUT", body, null);
};
//delete wallet
/*
 */
export const apiDeleteTransaction = (body: any) => {
  return request("transaction/delete", "DELETE", body, null);
};

//update currency
/*
 */
export const apiUpdateCurrency = (body: any) => {
  return request("user/currency/update", "PUT", body, null);
};

/*
 *Chart get transaction all wallet
 */
export const apiChartGetTransactionAllWallet = ({
  year = "2020",
  month = "01",
}) => {
  return request(`transaction/chart/${year}/${month}`, "GET", null, null);
};

/*
 *Chart get transaction all wallet
 */
export const apiChartGetTransactionByWallet = ({
  walletId = 1,
  year = "2020",
  month = "01",
}) => {
  return request(
    `wallet/chart/${walletId}/transaction/${year}/${month}`,
    "GET",
    null,
    null
  );
};

/*
 *Chart get transaction all wallet
 */
export const apiDetailChartGetAllWallet = ({ year = "2020", month = "01" }) => {
  return request(
    `transaction/detail_chart/${year}/${month}`,
    "GET",
    null,
    null
  );
};

/*
 *Chart get for one wallet
 */
export const apiDetailChartGetOneWallet = ({
  walletId = -1,
  year = "2020",
  month = "01",
}) => {
  if (walletId == -1) {
    return request(
      `transaction/detail_chart/${year}/${month}`,
      "GET",
      null,
      null
    );
  }
  return request(
    `transaction/detail_chart/${walletId}/${year}/${month}`,
    "GET",
    null,
    null
  );
};
