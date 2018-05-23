import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from '../config'
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

const uploadLink = createUploadLink({
  uri: `${config.graphqlUriBase}graphql`,
  fetch
})

const wsLink = process.browser
  ? new WebSocketLink({
      uri: `ws://localhost:4040/api/subscriptions`,
      options: {
        reconnect: false // TODO: CHANGE TO TRUE LATER
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
      authLink.concat(uploadLink)
    )
  : authLink.concat(uploadLink)

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
