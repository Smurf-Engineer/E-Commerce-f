/**
 * ItemOrder Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import Switch from 'antd/lib/switch'
import { Container, Cell } from './styledComponents'

interface Props {
  id: number
  email: string
  socialMethod: string
  administrator: boolean
  firstName: string
  lastName: string
  netsuiteId: string
  onSetAdministrator: (id: number) => void
}

const ItemOrder = ({
  id,
  email,
  socialMethod,
  administrator,
  firstName,
  lastName,
  netsuiteId,
  onSetAdministrator
}: Props) => {
  const handleOnSetAdministrator = () => {
    onSetAdministrator(id)
  }
  return (
    <Container>
      <Cell>JV2-{id}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell>{socialMethod}</Cell>
      <Cell>
        <Switch onChange={handleOnSetAdministrator} checked={administrator} />
      </Cell>
      <Cell>{email}</Cell>
      <Cell>{netsuiteId}</Cell>
    </Container>
  )
}

export default ItemOrder
