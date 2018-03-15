import * as React from 'react'
import * as express from 'express'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import fetch from 'node-fetch'
import Html from './helpers/Html'
import renderHtml from './helpers/render'
import { configureServerClient } from './apollo'
import App from './screens/App'
import configureStore from './store'
import config from './config'

const server = express()
interface Region {
  region: string
  code: string
  lang: string
  currency: string
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', async (req: express.Request, res: express.Response) => {
    const client = configureServerClient()
    const location = req.url
    const context = {}

    if (location === '/') {
      try {
        const resultFetch = await fetch(`${config.graphqlUriBase}region`)
        const json: Region = await resultFetch.json()
        console.log('Success---->', json)
        res.redirect(
          `/${json.code}?lang=${json.lang}&currency=${json.currency}`
        )
      } catch (error) {
        const locale = {
          region: 'global',
          code: 'us',
          lang: 'en',
          currency: 'usd'
        }
        console.log('Failure---->', locale)
        res.redirect(
          `/${locale.code}?lang=${locale.lang}&currency=${locale.currency}`
        )
      }
      return
    }

    const store = configureStore()

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
