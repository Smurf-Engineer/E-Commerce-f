/**
 * ProductRow Component - Created by david on 12/04/18.
 */
import * as React from 'react'
import { Row, Cell, DeleteButton, Name, Description } from '../styledComponents'
import Thumbnail from '../ProductImage'
import messages from '../messages'

interface Props {
  index: number
  productId: number
  image: string
  name: string
  type: string
  code: string
  mpn: string
  id: number
  text?: string
  featuredId?: number
  onPressDelete: (index: number, id?: number) => void
  formatMessage: (messageDescriptor: any) => string
}

class ProductRow extends React.PureComponent<Props, {}> {
  render() {
    const { image, name, type, code, mpn, formatMessage } = this.props

    const renderView = (
      <Row>
        <Cell width={15}>
          <Thumbnail {...{ image }} />
        </Cell>
        <Cell width={20}>
          <Name>{name}</Name>
        </Cell>
        <Cell width={20}>
          <Description>{`${mpn}`}</Description>
        </Cell>
        <Cell width={20}>
          <Description>{`${code}`}</Description>
        </Cell>
        <Cell width={15}>
          <Description>{`${type}`}</Description>
        </Cell>
        <Cell>
          <DeleteButton onClick={this.handleOnClick}>
            {formatMessage(messages.delete)}
          </DeleteButton>
        </Cell>
      </Row>
    )

    return <div>{renderView}</div>
  }
  handleOnClick = () => {
    const { onPressDelete, featuredId, index, id } = this.props
    console.log(id, featuredId)
    onPressDelete(index, featuredId)
  }
}

export default ProductRow
