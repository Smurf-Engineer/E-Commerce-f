import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
// TODO: ENABLE LATER
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from '../config'
import fetch from 'node-fetch'

/**
 * https://github.com/apollographql/react-apollo/issues/1321
 * Apollo current version doesn't use new variables after catch an error.
 */
const errorLink = onError(
  ({ response, operation, networkError, graphQLErrors }) => {
    if (operation.operationName === 'GetProductFromCode' && !!response) {
      response.errors = null
    }
  }
)

const authLink = new ApolloLink((operation, forward) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user ? user.token : ''
  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : null }
  })
  return forward(operation)
})

// TODO: ENABLE LATER
// const hasSubscriptionOperation = ({ query }) => {
//   const { kind, operation } = getMainDefinition(query)
//   return kind === 'OperationDefinition' && operation === 'subscription'
// }

const httpLink = createHttpLink({
  uri: `${config.graphqlUriBase}graphql`,
  fetch
})

// TODO: ENABLE LATER
// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: `wss://api.jakroo.tailrecursive.co/api/subscriptions`,
//       options: {
//         reconnect: false // TODO: CHANGE TO TRUE LATER
//       }
//     })
//   : null

const apolloLink = ApolloLink.from([authLink, errorLink, httpLink])

// TODO: ENABLE LATER
// const link = process.browser
//   ? split(hasSubscriptionOperation, wsLink, apolloLink)
//   : apolloLink

const link = apolloLink

export const configureServerClient = () => {
  const client = new ApolloClient({
    ssrMode: true,
    link: link,
    cache: new InMemoryCache()
  })

  return client
}

export const configureBrowserClient = () => {
  const client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: link,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
  })

  return client
}
