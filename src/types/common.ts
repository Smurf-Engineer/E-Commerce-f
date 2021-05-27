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
  canvas: string
  style?: Style
  shortId?: string
  flatlockColor?: string
  flatlockCode?: string
  bindingColor?: string
  bibBraceColor?: string
  zipperColor?: string
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
  image?: string
}

export interface SelectedType extends Filter { }

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

export type OrderStats = {
  total: number
  currency: string
}

export type ImageType = {
  front: string
  back: string
  left: string
  right: string
  genderId: number
  colorId?: number
}

export type PriceRange = {
  quantity: string
  price: number
  shortName: string
}

export type WorkHours = {
  start: string
  end: string
  open: boolean
  timeZone: string
}

export type ProDesignItem = {
  id: number
  name: string
  code: string
  createdAt: string
  shortId?: string
  image: string
  status: string
  design: Design
  project: ProDesignProject
  product: Product
  notifications: number
  messages: ProDesignMessage[]
}

export type ProDesignProject = {
  id: number
  name: string
  shortId: string
  teamSize: number
  status: string
  totalDesigns: number
  createdAt: string
  notes: string
  inspiration: ProjectInspiration[]
  palette: ProjectPalette[]
  files: UserFiles[]
  updatedAt: string
  designs: ProDesignItem[]
  customer: string
}

export type ProDesignMessage = {
  id: number
  createdAt: string
  type: string
  message: string
  file?: string
  code?: string
  design?: string
  requireAnswer?: boolean
  answer?: ProDesignMessage
  parentMessageId?: number
  userName?: string
}

export type ProjectInspiration = {
  id: number
  name: string
  image?: string
  tags: string
}

export type ProjectPalette = {
  id: number
  short_id: string
  name: string
  primaryColor: string
  accent1: string
  accent2: string
  accent3: string
}

export interface GenderType {
  id: number
  name?: string
  gender?: string
}

export type UpgradeItem = {
  id: number
  short_id: string
  enabled: boolean
  name: string
  url: string
  product_id: number
  modal_image: string
  primary: boolean
  mobile_image: string
  options: UpgradeOptions[]
}

export type UpgradeOptions = {
  id: number
  usd: number
  short_id: string
  cad: number
  aud: number
  name: string
  eur: number
  product_upgrade: string
  gbp: number
}

export type BreadRoute = {
  label: string
  url?: string
  icon?: string
  selected?: boolean
}

export type PositionSize = {
  width: number
  height: number
  rotation: number
  horizontal: number
  vertical: number
}

export type HomePageBatch = {
  method: string
  result: string
}

export type DesignLabInfo = {
  cutOffDays: string
  deliveryDays: string
  tutorialPlaylist: string
}

type ExtraFile = {
  white: string
  black: string
}

export interface Product {
  id: number
  active: boolean
  code: string
  shortId?: string
  images: ImageType[]
  contentTile?: string
  type: string
  material_banner?: string
  pictures?: any[]
  mediaFiles?: object[]
  description: string
  branding?: string
  predyedlabel?: string
  hasPredyed?: boolean
  productMaterials?: object[]
  designCenter?: boolean
  priceRange: PriceRange[]
  collections: number
  isTopProduct: boolean
  relatedItemTag?: string
  customLink?: string
  categoryName?: string
  details: string | string[]
  specs: string
  materials?: string | string[]
  season?: string
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
  onlyProDesign?: boolean
  unitPrice?: number
  sizeRange: ItemDetailType[]
  obj?: string
  mtl?: string
  themes?: Theme[]
  tags?: string
  label: string
  sports?: any[]
  flatlock: string
  bumpMap: string
  binding?: ExtraFile
  zipper?: ExtraFile
  bibBrace?: ExtraFile
  weight: number
  relatedProducts: Product[]
  isCustom?: boolean
  colors?: ProductColors[]
  mpn?: string
  twoPieces?: boolean
}

export type DesignType = {
  id: number
  code: string
  name: string
  shared: boolean
  shortId?: string
  visible?: boolean
  product: Product
  colors: ColorBlock[]
  image: string
  createdAt: string
  style: Style
  flatlockColor: string
  flatlockCode: string
  bindingColor: string
  bibBraceColor: string
  zipperColor: string
  canEdit: boolean
  styleId: number
  outputSvg: string
  canvas: string
  proDesign?: boolean
  highResolution?: boolean
  outputPng?: string
}

export type DesignNote = {
  createdAt: string
  user: string
  text: string
}

export type Reseller = {
  status: string
  paypalAccount: string
  comission: number
  inline: number
  margin: number
  activatedAt: string
}

export type AffiliateStatus = {
  enabled: boolean
}

export type Affiliate = {
  status: string
  paypalAccount: string
  comission: number
  activatedAt: string
}

export type ResellerPayment = {
  id: number
  userId: string
  createdAt: string
  status: string
  amount: number
  receipt: string
  paypalAccount?: string
  comission?: number
  name?: string
  store?: string
  orderId?: string
  customerId?: string
  currency?: String
  totalOrigin: number
  netsuite?: NetsuiteObject
  orderCurrency?: String
  orderStatus?: string
  customerName?: string
  orderAmount: number
  paidAt?: string
}

export type AffiliatePayment = {
  id: number
  userId: string
  createdAt: string
  status: string
  amount: number
  receipt: string
  paypalAccount?: string
  comission?: number
  name?: string
  store?: string
  orderId?: string
  customerId?: string
  currency?: String
  totalOrigin: number
  netsuite?: NetsuiteObject
  orderCurrency?: String
  orderStatus?: string
  customerName?: string
  orderAmount: number
  paidAt?: string
}

export type AffiliatesResult = {
  fullCount: number
  payments: AffiliatePayment[]
}

export type SaveDesignType = {
  designBase64: string
  canvasSvg: string
  canvasJson: string
  styleId: number
  highResolution: boolean
}

export type ModelVariant = {
  id: string
  name: string
  icon: string
  default: boolean
  label: string
  bumpMap: string
  obj: string
  mtl: string
  branding: string
  flatlock: string
  bibraceWhite: string
  bibraceBlack: string
  zipperWhite: string
  zipperBlack: string
  bindingWhite: string
  bindingBlack: string
}

export type PredyedColor = {
  id: string
  name: string
  code: string
}

export interface SaveDesignData {
  createdAt: string
  designCode: string
  designId: number
  designImage: string
  designName: string
  product: Product
  shared: boolean
  shortId: string
  svg: string
  canvas: string
  bibBraceColor: string
  bindingColor: string
  flatlockCode: string
  flatlockColor: string
  zipperColor: string
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
  priceRange?: Currency[]
  pricesByCurrency?: PricesByCurrency
  loading?: boolean
}

export type LockerTableType = {
  design: DesignType
  design_id?: string
  id?: number
  totalOrders: number
  visible: boolean
  priceRange?: Currency[]
  resellerRange?: Currency[]
}

export type ProductTableType = {
  product: Product
  visible: boolean
}

export type DesignCopyResult = {
  id: number
  design: DesignType
}

export type ProAssistStatus = {
  enabled: boolean
}

export type ProductTiles = {
  id: number
  contentTile: string
  title: string
  image: string
  loading: boolean
}

export type DesignResultType = {
  fullCount: string
  designs: DesignType[]
  userName?: string
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

export type TeamStoreAdminResultType = {
  fullCount: number
  teamStores: TeamStoreAdminType[]
}

export type SelectedPays = {
  [key: string]: boolean
}

export type TeamStoreAdminType = {
  id: number
  name: string
  cutoffDate: DateObjectType
  deliveryDate: DateObjectType
  private: boolean
  createdAt: string
  items: TeamStoreItemtype[]
  priceRanges: ItemDetailType[]
  featured: boolean
  userFirstName: string
  userLastName: string
  onDemand: boolean
  cutOffDateString: string
  shortId: string
  display: boolean
  accountManager?: User
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

export type EditDesign = {}

export interface Style {
  id: number
  name: string
  image: string
  colorBlocks: ColorBlock[]
  colorIdeas: DesignObject[]
  accessoriesColor?: EditDesign
  designId?: string
  styleId?: number
  thumbnail?: string
  canvas: string
}

export interface StyleConfig {
  colorIdeas: Palette[]
  config: ColorConfig
  design: Palette
}

export interface ColorConfig {
  areasPng: string[]
  areasSvg: string[]
  size: {
    width: number
    height: number
  }
}

export interface Theme {
  id: number
  name: string
  image: string
  itemOrder: number
  styles: Style[]
}

export interface ThemeResult {
  fullCount: string
  themes: Theme[]
}

export interface UsersResult {
  fullCount: string
  users: User[]
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
  width: number
  height: number
  colors: ColorBlock[]
  size: {
    width: number
    height: number
  }
  itemOrder: number
  canvas: string
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
  administrator: boolean
  permissions: UserPermissions
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

export type ProductPicture = {
  gender_id?: number
  front_image?: string
  back_image?: string
  left_image?: string
  right_image?: string
  toUpload?: object | boolean
  color_id?: number
}
export type TypePicture = {
  id: string
  name: string
  images: BlockImage[]
  thumbnail: BlockImage
}
export type FileUploaded = {
  id: string
  imageUri: string
}
export interface TeamstoreResult {
  fullCount: string
  teamStores: TeamstoreType[]
}

export type ItemDetailType = {
  id?: number
  name?: string | boolean
  gender?: string
}

export type BlockImage = {
  name?: string
  label?: string
  src?: string
  index?: number
}

export type BlockProduct = string[] | BlockImage[]

export type ProductImage = {
  genderName?: string
  genderId?: number
  genderBlockImages: BlockProduct[]
}

export type ProductFile = {
  id: number
  url?: string
  urlMobile?: string
  isVideo?: boolean
  active?: boolean
  toUpload?: Blob | boolean
  extension?: string
  name?: string
}

export type CartItemDetail = {
  gender?: ItemDetailType
  size?: ItemDetailType
  fit?: ItemDetailType
  color?: ItemDetailType
  label?: string
  quantity: number
  colorImage?: string
  variableOneValue?: string
  variableTwoValue?: string
  topSize?: ItemDetailType
  bottomSize?: ItemDetailType
  firstUpgrade?: ItemDetailType
  secondUpgrade?: ItemDetailType
}

export interface AddressType {
  id?: number
  firstName: string
  lastName: string
  street: string
  apartment: string
  country: string
  stateProvince: string
  stateProvinceCode: string
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

export interface ModelDesign {
  name: string
  image?: string
  colors: string[]
  canvas?: string
}

export interface ModelConfig {
  obj: string
  mtl: string
  bumpMap: string
  flatlock?: string
  brandingSvg?: string
  brandingPng?: string
  label: string
  size: {
    width: number
    height: number
  }
  areasSvg: string[]
  areasPng: string[]
  bibBraceBlack?: string
  bibBraceWhite?: string
  bindingWhite?: string
  bindingBlack?: string
  zipperWhite?: string
  zipperBlack?: string
  bibBrace?: ExtraFile
  binding?: ExtraFile
  zipper?: ExtraFile
}

export interface CartItems {
  product: Product
  itemDetails: CartItemDetail[]
  productTotal?: number
  unitPrice?: number
  designId?: string
  designName?: string
  designImage?: string
  designCode?: string
  teamStoreId?: string
  teamStoreItem?: string
  bibBraceColor?: string
  isReseller?: boolean
  flatlockCode?: string
  zipperColor?: string
  bindingColor?: string
  flatlock?: string
  preflightCheck?: boolean
  fixedPrices: PriceRange[]
  teamStoreName?: string
  fixedCart?: boolean
}

export interface ProductPrice {
  yotpoId: string
  price: number
  quantity: number
  designId: string
}
export interface CreditCardData {
  id?: string
  name?: string
  last4: string
  brand: string
  expMonth: number
  expYear: number
  defaultPayment?: boolean
  pendingOrder?: boolean
}

export interface IbanData {
  id?: string
  name: string
  email: string
  last4: string
}

export interface OrderHistory {
  id: number
  shortId: string
  date: string
  estimatedDate?: string
  status: string
  pendingChecks: number
  netsuite?: NetsuiteObject
  clientId?: string
  firstName?: string
  total?: number
  currency?: Currency
  lastName?: string
  netsuiteAttempts: number
  source?: string
  cutoffDate?: string
}

export interface OrderPreflight {
  id: number
  pendingChecks: number
}

export interface Discount {
  id?: number
  code: string
  discountItemId: string
  type: string
  rate: number
  expiry: string
  active?: boolean
  restrictionType: string
  selectedProducts: number[]
  user: string
  selectedUsers: string[]
  usageNumber: number
}
export interface FulfillmentNetsuite {
  packages: string
}

export interface OrderStatusNetsuite {
  orderStatus?: string
  fulfillments?: FulfillmentNetsuite[]
}

export interface NetsuiteObject {
  orderStatus: OrderStatusNetsuite
}

export interface PaymentCharges {
  stripeCharge: {
    ibanData?: IbanData
    cardData?: CreditCardData
  }
}

export interface OrderDetailsInfo {
  shortId: string
  orderDate: string
  estimatedDate: string
  paymentMethod: string
  shippingFirstName: string
  shippingLastName: string
  shippingStreet: string
  shippingApartment: string
  shippingPhone?: string
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
  netsuite?: NetsuiteObject
  payment: PaymentCharges
  cart: CartItems[]
  status: string
  currency: Currency
  taxAmount: number
  shippingAmount: number
  proDesign: boolean
  taxGst?: number
  taxPst?: number
  taxVat?: number
  taxFee?: number
  total?: number
  discount?: number
  teamStoreId?: string
  lastDrop?: boolean
  teamStoreName?: string
  canUpdatePayment?: boolean
  onDemand?: boolean
  email?: string
  coupon?: string
}

export interface OrderDataInfo {
  orderDate: string
  estimatedDate: string
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
  payment: PaymentCharges
  cart: CartItems[]
  paymentMethod: string
  currency: Currency
  shippingAmount: number
  taxAmount: number
  proDesign: boolean
  taxGst?: number
  taxPst?: number
  taxVat?: number
  taxFee?: number
  total?: number
  discount?: number
  confirmed?: boolean
  status?: string
  lastDrop?: string
  teamStoreName?: string
  teamStoreId?: string
  coupon?: string
}

export interface TextFormat {
  fontFamily: string
  stroke: string
  fill: string
  strokeWidth: number
  textAlign: string
  charSpacing: number | undefined
  fontSize: number
  lineHeight: number
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
  fileId?: number
  src?: string
  canvasPath?: string
  lock: boolean
}

export interface SelectedAsset {
  id?: number
  type?: string
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
  retailMen: boolean
  retailWomen: boolean
}

export interface NetsuiteTax {
  internalId: string
  rate: number
  countryCode: string
  ratePst: number
  rateGst: number
  state: string
  zip: string
  total: number
  countrySub: string
}

export interface NetsuiteShipping {
  internal_id: string
  subsidiary: string
  name: string
  carrier: string
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
  hidden?: boolean
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

export interface RenameDesignModal {
  openRenameModal: boolean
  designId: string
  designName: string
  modalLoading: boolean
  newName: string
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
  id: number
  code: string
  image: string
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
  itemOrder: number
}

export interface Country {
  name: string
  code: string
  geonameId: string
}

export interface CountryRegion {
  region: string
  code: CountryCode
}

export interface CountryCode {
  shortCode: string
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
  name?: string
}

export type MessagePayload = {
  data: {
    message: string
  }
}

export type ProAssistItem = {
  proAssistId: string
}

export type StitchingColor = {
  name: string
  value: string
}

export type HiddenSymbols = {
  [id: string]: boolean
}

export type AccesoryColor = 'black' | 'white'

export type AccessoriesColor = {
  flatlockColor: string
  flatlockCode: string
  bindingColor: string
  bibBraceColor: string
  zipperColor: string
}
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

export interface AddressObj {
  country: string
  state: string
  zipCode: string
}

export type TaxAddressObj = AddressObj | ''

export type CanvasDragged = {
  id: string
  oldLeft: number
  oldTop: number
  left: number
  top: number
}

export type SelectedFonts = {
  [id: string]: boolean
}
export type CanvasRotated = {
  id: string
  oldRotation: Rotation
  newRotation: Rotation
  currentTransform: CurrentTransform
}

type Rotation = {
  x: number
  y: number
}

type CurrentTransform = {
  originX: 'center'
  originY: 'center'
  ex: number
  ey: number
  theta: number
}

export type Responsive = {
  desktop: boolean
  fakeWidth: number
  mobile: boolean
  phone: boolean
  tablet: boolean
}

export interface Inspiration {
  name: string
  image: string
  colors: string[]
}

export interface OrderSearchResult {
  code: string
  name?: string
  image: string
  status: string
  svgUrl?: string
  preflightCheck?: boolean
  assets: FilesDownload
  bibColor?: AccesoryColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  stitchingValue?: string
  stitchingName?: string
  shortId: string
  pdfUrl?: string
  product: Product
  pngUrl?: string
  salesRep?: User
  accountManager?: User
  notes?: DesignNote[]
}

export interface FilesDownload {
  files: UserFiles[]
  svgs: UserFiles[]
}

export interface UserFiles {
  fileUrl: string
  original?: string
}

export interface DesignFiles {
  files: number[]
  svgs: number[]
}

export interface CanvasFile {
  fileId: number
  src?: string
  canvasPath?: string
}

export interface ProductColors {
  id: number
  name: string
  image: string
}

export interface ProductSize {
  id: number
  name: string
}

export interface Colors {
  colors: string
  stitchingColors: string
}
export interface CouponCode {
  code: string
  type: couponType
  discountAmount?: string
  rate?: string
  restrictionType?: string
  products?: string[]
}

export interface Message {
  id: string
  defaultMessage: string
}

export interface Index {
  index: number
}
type couponType = '%' | 'flat'

export interface Font {
  id?: number
  family: string
  active?: boolean
}

export interface SimpleFont {
  font: string
}

export interface UserInfo {
  name: string
  email: string
  phone: string
  message: string
  mailingAddress: string
  city: string
  state: string
  zipCode: string
  country: string
}
export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  socialMethod: string
  administrator: boolean
  netsuiteId?: string
  billingCountry?: string
  createdAt?: string
  shortId?: string
  role?: string
  salesRep?: User
  affiliated?: boolean
  accountManager?: User
  affiliateId?: String
}

export interface Role {
  id: string
  name: string
}

export interface DesignSearchCode {
  code: string
  name?: string
  image?: string
  id?: number
  shortId?: string
}

export interface NavbarSports {
  name: string
  menuOpen: boolean
  route: string
}
export interface SimpleCart {
  id: number
  quantity: number
}

export interface SportType {
  id: number
  name: string
  active: boolean
  catalogue: boolean
  route: string
  navbar: boolean
}

export interface ProductInternal {
  id?: number
  internalId: number
  productCode: string
  gender: string
  size: string
  topSize?: string
  bottomSize?: string
  fitStyle?: string
  color?: string
  predyedColor?: string
  frontZipper?: string
  pocketZipper?: string
  binding?: string
  bibBrace?: string
  collection?: string
  model?: string
}

export interface PricesByCurrency {
  [currency: string]: number
}

export interface ProductInternalInput {
  id?: number
  internal_id: number
  product_code: number
  gender: string
  size: string
  fit_style?: string
  color?: string
  front_zipper?: string
  pocket_zipper?: string
  binding?: string
  predyedColor?: string
  bib_brace?: string
  collection?: string
  model?: string
}
export interface HeaderImagePlaceHolder {
  id?: number
  desktopImage?: string
  mobileImage?: string
  url?: string
  sport_id?: string | null
  assetType?: string
}

export interface HeaderImageResponse {
  id?: number
  image?: string
  image_mobile: string
  link?: string
  sport_id?: string
  type?: string
}

export interface ProductTilePlaceHolder {
  id?: number
  title?: string
  contentTile?: string
  image?: string
  sport_id?: string | null
}

export interface BasicColor {
  id: number
  name: string
}
export interface ProductInternalsInfo {
  basicColors: BasicColor[]
  frontZipperColors: BasicColor[]
  products: String[]
  predyedColors: PredyedColor[]
  genders: GenderType[]
  sizes: ProductSize[]
  fitStyles: FitStyle[]
  colors: ProductColors[]
  collections: CollectionType[]
}

export interface CollectionType {
  name: string
}

export interface HomepageImagesType {
  id: number
  desktopImage: string
  mobileImage: string
  url: string
}

export type Color = {
  name: string
  value: string
  type?: string
}

export type RolePermission = {
  page: string
  edit: boolean
  view: boolean
}

export type UserPermissions = {
  [page: string]: RolePermission
}

export interface SelectedDesignType {
  design: DesignType
  visible: boolean
}

export interface SelectedDesignObjectType {
  [designId: number]: SelectedDesignType[]
}
export type AspectRatio = {
  name: string
  value: number
}

export type ContactInformation = {
  name: string
  email: string
  phone: string
}

export type CarouselSettings = {
  duration: string
  transition: string
}

export interface ProductSearchResult {
  name: string
  code: string
}

export interface ColorAccessories {
  stitching: string
  stitchingName: string
  predyed: string
  zipperColor: AccesoryColor
  bibColor: AccesoryColor
  bindingColor: AccesoryColor
}

export interface UserSearchResult {
  id: string
  shortId: string
  name: string
  email: string
  netsuiteId?: string
}

export interface HomepageCarousel {
  slideTransition: string
  slideDuration: number
  secondarySlideTransition: string
  secondarySlideDuration: number
}

export interface PaymentIntent {
  paymentClientSecret: string
  intentId: string
}

export interface UserDiscount {
  text: string
  value: string
  email: string
  netsuiteId: string
  name: string
}

export interface ProductsCodes {
  products: string[]
}

export interface Header {
  message: string
  width?: number
  tabletWidth?: number
  fieldName?: string
  dataType?: string
}

export interface ColorsDataResult {
  colorsResult: Colors
  loading?: boolean
}

export type Thumbnail = {
  style: {
    image: string
  }
}

export type Design = {
  design: {
    message: string
  }
}

export type ProAssist = {
  shortId: string
  userId: string
  firstName: string
  lastName: string
  date: string
  lastOrder: string
  status: string
  url: string
}

export type PriceRangeProgress = {
  minQuantity: number
  maxQuantity: number
  range: number
  index: number
  price: number
}

export type AccountManagerName = {
  first_name: string
  last_name: string
}

export type SubsidiarySCA = {
  subsidiary: number
  sca: boolean
}

export type DeliveryDays = {
  deliveryDays: string
}

export type InspirationType = {
  id: number
  name: string
  image: string
  width?: number
  height?: number
  selected?: boolean
  assetType?: string
  tags?: string[]
}

export type ProDesignPalette = {
  id: number
  name: string
  primary: string
  accent1: string
  accent2: string
  accent3: string
  fromAdmin: boolean
}

export type Notification = {
  id: string
  senderId: string
  notificationType: string
  toAdmin: boolean
  read: boolean
  date: string
  title: string
  message: string
  url?: string
}

export type PushNotificationData = {
  id: string
  senderId: string
  toAdmin: string
  title: string
  message: string
  url?: string
}

export type Project = {
  id: number
  shortId: string
  name: string
  status: string
  lastUpdated: string
  createdAt: string
  designs: ProDesignItem[]
  totalNotifications?: number
  updatedAt?: string
}

export type ProjectsResult = {
  fullCount: number
  projects: Project[]
}
