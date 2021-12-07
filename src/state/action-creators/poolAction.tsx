import { defaultGasPrice } from 'ethereum/contracts'
import { ERC20, FlashloanLBCore } from 'ethereum/contracts/FlashloanLB'
import { Dispatch } from 'redux'
import { ActionType } from 'state/action-types'
import { PoolAction } from 'state/actions/PoolA'

export const createPool = (currentProvider: any, _reserve: string, address: string) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    dispatch({
      type: ActionType.IS_POOL_CREATION_LOADING,
      payload: true,
    })
    FlashloanLBCore(currentProvider)
      .methods.createPool(_reserve)
      .send({
        from: address,
        gasPrice: defaultGasPrice * 1e9,
      })
      .on('receipt', (res: any) => {
        dispatch({
          type: ActionType.IS_POOL_CREATED,
          payload: true,
        })
        dispatch({
          type: ActionType.IS_POOL_CREATION_LOADING,
          payload: false,
        })
      })
      .on('PoolCreated', (res: any) => {})
      .catch((e: any) => {
        console.log('Importing Failed')
        dispatch({
          type: ActionType.IS_POOL_CREATION_LOADING,
          payload: false,
        })
      })
  }
}
export const getPool = (address: any, currentProvider: any, accounts: any) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    dispatch({
      type: ActionType.GETTING_POOL,
    })
    FlashloanLBCore(currentProvider)
      .methods.Pools(address)
      .call((err: any, res: any) => {
        if (!err) {
          dispatch({
            type: ActionType.ASSERT_ADDRESS,
            payload: res,
          })
          if (res === '0x0000000000000000000000000000000000000000') {
            // alert("Pool not Created");
            dispatch({
              type: ActionType.IS_POOL_CREATED,
              payload: false,
            })
          } else {
            ERC20(currentProvider, res)
              .methods.symbol()
              .call((err: Error, res: any) => {
                if (!err && res) {
                  dispatch({
                    type: ActionType.POOL_TOKEN_NAME,
                    payload: res,
                  })
                  dispatch({
                    type: ActionType.IS_POOL_CREATED,
                    payload: true,
                  })
                } else {
                  dispatch({
                    type: ActionType.POOL_FAILED,
                  })
                }
              })
          }
        } else {
          dispatch({
            type: ActionType.POOL_FAILED,
          })
        }
      })
  }
}
export const handleImportAction = (searchedToken: any) => {
  return async (dispatch: Dispatch<PoolAction>) => {
    var a: any = []
    let storedArr = localStorage.getItem('sessionImportedToken')
    if (storedArr) {
      a = JSON.parse(storedArr) || []
      a.push(searchedToken)
    }
    // Alert the array value
    alert(a)
    localStorage.setItem('sessionImportedToken', JSON.stringify(a))
  }
}
