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
  SelectTeamStoreButton
} from './styledComponents'
import Layout from '../../components/MainLayout'
import creditCard from '../../assets/creditcard.svg'
import iban from '../../assets/iban.svg'
import paypal from '../../assets/paypal_card.svg'
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
  'acceptedPayment'
]

const fixedDateMessages = [
  'setCutOff',
  'extendedOrdering',
  'quantityDiscounts',
  'ordersShips',
  'creditCard'
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
            <Card>
              <CardTitle>{formatMessage(messages.onDemand)}</CardTitle>
              <List>
                {onDemandMessages.map((item: string, index: number) => (
                  <Item key={index}>
                    {formatMessage(messages[item], {
                      dayNumber: ON_DEMAND_DAYS
                    })}
                  </Item>
                ))}
              </List>
              <PaymentIcons>
                <Icon src={creditCard} />
                <Icon src={paypal} />
                <Icon src={iban} />
              </PaymentIcons>
              <SelectTeamStoreButton id="demand" onClick={this.goTo}>
                {formatMessage(messages.select)}
              </SelectTeamStoreButton>
            </Card>
            <Card>
              <CardTitle>{formatMessage(messages.fixedDate)}</CardTitle>
              <List>
                {fixedDateMessages.map((item: string, index: number) => (
                  <Item key={index}>
                    {formatMessage(messages[item], {
                      dayNumber: FIXED_DATE_DAYS
                    })}
                  </Item>
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
