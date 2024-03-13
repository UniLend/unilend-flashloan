import { Wallet } from 'components/Helpers/Types'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import useWalletConnect from 'hooks/useWalletConnect'
import { FC, useEffect, useState } from 'react'
// import { depositApprove } from "state/action-creators";
import ConnectWalletModal from '../UI/ConnectWalletModal'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { fetchSigner } from 'wagmi/dist/actions'
import { checkTxnStatus, fixed2Decimals, getEtherContract } from 'state/action-creators'
import { erc20ABI } from 'wagmi'
import { UnilendFlashLoanCoreContract } from 'ethereum/contracts'
import { web3Service } from 'ethereum/web3Service'
import { useDispatch } from 'react-redux'
import { ActionType } from 'state/action-types'

interface Props {
  isEth: boolean
  decimal: any
  amount: string
  actionName: string
  handleAmount: Function
  isChecked: boolean
}

interface WalletConnectModal {
  show: boolean
}

// interface TransModalInfo {
//   show: boolean;
// }

const MainButton: FC<Props> = ({ isEth, amount, actionName, handleAmount, decimal, isChecked }) => {
  const [walletModalInfo, setWalletModalInfo] = useState<WalletConnectModal>({
    show: false,
  })

  const decimalLength = amount && amount.toString().split('.')[1] && amount.toString().split('.')[1].length

  const {
    walletConnected,
    accounts: address,
    currentProvider,
    poolTokenBalance,
    // userTokenBalance,
    fullUserTokenBalance,
    fullPoolTokenBalance,
    accountBalance,
    selectedNetworkId,
    fullPoolUTokenBalance,
    handleWalletConnect,
  } = useWalletConnect()

  const {
    isDepositApproved,
    depositLoading,
    // depositErrorMessage,
    depositAllowanceLoading,
    depositIsApproving,
  } = useTypedSelector((state) => state.deposit)

  const { donateIsApproved, donateContractAddress, donateLoading, donateAllowanceLoading, donateApproving } =
    useTypedSelector((state) => state.donate)

  const { airdropLoading } = useTypedSelector((state) => state.airdrop)

  const { redeemLoading } = useTypedSelector((state) => state.redeem)

  const { receipentAddress } = useTypedSelector((state) => state.ethereum)

  const { assertAddress, isPoolCreated, isPoolCreationLoading } = useTypedSelector((state) => state.pool)

  const { activeTab, activeCurrency } = useTypedSelector((state) => state.settings)

  const dispatch = useDispatch()

  const {
    depositApprove,
    donateApprove,
    getAccountBalance,
    getPoolTokenBalance,
    getUserTokenBalance,
    createPool,
    // clearDepositError,
  } = useActions()

  const handleTokenBalance = () => {
    if (address.length && currentProvider) {
      getAccountBalance(address[0], currentProvider)
      getUserTokenBalance(currentProvider, address[0], receipentAddress, assertAddress, decimal)
      getPoolTokenBalance(currentProvider, address[0], assertAddress, receipentAddress, decimal, selectedNetworkId)
    }
  }

  const handleApproval = async (
    currentProvider: any,
    address: any,
    receipentAddress: string,
    selectedNetworkId: any,
    amount: any,
    decimal: any,
  ) => {
    dispatch({
      type: ActionType.DEPOSIT_APPROVE_ACTION,
    })
    let signer = await fetchSigner()
    let interval = null

    if (!signer) {
      setTimeout(async () => {
        signer = await fetchSigner()
      }, 100)
    }

    const erc20 = await getEtherContract(receipentAddress, erc20ABI, signer)
    const Amount = web3Service.getValue(null, null, amount, decimal)

    localStorage.setItem('isApproving', 'true')
    dispatch({
      type: ActionType.DEPOSIT_APPROVAL_STATUS,
      payload: false,
    })
    const { hash } = await erc20.approve(UnilendFlashLoanCoreContract(currentProvider, selectedNetworkId), Amount)

    if (hash) {
      setTimeout(() => {
        dispatch({
          type: ActionType.DEPOSIT_APPROVE_SUCCESS,
        })
      }, 5000)
    }
  }

  useEffect(() => {
    handleTokenBalance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositLoading, donateLoading, redeemLoading, airdropLoading, currentProvider, address])

  const handleCreatePool = () => {
    createPool(currentProvider, activeCurrency.address, address[0])
  }

  function handleMainButton() {
    if (
      address &&
      address.length &&
      walletConnected &&
      (activeCurrency.symbol === 'Select Token' || isPoolCreated) &&
      (activeCurrency.symbol === 'Select Token' ||
        activeCurrency.symbol === 'ETH' ||
        depositAllowanceLoading ||
        donateAllowanceLoading ||
        (actionName === 'Deposit' && isDepositApproved === true) ||
        (actionName === 'Reward' && donateIsApproved === true) ||
        (actionName !== 'Deposit' && actionName !== 'Reward'))
    ) {
      return (
        <>
          <button
            // disabled={
            //   amount === "" ||
            //   activeCurrency.symbol === "Select Token" ||
            //   depositLoading ||
            //   donateLoading ||
            //   redeemLoading ||
            //   airdropLoading ||
            //   depositAllowanceLoading ||
            //   donateAllowanceLoading ||
            //   !isChecked ||
            //   (activeTab === "redeem" && poolTokenBalance === 0)
            // }
            disabled={
              amount === '' ||
              parseFloat(amount) <= 0 ||
              // parseFloat(amount) + poolTokenBalance >= 1_000_000 ||
              activeCurrency.symbol === 'Select Token' ||
              depositLoading ||
              donateLoading ||
              redeemLoading ||
              airdropLoading ||
              depositAllowanceLoading ||
              donateAllowanceLoading ||
              (activeTab === 'redeem' && fullPoolUTokenBalance === '') ||
              (activeTab === 'reward' && (!isChecked || parseFloat(amount) > parseFloat(fullUserTokenBalance))) ||
              (activeTab === 'lend' && parseFloat(amount) > parseFloat(fullUserTokenBalance)) ||
              (activeTab === 'airdrop' && (!isChecked || parseFloat(amount) > parseFloat(fullUserTokenBalance))) ||
              (activeTab === 'redeem' &&
                (poolTokenBalance === 0 || parseFloat(amount) > parseFloat(fullPoolTokenBalance))) ||
              +decimalLength > 18
            }
            className="btn btn-lg btn-custom-primary"
            onClick={() => handleAmount()}
            type="button"
          >
            <div>
              {actionName}
              {(depositLoading ||
                donateLoading ||
                redeemLoading ||
                airdropLoading ||
                depositAllowanceLoading ||
                donateAllowanceLoading) && (
                <div className="spinner-border approve-loader" role="status">
                  <span className="sr-only">Approving...</span>
                </div>
              )}
            </div>
          </button>
        </>
      )
    } else if (
      address &&
      address.length &&
      walletConnected &&
      (activeCurrency.symbol === 'Select Token' || isPoolCreated) &&
      !depositAllowanceLoading &&
      !donateAllowanceLoading &&
      ((activeCurrency.symbol !== 'Select Token' &&
        actionName === 'Deposit' &&
        (isDepositApproved === false || isDepositApproved === undefined)) ||
        activeCurrency.symbol === 'ETH' ||
        (actionName === 'Reward' && (donateIsApproved === false || donateIsApproved === undefined))) &&
      (actionName === 'Deposit' || actionName === 'Reward')
    ) {
      return (
        <button
          disabled={
            (actionName === 'Deposit' && depositIsApproving === true) ||
            (actionName === 'Reward' && donateApproving === true) ||
            parseFloat(accountBalance) <= 0 ||
            +decimalLength > 18
          }
          className="btn btn-lg btn-custom-primary"
          onClick={() => {
            if (actionName === 'Deposit') {
              handleApproval(currentProvider, address[0], receipentAddress, selectedNetworkId, amount, decimal)
            } else if (actionName === 'Reward') {
              donateApprove(currentProvider, address[0], donateContractAddress, receipentAddress)
            }
          }}
          type="button"
        >
          {(actionName === 'Deposit' && depositIsApproving === true) ||
          (actionName === 'Reward' && donateApproving === true) ? (
            <div>
              Approving
              <div className="spinner-border approve-loader" role="status">
                <span className="sr-only">Approving...</span>
              </div>
            </div>
          ) : (
            'Approve'
          )}
        </button>
      )
    } else if (
      address &&
      address.length &&
      walletConnected &&
      !isPoolCreated &&
      activeCurrency.symbol !== 'Select Token'
    ) {
      return (
        <button disabled={isPoolCreationLoading} className="btn btn-lg btn-custom-primary" onClick={handleCreatePool}>
          {isPoolCreationLoading ? (
            <div>
              Creating Pool
              <div className="spinner-border approve-loader" role="status">
                <span className="sr-only">Creating Pool...</span>
              </div>
            </div>
          ) : (
            'Create pool'
          )}
        </button>
      )
    } else {
      return (
        // <button disabled={+decimalLength > 18} className="btn btn-lg btn-custom-primary" onClick={walletConnect}>
        //   Connect Wallet
        // </button>
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
            const ready = mounted
            const connected = ready && account && chain

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        disabled={+decimalLength > 18}
                        className="btn btn-lg btn-custom-primary"
                        onClick={openConnectModal}
                      >
                        Connect Wallet
                      </button>
                    )
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    )
                  }

                  return
                })()}
              </div>
            )
          }}
        </ConnectButton.Custom>
      )
    }
  }

  function walletConnect() {
    setWalletModalInfo({
      show: true,
    })
  }

  // function handleTransClose() {
  //   setTransModalInfo({
  //     show: false,
  //   });
  // }

  // function handleAlertClose() {
  //   switch (actionName) {
  //     case "Deposit":
  //       clearDepositError();
  //       break;
  //   }
  // }

  return (
    <>
      <div className="d-grid py-3">{handleMainButton()}</div>

      {walletModalInfo.show && !walletConnected && (
        <ConnectWalletModal
          handleClose={() => setWalletModalInfo({ show: false })}
          handleWalletConnect={(wallet: Wallet) => handleWalletConnect(wallet)}
        />
      )}
      {/* {depositErrorMessage !== "" && (
        <Alert variant="danger" onClose={handleAlertClose} dismissible>
          {depositErrorMessage}
        </Alert>
      )} */}
    </>
  )
}

export default MainButton
