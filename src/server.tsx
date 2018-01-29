import * as React from 'react'
import * as express from 'express'
import App from './App'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Html from './Html'
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

    const AppContent = (
      <ApolloProvider {...{ client }}>
        <StaticRouter {...{ context, location }}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    )

    getDataFromTree(AppContent).then(() => {
      const content = renderToString(AppContent)
      const state = client.extract()

      const html = <Html {...{ content, state }} />

      res.status(200)
      res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`)
      res.end()
    })
  })

export default server
