/**
 * AddToCartButton Component - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import get from 'lodash/get'
import Message from 'antd/lib/message'

import {
  Container,
  StyledButton,
  ButtonContainer,
  CustomizeButton
} from './styledComponents'
import { getTotalItemsIncart } from '../MainLayout/actions'
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
  getTotalItemsIncart: () => void
}

export class AddToCartButton extends React.PureComponent<Props, {}> {
  render() {
    const { label, renderForThumbnail } = this.props

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
    const { onClick, renderForThumbnail } = this.props
    if (renderForThumbnail) {
      this.saveInLocalStorage()
    } else {
      const candAddToStore = onClick()
      if (!candAddToStore) {
        Message.warning(`Please select color, size and fit style!`)
        return
      } else {
        this.saveInLocalStorage()
      }
    }
  }

  saveInLocalStorage = () => {
    const {
      item,
      renderForThumbnail,
      getTotalItemsIncart: countCartItems
    } = this.props
    console.log(item)
    const productName = renderForThumbnail
      ? get(item, 'name')
      : item.product.name

    if (typeof window !== 'undefined') {
      const cartList = JSON.parse(localStorage.getItem('cart') as any)

      if (cartList) {
        cartList.push(item)
        localStorage.setItem('cart', JSON.stringify(cartList))
      } else {
        const myItems = []
        myItems.push(item)
        localStorage.setItem('cart', JSON.stringify(myItems))
      }
      countCartItems()
      Message.success(`${productName} has been succesfully added to cart!`)
    }
  }
}

const AddToCartEnhanced = compose(connect(null, { getTotalItemsIncart }))(
  AddToCartButton
)

export default AddToCartEnhanced
