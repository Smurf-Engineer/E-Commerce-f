import * as React from 'react'
import * as ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { configureBrowserClient } from './apollo'
const client = configureBrowserClient()
import App from './App'

ReactDom.hydrate(
  <ApolloProvider {...{ client }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
