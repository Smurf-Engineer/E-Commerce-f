import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SubscriptionClient } from 'subscriptions-transport-ws/dist/client'
import fetch from 'node-fetch'

const authLink = setContext((_, { headers }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user ? user.token : ''
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

const hasSubscriptionOperation = ({ query }) => {
  return query.definitions.some(
    (kind, operation) =>
      kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const httpLink = createHttpLink({
  uri: 'https://api.jakroo.tailrecursive.co/api/graphql',
  fetch: fetch
})

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://api.jakroo.tailrecursive.co/api/subscriptions`,
      options: {
        reconnect: true
      }
    })
  : null

const link = process.browser
  ? split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : authLink.concat(httpLink)

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
