import { ActionType } from "../action-types";

interface ConnectWalletAction {
  type: ActionType.CONNECT_WALLET;
}

interface ConnectWalletSuccessAction {
  type: ActionType.CONNECT_WALLET_SUCCESS;
  payload: string[];
}

interface ConnectWalletErrorAction {
  type: ActionType.CONNECT_WALLET_ERROR;
  payload: string;
}

export type Action =
  | ConnectWalletAction
  | ConnectWalletSuccessAction
  | ConnectWalletErrorAction;
