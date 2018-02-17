import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloLink from 'apollo-link'
import fetch from 'node-fetch'
import conig from '../config'

const httpLink = createHttpLink({
  uri: conig.graphQlUrl,
  fetch: fetch as any
})

const authLink = setContext((_, { headers }) => {
  const token = 'get token from storage'
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }
})

export const configureServerClient = () => {
  const client = new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })

  return client
}

declare global {
  interface Window {
    __APOLLO_STATE__: any
  }
}
export const configureBrowserClient = () => {
  const client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
  })

  return client
}
