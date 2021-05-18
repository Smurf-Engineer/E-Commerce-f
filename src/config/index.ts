/**
 * App config
 */

interface ConfigType {
  graphQlUrl?: string
  googleId?: string
  facebookId?: string
  graphqlUriBase?: string
  baseUrl?: string
  youtubeId?: string
  youtubeKey?: string
  storageUrl?: string
  pkStripeUS?: string
  pkStripeEU?: string
  paypalBaseUrl?: string
  paypalClientId?: string
  paypalClientIdTest?: string
  paypalClientIdUS?: string
  paypalClientIdCA?: string
  paypalClientIdEU?: string
  paypalEnv?: string
  slaaskTeam?: string
  slaaskApiKey?: string
  slaaskSupportTeam?: string
  slaaskSuuportKey?: string
  googleMapKey?: string
  intercomKey?: string
  defaultCurrency?: string
  googleTagManagerId?: string
  logrocketId?: string
  googleFontsKey?: string
  googleFontsUrl?: string
  tutorialsTabActive?: string
  colorSwatchZip?: string
  websocketUriBase?: string
  googlePlaceApiUrl?: string
}

const config: ConfigType = {
  googleId: process.env.GOOGLE_ID,
  youtubeId: process.env.YOUTUBE_ID,
  youtubeKey: process.env.YOUTUBE_KEY,
  facebookId: process.env.FACEBOOK_ID,
  graphqlUriBase: process.env.GRAPHQL_URI_BASE,
  baseUrl: process.env.BASE_URL,
  slaaskTeam: process.env.SLAASK_TEAM,
  slaaskApiKey: process.env.SLAASK_KEY,
  slaaskSupportTeam: process.env.SLAASK_SUPPORT_TEAM,
  slaaskSuuportKey: process.env.SLAASK_SUPPORT_KEY,
  storageUrl: process.env.STORAGE_URL,
  pkStripeUS: process.env.PK_STRIPE_US,
  pkStripeEU: process.env.PK_STRIPE_EU,
  paypalBaseUrl: process.env.PAYPAL_BASE_URL,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
  paypalClientIdUS: process.env.PAYPAL_CLIENT_ID_US,
  paypalClientIdCA: process.env.PAYPAL_CLIENT_ID_CA,
  paypalClientIdEU: process.env.PAYPAL_CLIENT_ID_EU,
  paypalEnv: process.env.PAYPAL_ENV,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  intercomKey: process.env.INTERCOM_KEY,
  defaultCurrency: process.env.DEFAULT_CURRENCY,
  googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID,
  logrocketId: process.env.LOG_ROCKET_KEY,
  googleFontsKey: process.env.GOOGLE_FONTS_KEY,
  googleFontsUrl: process.env.GOOGLE_FONTS_URL,
  tutorialsTabActive: process.env.TUTORIALS_TAB_ACTIVE,
  colorSwatchZip: process.env.COLOR_SWATCH_ZIP,
  websocketUriBase: process.env.WEBSOCKET_URI_BASE,
  googlePlaceApiUrl: process.env.GOOGLE_PLACE_API_URL
}

export default config
