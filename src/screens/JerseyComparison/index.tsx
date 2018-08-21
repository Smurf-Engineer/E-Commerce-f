/**
 * JerseyComparison Screen - Created by miguelcanobbio on 14/06/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
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
import jerseysInfo from './jerseysInfo'

const jerseys = [
  { name: 'FONDO', id: 7 },
  { name: 'TOUR', id: 17 },
  { name: 'NOVA', id: 11 }
]

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

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

    const mainJerseys = jerseysInfo.map(({ title, image, message }, i) => (
      <Column key={i}>
        <Title onClick={() => this.handleOnClickJersey(title.defaultMessage)}>
          {formatMessage(title)}
        </Title>
        <StyledImage
          src={image}
          onClick={() => this.handleOnClickJersey(title.defaultMessage)}
        />
        <Text>{formatMessage(message)}</Text>
      </Column>
    ))
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

    const priceJerseys = jerseysInfo.map(({ prices }, i) => (
      <PriceColumn key={i}>
        <PriceTitlesContainer>{pricesTitles}</PriceTitlesContainer>
        <div>
          {prices.map((price, index) => (
            <InfoText key={index}>{formatMessage(price)}</InfoText>
          ))}
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

  handleOnClickJersey = (title: string) => {
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

const JerseyComparisonEnhanced = compose(injectIntl)(JerseyComparison)

export default JerseyComparisonEnhanced
