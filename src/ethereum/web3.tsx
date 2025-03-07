import Web3 from 'web3'

let web3: any
if (typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(Web3.givenProvider)
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(`https://rinkeby.infura.io/${process.env.REACT_APP_INFURA_ID}`)
  web3 = new Web3(provider)
}
export default web3
