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
  formatMessage: (messageDescriptor: any) => string
  onSetFeatured: (id: number) => void
  onClickRow: (id: number) => void
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
  onSetFeatured,
  onClickRow
}: Props) => {
  const stopPropagation = (event: any) => {
    if (event) {
      event.stopPropagation()
    }
  }
  const handleOnClick = () => {
    onClickRow(id)
  }
  const handleOnSetFeatured = () => {
    onSetFeatured(id)
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
        <Switch onChange={handleOnSetFeatured} checked={featured} />
      </Cell>
    </Container>
  )
}

export default ItemOrder
