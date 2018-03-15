/**
 * App config
 */

interface ConfigType {
  graphQlUrl?: string
  googleId?: string
  facebookId?: string
  graphqlUriBase?: string
}
const config: ConfigType = {
  graphQlUrl: process.env.RAZZLE_GRAPHQL_URL,
  googleId: process.env.RAZZLE_GOOGLE_ID,
  facebookId: process.env.RAZZLE_FACEBOOK_ID,
  graphqlUriBase: 'https://dev.api.jakroo.shipnote.io/api/'
}

export default config
