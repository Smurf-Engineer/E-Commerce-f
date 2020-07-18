/**
 * ItemOrder Component - Created by eduardoquintero on 15/07/19.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
import Switch from 'antd/lib/switch'
import messages from '../TeamStoresList/messages'
import { User } from '../../../types/common'

interface Props {
  id: number
  name: string
  featured: boolean
  userFirstName: string
  userLastName: string
  onDemand: boolean
  cutOffDateString?: string
  deliveryDate?: string
  shortId: string
  display: boolean
  canEdit: boolean
  accountManager: User
  formatMessage: (messageDescriptor: any) => string
  onChangeSwitch: (id: number, fieldId: string) => void
  onClickRow: (id: string) => void
}

const ItemOrder = ({
  id,
  name,
  featured,
  userFirstName,
  userLastName,
  onDemand,
  formatMessage,
  cutOffDateString,
  deliveryDate,
  onChangeSwitch,
  onClickRow,
  canEdit,
  shortId,
  display,
  accountManager
}: Props) => {
  const stopPropagation = (event: any) => {
    if (event) {
      event.stopPropagation()
    }
  }
  const handleOnClick = () => {
    onClickRow(shortId)
  }
  const handleOnSwitch = (fieldId: string) => () => {
    onChangeSwitch(id, fieldId)
  }
  return (
    <Container onClick={handleOnClick}>
      <Cell>{name}</Cell>
      <Cell>
        {userFirstName} {userLastName}
      </Cell>
      <Cell>{formatMessage(messages[onDemand ? 'onDemand' : 'fixed'])}</Cell>
      <Cell>
        {`${accountManager.firstName || '-'} ${accountManager.lastName || ''}`}
      </Cell>
      <Cell>{onDemand ? '-' : cutOffDateString}</Cell>
      <Cell>{onDemand ? '-' : deliveryDate}</Cell>
      <Cell onClick={stopPropagation}>
        <Switch
          disabled={!canEdit}
          onChange={handleOnSwitch('featured')}
          checked={featured}
        />
      </Cell>
      <Cell onClick={stopPropagation}>
        <Switch
          disabled={!canEdit}
          onChange={handleOnSwitch('display')}
          checked={display}
        />
      </Cell>
    </Container>
  )
}

export default ItemOrder
