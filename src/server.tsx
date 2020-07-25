import * as React from 'react'
import * as express from 'express'
import { setMobileDetect, mobileParser } from 'react-responsive-redux'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import fetch from 'node-fetch'
import Html from './helpers/Html'
import renderHtml from './helpers/render'
import UAParser from 'ua-parser-js'
import { setRegionAction } from './screens/LanguageProvider/actions'
import { configureServerClient } from './apollo'
import App from './screens/App'
import configureStore from './store'
import config from './config'
import { SET_USER_AGENT_ACTION } from './store/constants'

const server = express()
interface Region {
  region: string
  code: string
  lang: string
  currency: string
  realCountryCode: string
}

const sportRoutes = [
  '/cycling',
  '/triathlon',
  '/nordic',
  '/active',
  '/mountain_bike',
  '/road_bike',
  '/training',
  '/run'
]
server
  .set('trust proxy', true)
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', async (req: express.Request, res: express.Response) => {
    const client = configureServerClient()
    const location = req.url
    const context = {}
    const store = configureStore()
    const { dispatch } = store

    const {
      lang: langFound = 'en',
      currency: currencyFound = 'usd'
    } = req.query
    const code = req.params ? req.params[0].split('/').pop() : 'us'

    let locale: Region = {
      region: 'global',
      code,
      lang: langFound,
      currency: currencyFound,
      realCountryCode: code
    }

    try {
      const resultFetch = await fetch(
        `${config.graphqlUriBase}region?ip=${req.ip}`
      )
      locale = await resultFetch.json()
    } catch (error) {
      locale.code = 'us'
      console.error(error)
    }

    const redirectUrl = `/${locale.code}?lang=${locale.lang}&currency=${
      locale.currency
      }`
    if (location === '/') {
      res.redirect(redirectUrl)
      return
    }

    if (sportRoutes.includes(location)) {
      res.redirect(`${location}${redirectUrl}`)
      return
    }

    const parser = new UAParser(req.headers['user-agent'] as string)
    const ua = parser.getResult()

    const mobileDetect = mobileParser(req)
    dispatch(setMobileDetect(mobileDetect))

    dispatch({
      type: SET_USER_AGENT_ACTION,
      client: ua,
      country: locale.realCountryCode
    })
    const { code: region, lang: localeIndex, lang: localeValue, currency: currencyValue } = locale
    dispatch(
      setRegionAction({
        region,
        localeIndex,
        locale: localeValue,
        currency: currencyValue
      })
    )
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
      const helmet = Helmet.renderStatic()
      const styleTags = sheet.getStyleTags()
      const state = client.extract()
      const finalState = store.getState()

      const html = <Html {...{ content, state }} reduxState={finalState} />
      const htmlString = renderHtml(styleTags, html, helmet)
      res.status(200)
      res.send(htmlString)
      res.end()
    })
  })

export default server
