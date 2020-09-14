/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Menu from 'antd/lib/menu'
import { Container, Cell, WarningIcon, StyledSelect } from './styledComponents'
import Select from 'antd/lib/select'
import messages from '../messages'
import upperFirst from 'lodash/upperFirst'
import { PAID_STATUS, PENDING_APPROVAL, PURGED } from '../../../constants'
import { Message } from '../../../types/common'

interface Props {
  date: string
  clientId: string
  trackingNumber?: string
  status: string
  shortId: string
  pendingCheck: boolean
  statusError?: boolean
  canEdit: boolean
  total?: number
  currency?: string
  firstName: string
  lastName: string
  source: string
  cutoffDate?: string
  estimatedDate?: string
  onOrderClick: (shortId: string) => void
  handleOnUpdateStatus: (status: string, orderId: string) => void
  formatMessage: (messageDescriptor: Message, params?: any) => string
  sendOrder: (orderId: string) => void
}

const Option = Select.Option

const options = [PAID_STATUS, PENDING_APPROVAL, PURGED]
const ItemOrder = ({
  date,
  clientId,
  status,
  shortId,
  total,
  currency,
  onOrderClick,
  pendingCheck,
  estimatedDate,
  statusError,
  canEdit,
  firstName,
  lastName,
  source,
  cutoffDate,
  handleOnUpdateStatus,
  formatMessage,
  sendOrder
}: Props) => {
  const handleOnClick = () => {
    onOrderClick(shortId)
  }
  const stopPropagation = (event: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
  }
  const onSelectStatus = (selectedStatus: string) =>
    handleOnUpdateStatus(selectedStatus, shortId)

  const onSendOrder = () => sendOrder(shortId)

  const selectOptions = options.map((option, index) => (
    <Option key={index} value={option}>
      {option}
    </Option>
  ))

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onSendOrder}>
        {formatMessage(messages.sendToNetsuite, { orderId: shortId })}
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown
      overlay={menu} trigger={['contextMenu']}>
      <Container onClick={handleOnClick}>
        <Cell>{shortId}</Cell>
        <Cell>{source}</Cell>
        <Cell>
          {total} {currency}
        </Cell>
        <Cell>{date}</Cell>
        <Cell>{cutoffDate}</Cell>
        <Cell>{estimatedDate}</Cell>
        <Cell>JV2-{clientId}</Cell>
        <Cell>{`${firstName} ${lastName}`}</Cell>
        <Cell textAlign={'center'}>
          {pendingCheck && <WarningIcon type="warning" theme="filled" />}
        </Cell>
        <Cell
          textAlign={'right'}
          className={statusError ? 'error' : ''}
          onClick={stopPropagation}
        >
          {upperFirst(status)}
          <StyledSelect
            disabled={!canEdit}
            onChange={onSelectStatus}
            showSearch={false}
            value={status}
          >
            {selectOptions}
          </StyledSelect>
        </Cell>
      </Container>
    </Dropdown>
  )
}

export default ItemOrder
