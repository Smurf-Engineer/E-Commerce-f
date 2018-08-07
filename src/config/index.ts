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
  geoIpUrl: string
  geoIpAccesKey: string
  intercomKey: string
}

const config: ConfigType = {
  graphQlUrl: process.env.RAZZLE_GRAPHQL_URL,
  googleId: process.env.RAZZLE_GOOGLE_ID,
  facebookId: process.env.RAZZLE_FACEBOOK_ID,
  graphqlUriBase: 'https://api.jakroo.tailrecursive.co/api/',
  baseUrl: 'https://dev.jakroo.tailrecursive.co/',
  storageUrl: 'https://storage.googleapis.com/jakroo-storage',
  pkStripe: 'pk_test_USJaHD7YvJFcFsgwOixnJDrq',
  paypalClientId:
    'AbZ3seF-h636HxsdaKolVn-D24c3eSN3EQGeysVYQTf1Y7cSw2QSSevNRXwTwAUOxHohWXlK40Uzl1p-',
  paypalEnv: 'sandbox',
  googleMapKey: 'AIzaSyAhSNGqAuj6AL4mJ0oNogYDK1UJcc_ws5U',
  geoIpUrl: 'http://api.ipstack.com/',
  geoIpAccesKey: 'e5dc4d0a6fc61af61307fe520cc67f66'
  geoIpAccesKey: 'e5dc4d0a6fc61af61307fe520cc67f66',
  intercomKey: 'rryek0sa'
}

export default config
