import * as React from 'react'
import * as express from 'express'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import Html from './helpers/Html'
import renderHtml from './helpers/render'
import { configureServerClient } from './apollo'
import App from './screens/App'
import configureStore from './store'

const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const client = configureServerClient()
    const location = req.url
    const context = {}

    const locale = {
      region: 'global',
      lang: 'es',
      currency: 'usd'
    }
    const preloadStore = {
      app: {
        user: locale
      }
    }

    const store = configureStore(preloadStore)

    getDataFromTree(App as any).then(() => {
      const sheet = new ServerStyleSheet()
      const jsx = sheet.collectStyles(
        <ApolloProvider {...{ client }}>
          <Provider {...{ store }}>
            <StaticRouter {...{ context, location }}>
              <App />
            </StaticRouter>
          </Provider>
        </ApolloProvider>
      )

      const content = renderToString(jsx)
      const preloadState = store.getState()
      const styleTags = sheet.getStyleTags()
      const state = client.extract()

      const html = <Html {...{ content, state }} />
      const htmlString = renderHtml(styleTags, html, preloadState)
      res.status(200)
      res.send(htmlString)
      res.end()
    })
  })

export default server
