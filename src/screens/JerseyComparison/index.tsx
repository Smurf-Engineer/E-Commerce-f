/**
 * JerseyComparison Screen - Created by miguelcanobbio on 14/06/18.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import get from 'lodash/get'
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
import { GetProductsByIdQuery } from './data'
import jerseysInfo from './jerseysInfo'

interface Jersey {
  id: number
  name: string
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  fondoData: any
  tourData: any
  novaData: any
  currentCurrency: string
}

const MAX_LIMIT_PRICES = 4

const jerseys: Jersey[] = [
  { name: 'FONDO', id: 7 },
  { name: 'TOUR', id: 17 },
  { name: 'NOVA', id: 11 }
]

export class JerseyComparison extends React.Component<Props, {}> {
  render() {
    const { intl, history } = this.props
    const { formatMessage } = intl

    const pricesT = [
      messages.priceTitle1,
      messages.priceTitle2,
      messages.priceTitle3,
      messages.priceTitle4,
      messages.priceTitle5
    ]

    const pricesTitles = pricesT.map((price, i) => (
      <InfoText key={i} centered={true}>
        {formatMessage(price)}
      </InfoText>
    ))

    const mainJerseys = jerseysInfo.map(({ title, image, message }, i) => {
      const msg = formatMessage(title)

      return (
        <Column key={i}>
          <Title onClick={this.handleOnClickJersey(msg)}>{msg}</Title>
          <StyledImage src={image} onClick={this.handleOnClickJersey(msg)} />
          <Text>{formatMessage(message)}</Text>
        </Column>
      )
    })
    const detailsJerseys = jerseysInfo.map(({ details }, i) => (
      <Column key={i}>
        {details.map((detail, index) => (
          <InfoText key={index}>{formatMessage(detail)}</InfoText>
        ))}
      </Column>
    ))
    const useJerseys = jerseysInfo.map(({ intendedUse }, i) => (
      <Column key={i}>
        <Text>{formatMessage(intendedUse)}</Text>
      </Column>
    ))
    const weatherJerseys = jerseysInfo.map(({ weather }, i) => (
      <Column key={i}>
        <Text>{formatMessage(weather)}</Text>
      </Column>
    ))
    const fitJerseys = jerseysInfo.map(({ fits }, i) => (
      <Column key={i}>
        {fits.map((fit, index) => (
          <InfoText key={index}>{formatMessage(fit)}</InfoText>
        ))}
      </Column>
    ))
    const materialJerseys = jerseysInfo.map(({ materials }, i) => (
      <Column key={i}>
        {materials.map((material, index) => (
          <InfoText key={index}>{formatMessage(material)}</InfoText>
        ))}
      </Column>
    ))

    const priceJerseys = jerseysInfo.map(({ title }, i) => (
      <PriceColumn key={i}>
        <PriceTitlesContainer>{pricesTitles}</PriceTitlesContainer>
        <div>
          {this.getPricesArray(title.defaultMessage).map(
            ({ price }, key: number) => (
              <InfoText {...{ key }}>
                {key < MAX_LIMIT_PRICES
                  ? `$ ${price}`
                  : formatMessage(messages.priceCallUs)}
              </InfoText>
            )
          )}
        </div>
      </PriceColumn>
    ))

    return (
      <Layout {...{ intl, history }}>
        <Container>
          <Title>{formatMessage(messages.title)}</Title>
          <HeaderText>{formatMessage(messages.headerMessage)}</HeaderText>
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
      </Layout>
    )
  }

  getPricesArray = (title: string) => {
    const { fondoData, tourData, novaData, currentCurrency } = this.props

    const arr = [
      get(fondoData, 'product'),
      get(tourData, 'product'),
      get(novaData, 'product')
    ]

    let priceArray = arr.find(
      product => product && product.name.toLowerCase() === title.toLowerCase()
    )

    priceArray = priceArray && priceArray.priceRange

    const currencyPrices = filter(priceArray, {
      abbreviation: currentCurrency || config.defaultCurrency
    })

    return currencyPrices.slice(0, MAX_LIMIT_PRICES + 1) || []
  }

  handleOnClickJersey = (title: string) => () => {
    const {
      history: { push }
    } = this.props

    const jersey = jerseys.find(
      ({ name }) => name.toLowerCase() === title.toLowerCase()
    )
    const id = jersey && jersey.id

    push(`/product?id=${id}&yotpoId=${title.toLowerCase()}`)
  }
}

const mapStateToProps = (state: any) => state.get('languageProvider').toJS()

const JerseyComparisonEnhanced = compose(
  injectIntl,
  graphql<any>(GetProductsByIdQuery, {
    options: {
      variables: {
        id: 7
      },
      fetchPolicy: 'network-only'
    },
    name: 'fondoData'
  }),
  graphql<any>(GetProductsByIdQuery, {
    options: {
      variables: {
        id: 17
      },
      fetchPolicy: 'network-only'
    },
    name: 'tourData'
  }),
  graphql<any>(GetProductsByIdQuery, {
    options: {
      variables: {
        id: 11
      },
      fetchPolicy: 'network-only'
    },
    name: 'novaData'
  }),
  connect(mapStateToProps)
)(JerseyComparison)

export default JerseyComparisonEnhanced
