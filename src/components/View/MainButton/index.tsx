import { Wallet } from 'components/Helpers/Types'
import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import useWalletConnect from 'hooks/useWalletConnect'
import { FC, useEffect, useState } from 'react'
// import { depositApprove } from "state/action-creators";
import ConnectWalletModal from '../UI/ConnectWalletModal'

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
  const ButtonUI = () => {
    return <button className="btn btn-lg btn-custom-primary">Connect Wallet Button</button>
  }

  return (
    <>
      <div className="d-grid py-3">
        <ButtonUI />
      </div>
    </>
  )
}

export default MainButton
