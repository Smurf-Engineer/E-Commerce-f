import * as React from 'react'
import * as ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import configureStore from './store'
import { configureBrowserClient } from './apollo'
import App from './screens/App'

const client = configureBrowserClient()

declare global {
  interface Window {
    __PRELOADED_STATE__: any
  }
}

const store = configureStore(window.__PRELOADED_STATE__)

ReactDom.hydrate(
  <ApolloProvider {...{ client }}>
    <Provider {...{ store }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
