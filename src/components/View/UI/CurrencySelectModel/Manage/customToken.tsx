import { FC } from 'react'
import cantFind from 'assets/cantFind.svg'
import { useActions } from 'hooks/useActions'

interface Props {
  token: any
}

const CustomToken: FC<Props> = ({ token }) => {
  const { logoURI, symbol, address, chainId } = token
  const { setCustomToken } = useActions()
  const handleRemoveToken = () => {
    setCustomToken(address, 'delete')
  }
  const getDefaultNetwork = (network) => {
    if (network === 56 || network === 97) {
      return 'Binance'
    } else if (network === 137 || network === 80001) {
      return 'Polygon'
    } else if (network === 1285) {
      return 'Moonriver'
    } else if (network === 1287) {
      return 'Moonbase'
    } else {
      return 'Ethereum'
    }
  }
  function addDefaultSrc(ev) {
    ev.target.src = cantFind
  }
  return (
    <>
      <div className="token-list">
        <div className="details">
          <img src={logoURI !== null ? logoURI : cantFind} alt="" onError={addDefaultSrc} />
          <span style={{ paddingLeft: '10px' }}>{symbol}</span>
        </div>
        <div className="action">
          <div className="list-label">{getDefaultNetwork(chainId)}</div>
          <svg
            onClick={handleRemoveToken}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="delete"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://etherscan.io/address/${address}`}
            className="sc-eNQAEJ bJDHdm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="view"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}

export default CustomToken
