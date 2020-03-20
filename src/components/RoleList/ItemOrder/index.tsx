/**
 * ItemOrder Component - Created by Jesús Apodaca on 19/03/20.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
interface Props {
  id: number
  firstName: string
  lastName: string
  socialMethod: string
  email: string
  role: string
}

class ItemOrder extends React.PureComponent<Props, {}> {
  render() {
    const { id, firstName, lastName, socialMethod, email, role } = this.props
    return (
      <Container>
        <Cell>{id}</Cell>
        <Cell>
          {firstName} {lastName}
        </Cell>
        <Cell>{socialMethod}</Cell>
        <Cell lower={true}>{email}</Cell>
        <Cell>{role}</Cell>
      </Container>
    )
  }
}

export default ItemOrder
