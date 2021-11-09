export const NETWORKS: Array<networks> = [
  { id: 1, label: 'Ethereum', logo: 'ethereum' },
  { id: 2, label: 'BSC', logo: 'binance' },
  { id: 3, label: 'Polygon', logo: 'matic' },
  { id: 4, label: 'Moonriver', logo: 'moonriver' },
]
export interface networks {
  id: number
  label: string
  logo: string
}
