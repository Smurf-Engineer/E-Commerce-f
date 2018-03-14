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
      const resultFetch = await fetch(`${config.graphqlUriBase}region`)
      const json: any = await resultFetch.json()
      let region: Region = {} as Region
      switch (json.country_code) {
        case 'CA':
          region = {
            region: 'global',
            code: 'ca',
            lang: 'en',
            currency: 'cad'
          }
          break
        case 'AT':
          region = {
            region: 'europe',
            code: 'eu',
            lang: 'en',
            currency: 'eur'
          }
          break
        case 'GB':
          region = {
            region: 'europe',
            code: 'eu',
            lang: 'en',
            currency: 'eur'
          }
          break
        case 'DE':
          region = {
            region: 'europe',
            code: 'eu',
            lang: 'en',
            currency: 'eur'
          }
          break
        case 'FR':
          region = {
            region: 'europe',
            code: 'eu',
            lang: 'en',
            currency: 'eur'
          }
          break
        default:
          region = {
            region: 'global',
            code: 'us',
            lang: 'en',
            currency: 'usd'
          }
          break
      }
      res.redirect(
        `/${region.code}?lang=${region.lang}&currency=${region.currency}`
      )
      return
    }
    const locale = {
      region: 'global',
      code: 'us',
      lang: 'en',
      currency: 'usd'
    }
    const store = configureStore(locale)

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
