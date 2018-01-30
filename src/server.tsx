import * as React from 'react'
import * as express from 'express'
import App from './App'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import Html from './helpers/Html'
import renderHtml from './helpers/render'
import { configureServerClient } from './apollo'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)

const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const client = configureServerClient()
    const location = req.url
    const context = {}

    getDataFromTree(App as any).then(() => {
      const sheet = new ServerStyleSheet()
      const jsx = sheet.collectStyles(
        <ApolloProvider {...{ client }}>
          <StaticRouter {...{ context, location }}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      )
      const content = renderToString(jsx)

      const styleTags = sheet.getStyleTags()
      const state = client.extract()
      const html = <Html {...{ content, state }} />
      const htmlString = renderHtml(styleTags, html)
      res.status(200)
      res.send(htmlString)
      res.end()
    })
  })

export default server
