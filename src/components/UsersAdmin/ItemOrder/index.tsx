/**
 * ItemOrder Component - Created by eduardoquintero on 29/05/19.
 */
import * as React from 'react'
import Switch from 'antd/lib/switch'
import Select from 'antd/lib/select'
import moment from 'moment'
import { Container, Cell, StyledSelect, Mail } from './styledComponents'
import { User } from '../../../types/common'

const Option = Select.Option

interface Props {
  id: number
  email: string
  socialMethod: string
  administrator: boolean
  firstName: string
  lastName: string
  netsuiteId: string
  billingCountry: string
  createdAt: string
  shortId: string
  canEdit: boolean
  repSelected: User
  managerSelected: User
  repUsers: User[]
  managersUsers: User[]
  setManager: (value: string, userId: string) => void
  setUserRep: (value: string, userId: string) => void
  searchReps: (value: string) => void
  searchManager: (value: string) => void
  onSetAdministrator: (id: number) => void
  onSelectUser: (id: string, name: string) => void
}

const ItemOrder = ({
  id,
  email,
  socialMethod,
  administrator,
  firstName,
  repSelected,
  repUsers = [],
  managerSelected,
  managersUsers = [],
  setUserRep,
  setManager,
  searchReps,
  searchManager,
  lastName,
  netsuiteId,
  onSetAdministrator,
  billingCountry,
  createdAt,
  canEdit,
  onSelectUser,
  shortId,
}: Props) => {
  const stopPropagation = (event: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
  }
  const changeUserRep = (value: string) => {
    setUserRep(value, shortId)
  }
  const changeManager = (value: string) => {
    setManager(value, shortId)
  }
  const handleOnSetAdministrator = () => onSetAdministrator(id)
  const handleOnSelectUser = () =>
    onSelectUser(shortId, `${firstName} ${lastName}`)
  const selectedRep = repSelected
    ? `${repSelected.firstName} ${repSelected.lastName}`
    : null
  const selectedManager =
    managerSelected && managerSelected.shortId
      ? `${managerSelected.firstName} ${managerSelected.lastName}`
      : null
  return (
    <Container onClick={handleOnSelectUser}>
      <Cell>JV2-{id}</Cell>
      <Cell>{billingCountry}</Cell>
      <Cell>{moment(createdAt).format('DD-MM-YYYY')}</Cell>
      <Cell>{`${firstName} ${lastName}`}</Cell>
      <Cell>{socialMethod}</Cell>
      <Cell onClick={stopPropagation}>
        <Switch
          disabled={!canEdit}
          onChange={handleOnSetAdministrator}
          checked={administrator}
        />
      </Cell>
      <Cell>
        <Mail title={email}>{email}</Mail>
      </Cell>
      <Cell>{netsuiteId}</Cell>
      <Cell onClick={stopPropagation}>
        <StyledSelect
          showSearch={true}
          onChange={changeUserRep}
          value={selectedRep}
          disabled={!canEdit}
          notFoundContent={null}
          allowClear={true}
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={searchReps}
        >
          {repUsers.map(
            (
              { shortId: saleId, firstName: name, lastName: secondName }: User,
              indexSales
            ) => (
                <Option key={indexSales} value={saleId}>
                  {name} {secondName}
                </Option>
              )
          )}
        </StyledSelect>
      </Cell>
      <Cell onClick={stopPropagation}>
        <StyledSelect
          showSearch={true}
          onChange={changeManager}
          value={selectedManager}
          disabled={!canEdit}
          notFoundContent={null}
          allowClear={true}
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={searchManager}
        >
          {managersUsers.map(
            (
              {
                shortId: managerId,
                firstName: name,
                lastName: secondName
              }: User,
              indexManagers
            ) => (
                <Option key={indexManagers} value={managerId}>
                  {name} {secondName}
                </Option>
              )
          )}
        </StyledSelect>
      </Cell>
    </Container>
  )
}

export default ItemOrder
