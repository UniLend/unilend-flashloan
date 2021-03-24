import { ActionType } from "state/action-types";

interface CreatePoolSuccess {
  type: ActionType.CREATE_POOL_SUCCESS;
}

interface PoolTokenName {
  type: ActionType.POOL_TOKEN_NAME;
  payload: any;
}

export type PoolAction = CreatePoolSuccess | PoolTokenName;
