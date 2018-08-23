/**
 * App config
 */

const config = {
  googleId: process.env.GOOGLE_ID,
  facebookId: process.env.FACEBOOK_ID,
  graphqlUriBase: process.env.GRAPHQL_URI_BASE,
  baseUrl: process.env.BASE_URL,
  storageUrl: process.env.STORAGE_URL,
  pkStripe: process.env.PK_STRIPE,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
  paypalEnv: process.env.PAYPAL_ENV,
  googleMapKey: process.env.GOOGLE_MAP_KEY,
  intercomKey: process.env.INTERCOM_KEY,
  defaultCurrency: process.env.DEFAULT_CURRENCY
}

export default config
