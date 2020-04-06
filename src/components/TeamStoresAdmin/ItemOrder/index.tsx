/**
 * ItemOrder Component - Created by eduardoquintero on 15/07/19.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
import Switch from 'antd/lib/switch'
import messages from '../TeamStoresList/messages'

interface Props {
  id: number
  name: string
  featured: boolean
  userFirstName: string
  userLastName: string
  onDemand: boolean
  cutOffDateString?: string
  shortId: string
  display: boolean
  canEdit: boolean
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
  onChangeSwitch,
  onClickRow,
  canEdit,
  shortId,
  display
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
      <Cell>{onDemand ? '-' : cutOffDateString}</Cell>
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
