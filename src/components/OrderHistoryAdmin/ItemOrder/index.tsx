/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell, WarningIcon } from './styledComponents'
import upperFirst from 'lodash/upperFirst'

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
  onOrderClick: (shortId: string) => void
}

const ItemOrder = ({
  date,
  clientId,
  status,
  shortId,
  onOrderClick,
  pendingCheck,
  statusError,
  firstName,
  lastName
}: Props) => {
  const handleOnClick = () => {
    onOrderClick(shortId)
  }
  return (
    <Container onClick={handleOnClick}>
      <Cell>{shortId}</Cell>
      <Cell>{date}</Cell>
      <Cell>JV2-{clientId}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell textAlign={'center'}>
        {pendingCheck && <WarningIcon type="warning" theme="filled" />}
      </Cell>
      <Cell textAlign={'right'} className={statusError ? 'error' : ''}>
        {upperFirst(status)}
      </Cell>
    </Container>
  )
}

export default ItemOrder
