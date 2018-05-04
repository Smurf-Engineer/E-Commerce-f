/**
 * AddToCartButton Component - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import { compose, withApollo } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { List } from 'immutable'
import find from 'lodash/find'
import Message from 'antd/lib/message'
import messages from './messages'
import {
  Container,
  Text,
  StyledButton,
  ButtonContainer,
  CustomizeButton
} from './styledComponents'
import { Product } from '../../types/common'

type ItemDetailType = {
  id: number
  name: string
}

interface CartItems {
  product: Product
  itemDetils: ItemDetailType[]
}

interface Props {
  label: string
  renderForThumbnail?: boolean
  item: CartItems
  onClick: () => boolean
}

class AddToCartButton extends React.PureComponent<Props, {}> {
  render() {
    const { label, onClick, renderForThumbnail } = this.props

    const renderView = renderForThumbnail ? (
      <ButtonContainer>
        <CustomizeButton onClick={this.addToCart}>{label}</CustomizeButton>
      </ButtonContainer>
    ) : (
      <Container>
        <StyledButton onClick={this.addToCart}>{label}</StyledButton>
      </Container>
    )
    return renderView
  }

  addToCart = () => {
    const { item, onClick } = this.props
    console.log('ADD TO CART ', item)
    const candAddToStore = onClick()
    console.log('item', item)
    let myItems = []
    if (typeof window !== 'undefined') {
      if (candAddToStore) {
        const cartJson = JSON.parse(localStorage.getItem('cart') as any)
        console.log('JSON CART', cartJson)
        const findItem = find(cartJson, {})
        myItems.push(item)
        localStorage.setItem('cart', JSON.stringify(myItems))
        Message.success(
          `${item.product.name} has been succesfully added to cart!`
        )
      } else {
        console.log('cannotADD')
      }
    }
  }

  saveInLocalStorage = () => {}
}

const AddToCartEnhanced = compose(withApollo)(AddToCartButton)

export default AddToCartEnhanced
