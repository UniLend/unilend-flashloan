import { useActions } from 'hooks/useActions'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { capitalize } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import MainButton from '../MainButton'
import ContentCard from '../UI/ContentCard/ContentCard'
import CurrencySelectModel from '../UI/CurrencySelectModel/CurrencySelectModel'
import FieldCard from '../UI/FieldsCard/FieldCard'

interface Props extends RouteComponentProps<any> {
  activeTab: string
}

const CommonCard: FC<Props> = ({ activeTab }) => {
  const [amount, setAmount] = useState('')
  const [tokenlistView, setTokenListView] = useState(false)
//  const {fetchTokenList, setActiveCurrency} = useActions()
//   const { tokenGroupList, tokenList, customTokens } = useTypedSelector((state) => state.tokenManage)
//   const { activeCurrency, params } = useTypedSelector((state) => state.settings)

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

  // useEffect(() => {
  //   fetchTokenList(tokenGroupList, null, null, [], null, null, [])
  // }, [tokenGroupList])

  return (
    <>
      <ContentCard title={`${getCardTitle()}`}>
        <div className="swap-root">
          <FieldCard
            onF1Change={(e) => {
              setAmount(e.target.value)
              // if (redeemMax) {
              //   setRedeemMax(false)
              // }
            }}
            onRedeemMax={() => {}}
            handleModelOpen={() => setTokenListView(true)}
            fieldLabel="Amount"
            fieldValue={amount}
            setFieldValue={setAmount}
            fieldType="text"
            selectLabel={'0'}
            selectValue={ ''}
            selectedLogo={ ''}
          />
          {tokenlistView && (
            <CurrencySelectModel
              currFieldName={''}
              handleCurrChange={async (selectedAddress: any) => {
                console.log(selectedAddress)
                setTokenListView(false)
              }}
              handleClose={() => setTokenListView(false)}
              activeTab={activeTab}
            />
          )}
          <MainButton
            isEth={true}
            decimal={18}
            amount={amount}
            actionName={`${activeTab === 'lend' ? capitalize('deposit') : capitalize(activeTab ?? 'lend')}`}
            isChecked={true}
            handleAmount={() => {}}
          />
        </div>
      </ContentCard>
    </>
  )
}

export default withRouter(CommonCard)
