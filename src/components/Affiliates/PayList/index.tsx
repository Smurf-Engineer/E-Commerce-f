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
  // Clip,
  // FileName,
  PayButton,
  SearchInput,
  HeaderSection,
  Mail
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
// import { getFileWithExtension } from '../../../utils/utilsFiles'
import { PENDING_PAY, TO_PAY, SHIPPED, PARTIALLY_SHIPPED } from '../../../constants'
import clone from 'lodash/clone'
import { message } from 'antd'
import debounce from 'lodash/debounce'

interface Data extends QueryProps {
  paymentsResult: AffiliatesResult
}

interface Props {
  data: Data
  history: History
  currentPage: number
  searchText?: string
  startParam: string
  endParam: string
  loading: boolean
  canEdit: boolean
  overrideStatus: boolean
  isAccountant: boolean
  selected: SelectedPays
  handleInputChange: (value: string) => void
  setLoading: (loading: boolean) => void
  makePayments: (variables: {}) => Promise<AffiliatePayment>
  setSelected: (value: SelectedPays) => void
  formatMessage: (messageDescriptor: any) => string
  onChangePage: (page: number) => void
}

export class PayList extends React.Component<Props, {}> {
  debounceSearch = debounce(value => this.props.handleInputChange(value), 800)

  handleOnUpdateText = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.debounceSearch(value)
  }
  handleCheckChange = (event: CheckboxChangeEvent) => {
    const { data, selected, setSelected } = this.props
    const { target: { checked } } = event
    const payments = get(data, 'paymentsResult.payments', []) as AffiliatePayment[]
    const newSelected = clone(selected)
    payments.forEach(({ id, status, paypalAccount }: AffiliatePayment) => {
      newSelected[id] = status === PENDING_PAY && !!paypalAccount ? checked : false
    })
    setSelected(newSelected)
  }
  openLinkAction = (receipt: string) => () => {
    window.open(receipt)
  }

  stopPropagation = (event: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
  }

  handleCheckRow = (event: CheckboxChangeEvent) => {
    const { selected, setSelected } = this.props
    const { target: { checked, id } } = event
    const newSelected = clone(selected)
    newSelected[id] = checked
    setSelected(newSelected)
  }

  handleMakePayment = async () => {
    const {
      formatMessage,
      selected,
      setSelected,
      makePayments,
      setLoading,
    } = this.props
    try {
      const list = Object.keys(selected).reduce(((arr: string[], id: string) => {
        if (selected[id]) {
          arr.push(id)
        }
        return arr
        // tslint:disable-next-line: align
      }), [])
      setLoading(true)
      await makePayments({
        variables: {
          list
        }
      })
      setSelected({})
      message.success(formatMessage(messages.paymentsDone))
    } catch (e) {
      message.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  openOrder = (event: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { id }
    } = event
    const { history } = this.props
    history.push(`/admin?order=${id}&from=affiliates`)
  }

  render() {
    const {
      formatMessage,
      selected,
      canEdit,
      overrideStatus,
      isAccountant,
      loading: loadingPayment,
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
        <HeaderSection>
          <SearchInput
            onChange={this.handleOnUpdateText}
            placeholder={formatMessage(messages.search)}
          />
          {(hasChecked && canEdit) &&
            <PayButton onClick={this.handleMakePayment}>
              {formatMessage(messages[isAccountant ? 'payAll' : 'requestPay'])}
            </PayButton>
          }
        </HeaderSection>
        {loading || loadingPayment &&
          <LoadingContainer>
            <Spin size="large" />
          </LoadingContainer>
        }
        <Table>
          <thead>
            <Row>
              <Header>
                {canEdit &&
                  <Checkbox
                    {...{ checked, indeterminate }}
                    onChange={this.handleCheckChange}
                  />
                }
              </Header>
              <Header>{formatMessage(messages.date)}</Header>
              <Header>{formatMessage(messages.clientId)}</Header>
              <Header>{formatMessage(messages.name)}</Header>
              <Header width="100px">{formatMessage(messages.paypalAccount)}</Header>
              <Header>{formatMessage(messages.affiliatePercent)}</Header>
              <Header>{formatMessage(messages.status)}</Header>
              <Header width="80px">{formatMessage(messages.originAmount)}</Header>
              <Header width="80px">{formatMessage(messages.amountBase)}</Header>
              <Header width="70px">{formatMessage(messages.amount)}</Header>
              <Header>{formatMessage(messages.orderId)}</Header>
              <Header>{formatMessage(messages.orderStatus)}</Header>
              <Header>{formatMessage(messages.customerId)}</Header>
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
                  orderId,
                  netsuite,
                  customerId,
                  orderStatus,
                  currency,
                  totalOrigin,
                  orderAmount,
                  orderCurrency,
                }: AffiliatePayment,
                index: number) => {
                const netsuiteStatus = netsuite ? netsuite.orderStatus : ''
                return (
                  <RepDiv id={orderId} onClick={this.openOrder} key={index}>
                    <Cell onClick={this.stopPropagation}>
                      {(
                        (
                          (status === TO_PAY && isAccountant) ||
                          (!isAccountant && status === PENDING_PAY &&
                            ((netsuiteStatus === SHIPPED || netsuiteStatus === PARTIALLY_SHIPPED) || overrideStatus)
                          )
                        ) &&
                        !!paypalAccount && canEdit
                      ) &&
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
                    <Cell width="100px">
                      <Mail title={paypalAccount}>{paypalAccount}</Mail>
                    </Cell>
                    <Cell>{`${comission}%`}</Cell>
                    <Cell>{status}</Cell>
                    <Cell width="100px" bold={true}>{`${orderCurrency} ${totalOrigin.toFixed(2)}`}</Cell>
                    <Cell width="100px" bold={true}>{`${currency} ${orderAmount.toFixed(2)}`}</Cell>
                    <Cell width="90px" bold={true}>{`${currency} ${amount.toFixed(2)}`}</Cell>
                    <Cell>{orderId}</Cell>
                    <Cell>{netsuiteStatus || orderStatus}</Cell>
                    <Cell>{`JV2-${customerId}`}</Cell>
                  </RepDiv>
                )
              })
            ) : (
                <EmptyContainer message={formatMessage(messages.empty)} />
              )}
          </tbody>
        </Table>
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
  status?: String,
  orderPoint?: String
}

const PayListEnhance = compose(
  graphql(makePaymentsMutation, { name: 'makePayments' }),
  graphql(getAffiliatesPayments, {
    options: ({ currentPage, searchText, startParam, endParam, status, orderPoint }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * PAY_LIMITS : 0
      return {
        variables: {
          limit: PAY_LIMITS,
          offset,
          text: searchText,
          start: startParam,
          end: endParam,
          status,
          orderPoint
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
  withError,
  withLoading
)(PayList)

export default PayListEnhance
