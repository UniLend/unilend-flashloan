import { ActionType } from "state/action-types";

interface _AirdropAction {
  type: ActionType.AIRDROP_ACTION;
}

interface AirdropSuccess {
  type: ActionType.AIRDROP_SUCCESS;
}

interface AirdropFailed {
  type: ActionType.AIRDROP_FAILED;
  message: string;
}

interface TransactionHash {
  type: ActionType.AIRDROP_TRANSACTION_HASH;
  payload: any;
}

export type AirdropAction =
  | _AirdropAction
  | AirdropSuccess
  | AirdropFailed
  | TransactionHash;
