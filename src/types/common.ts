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
  quantity: string
  price: number
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
  priceRange: PriceRange[]
  collections: number
  isTopProduct: boolean
  details: string
  specs: string
  name: string
}

export interface ProductType {
  fullCount: string
  products: Product[]
}

export interface Region {
  icon: string
  label: string
  code: string
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
  abbreviation: string
  shortName: string
}

export interface RegionConfig {
  region: number | string
  localeIndex: number | string
  locale: string
  currency: number | string
}

export interface Theme {
  id: number
  name: string
  image: string
}

export interface Palette {
  name: string
  colors: string[]
}

export interface UserType {
  name: string
  lastName: string
  token: string
}
