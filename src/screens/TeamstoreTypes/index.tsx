/**
 * TeamstoreTypes Screen - Created by eduardoquintero on 18/02/20.
 */
import * as React from 'react'
import {
  Container,
  Title,
  Card,
  CardTitle,
  TeamStoreCardsContainer,
  List,
  Item,
  PaymentIcons,
  Icon,
  SelectTeamStoreButton,
  TeamBanner,
  TeamImage,
  PaymentMethodsText,
  StyledSpin,
  LoadingContainer, ImageSkeleton
} from './styledComponents'
import Layout from '../../components/MainLayout'
import creditCard from '../../assets/creditcard_color.png'
import onDemandImage from '../../assets/OnDemand-Guys.jpg'
import ScheduledImage from '../../assets/Scheduled-Team.jpg'
import onDemandBanner from '../../assets/OnDemand.png'
import scheduledBanner from '../../assets/BatchOrder-Logo.png'
import paypal from '../../assets/Paypal.png'
import { compose, graphql } from 'react-apollo'
import { injectIntl, InjectedIntl } from 'react-intl'
import messages from './messages'
import { getDesignLabInfo } from './data'
import { QueryProps, DesignLabInfo } from '../../types/common'
import get from 'lodash/get'

interface DataDesignLabInfo extends QueryProps {
  designInfo?: DesignLabInfo
}

interface Props {
  intl: InjectedIntl
  data: DataDesignLabInfo
  history: any
}

const onDemandMessages = [
  'idealForSmall',
  'individualCheckout',
  'individualDiscounting',
  'fastTurnaround',
  'onDemandProduction'
]

const fixedDateMessages = [
  'idealForLarger',
  'individualCheckout',
  'saveWithGroup',
  'turnaroundDays',
  'bulk'
]

class TeamstoreTypes extends React.Component<Props, {}> {
  goTo = (event: React.MouseEvent<HTMLDivElement>) => {
    const { history } = this.props
    const {
      currentTarget: { id }
    } = event
    history.push(`/create-store/form?type=${id}`)
  }
  render() {
    const {
      intl,
      intl: { formatMessage },
      data,
      history
    } = this.props
    const designLabInfo = get(data, 'getDesignLabInfo', '')
    const { cutOffDays, deliveryDays } = designLabInfo || {}
    return (
      <Layout {...{ history, intl }}>
        {data.loading ?
          <LoadingContainer>
            <StyledSpin />
            <ImageSkeleton />
            <ImageSkeleton />
          </LoadingContainer> :
          <Container>
            <Title>{formatMessage(messages.title)}</Title>
            <TeamStoreCardsContainer>
              <Card id="demand" onClick={this.goTo}>
                <CardTitle>
                  <TeamBanner src={onDemandBanner} />
                </CardTitle>
                <TeamImage src={onDemandImage} />
                <List>
                  {onDemandMessages.map((item: string, index: number) => (
                    <Item
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages[item], {
                          dayNumber: deliveryDays
                        })
                      }}
                    />
                  ))}
                </List>
                <PaymentMethodsText>
                  {formatMessage(messages.acceptedPayment)}
                </PaymentMethodsText>
                <PaymentIcons>
                  <Icon src={creditCard} />
                  <Icon src={paypal} />
                </PaymentIcons>
                <SelectTeamStoreButton id="demand" onClick={this.goTo}>
                  {formatMessage(messages.select)}
                </SelectTeamStoreButton>
              </Card>
              <Card id="fixed" onClick={this.goTo}>
                <CardTitle>
                  <TeamBanner src={scheduledBanner} />
                </CardTitle>
                <TeamImage src={ScheduledImage} />
                <List>
                  {fixedDateMessages.map((item: string, index: number) => (
                    <Item
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages[item], {
                          dayNumber: cutOffDays
                        })
                      }}
                    />
                  ))}
                </List>
                <PaymentMethodsText>
                  {formatMessage(messages.acceptedPayment)}
                </PaymentMethodsText>
                <PaymentIcons>
                  <Icon src={creditCard} />
                  <Icon src={paypal} />
                </PaymentIcons>
                <SelectTeamStoreButton id="fixed" onClick={this.goTo}>
                  {formatMessage(messages.select)}
                </SelectTeamStoreButton>
              </Card>
            </TeamStoreCardsContainer>
          </Container>
        }
      </Layout>
    )
  }
}

const TeamstoreTypesEnhance = compose(
  injectIntl,
  graphql(getDesignLabInfo, {
    options: {
      fetchPolicy: 'network-only'
    }
  })
)(TeamstoreTypes)
export default TeamstoreTypesEnhance
