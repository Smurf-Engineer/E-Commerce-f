/**
 * Overview Component - Created by miguelcanobbio on 17/07/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import MediaQuery from 'react-responsive'
import { overviewQuery } from './data'
import messages from './messages'
import {
  Container,
  BottomContainer,
  Column,
  EmptyContainer,
  EmptyMessage
} from './styledComponents'
import OverviewHeader from './OverviewHeader'
import OrdersList from '../OrderHistory/OrdersList'
import withError from '../WithError'
import withLoading from '../WithLoading'
import PaymentData from '../PaymentData'
import AddressData from './AddressData'
import ProfileData from './ProfileData'
import {
  ADDRESSES,
  CREDIT_CARDS,
  ORDER_HISTORY,
  PROFILE_SETTINGS
} from '../../screens/Account/constants'
import {
  QueryProps,
  IProfileSettings,
  CreditCardData,
  AddressType
} from '../../types/common'

interface Data extends QueryProps {
  profile: IProfileSettings
  addresses: AddressType[]
  payment: {
    cards: CreditCardData[]
  }
}

interface Props {
  history: any
  data: Data
  formatMessage: (messageDescriptor: any) => string
  goToScreen: (screen: string) => void
}

class Overview extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      data: { profile, addresses, payment },
      goToScreen
    } = this.props
    const contentAddress = addresses.length ? (
      <AddressData address={addresses[0]} {...{ formatMessage }} />
    ) : (
      <EmptyContainer>
        <EmptyMessage>{formatMessage(messages.emptyAddress)}</EmptyMessage>
      </EmptyContainer>
    )
    const { cards } = payment
    const contentPayment =
      cards && cards.length ? (
        <PaymentData card={cards[0]} />
      ) : (
        <EmptyContainer>
          <EmptyMessage>{formatMessage(messages.emptyPayment)}</EmptyMessage>
        </EmptyContainer>
      )
    const profileHeader = (
      <OverviewHeader
        id={PROFILE_SETTINGS}
        label={formatMessage(messages.profile)}
        onGoTo={goToScreen}
        {...{ formatMessage }}
      />
    )
    const addressHeader = (
      <OverviewHeader
        id={ADDRESSES}
        label={formatMessage(messages.addresses)}
        onGoTo={goToScreen}
        {...{ formatMessage }}
      />
    )
    const paymentHeader = (
      <OverviewHeader
        id={CREDIT_CARDS}
        label={formatMessage(messages.payment)}
        onGoTo={goToScreen}
        {...{ formatMessage }}
      />
    )
    const profileView = (
      <MediaQuery maxWidth={768}>
        {matches => {
          if (matches) {
            return (
              <div>
                <Column width="100%">
                  {profileHeader}
                  <ProfileData {...{ profile }} />
                </Column>
                <Column width="100%">
                  {addressHeader}
                  {contentAddress}
                </Column>
                <Column width="100%">
                  {paymentHeader}
                  {contentPayment}
                </Column>
              </div>
            )
          }
          return (
            <BottomContainer>
              <Column>
                {profileHeader}
                <ProfileData {...{ profile }} />
              </Column>
              <Column>
                {addressHeader}
                {contentAddress}
              </Column>
              <Column>
                {paymentHeader}
                {contentPayment}
              </Column>
            </BottomContainer>
          )
        }}
      </MediaQuery>
    )
    return (
      <Container>
        <OverviewHeader
          id={ORDER_HISTORY}
          label={formatMessage(messages.title)}
          onGoTo={goToScreen}
          {...{ formatMessage }}
        />
        <OrdersList
          customLimit={5}
          currentPage={1}
          orderBy="id"
          sort="desc"
          interactiveHeaders={false}
          withPagination={false}
          withoutPadding={true}
          onOrderClick={this.handleOnOrderClick}
          {...{ formatMessage }}
        />
        {profileView}
      </Container>
    )
  }

  handleOnOrderClick = (orderId: string) => {
    // TODO: go to order details when will be implemented
    const { history } = this.props
    history.push(`/order-placed?orderId=${orderId}`)
  }
}

const OverViewEnhance = compose(
  graphql(overviewQuery),
  withError,
  withLoading
)(Overview)

export default OverViewEnhance
