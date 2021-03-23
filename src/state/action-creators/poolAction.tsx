import { FlashloanLBCore } from "ethereum/contracts/FlashloanLB";
import { Dispatch } from "redux";
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
