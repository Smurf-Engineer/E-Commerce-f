/**
 * ProductRow Component - Created by david on 12/04/18.
 */
import * as React from 'react'
import { Row, Cell, DeleteButton, Name, Description } from '../styledComponents'
import Thumbnail from '../ProductImage'

interface Props {
  index: number
  productId: number
  image: string
  name: string
  description: string
  visible: boolean
  yotpoId: string
  id?: number
  text?: string
  regularPrice?: string
  hideQuickView?: boolean
  onPressDelete: (index: number, section: string) => void
  onPressQuickView: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  onPressVisible: (index: number, checked: boolean) => void
}

class ProductRow extends React.PureComponent<Props, {}> {
  render() {
    const {
      index,
      image,
      name,
      description,
      onPressDelete,
      hideQuickView
    } = this.props

    const handleOnClick = () => {
      onPressDelete(index, 'items')
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
