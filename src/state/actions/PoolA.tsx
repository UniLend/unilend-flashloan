import { ActionType } from "state/action-types";

interface CreatePoolSuccess {
  type: ActionType.CREATE_POOL_SUCCESS;
}

interface GettingPool {
  type: ActionType.GETTING_POOL;
}

interface PoolSuccess {
  type: ActionType.POOL_SUCCESS;
}

interface PoolFailed {
  type: ActionType.POOL_FAILED;
}
interface PoolTokenName {
  type: ActionType.POOL_TOKEN_NAME;
  payload: any;
}

interface AssetAddress {
  type: ActionType.ASSERT_ADDRESS;
  payload: any;
}

interface PoolCreationLoading {
  type: ActionType.IS_POOL_CREATION_LOADING;
  payload: any;
}

interface PoolCreatedToggle {
  type: ActionType.IS_POOL_CREATED;
  payload: any;
}

export type PoolAction =
  | CreatePoolSuccess
  | GettingPool
  | PoolSuccess
  | PoolFailed
  | PoolTokenName
  | AssetAddress
  | PoolCreatedToggle
  | PoolCreationLoading;
