import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import message from 'antd/lib/message'
import head from 'lodash/head'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from '../config'
import fetch from 'node-fetch'
const unauthorizedExp = /\bUser is not authenticated\b/

/**
 * https://github.com/apollographql/react-apollo/issues/1321
 * Apollo current version doesn't use new variables after catch an error.
 */
const errorLink = onError(({ response, operation }) => {
  if (operation.operationName === 'GetProductFromCode' && !!response) {
    response.errors = null
  }
  if (response.errors) {
    const errorMessage =
      response.errors.length &&
      head(response.errors.map(error => error.message))

    if (errorMessage.length && unauthorizedExp.test(errorMessage)) {
      message.error('User session has expired!')
      setTimeout(() => {
        try {
          localStorage.removeItem('user')
          window.location.replace('/')
        } catch (e) {
          console.error(e)
        }
      }, 1500)
    }
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
    uri: config.websocketUriBase,
    options: {
      connectionParams: () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const token = user ? user.token : ''
        return {
          headers: {
            Authorization: token
          }
        }
      },
      reconnect: false // TODO: CHANGE TO TRUE LATER,
    },
  })
  : null

const apolloLink = ApolloLink.from([authLink, errorLink, httpLink])

const link = process.browser
  ? ApolloLink.split(hasSubscriptionOperation, wsLink, apolloLink)
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
