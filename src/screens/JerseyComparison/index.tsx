/**
 * JerseyComparison Screen - Created by miguelcanobbio on 14/06/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import MediaQuery from 'react-responsive'
import filter from 'lodash/filter'
import messages from './messages'
import {
  Container,
  Title,
  Text,
  HeaderText,
  Column,
  Row,
  StyledImage,
  Subtitle,
  Divider,
  InfoText,
  PriceColumn,
  PriceTitlesContainer
} from './styledComponents'
import Layout from '../../components/MainLayout'
import config from '../../config/index'
import { GetProductsToCompareQuery } from './data'
import { QueryProps, Product } from '../../types/common'

interface Data extends QueryProps {
  product: Product[]
}
interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  currentCurrency: string
}

const MAX_LIMIT_PRICES = 4

export class JerseyComparison extends React.Component<Props, {}> {
  render() {
    const {
      intl,
      history,
      data: { loading, error, product = [] }
    } = this.props
    if (loading || error) {
      return null
    }
    const { formatMessage } = intl

    const pricesT = [
      messages.priceTitle1,
      messages.priceTitle2,
      messages.priceTitle3,
      messages.priceTitle4,
      messages.priceTitle5
    ]
    const jerseysInfo = loading || error ? [] : product
    const pricesTitles = pricesT.map((price, i) => (
      <InfoText key={i} centered={true}>
        {formatMessage(price)}
      </InfoText>
    ))

    const mainJerseys = jerseysInfo.map(({ name, images = [], description, id }, i) => {
      const image = images[0] ? (id === 63 ? images[0].thumbnail : images[0].front) : ''
      return (
        <Column key={i}>
          <div onClick={this.handleOnClickJersey(name)}>
            <Title>{name}</Title>
            <StyledImage src={image} />
          </div>
          <Text>{description}</Text>
        </Column>
      )
    })
    const detailsJerseys = jerseysInfo.map(({ details = '' }, i) => (
      <Column key={i}>
        {(details.split(',')).map((detail: string, index: number) => (
          <InfoText key={index}>• {detail}</InfoText>
        ))}
      </Column>
    ))
    const useJerseys = jerseysInfo.map(({ sports = [] }, i) => {
      const intededUse = sports.map((item: any) => item.name).join(', ')
      return ( 
        <Column key={i}>
          <Text>{intededUse}</Text>
        </Column>
      )
    })
    const weatherJerseys = jerseysInfo.map(({ season }, i) => (
      <Column key={i}>
        <Text>{season}</Text>
      </Column>
    ))
    const fitJerseys = jerseysInfo.map(({ fitStyles }, i) => (
      <Column key={i}>
        {fitStyles.map(({ name: fitName }, index) => (
          <InfoText key={index}>• {fitName}</InfoText>
        ))}
      </Column>
    ))
    const materialJerseys = jerseysInfo.map(({ materials = '' }, i) => (
      <Column key={i}>
        {(materials.split('-')).map((material: string, index: number) => (
          <InfoText key={index}>• {material}</InfoText>
        ))}
      </Column>
    ))

    const priceJerseys = jerseysInfo.map(({ name }, i) => 
        <PriceColumn key={i}>
          <PriceTitlesContainer>{pricesTitles}</PriceTitlesContainer>
          <div>
            {this.getPricesArray(name).map(
              ({ shortName: symbol, price }, key: number) => (
                <InfoText {...{ key }}>
                  {key < MAX_LIMIT_PRICES
                    ? `${symbol} ${price}`
                    : formatMessage(messages.priceCallUs)}
                </InfoText>
              )
            )}
          </div>
        </PriceColumn>
      )

    const headerSection = (
      <div>
        <Title>{formatMessage(messages.title)}</Title>
        <HeaderText>{formatMessage(messages.headerMessage, { quantity: jerseysInfo.length })}</HeaderText>
      </div>
    )

    return (
      <Layout {...{ intl, history }}>
        <MediaQuery minWidth={'553px'}>
          {matches => {
            if (matches) {
              return (
                <Container>
                  {headerSection}
                  <Row>{mainJerseys}</Row>
                  <Subtitle>{formatMessage(messages.details)}</Subtitle>
                  <Divider />
                  <Row>{detailsJerseys}</Row>
                  <Subtitle>{formatMessage(messages.intentedUse)}</Subtitle>
                  <Divider />
                  <Row>{useJerseys}</Row>
                  <Subtitle>{formatMessage(messages.weather)}</Subtitle>
                  <Divider />
                  <Row>{weatherJerseys}</Row>
                  <Subtitle>{formatMessage(messages.fit)}</Subtitle>
                  <Divider />
                  <Row>{fitJerseys}</Row>
                  <Subtitle>{formatMessage(messages.materials)}</Subtitle>
                  <Divider />
                  <Row>{materialJerseys}</Row>
                  <Subtitle>{formatMessage(messages.pricing)}</Subtitle>
                  <Divider />
                  <Row>{priceJerseys}</Row>
                </Container>
              )
            }
            return (
              <Container>
                {headerSection}
                {jerseysInfo.map((jersey, i) => (
                  <div key={i}>
                    {mainJerseys[i]}
                    <Subtitle>{formatMessage(messages.details)}</Subtitle>
                    <Divider />
                    <Row>{detailsJerseys[i]}</Row>
                    <Subtitle>{formatMessage(messages.intentedUse)}</Subtitle>
                    <Divider />
                    <Row>{useJerseys[i]}</Row>
                    <Subtitle>{formatMessage(messages.weather)}</Subtitle>
                    <Divider />
                    <Row>{weatherJerseys[i]}</Row>
                    <Subtitle>{formatMessage(messages.fit)}</Subtitle>
                    <Divider />
                    <Row>{fitJerseys[i]}</Row>
                    <Subtitle>{formatMessage(messages.materials)}</Subtitle>
                    <Divider />
                    <Row>{materialJerseys[i]}</Row>
                    <Subtitle>{formatMessage(messages.pricing)}</Subtitle>
                    <Divider />
                    <Row>{priceJerseys[i]}</Row>
                    <Divider />
                  </div>
                ))}
              </Container>
            )
          }}
        </MediaQuery>
      </Layout>
    )
  }

  getPricesArray = (title: string) => {
    const {
      currentCurrency,
      data: { product: productsArray }
    } = this.props

    let priceArray = productsArray.find(
      product => product && product.name.toLowerCase() === title.toLowerCase()
    )

    const currency = priceArray && priceArray.priceRange

    const currencyPrices = filter(currency, {
      abbreviation: currentCurrency || config.defaultCurrency
    })

    return currencyPrices.slice(0, MAX_LIMIT_PRICES + 1) || []
  }

  handleOnClickJersey = (title: string) => () => {
    const {
      history: { push },
      data
    } = this.props
    const { product = [] } = data || {}
    const jersey = product.find(
      ({ name }) => name.toLowerCase() === title.toLowerCase()
    )
    const id = jersey && jersey.id

    push(`/product?id=${id}&modelId=${title.toLowerCase()}`)
  }
}

const mapStateToProps = (state: any) => state.get('languageProvider').toJS()

const JerseyComparisonEnhanced = compose(
  injectIntl,
  graphql(GetProductsToCompareQuery),
  connect(mapStateToProps)
)(JerseyComparison)

export default JerseyComparisonEnhanced
