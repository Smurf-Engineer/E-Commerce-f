/**
 * ItemOrder Component - Created by eduardoquintero on 24/05/19.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
import Switch from 'antd/lib/switch'
import Button from 'antd/lib/button'
import { FormattedMessage } from 'react-intl'
import messages from '../DiscountsList/messages'

interface Props {
  code: string
  discountItemId: string
  type: string
  rate: string
  expiry: string
  onDiscountClick: (code: string) => void
}

const ItemOrder = ({
  code,
  discountItemId,
  type,
  rate,
  expiry,
  onDiscountClick
}: Props) => {
  const handleOnClick = () => {
    onDiscountClick(code)
  }
  return (
    <Container onClick={handleOnClick}>
      <Cell>{code}</Cell>
      <Cell>{discountItemId}</Cell>
      <Cell>{type}</Cell>
      <Cell>{rate}</Cell>
      <Cell>{expiry}</Cell>
      <Cell>
        <Switch />
      </Cell>
      <Cell>
        <Button>
          <FormattedMessage {...messages.edit} />
        </Button>
      </Cell>
    </Container>
  )
}

export default ItemOrder
