/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react'
import useWalletConnect from 'hooks/useWalletConnect'
import ContentCard from '../UI/ContentCard/ContentCard'
import FieldCard from '../UI/FieldsCard/FieldCard'
import { capitalize, toFixed } from 'components/Helpers'
import CurrencySelectModel from '../UI/CurrencySelectModel/CurrencySelectModel'
import { useActions } from 'hooks/useActions'
import MainButton from '../MainButton'
// import ConnectWalletModal from "../UI/ConnectWalletModal";
import { useTypedSelector } from 'hooks/useTypedSelector'
import TransactionPopup from '../UI/TransactionLoaderPopup/TransactionLoader'
import AlertToast from '../UI/AlertToast/AlertToast'
import { RouteComponentProps, withRouter } from 'react-router'
import { RiskApproval } from './RiskApproval'
import { useLocation } from 'react-router-dom'
import { NETWORKS } from 'components/constants'
import cantFind from 'assets/cantFind.svg'
import { setTimeout } from 'timers'
import { FlashLoanCore } from 'ethereum/contracts/FlashloanLB'
const message = 'Stay updated about the launch of our new Versions, UniLend V2'
interface Props extends RouteComponentProps<any> {
  activeTab: string | null
}

interface ModalType {
  show: boolean
}

interface AlertType {
  show: boolean
}

const CommonCard: FC<Props> = (props) => {
  const { activeTab } = props
  // const dispatch = useDispatch();
  const [redeemMax, setRedeemMax] = useState<boolean>(false)
  const [amount, setAmount] = useState<string>('')
  const [modalInfo, setModalInfo] = useState<ModalType>({
    show: false,
  })
  const [alertInfo, setAlertInfo] = useState<AlertType>({
    show: false,
  })
  const [progressValue, setProgressValue] = useState<Number>(100)
  const [depositChecked, setDepositChecked] = useState<boolean>(false)
  const [transModalInfo, setTransModalInfo] = useState<boolean>(false)
  const [poolPercentage, setPoolPercentage] = useState<any>('')

  const {
    accounts,
    walletConnected,
    currentProvider,
    userTokenBalance,
    poolTokenBalance,
    poolLiquidity,
    rewardPoolBalance,
    rewardReleaseRate,
    activeNetWork,
    networkId,
    currentApy,
    accountBalance,
    totalDepositedTokens,
    totalTokensInRewardPool,
    walletProvider,
    selectedNetworkId,
    connectedWallet,
    fullPoolUTokenBalance,
    currentApyLoading,
    poolLiquidityLoading,
    poolTokenBalanceLoading,
    rewardPoolBalanceLoading,
    rewardReleaseRateLoading,
    getUserTokenBalance,
    getPoolLiquidity,
    handleWalletConnect,
  } = useWalletConnect()

  const {
    handleDeposit,
    handleRedeem,
    handleDonate,
    checkAllowance,
    donateAllowance,
    fetchTokenList,
    getPool,
    getPoolTokenBalance,
    handleAirdrop,
    getAccountBalance,
    handleReciepent,
    setActiveCurrency,
    getDonationContract,
    getRewardPoolBalance,
    getCurrentAPY,
    getRewardReleaseRatePerDay,
    balanceReset,
    networkSwitchHandling,
    getTotalDepositedTokens,
    getTotalTokensInRewardPool,
    getPooluTokenBalance,
    clearDepositError,
    clearDonateError,
    clearRedeemError,
    clearAirdropError,
    setParams,
    setSelectedNetworkId,
    setDepositSuccess,
    setDonateSuccess,
    setRedeemSuccess,
    setAirdropSuccess,
  } = useActions()
  const {
    isDepositApproved: isApproved,
    isDepositSuccess,
    depositErrorMessage,
    depositSuccessMessage,
    depositTransactionHashRecieved,
    depositTransactionHash,
  } = useTypedSelector((state) => state.deposit)

  const { activeCurrency, params } = useTypedSelector((state) => state.settings)
  const {
    donateContractAddress,
    donateIsApproved,
    donateSuccess,
    donateErrorMessage,
    donateSuccessMessage,
    donateTransactionHashRecieved,
    donateTransactionHash,
  } = useTypedSelector((state) => state.donate)
  const {
    redeemSuccess,
    redeemErrorMessage,
    redeemTransactionHashReceived,
    redeemSuccessMessage,
    redeemTransactionHash,
  } = useTypedSelector((state) => state.redeem)
  const {
    airdropSuccess,
    airdropTransactionHashReceived,
    airdropErrorMessage,
    airdropSuccessMessage,
    airdropTransactionHash,
  } = useTypedSelector((state) => state.airdrop)
  const { tokenGroupList, tokenList, customTokens } = useTypedSelector((state) => state.tokenManage)
  const { receipentAddress } = useTypedSelector((state) => state.ethereum)
  const { assertAddress, isPoolCreated } = useTypedSelector((state) => state.pool)
  const { flashLoanContract } = useTypedSelector((state) => state.connectWallet)

  const handleTokenBalance = () => {
    if (accounts.length && currentProvider) getAccountBalance(accounts[0], currentProvider, selectedNetworkId)
    if (accounts.length && currentProvider && activeCurrency.symbol !== 'Select Token') {
      getPooluTokenBalance(
        currentProvider,
        accounts[0],
        activeCurrency.address,
        activeCurrency.decimals,
        selectedNetworkId,
      )
      if (activeCurrency.symbol !== 'Select Token')
        getPoolTokenBalance(
          currentProvider,
          accounts[0],
          assertAddress,
          activeCurrency.address,
          activeCurrency.decimals,
          selectedNetworkId,
        )
      if (activeCurrency.symbol !== 'Select Token')
        getUserTokenBalance(
          currentProvider,
          accounts[0],
          activeCurrency.address,
          assertAddress,
          activeCurrency.decimals,
        )
    }
    if (activeCurrency.symbol !== 'Select Token')
      getTotalDepositedTokens(currentProvider, activeCurrency.address, selectedNetworkId)
    if (donateContractAddress !== '') {
      getTotalTokensInRewardPool(currentProvider, activeCurrency.address, donateContractAddress)
    }
    if (activeCurrency.symbol !== 'Select Token')
      getRewardReleaseRatePerDay(
        currentProvider,
        donateContractAddress,
        activeCurrency.address,
        activeCurrency.decimals,
      )
    if (activeTab === 'reward' && donateContractAddress && activeCurrency.symbol !== 'Select Token') {
      getRewardPoolBalance(currentProvider, donateContractAddress, activeCurrency.address, activeCurrency.decimals)
    }
  }
  const getErrorMessage = () => {
    switch (activeTab) {
      case 'lend':
        return depositErrorMessage
      case 'reward':
        return donateErrorMessage
      case 'redeem':
        return redeemErrorMessage
      case 'airdrop':
        return airdropErrorMessage
      default:
        return ''
    }
  }

  const getSuccessMessage = () => {
    switch (activeTab) {
      case 'lend':
        return depositSuccessMessage
      case 'reward':
        return donateSuccessMessage
      case 'redeem':
        return redeemSuccessMessage
      case 'airdrop':
        return airdropSuccessMessage
      default:
        return ''
    }
  }

  useEffect(() => {
    if (isDepositSuccess || donateIsApproved || isApproved || donateSuccess || redeemSuccess || airdropSuccess) {
      setAmount('')
      setDepositChecked(false)
      balanceReset()
    }
  }, [activeTab, donateIsApproved, isDepositSuccess, isApproved, donateSuccess, redeemSuccess, airdropSuccess])

  useEffect(() => {
    if (flashLoanContract) {
      getPoolData()
    }
  }, [flashLoanContract])

  const getPoolData = async () => {
    console.log('useEffect Data', 'contract', flashLoanContract)

    try {
      const data = await flashLoanContract.Pools('0xbcC80cCbDe188d34D35018602dC3f56766bA377D')
      console.log('useEffect Data', data)
    } catch (error) {
      console.log('useEffect Data', 'error', error)
    }
  }

  // useEffect(() => {
  //   function checkTx(tx) {
  //     return (currentProvider as any).eth.getTransactionReceipt(tx).then((res) => {
  //       return res
  //     })
  //   }
  //   if (connectedWallet && JSON.parse(connectedWallet).name === 'coin98') {
  //     if (activeTab === 'lend' && depositTransactionHash) {
  //       let interval
  //       if (!isDepositSuccess) {
  //         interval = setInterval(async () => {
  //           console.log('progressing')
  //           let receipt = await checkTx(depositTransactionHash)
  //           if (receipt) {
  //             setDepositSuccess()
  //           }
  //         }, 120000)
  //       } else {
  //         clearTimeout(interval)
  //       }
  //     }
  //     if (activeTab === 'reward' && donateTransactionHash) {
  //       let interval
  //       if (!donateSuccess) {
  //         interval = setInterval(async () => {
  //           let receipt = await checkTx(depositTransactionHash)
  //           if (receipt) {
  //             setDonateSuccess()
  //           }
  //         }, 120000)
  //       } else {
  //         clearTimeout(interval)
  //       }
  //     }
  //     if (activeTab === 'redeem' && redeemTransactionHash) {
  //       let interval
  //       if (!redeemSuccess) {
  //         interval = setInterval(async () => {
  //           let receipt = await checkTx(redeemTransactionHash)
  //           if (receipt) {
  //             setRedeemSuccess()
  //           }
  //         }, 120000)
  //       } else {
  //         clearTimeout(interval)
  //       }
  //     }
  //     if (activeTab === 'airdrop' && airdropTransactionHash) {
  //       let interval
  //       if (!airdropSuccess) {
  //         interval = setInterval(async () => {
  //           let receipt = await checkTx(airdropTransactionHash)
  //           if (receipt) {
  //             setAirdropSuccess()
  //           }
  //         }, 120000)
  //       } else {
  //         clearTimeout(interval)
  //       }
  //     }
  //   }
  // }, [
  //   activeTab,
  //   depositTransactionHash,
  //   donateTransactionHash,
  //   redeemTransactionHash,
  //   airdropTransactionHash,
  //   isDepositSuccess,
  //   donateSuccess,
  //   redeemSuccess,
  //   airdropSuccess,
  // ])

  useEffect(() => {
    getDonationContract(currentProvider, selectedNetworkId)
  }, [accounts, activeTab, activeCurrency, receipentAddress, assertAddress, donateContractAddress])
  // const location = useLocation()
  // useEffect(() => {
  //   if (location.search) {
  //     let search = location.search
  //     let texts = search.slice(1).split('&')
  //     let object = {}
  //     texts.forEach((item) => {
  //       let sear = item.split('=')
  //       if ((sear[0] !== '' && sear[0] === 'token') || sear[0] === 'network') object[sear[0]] = sear[1]
  //     })
  //     setParams(object)
  //   } else {
  //     setParams({})
  //   }
  // }, [location])

  // useEffect(() => {
  //   if (params?.network) {
  //     const networkInfo = NETWORKS.filter((item) => item.label.toLowerCase() === params.network.toLowerCase())[0]
  //     if (networkInfo) setSelectedNetworkId(networkInfo.id)
  //     handleTokenBalance()
  //   }
  //   if (params?.token && tokenList.payload.length) {
  //     const token = tokenList.payload.filter((item: any) => {
  //       return item.address.toLowerCase() === params.token.toLowerCase()
  //     })
  //     if (token.length) {
  //       setActiveCurrency(token[0])
  //     }
  //     handleTokenBalance()
  //   }
  // }, [params, tokenList])

  const handleToast = (show: boolean) => {
    setAlertInfo({
      show,
    })
  }
  useEffect(() => {
    let interval: any
    if (
      (activeTab === 'lend' && depositErrorMessage === 'Transaction Failed') ||
      (activeTab === 'reward' && donateErrorMessage === 'Transaction Failed') ||
      (activeTab === 'redeem' && redeemErrorMessage === 'Transaction Failed') ||
      (activeTab === 'airdrop' && airdropErrorMessage === 'Transaction Failed')
    ) {
      var now = 100
      interval = setTimeout(() => {
        now--
        setProgressValue(now)
        if (now === 0) {
          clearDepositError()
          clearAirdropError()
          clearDonateError()
          clearRedeemError()
          setTransModalInfo(false)
          handleToast(false)
          clearInterval(interval)
        }
      }, 100)
      handleToast(true)
    }
    return () => {
      clearInterval(interval)
    }
  }, [depositErrorMessage, donateErrorMessage, redeemErrorMessage, airdropErrorMessage])

  useEffect(() => {
    let interval: any
    if (
      (activeTab === 'lend' && isDepositSuccess) ||
      (activeTab === 'reward' && donateSuccess) ||
      (activeTab === 'redeem' && redeemSuccess) ||
      (activeTab === 'airdrop' && airdropSuccess)
    ) {
      var now = 100
      interval = setTimeout(() => {
        now--
        setProgressValue(now)
        if (now === 0) {
          clearDepositError()
          clearAirdropError()
          clearDonateError()
          clearDonateError()
          setTransModalInfo(false)
          handleToast(false)
          clearInterval(interval)
        }
      }, 100)
      handleToast(true)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isDepositSuccess, donateSuccess, redeemSuccess, airdropSuccess, activeTab])

  // useEffect(() => {
  //   if (totalDepositedTokens !== '' && totalTokensInRewardPool !== '') {
  //     getCurrentAPY(
  //       currentProvider,
  //       donateContractAddress,
  //       activeCurrency.address,
  //       activeCurrency.decimals,
  //       totalDepositedTokens,
  //       totalTokensInRewardPool,
  //     )
  //   }
  // }, [
  //   activeCurrency.decimals,
  //   currentProvider,
  //   donateContractAddress,
  //   receipentAddress,
  //   totalDepositedTokens,
  //   totalTokensInRewardPool,
  // ])

  useEffect(() => {
    getCurrentAPY(
      currentProvider,
      donateContractAddress,
      receipentAddress,
      18,
      totalDepositedTokens,
      totalTokensInRewardPool,
    )
  }, [
    accounts,
    donateContractAddress,
    isApproved,
    currentProvider,
    receipentAddress,
    activeTab,
    activeCurrency,
    donateIsApproved,
    isDepositSuccess,
    isApproved,
    donateSuccess,
    redeemSuccess,
    airdropSuccess,
  ])

  useEffect(() => {
    if (accounts.length && activeCurrency.symbol !== 'Select Token' && activeTab === 'lend') {
      checkAllowance(currentProvider, accounts[0], activeCurrency.address, selectedNetworkId, amount)
    } else if (accounts.length && activeCurrency.symbol !== 'Select Token' && activeTab === 'reward') {
      donateAllowance(currentProvider, accounts[0], donateContractAddress, activeCurrency.address, amount)
    }
    getCurrentAPY(
      currentProvider,
      donateContractAddress,
      receipentAddress,
      18,
      totalDepositedTokens,
      totalTokensInRewardPool,
    )
  }, [
    accounts,
    donateContractAddress,
    isApproved,
    currentProvider,
    receipentAddress,
    activeTab,
    activeCurrency,
    amount,
  ])

  useEffect(() => {
    fetchTokenList(
      tokenGroupList,
      networkId,
      currentProvider,
      accounts,
      accountBalance,
      selectedNetworkId,
      customTokens,
    )
    setModalInfo({
      ...modalInfo,
    })
  }, [
    networkId,
    activeNetWork,
    currentProvider,
    accounts,
    accountBalance,
    tokenGroupList,
    customTokens,
    tokenGroupList,
    selectedNetworkId,
  ])

  useEffect(() => {
    let interval: any
    interval = setTimeout(() => {
      if (activeCurrency.symbol !== 'Select Token') {
        getPoolLiquidity(
          currentProvider,
          activeCurrency.address,
          activeCurrency.symbol === 'ETH',
          activeCurrency.decimals,
          selectedNetworkId,
        )
        getCurrentAPY(
          currentProvider,
          donateContractAddress,
          receipentAddress,
          18,
          totalDepositedTokens,
          totalTokensInRewardPool,
        )
      }
      handleTokenBalance()
    }, 3000)
    return () => clearInterval(interval)
  }, [
    accounts,
    activeTab,
    activeCurrency,
    receipentAddress,
    selectedNetworkId,
    assertAddress,
    donateContractAddress,
    totalDepositedTokens,
    totalTokensInRewardPool,
    tokenList,
    donateIsApproved,
    isDepositSuccess,
    isApproved,
    donateSuccess,
    redeemSuccess,
    airdropSuccess,
  ])
  // useEffect(() => {
  //   let interval: any;

  //   interval = setInterval(() => {
  //     if (accounts.length && walletConnected) {
  //       getPoolLiquidity(
  //         currentProvider,
  //         receipentAddress,
  //         activeCurrency.symbol === "ETH",
  //         activeCurrency.decimals
  //       );
  //     }
  //     handleTokenBalance();
  //   }, 5000);
  //   return () => clearInterval(interval);

  // }, [
  //   accounts,
  //   activeTab,
  //   activeCurrency,
  //   receipentAddress,
  //   assertAddress,
  //   donateContractAddress,
  //   totalDepositedTokens,
  //   totalTokensInRewardPool,
  // ]);
  useEffect(() => {
    if (walletConnected && activeCurrency.symbol !== 'Select Token') {
      getPool(activeCurrency.address, currentProvider, accounts[0], flashLoanContract)
    }
  }, [
    walletConnected,
    accounts,
    currentProvider,
    activeCurrency,
    flashLoanContract,
    donateIsApproved,
    isDepositSuccess,
    isApproved,
    donateSuccess,
    redeemSuccess,
    airdropSuccess,
    isPoolCreated,
  ])

  useEffect(() => {
    setAmount('')
    clearDepositError()
    clearAirdropError()
    clearDonateError()
    clearRedeemError()
    setTransModalInfo(false)
    handleToast(false)
    // if (activeTab === "reward") {
    //   rewardTokenList(tokenList);
    // }
  }, [activeTab])

  useEffect(() => {
    if (isDepositSuccess || donateIsApproved || donateSuccess || redeemSuccess || airdropSuccess) {
      setAmount('')
      handleTransModal(false)
    }
  }, [activeTab, donateIsApproved, isDepositSuccess, donateSuccess, redeemSuccess, airdropSuccess])

  useEffect(() => {
    if (poolTokenBalance > 0 && poolLiquidity > 0) {
      let poolPercent = toFixed((poolTokenBalance / poolLiquidity) * 100, 2)
      setPoolPercentage(poolPercent)
    } else {
      setPoolPercentage(0)
    }
  }, [
    poolLiquidity,
    poolTokenBalance,
    donateIsApproved,
    isDepositSuccess,
    isApproved,
    donateSuccess,
    redeemSuccess,
    airdropSuccess,
  ])

  const handleAmount = async () => {
    switch (activeTab) {
      case 'lend':
        handleTransModal(true)
        await handleDeposit(
          currentProvider,
          amount,
          accounts[0],
          activeCurrency.address,
          activeCurrency.symbol === 'ETH',
          activeCurrency.decimals,
          selectedNetworkId,
        )
        break
      case 'redeem':
        handleRedeem(
          currentProvider,
          amount,
          accounts[0],
          activeCurrency.address,
          activeCurrency.symbol === 'ETH',
          activeCurrency.decimals,
          redeemMax,
          fullPoolUTokenBalance,
          flashLoanContract,
        )
        handleTransModal(true)
        break
      case 'reward':
        handleDonate(
          //fix it
          currentProvider,
          amount,
          accounts[0],
          activeCurrency.address,
          activeCurrency.symbol === 'MATIC',
          activeCurrency.decimals,
        )
        handleTransModal(true)

        break
      case 'airdrop':
        handleAirdrop(
          currentProvider,
          amount,
          accounts[0],
          activeCurrency.address,
          activeCurrency.symbol === 'MATIC',
          activeCurrency.decimals,
          selectedNetworkId,
        )
        handleTransModal(true)
        break
      default:
        break
    }
  }

  const handleModal = (show: boolean) => {
    setModalInfo({
      show,
    })
    // if (tokenList.length === 0) fetchTokenList(tokenGroupList);
  }

  const handleTransModal = (isShow: boolean) => setTransModalInfo(isShow)

  const handleRedeemMax = () => {
    setRedeemMax(true)
  }

  const Loader = () => (
    <div>
      <div className="spinner-border spinner-balance approve-loader" role="status">
        <span className="sr-only">loading...</span>
      </div>
    </div>
  )

  const CurrentApy = () => (
    <div className="price-list">
      <p>Current APY</p>
      <span className="price">
        {currentApyLoading ? <Loader /> : currentApy !== '' ? `${currentApy}%/year` : '-/year'}
      </span>
    </div>
  )

  const TotalPoolLiquidity = () => (
    <div className="price-list">
      <p>Total Pool Liquidity </p>
      <span className="price">
        {poolLiquidityLoading ? (
          <Loader />
        ) : poolLiquidity ? (
          <>
            <span>{poolLiquidity.toLocaleString('en-US', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}</span>
            <img src={activeCurrency.logoURI} alt="logo" width="13" onError={addDefaultSrc} />
            <span>{activeCurrency.symbol}</span>
          </>
        ) : (
          '-'
        )}
      </span>
      <span></span>
    </div>
  )

  const YourPoolShare = () => (
    <div className="price-list">
      <p>Your Pool Share</p>
      <span className="price">
        {poolTokenBalanceLoading ? (
          <Loader />
        ) : poolPercentage !== '' && poolLiquidity !== '' && poolTokenBalance !== '' && walletConnected ? (
          `${poolPercentage}%`
        ) : (
          '-'
        )}
      </span>
    </div>
  )
  function addDefaultSrc(ev) {
    ev.target.src = cantFind
  }
  const YourLiquidity = () => (
    <div className="price-list">
      <p>Your Liquidity</p>
      <span className="price">
        {poolTokenBalanceLoading ? (
          <Loader />
        ) : walletConnected && poolTokenBalance !== '' ? (
          <>
            <span>{poolTokenBalance.toLocaleString()}</span>
            <img src={activeCurrency.logoURI} alt="logo" onError={addDefaultSrc} width="13" />
            <span>{activeCurrency.symbol}</span>
          </>
        ) : (
          '-'
        )}
      </span>
    </div>
  )

  const RewardAvailable = () => (
    <div className="price-list">
      <p>Reward Available</p>
      <span className="price">
        {rewardPoolBalanceLoading ? (
          <Loader />
        ) : walletConnected && rewardPoolBalance !== '' ? (
          <>
            <span>{rewardPoolBalance.toLocaleString()}</span>
            <img src={activeCurrency.logoURI} onError={addDefaultSrc} alt="logo" width="13" />
            <span>{activeCurrency.symbol}</span>
          </>
        ) : (
          '-'
        )}
      </span>
    </div>
  )

  const RewardRate = () => (
    <div className="price-list">
      <p>Reward Rate</p>
      <span className="price">{`${
        rewardReleaseRateLoading ? <Loader /> : rewardReleaseRate !== '' ? `${rewardReleaseRate}%` : '-'
      }/day`}</span>
    </div>
  )

  const networkMessage = () => {
    return ''
    if (accounts.length) {
      if (selectedNetworkId === 1 && activeNetWork !== 'Mainnet' && activeNetWork !== 'Ropsten') {
        return `Please switch your Network to Ethereum from your wallet.`
      } else if (selectedNetworkId === 3 && activeNetWork !== 'Matic Mainnet') {
        return `Please switch your Network to Polygen from your wallet`
      } else if (selectedNetworkId === 2 && activeNetWork !== 'Binance Mainnet') {
        return `Please switch your Network to Binance from your wallet`
      }
    }
  }
  const getCardTitle = () => {
    switch (activeTab) {
      case 'lend':
        return 'Lend'
      case 'redeem':
        return 'Redeem'
      case 'reward':
        return 'Give Reward'
      case 'airdrop':
        return 'Give Airdrop'
      default:
        return 'Lend'
    }
  }
  return (
    <>
      {/* <div className="new-message">
        <a href="https://unilend.finance" rel="noreferrer" target="_blank">
          {message}
        </a>
      </div> */}
      <div className="network-warning">{networkMessage()}</div>

      <ContentCard title={`${getCardTitle()}`}>
        <div className="swap-root">
          <FieldCard
            onF1Change={(e) => {
              setAmount(e.target.value)
              if (redeemMax) {
                setRedeemMax(false)
              }
            }}
            onRedeemMax={handleRedeemMax}
            handleModelOpen={() => handleModal(true)}
            fieldLabel="Amount"
            fieldValue={amount}
            setFieldValue={setAmount}
            fieldType="text"
            selectLabel={activeTab === 'redeem' ? poolTokenBalance : userTokenBalance}
            selectValue={activeCurrency.symbol ? activeCurrency.symbol : ''}
            selectedLogo={activeCurrency.logoURI ? activeCurrency.logoURI : ''}
          />
          {(activeTab === 'reward' || activeTab === 'airdrop') &&
          activeCurrency.symbol !== 'Select Token' &&
          amount !== '' &&
          parseFloat(amount) > 0 ? (
            <RiskApproval
              activeTab={activeTab}
              isChecked={depositChecked}
              onChecked={() => {
                setDepositChecked(!depositChecked)
              }}
            />
          ) : (
            ''
          )}
          <MainButton
            isEth={activeCurrency.symbol === 'ETH'}
            decimal={activeCurrency.decimals}
            amount={amount}
            actionName={`${activeTab === 'lend' ? capitalize('deposit') : capitalize(activeTab ?? 'lend')}`}
            isChecked={depositChecked}
            handleAmount={() => {
              if (activeCurrency.symbol !== 'Select Token') handleAmount()
            }}
          />
          {(activeTab === 'lend' || activeTab === 'redeem') && activeCurrency.symbol !== 'Select Token' ? (
            <div className="price_head">
              <div className="price_aa">
                <CurrentApy />
                <TotalPoolLiquidity />
                <YourPoolShare />
                <YourLiquidity />
              </div>
            </div>
          ) : (
            ''
          )}
          {activeTab === 'reward' && activeCurrency.symbol !== 'Select Token' && (
            <div className="price_head">
              <div className="price_aa">
                <CurrentApy />
                <RewardAvailable />
                <RewardRate />
              </div>
            </div>
          )}
        </div>
      </ContentCard>
      {modalInfo.show && activeTab && (
        <CurrencySelectModel
          currFieldName={activeCurrency.symbol}
          handleCurrChange={async (selectedToken: any) => {
             handleModal(false)
             balanceReset()
            setPoolPercentage(0)
             setActiveCurrency(selectedToken)
            if (accounts.length && currentProvider) {
               getPool(selectedToken.address, currentProvider, accounts[0], flashLoanContract)
            }
            handleReciepent(selectedToken.address)
          }}
          handleClose={() => handleModal(false)}
          activeTab={activeTab}
        />
      )}
      {transModalInfo && (
        <TransactionPopup
          mode={
            (activeTab === 'lend' && !depositTransactionHashRecieved && !depositErrorMessage) ||
            (activeTab === 'reward' && !donateTransactionHashRecieved && !donateErrorMessage) ||
            (activeTab === 'redeem' && !redeemTransactionHashReceived && !redeemErrorMessage) ||
            (activeTab === 'airdrop' && !airdropTransactionHashReceived && !airdropErrorMessage)
              ? 'loading'
              : (activeTab === 'lend' && depositTransactionHashRecieved) ||
                (activeTab === 'reward' && donateTransactionHashRecieved) ||
                (activeTab === 'redeem' && redeemTransactionHashReceived) ||
                (activeTab === 'airdrop' && airdropTransactionHashReceived)
              ? 'success'
              : 'failure'
          }
          activeTab={activeTab}
          handleClose={() => handleTransModal(false)}
        />
      )}
      {alertInfo.show && activeTab && getErrorMessage() === 'Transaction Failed' && (
        <AlertToast
          handleClose={() => {
            handleToast(false)
          }}
          now={progressValue}
          status="failed"
          message={getErrorMessage()}
          activeTab={activeTab}
        />
      )}
      {alertInfo.show &&
        activeTab &&
        ((activeTab === 'lend' && isDepositSuccess && depositSuccessMessage) ||
          (activeTab === 'reward' && donateSuccessMessage && donateSuccess) ||
          (activeTab === 'redeem' && redeemSuccess && redeemSuccessMessage) ||
          (activeTab === 'airdrop' && airdropSuccess && airdropSuccessMessage)) && (
          <AlertToast
            handleClose={() => {
              handleToast(false)
            }}
            now={progressValue}
            status="success"
            message={getSuccessMessage()}
            activeTab={activeTab}
          />
        )}
    </>
  )
}

export default withRouter(CommonCard)
