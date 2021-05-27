export const NETWORKS: Array<networks> = [
  { id: 1, label: "Ethereum", logo: "ethereum" },
  // { id: 2, label: "Binance", logo: "binance" },
  { id: 3, label: "Matic", logo: "matic" },
];
export interface networks {
  id: number;
  label: string;
  logo: string;
}
