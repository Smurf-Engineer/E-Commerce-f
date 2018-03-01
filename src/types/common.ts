/**
 * Global types
 */

export interface QueryProps {
  error?: any
  networkStatus?: number
  loading?: boolean
  variables?: any
  fetchMore: any
  refetch?: any
  updateQuery?: any
}

export interface Action {
  type: string
}

export interface AnyAction extends Action {
  [extraProps: string]: any
}

export type Reducer<S> = (state: S, action: AnyAction) => S

export interface Prices {
  price: number
  quantity: string
}

export interface Filter {
  id: number
  name: string
}

export type ImageType = {
  front: string
  back: string
  left: string
  right: string
}

export type PriceRange = {
  from: number
  to: number
}

export type HomePageBatch = {
  method: string
  result: string
}

export interface Product {
  id: number
  images: ImageType
  type: string
  description: string
  priceRange: PriceRange
  collections: number
  isTopProduct: boolean
  details: string
  specs: string
  name: string
}

export interface Region {
  icon: string
  label: string
  languages: Language[]
  currencies: Currency[]
}

export interface Language {
  id: number
  name: string
  shortName: string
}

export interface Currency {
  id: number
  name: string
  shortName: string
}

export interface RegionConfig {
  region: number
  localeIndex: number
  locale: string
  currency: number
}

export interface Theme {
  id: number
  name: string
  picture: string
}

export interface Palette {
  name: string
  colors: string[]
}
