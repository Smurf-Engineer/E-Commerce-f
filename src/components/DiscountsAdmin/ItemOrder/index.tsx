/**
 * ItemOrder Component - Created by eduardoquintero on 24/05/19.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
import Switch from 'antd/lib/switch'
import Button from 'antd/lib/button'
import { FormattedMessage } from 'react-intl'
import messages from '../DiscountsList/messages'
import { Discount } from '../../../types/common'

interface Props {
  id: number
  code: string
  discountItemId: string
  type: string
  rate: number
  expiry: string
  active: boolean
  onDiscountClick: (discount: Discount) => void
  onChangeActive: (id: number) => void
}

const ItemOrder = ({
  id,
  code,
  discountItemId,
  type,
  rate,
  expiry,
  onDiscountClick,
  active,
  onChangeActive
}: Props) => {
  const handleOnClick = () => {
    const discount = {
      id,
      code,
      discountItemId,
      type,
      rate,
      expiry,
      active
    }
    onDiscountClick(discount)
  }
  const handleOnChangeActive = () => {
    onChangeActive(id)
  }
  return (
    <Container>
      <Cell>{code}</Cell>
      <Cell>{discountItemId}</Cell>
      <Cell>{type}</Cell>
      <Cell>{rate}</Cell>
      <Cell>{expiry}</Cell>
      <Cell>
        <Switch onChange={handleOnChangeActive} checked={active} />
      </Cell>
      <Cell>
        <Button onClick={handleOnClick}>
          <FormattedMessage {...messages.edit} />
        </Button>
      </Cell>
    </Container>
  )
}

export default ItemOrder