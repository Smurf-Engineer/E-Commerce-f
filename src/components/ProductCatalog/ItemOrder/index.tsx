/**
 * ItemOrder Component - Created by miguelcanobbio on 13/07/18.
 */
import * as React from 'react'
import { Container, Cell, ImageCell } from './styledComponents'
import { Switch } from 'antd'
interface Props {
  image: string
  id: number
  name: string
  mpn?: string
  code: string
  shortId?: string
  productType?: string
  onStore: boolean
  onCheck: (id: number, checked: boolean) => void
  onOrderClick: (shortId: string) => void
}

const ItemOrder = ({
  image,
  name,
  mpn,
  code,
  id,
  shortId,
  productType,
  onOrderClick,
  onCheck,
  onStore
}: Props) => {
  const handleOnClick = () => {
    onOrderClick(shortId || '')
  }
  const onChange = (checked: boolean) => {
    onCheck(id, checked)
  }
  return (
    <Container onClick={handleOnClick}>
      <Cell>
        <ImageCell src={image} />
      </Cell>
      <Cell>
        <b>{name}</b>
      </Cell>
      <Cell>{mpn}</Cell>
      <Cell>{code}</Cell>
      <Cell>{productType}</Cell>
      <Cell textAlign="center">
        <Switch checked={onStore} onChange={onChange} />
      </Cell>
    </Container>
  )
}

export default ItemOrder
