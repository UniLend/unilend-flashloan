export const NETWORKS: Array<networks> = [
  { id: 1, label: 'Ethereum', logo: 'ethereum', networkID: 1 },
  { id: 2, label: 'BSC', logo: 'binance', networkID: 56 },
  { id: 3, label: 'Polygon', logo: 'matic', networkID: 137 },
  // { id: 4, label: 'Moonbase', logo: 'moonriver' },
  { id: 5, label: 'Moonriver', logo: 'moonriver', networkID: 1285 },
  { id: 6, label: 'Mumbai', logo: 'matic', networkID: 80001 },
]
export interface networks {
  id: number
  label: string
  logo: string
  networkID: number
}
