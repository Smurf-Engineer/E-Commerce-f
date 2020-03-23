/**
 * ItemOrder Component - Created by Jesús Apodaca on 19/03/20.
 */
import * as React from 'react'
import { Container, Cell, RoleSelect, RoleOption } from './styledComponents'
import { Role } from '../../../types/common'
import Spin from 'antd/lib/spin'
interface Props {
  id: number
  firstName: string
  roles: Role[]
  lastName: string
  socialMethod: string
  email: string
  role: string
  changeRole: (userId: number, role: string) => void
}

class ItemOrder extends React.PureComponent<Props, {}> {
  handleChangeRole = (roleId: string) => {
    const { changeRole, id } = this.props
    changeRole(id, roleId)
  }
  render() {
    const {
      id: userId,
      firstName,
      roles,
      lastName,
      socialMethod,
      email,
      role
    } = this.props
    return (
      <Container>
        <Cell>{userId}</Cell>
        <Cell>
          {firstName} {lastName}
        </Cell>
        <Cell>{socialMethod}</Cell>
        <Cell lower={true}>{email}</Cell>
        <Cell width="238px">
          {roles && roles.length ? (
            <RoleSelect
              value={role}
              onChange={this.handleChangeRole}
              allowClear={true}
            >
              {roles.map(({ id, name }: Role) => (
                <RoleOption value={id}>{name}</RoleOption>
              ))}
            </RoleSelect>
          ) : (
            <Spin />
          )}
        </Cell>
      </Container>
    )
  }
}

export default ItemOrder
