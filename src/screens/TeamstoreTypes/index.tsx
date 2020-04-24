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
  TeamImage
} from './styledComponents'
import Layout from '../../components/MainLayout'
import creditCard from '../../assets/Stripe.png'
import sepa from '../../assets/sepa.png'
import onDemandImage from '../../assets/OnDemand-Guys.jpg'
import ScheduledImage from '../../assets/Scheduled-Team.jpg'
import onDemandBanner from '../../assets/OnDemand.png'
import scheduledBanner from '../../assets/Scheduled.png'
import paypal from '../../assets/Paypal.png'
import { compose } from 'react-apollo'
import { injectIntl, InjectedIntl } from 'react-intl'
import messages from './messages'
import { ON_DEMAND_DAYS, FIXED_DATE_DAYS } from './constants'

interface Props {
  intl: InjectedIntl
  history: any
}

const onDemandMessages = [
  'ordersCanBePlaced',
  'ordersShips',
  'individualCheckOut',
  'orderDate',
  'acceptedPayment'
]

const fixedDateMessages = [
  'setCutOff',
  'extendedOrdering',
  'quantityDiscounts',
  'bulk',
  'acceptedPayment'
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
      history
    } = this.props
    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Title>{formatMessage(messages.title)}</Title>
          <TeamStoreCardsContainer>
            <Card id="fixed" onClick={this.goTo}>
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
                        dayNumber: ON_DEMAND_DAYS
                      })
                    }}
                  />
                ))}
              </List>
              <PaymentIcons>
                <Icon src={creditCard} />
                <Icon src={paypal} />
                <Icon src={sepa} />
              </PaymentIcons>
              <SelectTeamStoreButton id="demand" onClick={this.goTo}>
                {formatMessage(messages.select)}
              </SelectTeamStoreButton>
            </Card>
            <Card id="demand" onClick={this.goTo}>
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
                        dayNumber: FIXED_DATE_DAYS
                      })
                    }}
                  />
                ))}
              </List>
              <PaymentIcons>
                <Icon src={creditCard} />
              </PaymentIcons>
              <SelectTeamStoreButton id="fixed" onClick={this.goTo}>
                {formatMessage(messages.select)}
              </SelectTeamStoreButton>
            </Card>
          </TeamStoreCardsContainer>
        </Container>
      </Layout>
    )
  }
}

const TeamstoreTypesEnhance = compose(injectIntl)(TeamstoreTypes)
export default TeamstoreTypesEnhance
