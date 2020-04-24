/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell, WarningIcon, StyledSelect } from './styledComponents'
import Select from 'antd/lib/select'
import upperFirst from 'lodash/upperFirst'
import { PAID_STATUS, PENDING_APPROVAL, PURGED } from '../../../constants'

interface Props {
  date: string
  clientId: string
  trackingNumber?: string
  status: string
  shortId: string
  pendingCheck: boolean
  statusError?: boolean
  firstName: string
  lastName: string
  cutoffDate?: string
  estimatedDate?: string
  onOrderClick: (shortId: string) => void
  handleOnUpdateStatus: (status: string, orderId: string) => void
}

const Option = Select.Option

const options = [PAID_STATUS, PENDING_APPROVAL, PURGED]
const ItemOrder = ({
  date,
  clientId,
  status,
  shortId,
  onOrderClick,
  pendingCheck,
  estimatedDate,
  statusError,
  firstName,
  lastName,
  cutoffDate,
  handleOnUpdateStatus
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

  const selectOptions = options.map((option, index) => (
    <Option key={index} value={option}>
      {option}
    </Option>
  ))
  return (
    <Container onClick={handleOnClick}>
      <Cell>{shortId}</Cell>
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
          onChange={onSelectStatus}
          showSearch={false}
          value={status}
        >
          {selectOptions}
        </StyledSelect>
      </Cell>
    </Container>
  )
}

export default ItemOrder
