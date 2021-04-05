import { Button } from "react-bootstrap";
import sun from "assets/sun.svg";
import moon from "assets/moon.svg";
import { capitalize, shortenAddress } from "../../../Helpers";
import {
  ThemeButtonProps,
  AccountBalanceProps,
  ActiveNetworkProps,
  NetworkInfoTabProps,
  ConnectWalletButtonProps,
  AddressTabProps,
} from "../../../Helpers/Types";

export const ThemeButton = ({
  onClick,
  theme,
  className,
  dflex,
}: ThemeButtonProps) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={`${dflex && "d-flex"} btn ${theme === "dark" && "btn-dark"} ${
        className ? className : ""
      }`}
    >
      {<img width="20" src={theme === "light" ? sun : moon} alt="theme" />}
    </Button>
  );
};

export const AccountBalance = ({
  accountBalance,
  className,
  theme,
}: AccountBalanceProps) => {
  return (
    <button
      className={` ${
        theme === "dark" && "btn-dark"
      } btn-custom-secondary btn-round-switch acc-balance ${
        className ? className : ""
      }`}
    >
      <span className="mr-1">{accountBalance}</span>
      <span className="currency">ETH</span>
    </button>
  );
};

export const ActiveNetwork = ({
  theme,
  activeNetWork,
  className,
}: ActiveNetworkProps) => {
  return (
    <div
      className={`d-flex btn ${
        theme === "dark" && "btn-dark"
      } btn-custom-secondary btn-round-switch  ${className ? className : ""}`}
      style={{ padding: "7px" }}
    >
      {activeNetWork}
    </div>
  );
};

export const NetworkInfoTab = ({
  theme,
  onClick,
  logo,
  label,
  className,
}: NetworkInfoTabProps) => {
  return (
    <button
      className={`d-flex btn ${
        theme === "dark" && "btn-dark"
      } btn-custom-secondary btn-round-switch  ${className ? className : ""}`}
      // onClick={() => { // onClick(true)}}
    >
      <img
        src={require(`../../../../assets/${logo}.png`).default}
        alt={label}
      />
      <span>{capitalize(label)}</span>
    </button>
  );
};

export const ConnectWalletButton = ({
  theme,
  onClick,
  loading,
}: ConnectWalletButtonProps) => {
  return (
    <button
      className={`d-flex btn ${
        theme === "dark" && "btn-dark"
      } btn-custom-secondary`}
      onClick={onClick}
    >
      {!loading ? (
        <span>
          <img
            src={require(`../../../../assets/wallet-${theme}.svg`).default}
            width="26"
            alt="Wallet"
            className="d-inline-block px-1"
          />
          Connect wallet
        </span>
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </button>
  );
};

export const AddressTab = ({ theme, onClick, address }: AddressTabProps) => {
  return (
    <button
      className={`d-flex btn  btn-custom-secondary ${
        theme === "dark" && "btn-dark"
      }`}
      onClick={onClick}
    >
      {shortenAddress(address)}
    </button>
  );
};
