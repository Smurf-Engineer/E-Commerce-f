/**
 * ArtworkSpecs Screen - Created by gustavomedina on 05/06/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import zenscroll from 'zenscroll'
import {
  Container, TextContainer, TitleBold,
} from './styledComponents'
import Layout from '../../components/MainLayout'
import { Colors, QueryProps } from '../../types/common'
import { Helmet } from 'react-helmet'
import messages from './messages'

declare global {
  interface Window {
    yotpo: any
  }
}

interface ColorsData extends QueryProps {
  colorsResult: Colors
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  colorsList: ColorsData
}

export class Reviews extends React.Component<Props, {}> {
  componentDidMount() {
    if (typeof window !== 'undefined' && zenscroll) {
      zenscroll.toY(0, 0)
    }
    // tslint:disable-next-line: max-line-length
    const x = document.createElement('script')
    x.type = 'text/javascript'
    x.async = !0
    x.src = '//staticw2.yotpo.com/Rnb6ShWsqfzkqYmFM5RuNHtDJvKIcsexNP7yvpUO/widget.js'
    const t = document.getElementsByTagName('script')[0]
    if (t && t.parentNode) {
      t.parentNode.insertBefore(x, t)
    }
    if (typeof window !== 'undefined' && window.yotpo && window.yotpo.inview) {
      window.yotpo.refreshWidgets()
    }
  }
  componentDidUpdate() {
    if (typeof window !== 'undefined' && window.yotpo && window.yotpo.inview) {
      window.yotpo.refreshWidgets()
    }
  }
  render() {
    const {
      intl,
      history,
    } = this.props
    {/* tslint:disable:max-line-length */}
    const helmetData = 
      <Helmet title="Custom Cycling Apparel Reviews - JAKROO">
        <meta name="description" content="Custom apparel by Jakroo - Get your custom order started today! Delivered in 2 weeks or less.Two ways to customize your kit" />
        <meta name="keywords" content="custom team apparel, made to order, online jersey designer, customized cycling kits, personalized cycling jerseys" />
        <meta name="Content-Language" content="en" />
        <meta name="page-topic" content="Sport" />
        <meta name="page-type" content="Custom Jerseys" />
        <meta property="og:description" content="Custom apparel by Jakroo - Get your custom order started today! Delivered in 2 weeks or less.Two ways to customize your kit" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.jakroo.com/reviews" />
        <meta property="og:image" content="https://storage.googleapis.com/jakroo/homepage/reviewsimage.png" />
        <link rel="canonical" href="https://www.jakroo.com/" />
        <link rel="author" href="https://www.jakroo.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://jakroo.com/us?lang=en&currency=usd" />
        <link rel="alternate" hrefLang="en-gb" href="https://jakroo.com/gb?lang=en&currency=gbp" />
        <link rel="alternate" hrefLang="en-us" href="https://jakroo.com/us?lang=en&currency=usd" />
        <link rel="alternate" hrefLang="en-ca" href="https://jakroo.com/ca?lang=en&currency=cad" />
        <link rel="alternate" hrefLang="en-au" href="https://jakroo.com/au?lang=en&currency=aud" />
        <link rel="alternate" hrefLang="en" href="https://jakroo.com/us?lang=en&currency=usd" />
      </Helmet>
    {/* tslint:enable:max-line-length */}
    const { formatMessage = () => '' } = intl || {}
    return (
      <Layout {...{ intl, history }}>
        {helmetData}
        <Container>
          <TextContainer>
            {formatMessage(messages.title)}
          </TextContainer>
          <TitleBold>
            {formatMessage(messages.mainTitle)}
          </TitleBold>
          <div
            class="yotpo yotpo-pictures-widget"
            className="yotpo yotpo-pictures-widget"
            data-gallery-id="5bff13a3d9a55a5737932331"
          />
          <div id="yotpo-testimonials-custom-tab" />
        </Container>
      </Layout>
    )
  }
}

const ReviewsEnhance = compose(
  injectIntl
)(Reviews)

export default ReviewsEnhance
