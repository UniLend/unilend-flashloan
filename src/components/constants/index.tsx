export const NETWORKS: Array<networks> = [
    { id: 1, label: "Ethereum", logo: "ethereum" },
    { id: 2, label: "Binance", logo: "binance" }
];
export interface networks {
    id: number,
    label: string,
    logo: string
};