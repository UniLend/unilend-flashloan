import React, { ReactNode, useState } from "react";
import NavBar from "../View/UI/Navbar/NavBar";
import FooterNavBar from '../View/UI/Navbar/FooterNavBar';
import { WalletInfoProps } from '../Helpers/Types';
import useWalletConnect from "hooks/useWalletConnect";
import ConnectWalletModal from "../View/UI/ConnectWalletModal";
import WalletStateModal from "../View/UI/WalletStatusModal";
import { Wallet } from "components/Helpers/Types";
import { useTypedSelector } from "hooks/useTypedSelector";
import SwitchNetWorkModal from "../View/UI/SwitchNetWorkModal";
import { useActions } from "hooks/useActions";
interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  const [walletModalInfo, setWalletModalInfo] = useState<boolean>(false);
  const [switchNetWorkModal, setSwitchNetworkModal] = useState<boolean>(false);
  const [walletStatusInfo, setWalletStatusInfo] = useState<WalletInfoProps>({
    show: false,
    address: "",
  });

  const {
    walletConnected,
    handleWalletConnect,
  } = useWalletConnect();
  const { walletDisconnect } = useActions();
  const { walletProvider } = useTypedSelector(
    (state) => state.connectWallet
  );


  return (
    <>
      <NavBar
        setWalletModalInfo={setWalletModalInfo}
        setWalletStatusInfo={setWalletStatusInfo}
        setSwitchNetworkModal={setSwitchNetworkModal}
      />
      {/* <FooterNavBar
        setWalletModalInfo={setWalletModalInfo}
        setWalletStatusInfo={setWalletStatusInfo}
        setSwitchNetworkModal={setSwitchNetworkModal}
      /> */}
      {props.children}
      {/* {walletModalInfo && !walletConnected && (
        <ConnectWalletModal
          handleClose={() => setWalletModalInfo(false)}
          handleWalletConnect={(wallet: Wallet) => {
            handleWalletConnect(wallet);
          }}
        />
      )}
      {walletStatusInfo.show && walletConnected && (
        <WalletStateModal
          handleClose={() => {
            setWalletStatusInfo({
              show: false,
              address: "",
            });
          }}
          handleDisconnect={() => {
            walletDisconnect(walletProvider);
            setWalletStatusInfo({ ...walletStatusInfo, show: false });
            setWalletModalInfo(false);
          }}
          address={walletStatusInfo.address}
        />
      )}
      {switchNetWorkModal && (
        <SwitchNetWorkModal onHide={() => setSwitchNetworkModal(false)} />
      )} */}
    </>
  );
};
export default Layout;