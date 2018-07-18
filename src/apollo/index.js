import { ApolloClient } from 'apollo-client'
import { split, ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from '../config'
import fetch from 'node-fetch'

const errorLink = onError(({ response, operation }) => {
  if (operation.operationName === 'GetProductFromCode') {
    response.errors = null
  }
})

const authLink = new ApolloLink((operation, forward) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user ? user.token : ''
  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : null }
  })
  return forward(operation)
})

const hasSubscriptionOperation = ({ query }) => {
  const { kind, operation } = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}

const httpLink = createHttpLink({
  uri: `${config.graphqlUriBase}graphql`,
  fetch
})

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `wss://api.jakroo.tailrecursive.co/api/subscriptions`,
      options: {
        reconnect: false // TODO: CHANGE TO TRUE LATER
      }
    })
  : null

const apolloLink = ApolloLink.from([authLink, errorLink, httpLink])

const link = process.browser
  ? split(hasSubscriptionOperation, wsLink, apolloLink)
  : apolloLink

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
