import * as React from 'react'
import * as ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDom.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
