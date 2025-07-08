export const SAGE_API_URL = 'https://www.promoplace.com/ws/ws.dll/ConnectAPI';

export const SAGE_API_VERSION = 130;

export const SAGE_AUTH = {
  acctId: process.env.SAGE_ACCT_ID!,
  loginId: process.env.SAGE_LOGIN_ID || '',
  key: process.env.SAGE_API_KEY!,
};

export const SAGE_SERVICE_IDS = {
    PRODUCT_SEARCH: 103,
    PRODUCT_DETAIL: 105,
  };