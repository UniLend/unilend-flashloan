import { ERC20, FlashloanLBCore } from "ethereum/contracts/FlashloanLB";
import { Dispatch } from "redux";
import { ActionType } from "state/action-types";
import { PoolAction } from "state/actions/PoolA";

export const createPool = (
  currentProvider: any,
  _reserve: string,
  address: string,
  searchedToken: any
) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    FlashloanLBCore(currentProvider)
      .methods.createPool(_reserve)
      .send({
        from: address,
      })
      .on("receipt", (res: any) => {})
      .on("PoolCreated", (res: any) => {
        console.log(res);
      })
      .catch((e: any) => console.log("Importing Failed"));
  };
};
export const getPool = (address: any, currentProvider: any, accounts: any) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    dispatch({
      type: ActionType.GETTING_POOL,
    });
    FlashloanLBCore(currentProvider)
      .methods.getPool(address)
      .call((err: any, res: any) => {
        if (!err) {
          console.log("asset", res);
          dispatch({
            type: ActionType.ASSERT_ADDRESS,
            payload: res,
          });
          if (res === "0x0000000000000000000000000000000000000000") {
            console.log("Pool not Created");
          } else {
            ERC20(currentProvider, res)
              .methods.symbol()
              .call((err: Error, res: any) => {
                if (!err && res) {
                  console.log(res);
                  dispatch({
                    type: ActionType.POOL_TOKEN_NAME,
                    payload: res,
                  });
                } else {
                  dispatch({
                    type: ActionType.POOL_FAILED,
                  });
                }
              });
          }
        } else {
          dispatch({
            type: ActionType.POOL_FAILED,
          });
        }
      });
  };
};
export const handleImportAction = (searchedToken: any) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    var a: any = [];
    let storedArr = localStorage.getItem("sessionImportedToken");
    if (storedArr) {
      a = JSON.parse(storedArr) || [];
      a.push(searchedToken);
    }
    // Alert the array value
    alert(a);
    localStorage.setItem("sessionImportedToken", JSON.stringify(a));
  };
};
