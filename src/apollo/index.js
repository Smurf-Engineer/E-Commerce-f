import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
// import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SubscriptionClient } from 'subscriptions-transport-ws/dist/client'
import WebSocket from 'ws'
import fetch from 'node-fetch'

// TODO: implement
// const authLink = setContext((_, { headers }) => {
//   const token = 'get token from storage'
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : null
//     }
//   }
// })

const hasSubscriptionOperation = ({ query }) => {
  return query.definitions.some(
    (kind, operation) =>
      kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const httpLink = createHttpLink({
  uri: 'http://localhost:4040/api/graphql',
  fetch: fetch
})

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:4040/api/subscriptions',
//   options: {
//     reconnect: true
//   },
//   webSocketImpl: WebSocket
// })

const wsClient = new SubscriptionClient(
  `ws://localhost:4041/subscriptions`,
  {
    reconnect: true
  },
  WebSocket
)

const webSocketLink = new WebSocketLink(wsClient)

const link = ApolloLink.split(hasSubscriptionOperation, webSocketLink, httpLink)

export const configureServerClient = () => {
  const client = new ApolloClient({
    ssrMode: true,
    link,
    cache: new InMemoryCache()
  })

  return client
}

// declare global {
//   interface Window {
//     __APOLLO_STATE__: any
//   }
// }
export const configureBrowserClient = () => {
  const client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
  })

  return client
}
