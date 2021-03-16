import { ActionType } from "state/action-types";

interface CreatePoolSuccess {
  type: ActionType.CREATE_POOL_SUCCESS;
}

export type PoolAction = CreatePoolSuccess;
