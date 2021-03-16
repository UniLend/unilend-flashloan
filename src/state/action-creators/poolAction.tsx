import { FlashloanLBCore } from "ethereum/contracts/FlashloanLB";
import { Dispatch } from "redux";
import { PoolAction } from "state/actions/PoolA";

export const createPool = (
  currentProvider: any,
  _reserve: string,
  address: string
) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    FlashloanLBCore(currentProvider).methods.createPool(_reserve).send({
      from: address,
    });
  };
};
