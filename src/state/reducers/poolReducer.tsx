import { ActionType } from "state/action-types";
import { PoolAction } from "state/actions/PoolA";

interface PoolState {
  poolName: any;
}

const initialState = {
  poolName: "uETH",
};

const PoolReducer = (state: PoolState = initialState, action: PoolAction) => {
  switch (action.type) {
    case ActionType.POOL_TOKEN_NAME:
      console.log(action);
      return { ...state, poolName: action.payload };
    default:
      return { ...state };
  }
};
export default PoolReducer;
