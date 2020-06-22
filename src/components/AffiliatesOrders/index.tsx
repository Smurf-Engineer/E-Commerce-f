/**
 * AffiliatesOrders Component - Created by Jesús Apodaca on 26/03/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import * as AffiliatesActions from './actions'
import {
  Container,
  ScreenTitle,
  ListContainer,
  Table,
  Row,
  Header,
  RepDiv,
  Cell,
  LoadingContainer,
  InfoSection,
} from './styledComponents'
import messages from './messages'
import { AffiliatePayment, QueryProps, AffiliatesResult } from '../../types/common'
import EmptyContainer from '../EmptyContainer'
import Pagination from 'antd/lib/pagination/Pagination'
import moment from 'moment'
import get from 'lodash/get'
import { PAY_LIMITS } from './constants'
import { getAffiliatesPayments } from './data'
import { NOTE_FORMAT } from '../UsersAdmin/constants'
import Spin from 'antd/lib/spin'
import MediaQuery from 'react-responsive'

interface Data extends QueryProps {
  paymentsResult: AffiliatesResult
}

interface Props {
  history: any
  data: Data
  currentPage: number
  formatMessage: (messageDescriptor: any) => string
  setCurrentPageAction: (page: number) => void
  resetDataAction: () => void
}

class AffiliatesOrders extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }

  render() {
    const {
      data,
      currentPage,
      formatMessage,
    } = this.props
    const { loading } = data || {}
    const payments = get(data, 'paymentsResult.payments', []) as AffiliatePayment[]
    const fullCount = get(data, 'paymentsResult.fullCount', 0)
    return (
      <Container>
        <ScreenTitle>
          <FormattedMessage {...messages.title} />
        </ScreenTitle>
        <ListContainer>
          <Table>
            <thead>
              <Row>
                <Header>{formatMessage(messages.orderDate)}</Header>
                <Header>{formatMessage(messages.orderNumber)}</Header>
                <MediaQuery minWidth={769}>
                  {matches => matches && (
                    <>
                      <Header>{formatMessage(messages.orderStatus)}</Header>
                      <Header>{formatMessage(messages.orderAmount)}</Header>
                    </>
                  )}
                </MediaQuery>
                <Header>{formatMessage(messages.commisionStatus)}</Header>
                <Header>{formatMessage(messages.amount)}</Header>
                <Header>{formatMessage(messages.datePaid)}</Header>
              </Row>
            </thead>
            {loading ?
              <LoadingContainer><Spin /></LoadingContainer>
              : <tbody>
                {payments.length ? (
                  payments.map((
                    {
                      createdAt,
                      orderAmount,
                      status,
                      amount,
                      orderId,
                      orderStatus,
                      paidAt,
                    }: AffiliatePayment,
                    index: number) =>
                    <RepDiv key={index}>
                      <Cell>
                        {createdAt ? moment(createdAt).format(NOTE_FORMAT) : '-'}
                      </Cell>
                      <Cell>{orderId}</Cell>
                      <MediaQuery minWidth={769}>
                        {matches => matches &&
                          <>
                            <Cell>{orderStatus}</Cell>
                            <Cell>${orderAmount.toFixed(2)}</Cell>
                          </>
                        }
                      </MediaQuery>
                      <Cell>{status}</Cell>
                      <Cell>${amount.toFixed(2)}</Cell>
                      <Cell>
                        {paidAt ? moment(paidAt).format(NOTE_FORMAT) : '-'}
                      </Cell>
                    </RepDiv>

                  )
                ) : (
                    <EmptyContainer message={formatMessage(messages.empty)} />
                  )}
              </tbody>}
          </Table>
          <InfoSection>
            <FormattedMessage {...messages.qualified} />
            <FormattedMessage {...messages.affiliateInfo} />
          </InfoSection>
          <Pagination
            current={currentPage}
            pageSize={PAY_LIMITS}
            total={Number(fullCount)}
            onChange={this.handleOnChangePage}
          />
        </ListContainer>
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
}

const mapStateToProps = (state: any) => state.get('affiliatesOrders').toJS()

const AffiliatesOrdersEnhance = compose(
  connect(mapStateToProps, { ...AffiliatesActions }),
  graphql(getAffiliatesPayments, {
    options: ({ currentPage }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * PAY_LIMITS : 0
      return {
        variables: {
          limit: PAY_LIMITS,
          offset,
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
)(AffiliatesOrders)

export default AffiliatesOrdersEnhance
