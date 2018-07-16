/**
 * DesignItem Component - Created by david on 13/07/18.
 */
import * as React from 'react'
import Checkbox from 'antd/lib/checkbox'
import { Container, Name, DeleteButton, Row } from './styledComponents'

interface Props {
  id: number
  name: string
  selected: boolean
  onSelectItem: (id: number) => void
  onDeleteItem: (id: number) => void
}

const DesignItem = ({
  id,
  name,
  selected,
  onSelectItem,
  onDeleteItem
}: Props) => {
  const handleOnChange = () => onSelectItem(id)
  const handleOnDelete = () => onDeleteItem(id)
  return (
    <Container>
      <Row>
        <Checkbox checked={selected} onChange={handleOnChange} />
        <Name>{name}</Name>
      </Row>
      <DeleteButton onClick={handleOnDelete}>Delete</DeleteButton>
    </Container>
  )
}

export default DesignItem
