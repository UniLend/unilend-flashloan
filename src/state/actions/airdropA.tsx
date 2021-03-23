import { ActionType } from "state/action-types";

interface _AirdropAction {
  type: ActionType.AIRDROP_ACTION;
}

interface AirdropSuccess {
  type: ActionType.AIRDROP_SUCCESS;
}

interface AirdropFailed {
  type: ActionType.AIRDROP_FAILED;
}

export type AirdropAction = _AirdropAction | AirdropSuccess | AirdropFailed;
