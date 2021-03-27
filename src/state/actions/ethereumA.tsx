import { ActionType } from "state/action-types";

interface ReciepentAddress {
  type: ActionType.RECIEPENT_ADDRESS;
  payload: string;
}

export type EthereumAction = ReciepentAddress;
