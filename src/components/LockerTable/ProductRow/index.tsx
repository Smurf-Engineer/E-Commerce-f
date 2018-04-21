/**
 * ProductRow Component - Created by david on 12/04/18.
 */
import * as React from 'react'
import {
  Row,
  Cell,
  Price,
  DeleteButton,
  Center,
  Name,
  Description
} from '../styledComponents'
import Checkbox from 'antd/lib/checkbox'
import Thumbnail from '../ProductImage'

interface Props {
  index: number
  productId: number
  image: string
  name: string
  description: string
  startingPrice: number
  targetPrice: number
  currentOrders: number
  currentPrice: number
  visible: boolean
  yotpoId: string
  onPressDelete: (index: number) => void
  onPressQuickView: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  onPressVisible: (index: number, checked: boolean) => void
}

const ProductRow = ({
  index,
  productId,
  image,
  name,
  description,
  startingPrice,
  targetPrice,
  currentOrders,
  currentPrice,
  visible,
  yotpoId,
  onPressDelete,
  onPressQuickView,
  onPressVisible
}: Props) => {
  const handleOnClick = () => onPressDelete(index)
  const handleOnClickView = () => onPressQuickView(productId, yotpoId, true)
  const handleOnClickVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    onPressVisible(index, checked)
  }
  return (
    <Row>
      <Cell width={15}>
        <Thumbnail {...{ image }} onPressQuickView={handleOnClickView} />
      </Cell>
      <Cell width={25}>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </Cell>
      <Cell>
        <Price>{`$${startingPrice}`}</Price>
      </Cell>
      <Cell>
        <Price>{`$${targetPrice}`}</Price>
      </Cell>
      <Cell>
        <Price>{currentOrders}</Price>
      </Cell>
      <Cell>
        <Price>{`$${currentPrice}`}</Price>
      </Cell>
      <Cell>
        <Center>
          <Checkbox checked={visible} onChange={handleOnClickVisible} />
        </Center>
      </Cell>
      <Cell>
        <DeleteButton onClick={handleOnClick}>DELETE</DeleteButton>
      </Cell>
    </Row>
  )
}

export default ProductRow
