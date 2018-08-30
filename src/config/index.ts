/**
 * App config
 */

interface ConfigType {
  graphQlUrl?: string
  googleId?: string
  facebookId?: string
  graphqlUriBase?: string
  baseUrl?: string
  storageUrl: string
  pkStripe: string
  paypalClientIdTest: string
  paypalClientIdUS: string
  paypalClientIdCA: string
  paypalClientIdEU: string
  paypalEnv: string
  googleMapKey: string
  intercomKey: string
  defaultCurrency: string
}

const config: ConfigType = {
  graphQlUrl: process.env.RAZZLE_GRAPHQL_URL,
  googleId: process.env.RAZZLE_GOOGLE_ID,
  facebookId: process.env.RAZZLE_FACEBOOK_ID,
  graphqlUriBase: 'https://api.jakroo.tailrecursive.co/api/',
  baseUrl: 'https://dev.jakroo.tailrecursive.co/',
  storageUrl: 'https://storage.googleapis.com/jakroo-storage',
  pkStripe: 'pk_test_USJaHD7YvJFcFsgwOixnJDrq',
  pkStripeUS: 'pk_test_xxx',
  pkStripeCA: 'pk_test_xxx',
  pkStripeEU: 'pk_test_xxx',
  paypalClientIdTest:
    'AWuWtjrHnZd_nLLXI-x40UtoX7cNxqYNjh9CrfDeNO6y4Ik2xADqapxfzXzHCPeIgrFSP-45-2gYkiO-',
  paypalClientIdUS: 'A3ZJ5tCmobw4dtbuCuY0OnkDhEwSAb-b59G0zW-AhbDZQT1eyMF5KzCC',
  paypalClientIdCA: 'A4vBPfrTTSu-rKyirOiFEu0XoiMkAGjAL8o7xI7dvLT24b22pN5TXo.6',
  paypalClientIdEU: 'AFcWxV21C7fd0v3bYYYRCpSSRl31AufNYvvkkCqoGhbsoOGk74iTJMPT',
  paypalEnv: 'sandbox',
  googleMapKey: 'AIzaSyAhSNGqAuj6AL4mJ0oNogYDK1UJcc_ws5U',
  intercomKey: 'nmbw72i7',
  defaultCurrency: 'usd'
}

export default config
