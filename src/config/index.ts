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
  paypalClientId: string
  paypalEnv: string
  googleMapKey: string
}

const config: ConfigType = {
  graphQlUrl: process.env.RAZZLE_GRAPHQL_URL,
  googleId: process.env.RAZZLE_GOOGLE_ID,
  facebookId: process.env.RAZZLE_FACEBOOK_ID,
  // graphqlUriBase: 'https://api.jakroo.tailrecursive.co/api/', TODO: uncomment this line
  graphqlUriBase: 'http://localhost:4040/api/',
  baseUrl: 'https://dev.jakroo.tailrecursive.co/',
  storageUrl: 'https://storage.googleapis.com/jakroo-storage',
  pkStripe: 'pk_test_USJaHD7YvJFcFsgwOixnJDrq',
  paypalClientId:
    'AbZ3seF-h636HxsdaKolVn-D24c3eSN3EQGeysVYQTf1Y7cSw2QSSevNRXwTwAUOxHohWXlK40Uzl1p-',
  paypalEnv: 'sandbox',
  googleMapKey: 'AIzaSyAhSNGqAuj6AL4mJ0oNogYDK1UJcc_ws5U'
}

export default config
