import * as React from 'react'
import * as express from 'express'
import { setMobileDetect, mobileParser } from 'react-responsive-redux'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import fetch from 'node-fetch'
import Html from './helpers/Html'
import renderHtml from './helpers/render'
import UAParser from 'ua-parser-js'
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

    let locale: Region = {
      region: 'global',
      code: 'us',
      lang: 'en',
      currency: 'usd',
      realCountryCode: 'us'
    }

    let sportRoutes = {
      CYCLING: '/cycling',
      TRIATHLON: '/triathlon',
      NORDIC: '/nordic',
      ACTIVE: '/active',
      MOUNTAIN_BIKE: '/mountain_bike',
      ROAD_BIKE: '/road_bike',
      TRAINING: '/training',
      RUN: '/run'
    }

    try {
      const resultFetch = await fetch(
        `${config.graphqlUriBase}region?ip=${req.ip}`
      )
      locale = await resultFetch.json()
    } catch (error) {
      console.error(error)
    }

    const redirectUrl = `/${locale.code}?lang=${locale.lang}&currency=${
      locale.currency
    }`
    if (location === '/') {
      res.redirect(redirectUrl)
      return
    }

    switch (location) {
      case sportRoutes.CYCLING:
        res.redirect(`${sportRoutes.CYCLING}${redirectUrl}`)
        return
      case sportRoutes.TRIATHLON:
        res.redirect(`${sportRoutes.TRIATHLON}${redirectUrl}`)
        return
      case sportRoutes.NORDIC:
        res.redirect(`${sportRoutes.NORDIC}${redirectUrl}`)
        return
      case sportRoutes.ACTIVE:
        res.redirect(`${sportRoutes.ACTIVE}${redirectUrl}`)
        return
      case sportRoutes.MOUNTAIN_BIKE:
        res.redirect(`${sportRoutes.MOUNTAIN_BIKE}${redirectUrl}`)
        return
      case sportRoutes.ROAD_BIKE:
        res.redirect(`${sportRoutes.ROAD_BIKE}${redirectUrl}`)
        return
      case sportRoutes.TRAINING:
        res.redirect(`${sportRoutes.TRAINING}${redirectUrl}`)
        return
      case sportRoutes.RUN:
        res.redirect(`${sportRoutes.RUN}${redirectUrl}`)
        return
      default:
        break
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
      const finalState = store.getState()

      const html = <Html {...{ content, state }} reduxState={finalState} />
      const htmlString = renderHtml(styleTags, html)
      res.status(200)
      res.send(htmlString)
      res.end()
    })
  })

export default server
