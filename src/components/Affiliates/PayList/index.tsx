/**
 * SalesRep Component - Created by Jesús Apodaca on 23/03/20.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import messages from './messages'
import {
  Container,
  Header,
  Row,
  Table,
  RepDiv,
  Cell,
  LoadingContainer,
  Clip,
  FileName
} from './styledComponents'
import EmptyContainer from '../../EmptyContainer'
import { AffiliatesResult, QueryProps, AffiliatePayment, SelectedPays } from '../../../types/common'
import withError from '../../WithError'
import withLoading from '../../WithLoading'
import { getAffiliatesPayments, makePaymentsMutation } from './data'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
import Pagination from 'antd/lib/pagination/Pagination'
import Spin from 'antd/lib/spin'
import { PAY_LIMITS } from '../constants'
import moment from 'moment'
import { NOTE_FORMAT } from '../../UsersAdmin/constants'
import { getFileWithExtension } from '../../../utils/utilsFiles'
import { PENDING_PAY } from '../../../constants'
import clone from 'lodash/clone'

interface Data extends QueryProps {
  paymentsResult: AffiliatesResult
}

interface Props {
  data: Data
  history: History
  currentPage: number
  searchText?: string
  selected: SelectedPays
  setSelected: (value: SelectedPays) => void
  formatMessage: (messageDescriptor: any) => string
  onChangePage: (page: number) => void
}

class PayList extends React.Component<Props, {}> {
  stopPropagation = (event: any) => {
    if (event) {
      event.stopPropagation()
    }
  }
  handleCheckChange = (event: CheckboxChangeEvent) => {
    const { data, selected, setSelected } = this.props
    const { target: { checked } } = event
    const payments = get(data, 'paymentsResult.payments', []) as AffiliatePayment[]
    const newSelected = clone(selected)
    payments.forEach(({ id }: AffiliatePayment) => {
      newSelected[id] = checked
    })
    setSelected(newSelected)
  }
  openLinkAction = (receipt: string) => () => {
    const { history } = this.props
    history.push(receipt)
  }
  handleCheckRow = (event: CheckboxChangeEvent) => {
    const { selected, setSelected } = this.props
    const { target: { checked, id } } = event
    const newSelected = clone(selected)
    newSelected[id] = checked
    setSelected(newSelected)
  }
  render() {
    const {
      formatMessage,
      selected,
      currentPage,
      data,
      onChangePage
    } = this.props
    const { loading } = data || {}
    const payments = get(data, 'paymentsResult.payments', []) as AffiliatePayment[]
    const fullCount = get(data, 'paymentsResult.fullCount', 0)
    const checked = payments.every(({ id }: AffiliatePayment) => selected[id])
    const hasChecked = payments.some(({ id }: AffiliatePayment) => selected[id])
    const indeterminate = !checked && hasChecked
    return (
      <Container>
        {hasChecked &&
          <div>
            {formatMessage(messages.payAll)}
          </div>
        }
        {loading ? (
          <LoadingContainer>
            <Spin size="large" />
          </LoadingContainer>
        ) : (
            <Table>
              <thead>
                <Row>
                  <Header>
                    <Checkbox
                      {...{ checked, indeterminate }}
                      onChange={this.handleCheckChange}
                    />
                  </Header>
                  <Header>{formatMessage(messages.date)}</Header>
                  <Header>{formatMessage(messages.clientId)}</Header>
                  <Header>{formatMessage(messages.name)}</Header>
                  <Header>{formatMessage(messages.paypalAccount)}</Header>
                  <Header>{formatMessage(messages.affiliatePercent)}</Header>
                  <Header>{formatMessage(messages.status)}</Header>
                  <Header>{formatMessage(messages.amount)}</Header>
                  <Header>{formatMessage(messages.receipt)}</Header>
                </Row>
              </thead>
              <tbody>
                {payments.length ? (
                  payments.map((
                    {
                      id,
                      createdAt,
                      userId,
                      name,
                      paypalAccount,
                      comission,
                      status,
                      amount,
                      receipt
                    }: AffiliatePayment,
                    index: number) => {
                    const openLink = this.openLinkAction(receipt)
                    return (<RepDiv key={index}>
                      <Cell>
                        {status === PENDING_PAY &&
                          <Checkbox
                            {...{ id }}
                            checked={selected[id]}
                            onChange={this.handleCheckRow}
                          />
                        }
                      </Cell>
                      <Cell>
                        {createdAt ? moment(createdAt).format(NOTE_FORMAT) : ''}
                      </Cell>
                      <Cell>{userId}</Cell>
                      <Cell>{name}</Cell>
                      <Cell>{paypalAccount}</Cell>
                      <Cell>{`${comission}%`}</Cell>
                      <Cell>{status}</Cell>
                      <Cell bold={true}>{`$${amount}`}</Cell>
                      <Cell onClick={this.stopPropagation}>
                        <Clip type="paper-clip" />
                        <FileName onClick={openLink}>
                          {receipt ? getFileWithExtension(receipt) : ''}
                        </FileName>
                      </Cell>
                    </RepDiv>)
                  })
                ) : (
                    <EmptyContainer message={formatMessage(messages.empty)} />
                  )}
              </tbody>
            </Table>
          )}
        <Pagination
          current={currentPage}
          pageSize={PAY_LIMITS}
          total={Number(fullCount)}
          onChange={onChangePage}
        />
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  searchText?: string
  startParam?: string
  endParam?: string
}

const PayListEnhance = compose(
  graphql(makePaymentsMutation, { name: 'makePayments' }),
  graphql(getAffiliatesPayments, {
    options: ({ currentPage, searchText, startParam, endParam }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * PAY_LIMITS : 0
      return {
        variables: {
          limit: PAY_LIMITS,
          offset,
          text: searchText,
          start: startParam,
          end: endParam
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withError,
  withLoading
)(PayList)

export default PayListEnhance
