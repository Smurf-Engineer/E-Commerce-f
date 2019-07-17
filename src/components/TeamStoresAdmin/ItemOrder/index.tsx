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
  onSetFeatured
}: Props) => {
  const handleOnSetFeatured = () => {
    onSetFeatured(id)
  }
  return (
    <Container>
      <Cell>{name}</Cell>
      <Cell>
        {userFirstName} {userLastName}
      </Cell>
      <Cell>{formatMessage(messages[onDemand ? 'onDemand' : 'fixed'])}</Cell>
      <Cell>{onDemand ? '-' : cutOffDateString}</Cell>
      <Cell>
        <Switch onChange={handleOnSetFeatured} checked={featured} />
      </Cell>
    </Container>
  )
}

export default ItemOrder
