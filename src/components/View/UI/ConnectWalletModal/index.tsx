import { useTypedSelector } from "hooks/useTypedSelector";
import { FC } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Metamask from "assets/metamask.png";
import Coin98 from "assets/coin98.png";
import WalletConnectIcon from "assets/walletConnectIcon.svg";
import CoinbaseWalletIcon from "assets/coinbaseWalletIcon.svg";
// import PortisIcon from "assets/portisIcon.png";
// import BinanceIcon from "assets/binance.png";
import "./index.scss";
import { capitalize } from "components/Helpers";
// import { isMobile } from "react-device-detect";
interface Props {
  handleClose: () => void;
  handleWalletConnect: Function;
}

interface Wallet {
  id: number;
  name: string;
  icon: string;
  link?: string;
}

const getWalletList = (networkId: number): Wallet[] => {
  let list = [
    {
      id: 2,
      name: "walletConnect",
      icon: WalletConnectIcon,
    },
    {
      id: 3,
      name: "CoinbaseWallet",
      icon: CoinbaseWalletIcon,
    },
    {
      id: 4,
      name: "Fortmatic",
      icon: "data:image/png;base64,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",
    },
    // {
    //   id: 5,
    //   name: "ledger",
    //   icon: "",
    // },
  ];
  return [
    {
      id: 1,
      name: (window as any).ethereum ? "metamask" : "Install metamask",
      icon: Metamask,
      link: (window as any).ethereum ? "" : "https://metamask.io/",
    },
    {
      id: 101,
      name: "coin98",
      icon: Coin98,
      link: (window as any).coin98
        ? ""
        : "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg?hl=en",
    },
    ...(networkId === 1 ? list : []),
    ...(networkId === 2
      ? [
          // {
          //   id: 6,
          //   name: "binanceWallet",
          //   icon: BinanceIcon,
          // },
        ]
      : []),
  ];
};

const ConnectWalletModal: FC<Props> = (props) => {
  const { handleClose, handleWalletConnect } = props;

  const { theme } = useTypedSelector((state) => state.settings);
  const { selectedNetworkId } = useTypedSelector(
    (state) => state.connectWallet
  );

  return (
    <>
      <Modal
        className={`modal-theme ${theme === "dark" ? "dark" : "light"}`}
        animation={false}
        size="sm"
        show={true}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="model-title-custom">
            Connect to the Wallet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {getWalletList(selectedNetworkId).map((wallet: any) => (
              <Row className=" px-3 pt-3" key={wallet.id}>
                <Col>
                  {wallet.link && wallet.link !== "" ? (
                    <a href={wallet.link} target="_blank" rel="noreferrer">
                      <Button
                        className="btn-wallet-list"
                        onClick={() => {
                          handleWalletConnect(wallet);
                        }}
                        style={{
                          color: "#007bff",
                        }}
                        block
                      >
                        <span className="text">{capitalize(wallet.name)}</span>
                        <img
                          className="icon"
                          src={wallet.icon}
                          alt="metamask"
                        />
                      </Button>
                    </a>
                  ) : (
                    <Button
                      className="btn-wallet-list"
                      onClick={() => {
                        handleWalletConnect(wallet);
                      }}
                      block
                    >
                      <span className="text">{capitalize(wallet.name)}</span>
                      <img className="icon" src={wallet.icon} alt="metamask" />
                    </Button>
                  )}
                </Col>
              </Row>
            ))}
          </Container>
        </Modal.Body>
        <Modal.Footer className="wallet-footer p-2">
          New to Ethereum?{" "}
          <a
            href="https://ethereum.org/en/wallets/"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about wallets
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConnectWalletModal;
