/**
 * App Global Constants
 */
import { WHITE } from './theme/colors'

/* 3D Constants */
export const MESH_NAME = 'mesh'
export const DEFAULT_COLOR = WHITE
export const DEFAULT_FONT = 'Advent Pro'
export const FLATLOCK = 'FINAL JV2_Flatlock'
export const MESH = 'FINAL JV2_Design_Mesh'
export const RED_TAG = 'Red_Tag FINAL'
export const ZIPPER = 'FINAL JV2_Zipper'
export const BINDING = 'FINAL JV2_Binding'
export const BIB_BRACE = 'FINAL JV2_Bib_Brace'
export const PROPEL_PALMS = 'FINAL Palms'
export const GRIP_TAPE = 'FINAL Grip_Tape'
export const SOLAR_BIB_BRACE = 'FINAL Solar_Bib_Brace'
export const DPI = 96
export const CM_PER_INCH = 2.54
export const REGULAR_CANVAS = 1024
export const HIGH_RESOLUTION_CANVAS = 2048
export const PHONE_POSITION = -3
export const PHONE_FIELD = 'phone'
export const VARIABLE_PRICE = 10.00
export const AMBIENT_LIGHT_INTENSITY = 0.2
export const DIRECTIONAL_LIGHT_INTENSITY = 0.9
export const ILLUSTRATOR_PIXELS_PER_CM = 28.346
export const TABLET_RES = 768
export const DESKTOP_RES = 1024
export const PHONE_MINIMUM = 7

/* Date formats */
export const DATE_FORMAT = 'MM/DD/YYYY'
export const DATE_FORMAT_STARTING_YEAR = 'YYYY-MM-DD'

/* Accesories color */
export const ACCESSORY_WHITE = 'white'
export const ACCESSORY_BLACK = 'black'
export const PREDYED_TRANSPARENT = 'white'
export const PREDYED_DEFAULT = 'black'

/* Routes  */
export const DEFAULT_ROUTE = '/us?lang=en&currency=usd'

/* Prodesign Message status */
export const EDIT = 'edit'
export const NEW_PRODUCT = 'new'
export const FROM_ADMIN = 'admin'
export const PROJECT_MESSAGE = 'PROJECT_MESSAGE'
export const PROJECT_REVIEW = 'PROJECT_REVIEW'

/* Prodesign Design status */
export const PREFLIGHT_STATUS = 'preflight'
export const ISSUE = 'issue'
export const IN_DESIGN = 'in_design'
export const AM_REVIEW = 'am_review'
export const CUSTOMER_PREVIEW = 'customer_preview'
export const EDITING = 'editing'
export const CUSTOMER_APPROVED = 'approved'

// MIME Types
export const GIF_TYPE = 'image/gif' // .gif
export const PNG_TYPE = 'image/png' // .png
export const BMP_TYPE = 'image/bmp' // .bmp
export const TIFF_TYPE = 'image/tiff' // .tif, .tiff
export const JPEG_TYPE = 'image/jpeg' // .jpeg
export const JPG_TYPE = 'image/jpg' // .jpg
export const PHOTOSHOP_TYPE = 'image/vnd.adobe.photoshop' // .psd

// Status Labels
export const itemLabels = {
  [PREFLIGHT_STATUS]: 'Pending',
  [CUSTOMER_PREVIEW]: 'Ready for Review',
  [CUSTOMER_APPROVED]: 'Approved',
  [IN_DESIGN]: 'In Design'
}

/* Link Types */
export const LINK_TYPE_ROUTE = 'route'
export const LINK_TYPE_URL = 'url'

/* Tag Manager Events */
export const SELECTED_COLOR = 'selectedColor'
export const SELECTED_SYMBOL = 'symbolAdded'
export const SELECTED_FONT = 'selectedFont'
export const SELECTED_DESIGN = 'selectedDesign'
export const NEW_USER = 'newUser'
export const NEW_DESIGN_SAVED = 'newDesignSaved'
export const COLOR_COMBO_SELECTED = 'colorComboSelected'
export const SELECTED_THEME = 'themeSelected'
export const SELECTED_PRODUCT = 'productSelected'
export const PURCHASE = 'purchase'

/* Orders status */
export const PAYMENT_ISSUE = 'Payment Issue'
export const PAID_STATUS = 'Paid'
export const ERROR_STATUS = 'Error'
export const INVOICE_SENT = 'Invoice Sent'
export const PENDING_APPROVAL = 'Pending Approval'
export const PURGED = 'Purged'
export const SHIPPED = 'Shipped'
export const PARTIALLY_SHIPPED = 'Shipped / Partially Shipped'
export const PREORDER = 'Pre-Order'
export const CANCELLED = 'Cancelled'
export const ERROR = 'Error'

/* Quantity */
export const PERSONAL = 'Personal'
export const MESSAGE_TIME = 4

/* File extensions */
export const PNG_EXTENSION = '.png'
export const MP4_EXTENSION = '.mp4'

/* Keys Constants */
export const KEY_ENTER = 'Enter'

/* Edit Main Navigation constants */
export const CATALOGUE_CONSTANT = 'catalogue'
export const NAVBAR_CONSTANT = 'navbar'
export const ACTIVE_CONSTANT = 'active'

export const MAIN_TITLE = 'Online Jersey Design Center - Designlab by Jakroo'

/* Zoom Size Products */
export const MODEL_SIZES = {
  small: 120,
  medium: 140,
  large: 170,
  xLarge: 200
}

// Affiliate status
export const PENDING = `Pending approval`
export const APPROVED = 'Approved'
export const REJECTED = 'Rejected'
export const RETRY = 'Retry'
export const PAUSED = 'Paused'

// Affiliate payment status
export const PENDING_PAY = 'Pending'
export const TO_PAY = 'To Pay'
export const PAID = 'Paid'
export const PROCESSING = 'Processing'
export const FAILURE = 'Failed payment'

// Dates format
export const SIMPLE_DATE_FORMAT = 'DD-MM-YY'

// Simple table headers data types
export const DATE = 'date'

// Mime Types
export const DOC_TYPE = 'application/msword' // .doc
export const ZIP_TYPE = 'application/zip' // .zip
export const DOCX_TYPE = 'application/application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
export const PDF_TYPE = 'application/pdf' // .pdf

// BASE 64 Images
// tslint:disable-next-line: max-line-length
export const JAKROO_LOGO_BASE64 = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABGAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzAxNCA3OS4xNTY3OTcsIDIwMTQvMDgvMjAtMDk6NTM6MDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE0IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQwNkQ3OTlDRjkyNDExRTVCOTQ2Q0U1ODlGOUE0NDBCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQwNkQ3OTlERjkyNDExRTVCOTQ2Q0U1ODlGOUE0NDBCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTJDRDM3MjdGOTIzMTFFNUI5NDZDRTU4OUY5QTQ0MEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTJDRDM3MjhGOTIzMTFFNUI5NDZDRTU4OUY5QTQ0MEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAEAwMDAwMEAwMEBgQDBAYHBQQEBQcIBgYHBgYICggJCQkJCAoKDAwMDAwKDAwNDQwMEREREREUFBQUFBQUFBQUAQQFBQgHCA8KCg8UDg4OFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCACgAlgDAREAAhEBAxEB/8QAzwABAAICAwEBAAAAAAAAAAAAAAgJBgcDBAUCAQEBAAIDAQEBAAAAAAAAAAAAAAUGBAcIAwIBEAABAwMCAwEEEg8GBQQDAAABAAIDBAUGEQchEggxQVEiE2GB0TJCsxRU1BV1lbVWN1cYOHFS0pPTdJS0haU2dhcJGZGxsiMzQ6FiciQWgqJjJVNEhBEBAAECAgUDDg4CAgMBAAAAAAECAwQFESExQQZRgRJhcZGhscHRIjJS0hM0FfDhcoKislOTsxRUNRYHQmKS4vHCIzP/2gAMAwEAAhEDEQA/AJ/ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgxTcvM49vcFveYSQiodbIA6CAkhr55nthha4jiGmR7ebTuLHxN71Nua+RM5Lls5jjbeGidHTnXPJERpq7USrwvW9+7V9uEtxqMwutK+VxIgt9XNQ07AexrYqdzGgD7GvfKpNeNv1TpmueadDqDDcMZXYtxRGHt1aN9VMVT2aomXn/xX3S+O9/99a38KvP81e8+rsyyfcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHon8V90vjvf/fWt/Cp+avefV2ZPcGW/prP3dHouWm3g3WpJ46iLNr46SMhzRNcamaMkfbMlkc1w8hwX1GLvROnp1dmXxXw7lldMxOHta+SimO3EaU7OnrdKu3TwU3G8tYMgtlQaC4yRtDGTEMa9kwaODeZrtHAcOYHQAaBW7L8VN+3pq2xqlzrxfkVGVY3oW//AM646VPU16Jp5u5MNsqSUoQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBBqHqh+QvKv0f8JUqjMz9mq5u7C8cDfvVj5/4dauRUd1MICAgINh7TbPZNu3eX0No0pLTS6G5XiZpdBA13Y0Aac8jvQsB+yQOKzcJg68RVojVG+VYz/iLD5Ra6Vzxq6vJojbPgjlnupMu6J8H9QeLbkd1F05dPVJFMafm7/ifFh2nkeN8tT/ALlt6PKnTzNSR/ZmM6en1Vvocnjaf+WnR9FGHdXaTJtpr222XtoqbdU6utt2haRBUMb2jjryvbr4bCeHkjQmv4rCV4erRVs3S27kPEGHzez07WqqnyqJ20+GOSe/qYCsNZRAQEBAQEE1+iX9kcn90ovSArXkvkVddoH+zfarPyJ+slErA0+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg1D1Q/IXlX6P8AhKlUZmfs1XN3YXjgb96sfP8Aw61cio7qYQEBBsjZ7Z2/7t371HRc1Hj9I5pu13c3VkTDx5Ga8HSuHnW+WeCzsHg6sRVojVG+VU4i4jsZRY6VXjXKvIo5erPJTG+eaFiuIYhYMGsFJjeN0jaS2UjdGtHF8jz56SR3a57jxc4/3aBXezZptUxTTGpy7mGYX8dfqvXqulVV2upHJEMFi6hNuZtxnbcsrv8Aux/ksuurfULq7m0NKJNfP9wO86XeDrqsSMwtet9Xp592nkWGrhDHxgPznR1bej/l0fP0cnU26Nexm2aYXj+fY/VY1ktKKm3VI1BGglhlAPLLE7Q8r268D5R1BIWXes03aZpqjUgMtzK/l9+m/Yq6NVPYmOSeWJ+GtXRu5tHkO02QOttzaamz1Jc603djSIqiIdw9vLI30bNeHaNQQVR8XhKsPVonZul1Jw/xBYzex06PFrp8ujfTPfid099r1YSziAgICAgmv0S/sjk/ulF6QFa8l8irrtA/2b7VZ+RP1kolYGnxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEGoeqH5C8q/R/wlSqMzP2arm7sLxwN+9WPn/h1q5FR3UwgIOzbaGa6XGktlPp6orZo6aLXs55nhjdfLK+qaelMRyvG9di1bqrnZTEz2Na1HC8PsuB43QYvYIBDQUUYaXAAPmlI8OWQjte88SfK7FsOzZptURTTshxzmWY3sfiKr92dNVU9iN0R1IRn6kuox9K+t26wGpLalpdTX69RHQxkeC+mgcPRdyR47POjjqRA5jmOjTbt8895trgvg2KopxmLjVtt0Tv5Kqup5sc8oe9nHuqsN5JldOHUf7Y+pNvtwav/AOx8GCyXud3+v3G09Q4/7ncY8+f7D4WhdaMuzHTot3J17p70tEcZcG+r6WLwlPi7a6I3f7U9TljdtjVskjmWG4/nuP1WNZLSiqttUPsSRSDXllidoeV7deB8o6gkKdvWabtM01Rqaqy3Mr+Av037FXRqp7ExyTyxPw1q593dosg2lyA264g1Vlqi51ou7W6R1EY9C7t5ZG6+GzyxqCCqPi8JVh6tE7N0upOHuIbGb2OnR4tdPl0b6Z79M7p77XiwloEBAQEE1+iX9kcn90ovSArXkvkVddoH+zfarPyJ+slErA0+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg1D1Q/IXlX6P+EqVRmZ+zVc3dheOBv3qx8/8ADrVyKjuphAQc1JVT0NVBW0zuSpppGTQv+1fG4OafKIX7E6J0w+LlEV0zTVsmNE86z7a7cqx7o4tTZBaJGtq2tbHdbfr/AJlLVaeExw7eUnUsd6Jvk6gX/C4mm/R0o5+o5Dz3Jb2V4mbNyNX+NW6qnl6/LG6Wquojp3gzuCfMsNgZDmcLOarpG6MZcWMHlATADwXei7D3CI/MMvi7HTo8ru/GuXB/GFWAqjDYmdNmdk+Z/wBeWN22EFJ4J6WeWmqYnw1ML3RzQyNLHsew6Oa5p0III0IKqExMTol0XRXTXTFVM6YnZLj7OI7V+PpMjpx6kPV5pNv9wqv/AL7wYLJfJ3f63cbBUOPo+4yQ+e7HeFoXWjLsx06Ldyde6e9LRPGXBnq+li8HT4u2uiN3+1PU5Y3bY1bJJ5lhuP57j9VjWS0oqrbVD7EkUg15ZYnaHle3XgfKOoJCnb1mm7TNNUamqctzK/gL9N+xV0aqexMck8sT8Naufd3aLINpcgNuuINVZaoudaLu1ukdRGPQu7eWRuvhs8saggqj4vCVYerROzdLqTh7iGxm9jp0eLXT5dG+me/TO6e+14sJaBAQEE1+iX9kcn90ovSArXkvkVddoH+zfarPyJ+slErA0+ICAgICDX1z322Ystxq7Rd8+sNDdaCZ9NW0dRcKeOaGeJxa9j2OeC1zSCCCg5bHvZtDkt1prFj2c2S6XmtcWUlBSV8E08rg0uIYxjySdATwQZ4gICAg1/dd89mrFcqqzXnPbDQ3WhldT1lFUXGnjmhmjOjmPa5+rXNPAg9iDsY9vLtNlt2gsOMZrZbveqkPNPb6KvgnqJBG0vfyMY8k8rWlx07gQZwgICAg1/dd89mrFcqqzXnPLFQXahldT1lFU3CnimhmjOjmPY54LXA9oKD6s29+z2RXSlslhzqx3K8VrxFR0NLcKeWeWQjXlYxrySeHcQZ8gIOjeb1Z8dtlTer/AF9Pa7PRs8ZV19ZKyCCJnZq97yGjidOJQYD9InYf5yMc986b7tA+kTsP85GOe+dN92gzfHslsGW2uK+Yxcqe7WacubBX0cjZoJCw6O5Ht1DtDwOh7UHJfr/ZMXtNTfsjuFParLRhrqu4VkjYKeIPcGNL3vIA1c4NGvdKDBPpE7D/ADkY575033aB9InYf5yMc986b7tA+kTsP85GOe+dN92gfSJ2H+cjHPfOm+7QPpE7D/ORjnvnTfdoMjxncvbrM5TT4jllnvlSAXOp7dX01VMAO6Y4nucPLCDKUBB8SyxQRvmme2OGNpfJI8hrWtaNSSTwACDAa/fbZS1zOpq/cTHIahh0fCbtRl7T3nNbKSPLQdT6ROw/zkY575033aB9InYf5yMc986b7tA+kTsP85GOe+dN92gfSJ2H+cjHPfOm+7Qdy376bLXWZtNb9w8cnqXnSOFt2oxI495rTKCfKQZ9HJHLG2WJwfE8BzHtILXNI1BBHaCg+kHgZHnWE4c1jsuyS12ESDmj9tK2nouYdng+OezXykGJnqI2IBIO5GOajvXSlP8Ac9B+fSJ2H+cjHPfOm+7QPpE7D/ORjnvnTfdoH0idh/nIxz3zpvu0H63qH2Ic4NG5GOanv3SlA/tMiDMMdzLEMvhfUYnkFtvsEehkktdZBWtbr3zC9+nloPbQEBAQEBAQah6ofkLyr9H/AAlSqMzP2arm7sLxwN+9WPn/AIdauRUd1MICAgyvbzcPI9s8jgyPHJ+WRujKukeSYKqAnV0UrR2g9w9rTxCycPiK7NfSp/8AKFzjJ8PmeHmzejVunfTPLHw1rG9s9zMc3SxyK/2CXllbpHcbdIQZ6WcjUseB2g9rHjg4eTqBeMNiaL9HSp545HLOd5JiMqxE2rsav8at1Ucsd+NzVPUN07U+ewz5jh0LIM0hZzVVI3RkdxYwdh7AJgB4LvRdju4RHZhl8XfHo8ru/GuXCHGFWAmMNiZ02J2Tvo/68sbtsciCdRT1FJUS0tVE+Cqge6KaGVpZIyRh0c1zToQQRoQVUJiYnRLouiumumKqZ0xOuJje41+PtMfpw6j/AFb6k2+3Bq/+98GCyXud3+r3G09Q4+j7kch892HwtC60ZdmOnRbuTr3T3paK4y4N6HSxmDp8XbXRG7/anqcsbtsatklMww7H87sFVjeS0jau21Q+xJFIAeWWJ3a17deBH2DwJCnb1mm7TNNUamp8uzG/gL9N6xV0aqexMck8sSrp3f2gv+0l/NBXg1Vjqi51ou7W6Rzxj0LvtZW+jZ5Y4KkYvCVYerROzdLqTh3iKxm9jp0eLcp8ujfE9+md099rpYK0iAgmv0S/sjk/ulF6QFa8l8irrtA/2b7VZ+RP1kolYGnxAQEBAQUkdQXy67k/vLdvzyVBknSL9Y/APx2b80nQXJoCAg1J1Ibx0uye1t0ylj2HIqoe1+OUz9D4y4TtPI8tPayJodK/vhvL2kIKYqurqq+rnrq2Z9RW1Uj56iolcXySSyOLnvc48SXE6koPQxjJLxh+Q2vKcfqDS3q0VMVbQzt9DLC4OGo7rTpo5p4EagoLsNodzLPu7t7Zc8s2jI7lCBWUgdzOpq2LwJ4Hd3wHg6E+ebo7sKDOEBAQUodR/wAvW4/7wXD09yD0Olf6w23vuqz/AAPQXPoNa7yb6YBsfYfbjMK3Wvna72rslMWvr6x7e5GwkaMB89I/Rre/roCFVe+vUdn++928ZfZ/a7FqaQvteNUj3epIe0B8h4GaXTtkeO/yhoOiDVVstlyvVwprTZ6SavulZI2GkoqWN008srzoGsYwFzie8AgsC6dugumofUmYb4xsqqwcs1Hh0bg+CM9oNdIwkSH/AOFh5PtnO1LQE7KampqKnio6OFlPSU7GxQQQtEcccbByta1rQAAANAAg0h1j/Vqz38XovhGmQU6oCAgICDmpauqoKmGtoZ5Kasp3tlgqIXujljkYdWuY5pBBB7CEFuHRpvFed39pfH5ROarKMdq3WmvrXf6lVG2NksE79PRlr+Rx9E5hd3UEiEFZXX7vFkF43Hl2nt1dLTYrjsFM+5UULyxlXcKqJtTzS8unO2OOSNrGng13Me08AhsgICAgICCan8v3eLILfn52juddLVYxe6Wons9JM8vFJX0jDUO8Tza8rJImyc7Rw5gD39Qm51C7j1O0+zuU5vb+X23oqdkFq5wHNFbWSspoXlp4ODHSeMLT2hqCl683q75FdKq936unuV3rZDNV11XI6aaWR3aXPcSSg6CAgICAg9bGsnyDDr3SZHi9xntV7oXiWlraV5jka4HsOnAtPY5rtWuHAghBdjs7nf8AE3a/Fs7exsdTeqCKasjj842rZrFUNb/yiVjw3yEGboCAgICAg1D1Q/IXlX6P+EqVRmZ+zVc3dheOBv3qx8/8OtXIqO6mEBAQEGV7ebh5HtnkcGR45Pyyt0ZV0jyTBUwE6uilaO0HuHtaeIWTh8RXZr6VP/lC5xk+HzPDzZvRq3Tvpnlj4a1jW2W5uN7p47HfbBLyTM5Y7jbpCPH0s5GvI8DtB9A8cHDydQLxhsTRfo6VPPHI5ZzvJMRlWIm1djV/jVuqjljvxuas6h+ninz6nmzDD4WQZrAzmqqVujI7jGwdh7AJgB4LvRedd3CI7MMvi7HTo8ru/GuXB/GFWX1Rh8ROmxOyfs/+vLG7bG+JgjUU9RSVEtLVRPgqoHuimhlaWSMkYdHNc06EEEaEFVCYmJ0S6LorprpiqmdMTriY3uNfj7TF6cupH1Z6k2+3Cq/+78GCyXyd3+r3GU9Q4+j7jJD57sdx4mz5dmOnRbuT1p70tF8ZcGdDpYvB06ttdEbuWqnqcsbtsatklsxw6wZ3j9XjWSUoqrbVt8gSRSDzssTtDyvaeIPlHUahT16zTdpmmqNTU2XZjfwF+m/Zq6NVPYmOSeWJVt7q7aXjavLajHLnrNSuHj7ZXgcrKmlcSGvA7jhpyvb3HeRoTRcVhqrFfRnmdW5DndrNcLF6jVOyqnzauTrck74YQsRYBBNfol/ZHJ/dKL0gK15L5FXXaB/s32qz8ifrJRKwNPiAgICAgpI6gvl13J/eW7fnkqDJOkX6x+Afjs35pOguTQEBBUT1i72/xg3SnpLRUeNwrFTJbbLyHWOeUOHqmqHcPjXtDWHuxsae6UGAbGbPXnfDcGjwm0y+pIHRSVd0uRYZGUtJCOL3NBGpc8sjaPtnDuIMLybHbtiGQ3TF79Aaa82eqloq6A+hmgeWO0PdadNWnujiglF0Ib3/APgOfO25vtTyYrmUrI6R0jtI6a8gBkLuPYJxpC7vu8X3AUFo6AgIKUOo/wCXrcf94Lh6e5B6HSv9Ybb33VZ/gegnh1I9aWM7VirxHADBkW4LeaKol18Zbra8cD45zT/mytP+0w+CfPkacpCsvLcwybO79V5Pl9znu99rXc1RWVLuZ2nca0DRrGN7GsYA1o4ABBmWzew24W+F69rMPoOW2QPDbnfaoOjoKRp4+HIAeZ5HnY2AuPe01IC0nYnpn292Jt7ZLRB7a5hNHyXDJqxjfVL9R4TIG8RBET6Bh1PonO0CDdCAg0X1j/Vqz38XovhGmQU6oLEOgPbfbvMtqshuOX4jZcguEOQzU8NXdrdSV0zIRRUjxG188b3Boc5x5QdNSUErv4E7IfNpinvFbvwCB/AnZD5tMU94rd+AQav6i9jNnaXZLOLpbMEsVqutstNTXUNfbbbS0NRFPTM8YwiSnjY7TVuhGuhHAoKkUFjf8tUn/wAOzsa8PbOj4f8A870E40FNvV4S7qPz8k6n1bAOPeFHAAgxLY60Wy/7x4JZL1Sx11ouF9t9LXUcw5opYJahjXscO6HA6FBbP9GPp/8Am7sv5K3zUD6MfT/83dl/JW+agfRj6f8A5u7L+St81A+jH0//ADd2X8lb5qCo7eK2W+ybuZ9ZrTTMo7VbsjvFHQ0kI5Y4aenrpo442DuNa1oaEGwOjZ7mdSuBlp0Jnrm+U621QP8AwKCdfX09zenivDToH3S3Nd5I8YT/AHhBU+gsY6JNmNqs82XffcyxK23u8C8VlOK2shEkviY44S1mp7gLigkd9GPp/wDm7sv5K3zUD6MfT/8AN3ZfyVvmoH0Y+n/5u7L+St81BFrru2g2x292vsF2wnFbfYrlU3+KlnqqKERSPgdR1TywkdwuY0+Ugr+QW/8ARMSemLBSTqf/ALUce8LxWgIN/oCAgICAg1D1Q/IXlX6P+EqVRmZ+zVc3dheOBv3qx8/8OtXIqO6mEBAQEBBlW3u4WR7a5HBkeOT8kzPAqqV+pgqYCdXRStHaD3D2g8RxWRh8RXZr6VKGzfKMPmeHmzejVunfTPLHw17JWYYRllDnOJ2nLba0x0l1p2ziF51dG/UtkjJHaWPa5uvkK+2LsXaIrje5MzPAV4HFV4evXNudHX5J541tGdTmx1jyKy1+41pkp7TkVshM9ydK5sNPXQxjse46ATDsY70XBp9CREZngqa6ZuRqmNvV+NsTgjii9hr1ODuRNy3XOinRrmiZ5P8AXljdtjfpgwqi6IEE5+lbeirzO2y4Jk9QZ8htEIlt9ZIdZKqhaQwteT56SIlo17XNIPaHE27K8ZNyPV1bY7cOd+POGqcFcjF2I0W7k6Ko3U1dTqVdqevEMn6osDp8w2wrrrHEDeMZa650coHheIYB6pYT9qYxz/ZYFkZnYi5Zmd9OvwojgbNasHmVNuZ8S94k9f8Axns6utMq8VSXT4gmv0S/sjk/ulF6QFa8l8irrtA/2b7VZ+RP1kolYGnxB+OcGgucQGgakngAAg8CkzvCa+9txmgyS11WRua+QWinrYJazkiGr3eJY8vAb3TogyBAQUkdQXy67k/vLdvzyVBknSL9Y/APx2b80nQXJoCCMvWvvd/CvbGTHLLU+KzPMWy0FEWHSSnodAKqo4cQeVwijPA8zuYedKCptBbH0SbK/wAL9ro8lvNP4rMMzbFcKsPGklPQAE0kHHiDyuMrx28z+U+dQaN/mG7M+pK+3b1WOn0grvF2rKBGOyoY3SlqXafbsb4lx7BysHa5BBCOSSGRksT3RyxuDmPaS1zXNOoII4ggoLi+lXeuPeva2iuVfM12YWTltmSR6jmdURt/y6nTvTsHP2ac/O0edQbxQEFKHUf8vW4/7wXD09yDXVuuVwtFZFcbVVTUNwg1MNVTPdFMwuaWktewgg6EjgUHVJJOp4k9pQSl6Suluyb4T1GS5XfoI8btMwjqcdoJ2m6zuHEeOA4wQO7A/i5+jg3l88gtDxrGMew6y0mOYtbae02OhZ4uloaRgjjYO6dB2uJ4uc7UuPEklB6yAgINF9Y/1as9/F6L4RpkFOqCUHTX1dU/T9htzxObEX5A643N90FWy4CiDA+nhg8XyGmm108Trzc3d7EG5/6mND82kvv032Cgf1MaH5tJffpvsFBhm6/X/JuJt9f8GtuCe1Ul/pJKCa4z3P1UIoZvBkLYm0sXM4t1A8MadvHsQQrQWQ/y2KWZmB5tXOaRTzXenhjf3C+GmDnDyhI3+1BN1BTZ1dfWPz/8dh/NIEHgdO/y8bb/ALx2z86YguyQEBAQUg77fLfuX+9d9+EZ0GZ9HH1lMC/GKz4OqUE7Ovv6vNb7q27/ABuQVQILU/5e/wAgUnu7X+l06CVaAgIIcfzIPkexr95YfzCtQVkILf8Aol+rFg36W+GK1Bv9AQEBAQEGoeqH5C8q/R/wlSqMzP2arm7sLxwN+9WPn/h1q5FR3UwgICDPNstosx3XuMtHjUDI6Kl5fV10qnGOlg5uwFwDi5x04NaCfsDiszDYS5fnRT2VczviHCZTbiq9M9KryaY11T8XVluO79FOX0tvfUWfIqG43Bjeb1HLFJSh5A862QukGp7nMGjvkKUryW5EaqomVEw/9mYWu5ouWqqKeWJirsxq7Wlqyg6fN4q+8Nsv/ilZTTc/JJV1LRFRsGuhcZ9SxwHb4BcT3AVHU5ffmro9Ge92Vxu8XZTbtet9fTVHJGur/jt7Ojqp8YnZ7NtDtrb7VdLhHDaseoya+4ynkjLy4ySvAPHR0j3creJ4gcSrlaopw9mImdVMbXNuYYi9nGYV3LdEzXeq8WmNvJEc0RrnnaWpaXIOqLIGXG4sqLPsdZ6gmjoyTFPd54jpzO09D3CRwYPBb4fM5sVEVY6rTOq1H0l+rrscLWOhRouY65GudsWon4c+2fF0RPU6oNl8FpMUOcWd9JjdztbIqUUjWiKnr42gMjhYxg/1mtHgEDi0eFwHM35zPB24o6caKZjt/G9uBuJcbXivytzpXqa5mdO2aJ2zVMz/AI8vV2a9UwvVVb7bo6Vbfcq3emy1FCHeIoIaypuDx2NpzTSQ+F5BkkY37JUrldMziI0btPcUHjy9boyi5Fe2uaIp6/Sie5Ep17jVFPS7fZXUVZApo7PcHS69hb6mk1Hl9it2ImItVaeSe451yaiqvHWIp2zco+tCqxa8dkCCa/RL+yOT+6UXpAVryXyKuu0D/ZvtVn5E/WSiVgafEFHW5Ge5xk+SXmnyPJbpdqeOuqWRwV1bUVETGMmcGtayR7mgADgAEG5ugT6w1F7lXH0tqC19AQUkdQXy67k/vLdvzyVBknSL9Y/APx2b80nQXJoOrc7lQWa21l3utQyktlvhkqq2qlPLHFBAwvke49wNaCSgpZ3+3br96tzrvmlQXstZd6jsNG//APXttOSIW6dxztTK/wD53O7iDAbDc4bLe7dd6iggukNBUxVL7bWBxpqgQvD/ABUoY5rix2mjgHDUd1BLsfzIN2gNBi2OADsHi672Ugx/OOu/P9wsRvGFZHiWOzWa90z6SqDY60PbzcWyMJqiA+Nwa9h04OAKCKiDdvSxvVLspunQ3Wtmc3ELzy2zJYuJaKaR3gVGn20D9H9mvLzNHnkFx0UsU8TJ4HtkhkaHxyMIc1zXDUEEcCCEH2gpQ6j/AJetx/3guHp7kGJ4Dhd03EzC04TZZIYrtepjTUb6lzmQ+NLHOaHua1xAJbproUHxmmEZXt5kFVi2Z2ue0XykP+ZTVDdOZpJAfG8atex2ngvYS09woPjD8zynAL/S5Ph11ns98pDrDV0zuUlp01Y9p1a9jtPCY8Fru6EFlXTt1vYtuT6kxPcgwY1nL+WKnrC7xdruEh4AMc8nxMrj/tvPK4+ddqeUBLdAQEGi+sf6tWe/i9F8I0yCnVBn+C7I7q7mWuovWCYxVXu10tQaOoqad0QayoaxkhYfGPadeV7T5aD6zjY7drba1xXrN8TrbPaZpRTsrZgx8IlcCQ1zonPDSdDpzaa9xBr5B7+H4Xk2fXqPHMRoTc75Mx0kFCyWKKWQRjVwjEr2cxA48rdTpqewFBvTD+hfqCyavihu1lgxi2ucBNcLpV07uVuvhcsNM+aVx07AWtB74QWXbObUWDZfAbdgmPvdPFSl09dXytDZausm0MszwNQNdA1rdTytDW6nTVBnqCmzq6+sfn/47D+aQIPA6d/l423/AHjtn50xBdkgICAgpB32+W/cv96778IzoMz6OPrKYF+MVnwdUoJ2dff1ea33Vt3+NyCqBBan/L3+QKT3dr/S6dBKtAQEEOP5kHyPY1+8sP5hWoKyEFv/AES/Viwb9LfDFag3+gICAgICDUPVD8heVfo/4SpVGZn7NVzd2F44G/erHz/w61cio7qYQEHrYvjV3zDILfjVigNRdLlK2CBnY0a8XPceOjWNBc49wAletq3VcqimnbLCx2NtYOxVfuzooojTPg687I6qzfbfArRtriNBitoAc2mbz1lURyvqKp4HjZnf9RHAdxoDe4r7hrFNmiKIckZzm13M8VViLm/ZHm07o+G2dMu1Z86xS/5BeMWtNziqb9YXtZcqJp8NhcASW68HBpPI/l15XeC7Qr6ov0V1TTE66drxxOVYrD2Ld+5RMW7vkzy+DTtjTtjXD1LzebVj1qq73e6uOhtVDGZqqqmPKxjG/wDEkngAOJPAcV6V100UzVVOiIYeGw13EXabVqmaq6p0REI20lJkPVHkLLpdGVFn2Ps9QTRURJinu08RILnEHs7hI4MHgt8PmcIKIqx1WmdVqPpNrXLljhax0KNFzHXI8arbFqJ+Hzts+Loid75Pk+I7V4i66XR0VssFsibBSUkDWtLi1ukcEEY01cdNAB9k6AEqYu3aLFGmdUQ1zgcDis1xXq7emu5XOmZnt1VTyfDarv3a3ayHdnIXXS6ONNaaYuZabSxxMVNET2ns5pHaDnfpx8gAAUnF4urEVaZ2bodQcP8AD9jKbHq7euufLr31T3ojdHf0ywm222vvFfTWq1U0lZcayRsNLSwtL5JJHnQNaB2krEppmqdEa5lYL16izRNy5MU00xpmZ2RCxPYHZuDabGXGv5JsuuwZLd6hmjmxBo1ZTxu+1ZqeY+idx7OXS74DBxh6NflTt8Dl3iziOrNsR4mqzb1URy8tU9We1HOwfq83Lp7FiTNv7fMDesg5ZK5rT4UNvifzce8ZXtDR32h6xM2xMU0erjbV3Fh/r3JKr+KnF1x4lryerXMf+sa+voQaVRdDiCa/RL+yOT+6UXpAVryXyKuu0D/ZvtVn5E/WSiVgafEFDeYxvhy6/wAMg5ZI7lWMe09oc2d4IQbN6XN1ca2a3Xps2yyKrls8VDV0rmUEbJp/GVDQG6NkkjGnDj4SCcn9RDYf1hkf5DS+y0D+ohsP6wyP8hpfZaCuLdTJrdmm5mX5faGystd9vFfcqJlQ0MmEFVUPlYHta5wDtHDUBxQbB6PoXz9SOAsjGrhV1MhA+1joah5/4BBceghD/ME3u9osfpdmsfqeW631ja3JHxnworcx2sUBI7DO9vM4faM0PB6CuGON8r2xRNL5HkNYxoJc5xOgAA7SUEgouiHqWmiZM3D2NbI0PDX3O2seA4a6Oa6pBB74KD7+g71L/FCL31tnslA+g71L/FCL31tnslBjmddK2+m2+M1eYZdjApMfoDGKyqhraKrMQleI2ucynmkfy8zgCeXQa8UGm0FofQdvf/53gb9tb9U8+U4dE1tC6R2r6mzEhkRHfNOSIXd5vi+6Sgl2gpQ6j/l63H/eC4enuQeh0r/WG2991Wf4HoLXt2tl8B3px82HNrcJnxhxt90g0jr6ORw8/BLodNdBzMcCx3omlBVnv70v59sTXPq6yM3nB5pOShyWljIiHMdGx1LNXGGQ94ktd6Fx4gBo5BLLp262sr2x9SYpuH4/JsDZyxQVBdz3O3xjgPFPeR46Jo/2pDqB51wA5SFluGZvim4Vgpsowy6wXex1Y/y6qndryuABLJGnRzHt18JjwHDuhB76DRfWP9WrPfxei+EaZBTqgs3/AJb/AMj2S/vLN+YUSCW1+sNmyizVuPZDQw3KyXGJ0FbQ1LQ+KWN3aCD/AGgjiDxHFBVX1SdJ152Ur5cpxds102xq5dIqk6yT22SQ+DBUkdrCTpHN2HzrtHacwRspKuqoKqGuoZ5KWtpntmp6mB7o5Y5YzzNex7SC1wI1BB4ILEumHrgpr76jwHeirjpL0eWC15bJpHT1J7Gx1p4Njk703BjvRcp4uCcoIIBB1B4ghB+oKb+r6N8XUhnzZByuNZTuAP2r6KBwPlgoMC2nyi24RubiOYXhsr7VYrtRXGtZTtD5jDTTNkeGNc5oLtBwBcEFjX9RDYf1hkf5DS+y0D+ohsP6wyP8hpfZaB/UQ2H9YZH+Q0vstA/qIbD+sMj/ACGl9loK3dzMioMv3IzHLLU2Rlrv18ud0omztDJhBW1cs8Ye1pcA7leOYBx491Bs7ozifN1LYI2Mals1e8/9LLbVOP8AwCCdfXxE+Tp3uT2DVsNztz3nvNM3J/e4IKnUE2+lTq12w2V2udhuXUt3muxudVXB9vpoZofFTsia0c0lRGddWHXwUG8P6iGw/rDI/wAhpfZaB/UQ2H9YZH+Q0vstA/qIbD+sMj/IaX2Wgj71ddU222+eAWfGMMprrDcaC8R3Kd1yp4YIjAylqISGujnlJdzSt4adiCGyC4HoojfH0x4K17S1xF0cAe8+71jgfLBQb9QEBAQEBBqHqh+QvKv0f8JUqjMz9mq5u7C8cDfvVj5/4dauRUd1MICCdXSjtFHiuOM3AvMIOQ5BCHW9rhxprc/RzSP+abg8n7XlH2yt+VYT1dHrKttXc+Nzrx7xDOLxH5S3P/ztT43+1fgp2dfT1GadQO7kO1mHvNBI05bdw+ns0J0Jj4aSVLgfQxAjTvvLR2arKx+L9Rb1eVOzwoHhHh6c1xfjx/8AG3rrnl5KfndzT1FfVgyvIMYyGDKbLXy099p5TO2r5i5z3vOrxJza84fqQ8O89rxVLt3aqKulTOt0zi8BYxVibF2mJtzGjR3NHJo3aNiUOJXu8dWGTQ0WV1UFnwnG4oKqtxqjnPj7hVEcrpDro7xfNqCf9tpDR4Ti9WC1XVj69Fc6Kad3K1DmGGtcJ4easPTNy/emaablUaqKeTk6Wj/lMaZ1R0UlcpynEdqsRddLo6O22G2xtgo6OBrWl5a3SOCCMaAuOnAdgHE6AEqeu3aLFGmdUR8NENT4HA4rNcV6u3pruVzpmZ7dVU8nw2q7t2N2ci3YyF11uzjT2unLmWq0scTDTRE+VzSO08N+nHyAABSMXi6sRVpnZuh1BkGQWMpsert6658uvfVPeiN0d/TLC7bba+8V9NarVTSVlxrJGw0tLC0vkkkedA1oHaSsWmmap0RrmU/evUWaJuXJimmmNMzOyIWAbBbBUG11A2+31sdZnVZHpNMNHx0UbxxhhPdceySQdvYPB7bngMBFiOlVrqntOaeLOLK80r9Va002KZ1Rvrnzqu9HPOvZlW7+71h2lx51wri2qvtU1zbRaA7SSeQeidpxbE0+fd5Q4kLIxeLpw9Omdu6ENw7w9fze/wBCjxbdPl17ojv1TujvK4cnya85jfq7JMgqTVXa4SGWeU8AO41rR6FrQA1re4AqPduVXKpqq2y6owOCs4OxTZsx0aKI0R4evO2XkryZogmv0S/sjk/ulF6QFa8l8irrtA/2b7VZ+RP1kolYGnxBVT1bdNOc4duNf81xyy1V2wTIaqW6srKCJ9R6jnqnGWeGdkYLo2tkc4scRyFpA15tQAiw5rmOLHgtc06OaRoQR30H4gIOWmpqmsnZTUkL6ipkPLHDE0ve494NaCSgnr0LdOGZWLLnbu51ap7JSUVLNT47Q10Zgq5p6tvi5KgxPAeyNsRexvOBz8+o4DiE39wM4sm2+GXrOMhk8XabLTPqZWggPkePBjiZrw55XlsbP+YhBSVn+bXvcfMrzm+RS+Mu16qX1MwBJZG0+DHEzXjyRsDY2D7UBBIToX2Y/iLueMzvFP4zFcJdHWkPGsc90cSaWLj2iMtMzu9ytB4OQWrICAg8++2S15LZbhj17p21dnutPLRV1M/zskE7Cx7T9kFBSdvPthdNntx73glz5pI6CbnttW4aeqaCbw6eYacNXMOj9Ox4c3uIOvtLuTedpNwbLnllJdNbJgaql5uVtTRyeBPA7yHsJAPoXaO7QguyxbJrNmeOWvK8fqBVWW8U0VZRTjtMUzQ4Bw7jh51ze0EEFBTP1H/L1uP+8Fw9Pcg9DpX+sNt77qs/wPQXPoOtcbdb7vQ1FrutLDXW2sjdDVUdTG2aGWJ40cx7Hgtc0jtBCCvnqO6D6m3eq8z2PhfVUPhTVuHFxfURDtcaF7iTI3/4XHn+1LtQ0BBSeCammkpqmN0NRC50c0MjSx7HsOjmuadCCCNCCgzrajeTPtmb+2/4PcnUxeWivts2slDWRtPnJ4dQHdp0cNHt18FwQWi7AdVuA75U0VrD22HPWM1qcdqpAfGlo1c+jkPKJmcNS3QPb3W6eEQ5+sf6tWe/i9F8I0yCnVBZv/Lf+R7Jf3lm/MKJBMdB1rjbqC70FTarrSxVttrYnwVdJUMbLDLFIOVzHscCHNIOhBQVf9V3SDX7Uz1Oe7fQS1+28zy+spBzS1Foc89jzxL6fU6MkPFvnX9xzgiUgl30xdaN42zNHg+5cs142/HLDRXHjNXWtnYAO10tO3/8fnmDzmoAYQszsd8s+S2ijv2P10Nys1fGJ6OupXiWGWN3YWubw8g948EECOujpwzK9Zh/F3BbTPe6OvpYYMioqGMz1cNRSMETJxEwF743RNY08gPKWangUEDaimqaOZ9NVwvgqIzyyQytLHtPeLXAEIOJAQEBBzUtJVVs7KWigkqamQ8scMLHSSOPeDWgkoJ99CnTjmOOZRNu3nlqmssNPSS0mO2+uYYauSWqAbJUOifo5jGx8zG84Bdz6jgOITB3n25h3Z2vyTb+SVtPNeKXlo6h4JZFWQPbPTvdpqeUSxs5tOPLqgpszvazcHbO5z2rNserLTNC8sbUTRONLLodOaGdoMcjT3CxxQYggICAgIM6252d3H3Vu1PasLsFVXNne1ktxMT46CnaToXzVBHIxoHHt1PY0E8EFze22E0e3GBY7g1A/wAdT2KhhozPpy+NlY3/ADZdO54x5c/TyUGUoCAgICAg1D1Q/IXlX6P+EqVRmZ+zVc3dheOBv3qx8/8ADrVyKjuphAQWrYDdbffMIx662pzXUFTb6Z0PJpo3SJrSw6dhYQWkdwjRbEsVxVbpmNmiHGubYe5Yxl23c8qmurT2dvPtRT6udrctde37l09RLdscdFFTVEGmrra2MaAANH+i9xLubuOcebtBNdzbC19L1m2O58Tc39fZ7hfU/kpiLdzTMxP2mn/2iNWjkjUiqq63I9bGslveIXukyHHqt9FdqJ/PBOz+wtcDwc1w4OaeBC9Ldyq3VFVM6JhhY3BWcZZqs3qelRVtj4bJjdLI9z918q3XvEd0yKVsdPTM8XQ22n5m0sAIHOWtcSS55GrnOJPc7AAPfE4qu/Vpq7CKyPIMNlNqbdmNM1eVVPlVcmnqRujvsQtttr7xX01qtVNJWXGskbDS0sLS+SSR50DWgdpKxqaZqnRGuZTl69RZom5cmKaaY0zM7IhYBsFsFQbXUDb7fWx1mdVkek0w0fHRRvHGGE91x7JJB29g8HtueAwEWI6VWuqe05p4s4srzSv1VrTTYpnVG+ufOq70c869mVbv7v2DaWwGvryKq+VQc20WhrtJJ5B6J32sTfRv8ocVkYvF04enTO3dCG4e4ev5vf6FHi26fLr3RHfqndHeV0ZhmF/zu/1WS5LVGquVUeJ7I4ox52KJvoWN7g8s8dSqRevVXapqqnW6ky7LrGAsU2bNPRpp7MzyzyzLwl4pEQEE1+iX9kcn90ovSArXkvkVddoH+zfarPyJ+slErA0+ICDrzUNFUO56imilf9tIxrj/AGkIOP2ptXrGn+9M8xA9qbV6xp/vTPMQc0FJS02vqaCOHXt8WxrNf7AEHMg+JoYahhinjbLGeJY9oc3h5BQdb2ptXrGn+9M8xBzwU1PTNLKaFkLCdS2NoYCe/oAEHKgICAg689DRVLxJU00UzwOUOkY1507dNSD30HH7U2r1jT/emeYg7MUUUEYihY2OJvnWMAa0a8eACDgfbLbK90klHA+Rx1c90TCST3SSECO226J7ZIqSBkjTq17Y2NcD5BAQdpAQEHVfbLbK90klHA+Rx1c90TCST3SSEHz7U2r1jT/emeYg+mWy2xPbJHRwMkadWvbEwEEd0EBBzyxRTMMUzGyRO88x4Dmnu8QUHW9qbV6xp/vTPMQc8FNT0zSymhZCwnUtjaGAnv6ABByoCD8exsjXMe0OY4FrmuGoIPAggoOp7U2r1jT/AHpnmIHtTavWNP8AemeYg7MMMNOwRQRtijHEMY0Nbx8gIPtBwz0lLU6eqYI5tOzxjGv0/tBQcPtTavWNP96Z5iB7U2r1jT/emeYge1Nq9Y0/3pnmIHtTavWNP96Z5iDmgpaWmBFNBHCD2+LaGf3AIOZAQfhAIII1B4EFB1TarW4kmipyT2kxM8xB+e1Nq9Y0/wB6Z5iB7U2r1jT/AHpnmIHtTavWNP8AemeYg/W2u2MIc2iga4dhETAf7kHbAAGg4AdgQEBAQEBAQEGoeqH5C8q/R/wlSqMzP2arm7sLxwN+9WPn/h1q5FR3UwgIN47Ab+1u19e2wX5z6vBayTWWMavkopXnjNCO0tP+5GO3tHheel8Bj5sT0avJntNecW8J0ZpR621opv0xzVx5s9XknmnVsn3S1VqyC1R1VLJDcbNcYeZj28s0E8EzfLDmuB4hXGJprp0xriXNldF3D3ZpqiaK6J60xMd9CDqE6cqvCaiozDCKZ9Th0pMlZRRgvltzjxPDiXQd53oOx3DQmp5hl02p6dHk9z4nQfCHGVOOpjDYqYpvRqirdX/26m/dyI5KDbTd+y2S75HdKay2Kjlr7rVvEdPSwNL3ucf7gBxJPADieC+6KKq56NMaZljYnFWsNbm7dqiiinbMp+bCbA27a2hbe72I67OauPSaoHhRUcbxxhgJ7p7Hyd3sHg9tywGAixHSq11dxzXxXxbczWv1VrTTYpnVG+ufOq70btu3ZlO7+79g2lsBr68iqvlUHNtFoa7SSeQeid9rE30b/KHFZGLxdOHp0zt3Qh+HuHr+b3+hR4tuny690R36p3R3ldGYZhf87v8AVZLktUaq5VR4nsjijHnYom+hY3uDyzx1KpF69VdqmqqdbqTLsusYCxTZs09GmnszPLPLMvCXikRAQEE1+iX9kcn90ovSArXkvkVddoH+zfarPyJ+slErA0+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg1D1Q/IXlX6P8AhKlUZmfs1XN3YXjgb96sfP8Aw61cio7qYQEBBu/YXqAuO11Y2xXwyV2DVUmssA8KWikeeMsAPa09r4+72jjrrLYDHzYno1a6e417xXwlbzWj1trRTfpjbur6lXenmnVsnzZb5ZcntNPebHWQ3G0VjOaGphcHxuae0HvEdjmu4g8CFcqK6a6dNM6YlzbicLewt2bd2maK6dsT8O21ZlHS/tFlFwfc3Wya01Mri+cWqb1PE9x7f8pzXsb/AOhrVHXcssVzp0aOsuOB45zXC0dDpxciNnTjTMc+qZ55lmmC7XYNtvTPgxK0x0c0oDaiteTNVSgcdHyyEu0148oIb5CyrGFt2Y8SNCAzXPcbmVWnEXJqiNlOymOtEaufax3eHfHF9p7a+Od7bhlc7NaCyxuHPqRwknI/04/JPF3oR2keOMxtGHjlq5Epw7wvic2uaYjoWonxq57lPLV3N6vXMMwyDO7/AFWSZLVuq7nVHieyOOMedjjb2NY3uAf36lUq9equ1TVVOt07l2XWMBYps2KejTT2ZnlnlmXhLxSIgICAgmv0S/sjk/ulF6QFa8l8irrtA/2b7VZ+RP1kolYGnxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEGoeqH5C8q/R/wAJUqjMz9mq5u7C8cDfvVj5/wCHWrkVHdTCAgICDLsE3OzfbesdV4ldZKSOUh1TRP0lpJtOH+ZC/VpOnDmGjh3CFk2MTcszponQhM1yPB5lR0cRRFWjZVsqjrTGvm2dRv219bt+hp2svOI0lZVAeFLSVclIwnv8j46g/wDuUzTnVWjXTE8+jwta3/6xsTV/879VMf7UxV24mnuMay/rB3Gv1PJR49S0mNwSAh08GtVWAHtAklAYPsiLXvFeF7N7tcaKYinupbLv67wGHqiq9VVemN0+LT2I1/S0NAVtbWXKrmr7jUS1ddUOMk9TO90ssj3drnPcSST3yoaqqap0ztbLtWqLVMUURFNMbIjVEczgXy9BAQEBAQTX6Jf2Ryf3Si9ICteS+RV12gP7N9qs/In6yUSsDUAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDwM2xO351id2xK6OcyjusBhdKwaujeCHxyNB4Ese1rwPIXjetRdomid6SyzMLmAxVGIt+VROnr8sc8aYQTvXSfvNbbhLS220wXmjY4+KrqaspYWPb3CWVMsTwdO0cvllVCvKsRTOiI088d90XhuPspuW4qrrm3V5s0VTo56Yqh5/0Xt9Pir+sLb7KXx7sxPm9uPCyv5zkv2/0LnoH0Xt9Pir+sLb7KT3ZifN7ceE/nOS/b/QuegfRe30+Kv6wtvspPdmJ83tx4T+c5L9v9C56B9F7fT4q/rC2+yk92Ynze3HhP5zkv2/0LnoH0Xt9Pir+sLb7KT3ZifN7ceE/nOS/b/QuegfRe30+Kv6wtvspPdmJ83tx4T+c5L9v9C56B9F7fT4q/rC2+yk92Ynze3HhP5zkv2/0LnoH0Xt9Pir+sLb7KT3ZifN7ceE/nOS/b/QuegfRe30+Kv6wtvspPdmJ83tx4T+c5L9v9C56B9F7fT4q/rC2+yk92Ynze3HhP5zkv2/0LnoH0Xt9Pir+sLb7KT3ZifN7ceE/nOS/b/QuegfRe30+Kv6wtvspPdmJ83tx4T+c5L9v9C56B9F7fT4q/rC2+yk92Ynze3HhP5zkv2/0LnoOWm6WN8J544ZccjpY3kB081fQGNg77hFO92n/S0r9jK8RM+T248Lzr47yammZi7NXUiivv0xHbTR2V2tg2mwuPHzUNrLrUzOrbrVsBEb6h7Ws5Y+bjyMa1rRr28ToNdFacFhfy9vo7Z3tC8S57Ob4ub2jo0Ux0aY36Or1Zme9ubFWcqwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD//2Q=='
