/**
 * ProductRow Component - Created by david on 12/04/18.
 */
import * as React from 'react'
import screenMessage from 'antd/lib/message'
import { Row, Cell, DeleteButton, Name, Description } from '../styledComponents'
import Thumbnail from '../ProductImage'
import messages from '../messages'

interface Props {
  index: number
  productId: number
  image: string
  name: string
  description: string
  visible: boolean
  yotpoId: string
  totalOrders: number
  id?: number
  text?: string
  regularPrice?: string
  hideQuickView?: boolean
  onPressDelete: (index: number) => void
  onPressQuickView: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  onPressVisible: (index: number, checked: boolean) => void
  formatMessage: (messageDescriptor: any) => string
}

class ProductRow extends React.PureComponent<Props, {}> {
  render() {
    const {
      index,
      image,
      name,
      description,
      totalOrders,
      onPressDelete,
      formatMessage,
      hideQuickView
    } = this.props

    const handleOnClick = () => {
      if (totalOrders) {
        screenMessage.error(formatMessage(messages.cannotDelete))
        return
      }
      onPressDelete(index)
    }

    return (
      <div>
        <Row>
          <Cell width={20}>
            <Thumbnail
              {...{ image, hideQuickView }}
              onPressQuickView={this.handleOnClickView}
            />
          </Cell>
          <Cell width={45}>
            <Name>{name}</Name>
            <Description>{description}</Description>
          </Cell>
          <Cell>
            <DeleteButton onClick={handleOnClick}>DELETE</DeleteButton>
          </Cell>
        </Row>
      </div>
    )
  }
}

export default ProductRow
