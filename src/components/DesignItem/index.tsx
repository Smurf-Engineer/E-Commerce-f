/**
 * DesignItem Component - Created by david on 13/07/18.
 */
import * as React from 'react'
import Checkbox from 'antd/lib/checkbox'
import Button from 'antd/lib/button'
import { Container, Name, Row, Buttons, EditButton } from './styledComponents'

interface Props {
  id: number
  index: number
  name: string
  selected: boolean
  editable?: boolean
  onEditItem?: (id: number) => void
  onSelectItem: (id: number) => void
  onDeleteItem: (id: number) => void
}

const DesignItem = ({
  id,
  name,
  index,
  selected,
  editable = false,
  onSelectItem,
  onDeleteItem,
  onEditItem
}: Props) => {
  const handleOnChange = () => onSelectItem(id)
  const handleOnDelete = () => onDeleteItem(id)
  const handleOnEdit = () => {
    if (onEditItem) {
      onEditItem(index)
    }
  }
  return (
    <Container>
      <Row>
        <Checkbox checked={selected} onChange={handleOnChange} />
        <Name>{name}</Name>
      </Row>
      <Buttons>
        <Button type="ghost" onClick={handleOnDelete}>
          Delete
        </Button>
        {editable && (
          <EditButton type="primary" onClick={handleOnEdit}>
            Edit
          </EditButton>
        )}
      </Buttons>
    </Container>
  )
}

export default DesignItem
