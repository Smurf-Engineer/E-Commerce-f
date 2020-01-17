/**
 * ItemOrder Component - Created by eduardoquintero on 16/01/20.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'

interface Props {
  id: number
  email: string
  socialMethod: string
  firstName: string
  lastName: string
}

const ItemOrder = ({ id, email, socialMethod, firstName, lastName }: Props) => {
  return (
    <Container>
      <Cell>JV2-{id}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell>{socialMethod}</Cell>
      <Cell>{'s'}</Cell>
      <Cell>{email}</Cell>
    </Container>
  )
}

export default ItemOrder
