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

export interface DesignSaved {
  id: number
  name: string
  svg: string
  product: Product
  style?: Style
  shortId?: string
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

export interface SelectedType extends Filter {}

export interface FitStyle {
  id: number
  name: string
  info: string
  image: string
}

export interface SizeFilter {
  id: number
  name: string
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

type ExtraFile = {
  white: string
  black: string
}

export interface Product {
  id: number
  code: string
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
  genderId: number
  productTotal?: number
  unitPrice?: number
  sizeRange: ItemDetailType[]
  obj?: string
  mtl?: string
  themes?: Theme[]
  label: string
  flatlock: string
  bumpMap: string
  binding?: ExtraFile
  zipper?: ExtraFile
  bibBrace?: ExtraFile
  weight: number
}

export type DesignType = {
  id: number
  code: string
  name: string
  shared: boolean
  shortId?: string
  visible?: boolean
  product: Product
  image: string
  createdAt: string
  style?: Style
}

export type SaveDesignType = {
  designBase64: string
  canvasSvg: string
  canvasJson: string
  styleId: number
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

export interface CountrySubsidiary {
  id: number
  country: string
  subsidiary: number
  countryCode: string
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

export interface Style {
  id: number
  name: string
  image: string
  colorBlocks: ColorBlock[]
}

export interface Theme {
  id: number
  name: string
  image: string
  styles: Style[]
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
  branding: string
  brandingPng: string
  colorblock1: string
  colorblock2: string
  colorblock3: string
  colorblock4: string
  colorblock5: string
  colors: ColorBlock[]
}

export interface DesignStyle {
  id: number
  name: string
  image: string
  branding: string
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
  id: string
  name: string
  lastName: string
  token: string
  email: string
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
  flatlock?: string
  brandingSvg?: string
  brandingPng?: string
  label: string
  size: number
  design: {
    name: string
    colors: string[]
  }
  areasSvg: string[]
  areasPng: string[]
  bibBraceBlack?: string
  bibBraceWhite?: string
  bindingWhite?: string
  bindingBlack?: string
  zipperWhite?: string
  zipperBlack?: string
}

export interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  productTotal?: number
  unitPrice?: number
  designId?: string
  designName?: string
  designImage?: string
  teamStoreId?: string
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

export interface OrderHistory {
  id: number
  shortId: string
  date: string
  status: string
}

export interface OrderStatusNetsuite {
  deliveryDate?: string
}

export interface NetsuiteObject {
  orderStatus: OrderStatusNetsuite
}

export interface PaymentCharges {
  stripeCharge: {
    cardData: CreditCardData
  }
}

export interface OrderDetailsInfo {
  shortId: string
  orderDate: string
  paymentMethod: string
  shippingFirstName: string
  shippingLastName: string
  shippingStreet: string
  shippingApartment: string
  shippingCountry: string
  shippingStateProvince: string
  shippingCity: string
  shippingZipCode: string
  billingFirstName: string
  billingLastName: string
  billingStreet: string
  billingApartment: string
  billingCountry: string
  billingStateProvince: string
  billingCity: string
  billingZipCode: string
  shippingTax: number
  netsuit?: NetsuiteObject
  payment: PaymentCharges
  cart: CartItems[]
  status: string
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
  shippingTax: number
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

export interface ArtFormat {
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
  fill?: string
  stroke?: string
  strokeWidth?: number
}

export interface CanvasType {
  text: {
    [id: string]: CanvasElement
  }
  image: {
    [id: string]: CanvasElement
  }
  path: {
    [id: string]: CanvasElement
  }
}

export interface PathType {
  [id: string]: CanvasElement
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
  internal_id: string
  subsidiary: string
  name: string
  flat_rate: string
  rate_type: string
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

export interface ClipArt {
  id: number
  url: string
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

export interface DeleteDesignModal {
  openDeleteModal: boolean
  designId: string
  designName: string
  modalLoading: boolean
}

export interface UploadFile {
  uid: number
  size: number
  name: string
  filename?: string
  lastModified?: string
  lastModifiedDate?: Date
  url?: string
  status?: any
  percent?: number
  thumbUrl?: string
  originFileObj?: File
  response?: any
  error?: any
  linkProps?: any
  type: string
}

export type sorts = 'asc' | 'desc' | 'none'
export interface DesignObject {
  code: string
  thumbnail: string
  complexity: number
  colors: string[]
  name: string
}

export interface DesignConfig extends DesignObject {
  inspiration: DesignObject[]
}

export interface DesignItem {
  id: number
  name: string
}

export interface Country {
  name: string
  code: string
  geonameId: string
}

export interface CountryRegion {
  region: string
}

export interface City {
  city: string
}
export interface ImageFile {
  id: number
  fileUrl: string
  size: {
    width: number
    height: number
  }
  type: string
}

export type MessagePayload = {
  data: {
    message: string
  }
}

export type StitchingColor = {
  name: string
  value: string
}

export type AccesoryColor = 'black' | 'white'

export interface ClickParam {
  key: string
  keyPath: Array<string>
  item: any
  domEvent: any
}

export interface Measure {
  in: string[]
  cm: string[]
}

export interface SizesTableType {
  title?: string
  headers: string[]
  size?: string[]
  waist?: Measure
  chest?: Measure
  inseam?: Measure
  hips?: Measure
  height?: Measure
  bicep?: Measure
  length?: Measure
  thigh?: Measure
  calf?: Measure
  mens?: Measure
  womens?: Measure
  circumference?: Measure
}

export interface Chart {
  title: string
  tables: SizesTableType[]
}

export interface Change {
  type: ChangeType
  state: any
}

export type ChangeType =
  | 'colors'
  | 'add'
  | 'delete'
  | 'move'
  | 'rotate'
  | 'resize'
  | 'duplicate'
  | 'accessoryColor'
  | 'canvasStyle'

export type CanvasObjects = 'path' | 'text' | 'image'

export type ConfigCanvasObj = {
  src: string
  style: any
  position: any
}

export type CanvasResized = {
  id: string
  elementType: CanvasObjects
  oldScaleX: number
  oldScaleY: number
  scaleX: number
  scaleY: number
}

export type CanvasDragged = {
  id: string
  oldLeft: number
  oldTop: number
  left: number
  top: number
}
