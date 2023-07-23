export interface curencyModel {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: Rates
  error?: Error
}

export interface Rates {
  [key: string]: number
}

export interface Error {
  code: number
  type: string
  info: string
}
