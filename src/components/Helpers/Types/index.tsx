export interface Wallet {
  id: number;
  name: string;
  icon: string;
}
export type HeadingProps = {
  className?: string;
  children?: React.ReactNode;
};

export type DividerProps = {
  className?: string;
};

export type ThemeButtonProps = {
  onClick: () => void;
  theme: string;
  className?: string;
  dflex?: boolean;
  children?: React.ReactNode;
};

export type AccountBalanceProps = {
  accountBalance: string | number;
  tokenType: any;
  className?: string;
  theme: string;
};

export type ActiveNetworkProps = {
  activeNetWork: string;
  theme: string;
  className?: string;
};

export type NetworkInfoTabProps = {
  onClick: () => void;
  theme: string;
  logo: string;
  label: string;
  className?: string;
};

export type ConnectWalletButtonProps = {
  theme: string;
  onClick: () => void;
  loading: boolean;
};

export type AddressTabProps = {
  theme: string;
  onClick: () => void;
  address: string;
};

export type WalletInfoProps = {
  show: boolean;
  address: string;
};
