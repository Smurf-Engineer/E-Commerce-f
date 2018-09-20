/**
 * App config
 */

interface ConfigType {
  graphQlUrl?: string
  googleId?: string
  facebookId?: string
  graphqlUriBase?: string
  baseUrl?: string
  storageUrl?: string
  pkStripeUS?: string
  paypalClientId?: string
  paypalClientIdTest?: string
  paypalClientIdUS?: string
  paypalClientIdCA?: string
  paypalClientIdEU?: string
  paypalEnv?: string
  googleMapKey?: string
  intercomKey?: string
  defaultCurrency?: string
}

const config: ConfigType = {
  googleId: process.env.GOOGLE_ID,
  facebookId: process.env.FACEBOOK_ID,
  graphqlUriBase: process.env.GRAPHQL_URI_BASE,
  baseUrl: process.env.BASE_URL,
  storageUrl: process.env.STORAGE_URL,
  pkStripeUS: process.env.PK_STRIPE_US,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
  paypalClientIdUS: process.env.PAYPAL_CLIENT_ID_US,
  paypalClientIdCA: process.env.PAYPAL_CLIENT_ID_CA,
  paypalClientIdEU: process.env.PAYPAL_CLIENT_ID_EU,
  paypalEnv: process.env.PAYPAL_ENV,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  intercomKey: process.env.INTERCOM_KEY,
  defaultCurrency: process.env.DEFAULT_CURRENCY
}

export default config
