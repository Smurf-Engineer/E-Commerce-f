/**
 * Overview Component - Created by miguelcanobbio on 17/07/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import MediaQuery from 'react-responsive'
import SwipeableViews from 'react-swipeable-views'
import * as OverviewActions from './actions'
import { overviewQuery } from './data'
import messages from './messages'
import {
  Container,
  ScreenTitle,
  BottomContainer,
  Column
} from './styledComponents'
import OverviewHeader from './OverviewHeader'
import OrdersList from '../OrderHistory/OrdersList'
import OrderDetails from '../OrderDetails'
import withError from '../WithError'
import withLoading from '../WithLoading'
import PaymentData from '../PaymentData'
import AddressData from './AddressData'
import ProfileData from './ProfileData'
import EmptyContainer from '../EmptyContainer'
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
  address: {
    addresses: AddressType[]
  }
  payment: {
    cards: CreditCardData[]
  }
}

interface Props {
  history: any
  data: Data
  orderId: string
  currentCurrency: string
  formatMessage: (messageDescriptor: any) => string
  goToScreen: (screen: string) => void
  setOrderIdAction: (orderId: string) => void
}

class Overview extends React.Component<Props, {}> {
  render() {
    const {
      formatMessage,
      orderId,
      data: { profile, address, payment },
      goToScreen,
      currentCurrency
    } = this.props
    const { addresses } = address
    const contentAddress = addresses.length ? (
      <AddressData address={addresses[0]} {...{ formatMessage }} />
    ) : (
      <EmptyContainer message={formatMessage(messages.emptyAddress)} />
    )
    const { cards } = payment
    const contentPayment =
      cards && cards.length ? (
        <PaymentData card={cards[0]} />
      ) : (
        <EmptyContainer message={formatMessage(messages.emptyPayment)} />
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
      <SwipeableViews
        disabled={true}
        onChangeIndex={this.handleOnChangeIndex}
        index={!!orderId.length ? 1 : 0}
      >
        <Container>
          <ScreenTitle>
            <FormattedMessage {...messages.title} />
          </ScreenTitle>
          <OverviewHeader
            id={ORDER_HISTORY}
            label={formatMessage(messages.headerTitle)}
            onGoTo={goToScreen}
            extraMargin={'16px'}
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
        <OrderDetails
          onReturn={this.handleOnOrderClick}
          {...{ orderId, formatMessage, currentCurrency }}
        />
      </SwipeableViews>
    )
  }

  handleOnOrderClick = (orderId: string) => {
    const { setOrderIdAction } = this.props
    setOrderIdAction(orderId)
  }

  handleOnChangeIndex = (index: number) => {
    if (index === 0) {
      this.handleOnOrderClick('')
    }
  }
}

const mapStateToProps = (state: any) => state.get('overview').toJS()

const OverViewEnhance = compose(
  connect(
    mapStateToProps,
    { ...OverviewActions }
  ),
  graphql(overviewQuery),
  withError,
  withLoading
)(Overview)

export default OverViewEnhance
