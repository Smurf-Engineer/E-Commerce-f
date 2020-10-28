/**
 * ItemOrder Component - Created by eduardoquintero on 03/07/19.
 */
import * as React from 'react'
import { Container, Cell } from './styledComponents'
import Button from 'antd/lib/button'
import { FormattedMessage } from 'react-intl'
import messages from '../InternalsList/messages'
import { ProductInternal } from '../../../types/common'

interface Props {
  id?: number
  internalId: number
  productCode: number
  gender: string
  size: string
  fitStyle?: string
  color?: string
  frontZipper?: string
  pocketZipper?: string
  binding?: string
  bibBrace?: string
  predyedColor?: string
  collection: string
  model?: string
  canEdit: boolean
  topSize?: string
  bottomSize?: string
  onInternalClick: (internal: ProductInternal) => void
}

const ItemOrder = ({
  id,
  internalId,
  productCode,
  gender,
  size,
  fitStyle,
  color,
  frontZipper,
  pocketZipper,
  canEdit,
  binding,
  predyedColor,
  bibBrace,
  collection,
  onInternalClick,
  model,
  topSize,
  bottomSize
}: Props) => {
  const handleOnClick = () => {
    const internal = {
      id,
      internalId,
      productCode,
      gender,
      size,
      fitStyle,
      color,
      frontZipper,
      pocketZipper,
      binding,
      predyedColor,
      bibBrace,
      collection,
      model,
      topSize,
      bottomSize
    }
    onInternalClick(internal)
  }

  return (
    <Container>
      <Cell>{internalId}</Cell>
      <Cell>{productCode}</Cell>
      <Cell>{model}</Cell>
      <Cell>{gender}</Cell>
      <Cell>{size}</Cell>
      <Cell>{fitStyle}</Cell>
      <Cell>{color}</Cell>
      <Cell>{frontZipper}</Cell>
      <Cell>{pocketZipper}</Cell>
      <Cell>{binding}</Cell>
      <Cell>{bibBrace}</Cell>
      <Cell>{collection}</Cell>
      <Cell>{predyedColor}</Cell>
      {canEdit && (
        <Cell>
          <Button onClick={handleOnClick}>
            <FormattedMessage {...messages.edit} />
          </Button>
        </Cell>
      )}
    </Container>
  )
}

export default ItemOrder
