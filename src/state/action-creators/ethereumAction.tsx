import { EthereumAction } from "state/actions/ethereumA";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";

export const handleReciepent = (address: string) => {
  return async (dispatch: Dispatch<EthereumAction>) => {
    dispatch({
      type: ActionType.RECIEPENT_ADDRESS,
      payload: address,
    });
  };
};
