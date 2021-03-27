import { Reciepent } from "ethereum/contracts";
import { ActionType } from "state/action-types";
import { EthereumAction } from "state/actions/ethereumA";

interface EthereumState {
  receipentAddress: string;
}

const initialState = {
  receipentAddress: Reciepent,
};

const EthereumReducer = (
  state: EthereumState = initialState,
  action: EthereumAction
) => {
  switch (action.type) {
    case ActionType.RECIEPENT_ADDRESS:
      return { ...state, receipentAddress: action.payload };
    default:
      return { ...state };
  }
};

export default EthereumReducer;
