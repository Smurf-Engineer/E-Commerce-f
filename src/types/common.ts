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
  subscribeToMore?: (options: any) => () => void
}

export interface SelectedItem {
  [extraProp: number]: boolean
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

export interface FitStyle {
  id: number
  name: string
  info: string
  image: string
}

export type ImageType = {
  front: string
  back: string
  left: string
  right: string
  genderId: number
}

export type PriceRange = {
  quantity: string
  price: number
}

export interface GenderType {
  id: number
  gender: string
}

export type HomePageBatch = {
  method: string
  result: string
}

export interface Product {
  id: number
  shortId?: string
  images: ImageType[]
  type: string
  description: string
  priceRange: PriceRange[]
  collections: number
  isTopProduct: boolean
  details: string
  specs: string
  name: string
  customizable: boolean
  yotpoId: string
  yotpoAverageScore: ProductReviews
  fitStyles: FitStyle[]
  genders: Filter[]
  bodyChartId: number
  retailMen: boolean
  retailWomen: boolean
  shortDescription: string
  productTotal?: number
  unitPrice?: number
  sizeRange: ItemDetailType[]
}

export type DesignType = {
  id: number
  name: string
  shortId?: string
  visible?: boolean
  product: Product
  image: string
  createdAt: string
}

export type TeamStoreItemtype = {
  team_store_id: number
  design_id: string
  design: DesignType
  expected_quantity: number
  visible: boolean
  totalOrders: number
  itemOrder?: number
  team_store_name?: string
}

export type LockerTableType = {
  design: DesignType
  design_id?: string
  id?: number
  totalOrders: number
  visible: boolean
}

export type DesignResultType = {
  fullCount: string
  designs: DesignType[]
}

export type TeamStoreResultType = {
  fullCount: string
  teamStores: TeamStoreType[]
}

export type TeamStoreType = {
  id: number
  short_id: string
  name: string
  cutoff_date: DateObjectType
  delivery_date: DateObjectType
  private: boolean
  created_at: string
  items: TeamStoreItemtype[]
  priceRanges: ItemDetailType[]
}

export type DateObjectType = {
  day: string
  dayOrdinal: string
  month: string
  year: string
}

export interface ProductReviews {
  total: number
  averageScore: number
}

export interface ProductType {
  fullCount: string
  products: Product[]
}

export interface BodyChartItem {
  size: string
  waist: string
  hips: string
  chest: string
  inseam: string
}

export interface Region {
  icon: string
  label: string
  code: string
  id: number
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
  label: string
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

export interface ThemeResult {
  fullCount: string
  themes: Theme[]
}

export interface ColorBlock {
  image: string
  color: string
  colorDesc: string
}

export interface Style {
  id: number
  name: string
  image: string
  colors: ColorBlock[]
}

export interface StyleResult {
  fullCount: string
  styles: Style[]
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

export interface AntColumns {
  title: string
  dataIndex: string
}

export interface Size {
  id: number
  range: string
}

export type TeamstoreItemType = {
  id: string
  design: DesignType
  expectedQuantity: number
}

export type TeamstoreType = {
  id: number
  shortId: string
  name: string
  banner: string
  cutOffDate: string
  deliveryDate: string
  private: boolean
  items: TeamstoreItemType[]
  totalItems: number
}

export interface TeamstoreResult {
  fullCount: string
  teamStores: TeamstoreType[]
}

export type ItemDetailType = {
  id: number
  name: string
}

export type CartItemDetail = {
  gender?: ItemDetailType
  size?: ItemDetailType
  fit?: ItemDetailType
  label?: string
  quantity: number
}

export interface AddressType {
  id?: number
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  stateProvince: string
  city: string
  zipCode: string
  phone: string
  defaultBilling?: boolean
  defaultShipping?: boolean
}

export interface StripeCardData {
  cardNumber: string
  cardExpDate: string
  cardBrand: string
  stripeToken?: string
}

export interface ModelConfig {
  obj: string
  mtl: string
  bumpMap: string
  areas: string[]
}

export interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  productTotal?: number
  unitPrice?: number
  designId?: string
  designName?: string
  designImage?: string
}

export interface CreditCardData {
  id?: string
  name: string
  last4: string
  brand: string
  expMonth: number
  expYear: number
  defaultPayment?: boolean
}

export interface OrderDataInfo {
  orderDate: string
  firstName: string
  lastName: string
  street: string
  city: string
  stateProvince: string
  zipCode: string
  country: string
  apartment: string
  billingFirstName: string
  billingLastName: string
  billingStreet: string
  billingCity: string
  billingStateProvince: string
  billingZipCode: string
  billingCountry: string
  billingApartment: string
  payment: {
    stripeCharge: {
      cardData: CreditCardData
    }
  }
  cart: CartItems[]
  paymentMethod: string
}

export interface TextFormat {
  fontFamily: string
  stroke: string
  fill: string
  strokeWidth: number
}

export interface CanvasElement {
  id: string
  text?: string
  width?: number
  height?: number
  textFormat?: TextFormat
  artIndex?: number
}

export interface CanvasType {
  text: {
    [id: string]: CanvasElement
  }
  image: {
    [id: string]: CanvasElement
  }
  art: {
    [id: string]: CanvasElement
  }
}
export interface ClickParam {
  key: string
  keyPath: Array<string>
  item: any
  domEvent: any
}

export interface UserProfileSettings {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface UserRegionSettings {
  region: {
    id?: string
    name?: string
    icon?: string
    code?: string
  }
  language: {
    id?: string
    name?: string
    shortName?: string
  }
  currency: {
    id?: string
    name?: string
    shortName?: string
    abbreviation?: string
  }
}

export interface MeasurementSettings {
  weight: string
  heightFirst: string
  heightSecond: string
  chest: string
  waist: string
  hips: string
  inseam: string
  shoulders: string
  neck: string
  msrmntSystemSelected: string
  msrmntGenderSelected: string
}

export interface SmsSettings {
  orderConfirmation: boolean
  desingUpdates: boolean
}

export interface EmailSettings {
  newsletter: boolean
}

// tslint:disable-next-line:interface-name
export interface IProfileSettings {
  userProfile: UserProfileSettings
  languageSettings: UserRegionSettings
  measurementSettings: MeasurementSettings
  smsSettings: SmsSettings
  emailSettings: EmailSettings
}

export interface ProfileSettingsReducer {
  firstName: string
  lastName: string
  email: string
  phone: string
  region: string
  language: string
  currency: string
  msrmntSystemSelected: string
  msrmntGenderSelected: string
  weight: string
  heightFirst: string
  heightSecond: string
  chestSize: string
  waistSize: string
  hipsSize: string
  inseamSize: string
  shouldersSize: string
  neckSize: string
  smsConfirmationChecked: boolean
  smsUpdatesChecked: boolean
  emailNewsletterChecked: boolean
}

// tslint:disable-next-line:interface-name
export interface ITemplateDownload {
  name: string
  description: string
  pictures: [
    {
      imageSource: string
    }
  ]
  fileUrl: string
}

export interface NetsuiteTax {
  internalId: string
  rate: string
  countryCode: string
  ratePST: string
  rateGST: string
  state: string
  zip: string
}

export interface NetsuiteShipping {
  restrictions: NetsuiteShippingRestrictions
  weightTable: NetsuiteShippingWeighTable[]
  internalId: string
  subsidiary: string
  name: string
  flatRate: string
  rateType: string
}

export interface NetsuiteShippingRestrictions {
  limitOrExcludeCountries: string
  limitOrExcludeStates: string
  countries: string[]
  states: string[]
}

export interface NetsuiteShippingWeighTable {
  minimum: number
  amount: number
}
export interface MyPaletteDesignCenterModals {
  openDeletePaletteModal: boolean
  openApplyPaletteModal: boolean
  idPaletteToExecuteAction: number
}

export interface StyleModalType {
  openNewStyleModal: boolean
  indexStyle: any
  idStyle: number
}

export interface ThemeModalType {
  openNewThemeModal: boolean
  themeId: number
}
