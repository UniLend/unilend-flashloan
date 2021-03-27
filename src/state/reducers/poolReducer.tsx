import { ActionType } from "state/action-types";
import { PoolAction } from "state/actions/PoolA";

interface PoolState {
  poolName: any;
  assertAddress: any;
  poolLoading: boolean;
  poolError: any;
}

const initialState = {
  poolName: "ETH",
  assertAddress: "0xCdcBBa97476cDb0897edA2E8f64597D3D725d06A",
  poolLoading: false,
  poolError: null,
};

const PoolReducer = (state: PoolState = initialState, action: PoolAction) => {
  switch (action.type) {
    case ActionType.GETTING_POOL:
      return { ...state, poolLoading: true };
    case ActionType.POOL_TOKEN_NAME:
      return { ...state, poolName: action.payload, poolLoading: false };
    case ActionType.POOL_FAILED:
      return { ...state, poolLoading: false, poolError: "Pool Failed" };
    case ActionType.ASSERT_ADDRESS:
      return { ...state, assertAddress: action.payload };
    default:
      return { ...state };
  }
};
export default PoolReducer;
