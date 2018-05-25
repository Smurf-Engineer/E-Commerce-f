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
}

const config: ConfigType = {
  graphQlUrl: process.env.RAZZLE_GRAPHQL_URL,
  googleId: process.env.RAZZLE_GOOGLE_ID,
  facebookId: process.env.RAZZLE_FACEBOOK_ID,
  graphqlUriBase: 'https://api.jakroo.tailrecursive.co/api/',
  baseUrl: 'https://dev.jakroo.tailrecursive.co/',
  storageUrl: 'https://storage.googleapis.com/jakroo-storage',
  pkStripe: 'pk_test_USJaHD7YvJFcFsgwOixnJDrq'
}

export default config
