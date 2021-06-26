export enum ActionType {
  // settings
  CURRENT_THEME = "CURRENT_THEME",
  CURRENT_PROVIDER = "CURRENT_PROVIDER",
  SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
  SELECTED_NETWORK_ID = "SELECTED_NETWORK_ID",
  ACTIVE_CURRENCY = "ACTIVE_CURRENCY",

  RECIEPENT_ADDRESS = "RECIEPENT_ADDRESS",

  // deposit
  DEPOSIT_APPROVAL_STATUS = "DEPOSIT_APPROVAL_STATUS",
  DEPOSIT_ACTION = "DEPOSIT_ACTION",
  DEPOSIT_SUCCESS = "DEPOSIT_SUCCESS",
  DEPOSIT_FAILED = "DEPOSIT_FAILED",
  DEPOSIT_STATUS = "DEPOSIT_STATUS",
  DEPOSIT_AMOUNT = "DEPOSIT_AMOUNT",
  DEPOSIT_ALLOWANCE_ACTION = "DEPOSIT_ALLOWANCE_ACTION",
  DEPOSIT_ALLOWANCE_SUCCESS = "DEPOSIT_ALLOWANCE_SUCCESS",
  DEPOSIT_ALLOWANCE_FAILED = "DEPOSIT_ALLOWANCE_FAILED",
  DEPOSIT_APPROVE_ACTION = "DEPOSIT_APPROVE_ACTION",
  DEPOSIT_APPROVE_SUCCESS = "DEPOSIT_APPROVE_SUCCESS",
  DEPOSIT_APPROVE_FAILED = "DEPOSIT_APPROVE_FAILED",
  DEPOSIT_MESSAGE_CLEAR = "DEPOSIT_MESSAGE_CLEAR",
  DEPOSIT_TRANSACTION_HASH = "DEPOSIT_TRANSACTION_HASH",

  //donate
  DONATE_APPROVAL_STATUS = "DONATE_APPROVAL_STATUS",
  DONATE_ACTION = "DONATE_ACTION",
  DONATE_SUCCESS = "DONATE_SUCCESS",
  DONATE_FAILED = "DONATE_FAILED",
  GET_DONATION_CONTRACT = "GET_DONATION_CONTRACT",
  DONATE_ALLOWANCE_ACTION = "DONATE_ALLOWANCE_ACTION",
  DONATE_ALLOWANCE_SUCCESS = "DONATE_ALLOWANCE_SUCCESS",
  DONATE_ALLOWANCE_FAILED = "DONATE_ALLOWANCE_FAILED",
  DONATE_APPROVE_ACTION = "DONATE_APPROVE_ACTION",
  DONATE_APPROVE_SUCCESS = "DONATE_APPROVE_SUCCESS",
  DONATE_APPROVE_FAILED = "DONATE_APPROVE_FAILED",
  DONATE_MESSAGE_CLEAR = "DONATE_MESSAGE_CLEAR",
  DONATE_TRANSACTION_HASH = "DONATE_TRANSACTION_HASH",

  // connect wallet
  CONNECT_WALLET = "CONNECT_WALLET",
  CONNECT_WALLET_ERROR = "CONNECT_WALLET_ERROR",
  CONNECT_WALLET_SUCCESS = "CONNECT_WALLET_SUCCESS",
  ACCOUNT_BALANCE_SUCCESS = "ACCOUNT_BALANCE_SUCCESS",
  ACCOUNT_BALANCE_ACTION = "ACCOUNT_BALANCE_ACTION",
  ACCOUNT_BALANCE_FAILED = "ACCOUNT_BALANCE_FAILED",
  USER_TOKEN_BALANCE_SUCCESS = "USER_TOKEN_BALANCE_SUCCESS",
  USER_TOKEN_BALANCE_ACTION = "USER_TOKEN_BALANCE_ACTION",
  USER_TOKEN_BALANCE_FAILED = "USER_TOKEN_BALANCE_FAILED",
  POOL_TOKEN_BALANCE_ACTION = "POOL_TOKEN_BALANCE_ACTION",
  POOL_TOKEN_BALANCE_SUCCESS = "POOL_TOKEN_BALANCE_SUCCESS",
  POOL_TOKEN_BALANCE_FAILED = "POOL_TOKEN_BALANCE_FAILED",
  POOL_LIQUIDITY_ACTION = "POOL_LIQUIDITY_ACTION",
  POOL_LIQUIDITY_SUCCESS = "POOL_LIQUIDITY_SUCCESS",
  POOL_LIQUIDITY_FAILED = "POOL_LIQUIDITY_FAILED",
  REWARD_POOL_BALANCE_ACTION = "REWARD_POOL_BALANCE_ACTION",
  REWARD_POOL_BALANCE_SUCCESS = "REWARD_POOL_BALANCE_SUCCESS",
  REWARD_POOL_BALANCE_FAILED = "REWARD_POOL_BALANCE_FAILED",
  REWARD_RELEASE_RATE_ACTION = "REWARD_RELEASE_RATE_ACTION",
  REWARD_RELEASE_RATE_SUCCESS = "REWARD_RELEASE_RATE_SUCCESS",
  REWARD_RELEASE_RATE_FAILED = "REWARD_RELEASE_RATE_FAILED",
  FULL_POOL_U_TOKEN_BALANCE = "FULL_POOL_U_TOKEN_BALANCE",
  WALLET_DISCONNECT = "WALLET_DISCONNECT",
  ACTIVE_NETWORK = "ACTIVE_NETWORK",
  CURRENT_APY_ACTION = "CURRENT_APY_ACTION",
  CURRENT_APY_SUCCESS = "CURRENT_APY_SUCCESS",
  CURRENT_APY_FAILED = "CURRENT_APY_FAILED",

  TOTAL_TOKENS_IN_REWARD_POOL_ACTION = "TOTAL_TOKENS_IN_REWARD_POOL_ACTION",
  TOTAL_TOKENS_IN_REWARD_POOL_SUCCESS = "TOTAL_TOKENS_IN_REWARD_POOL_SUCCESS",
  TOTAL_TOKENS_IN_REWARD_POOL_FAILED = "TOTAL_TOKENS_IN_REWARD_POOL_FAILED",

  TOTAL_DEPOSITION_TOKENS_ACTION = "TOTAL_DEPOSITION_TOKENS_ACTION",
  TOTAL_DEPOSITION_TOKENS_SUCCESS = "TOTAL_DEPOSITION_TOKENS_SUCCESS",
  TOTAL_DEPOSITION_TOKENS_FAILED = "TOTAL_DEPOSITION_TOKENS_FAILED",

  FULL_AMOUNT_BALANCE = "FULL_AMOUNT_BALANCE",
  FULL_USER_TOKEN_BALANCE = "FULL_USER_TOKEN_BALANCE",
  FULL_POOL_TOKEN_BALANCE = "FULL_POOL_TOKEN_BALANCE",
  CONNECTED_WALLET = "CONNECTED_WALLET",
  BALANCE_RESET = "BALANCE_RESET",

  //redeem
  REDEEM_ACTION = "REDEEM_ACTION",
  REDEEM_SUCCESS = "REDEEM_SUCCESS",
  REDEEM_FAILED = "REDEEM_FAILED",
  REDEEM_TOKEN_BALANCE = "REDEEM_TOKEN_BALANCE",
  REDEEM_TRANSACTION_HASH = "REDEEM_TRANSACTION_HASH",
  REDEEM_MESSAGE_CLEAR = "REDEEM_MESSAGE_CLEAR",

  //pool
  CREATE_POOL_SUCCESS = "CREATE_POOL_SUCCESS",
  GETTING_POOL = "GETTING_POOL",
  POOL_SUCCESS = "POOL_SUCCESS",
  POOL_FAILED = "POOL_FAILED",
  POOL_TOKEN_NAME = "POOL_TOKEN_NAME",
  ASSERT_ADDRESS = "ASSERT_ADDRESS",
  IS_POOL_CREATED = "IS_POOL_CREATED",
  IS_POOL_CREATION_LOADING = "IS_POOL_CREATION_LOADING",

  //airdrop
  AIRDROP_ACTION = "AIRDROP_ACTION",
  AIRDROP_SUCCESS = "AIRDROP_SUCCESS",
  AIRDROP_FAILED = "AIRDROP_FAILED",
  AIRDROP_TRANSACTION_HASH = "AIRDROP_TRANSACTION_HASH",
  AIRDROP_MESSAGE_CLEAR = "AIRDROP_MESSAGE_CLEAR",

  //token
  TOKEN_DETAIL = "TOKEN_DETAIL",
  GET_TOKEN_LIST_REQUEST = "GET_TOKEN_LIST_REQUEST",
  GET_TOKEN_LIST = "GET_TOKEN_LIST",
  TOKEN_LIST_TOGGLE = "TOKEN_LIST_TOGGLE",
  SET_SEARCHED_TOKEN = "SET_SEARCHED_TOKEN",
  SET_TOKEN_PERSIST = "SET_TOKEN_PERSIST",
  SET_CUSTOM_TOKENS = "SET_CUSTOM_TOKENS",
  SET_CUSTOM_TOKEN_PERSIST = "SET_CUSTOM_TOKEN_PERSIST",
}
