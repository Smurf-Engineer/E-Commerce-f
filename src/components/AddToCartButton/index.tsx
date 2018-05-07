/**
 * AddToCartButton Component - Created by cazarez on 02/05/18.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
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
import messages from './messages'
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
  intl: InjectedIntl
  label: string
  renderForThumbnail?: boolean
  item: CartItems
  onClick: () => boolean
  getTotalItemsIncart: () => void
  formatMessage: (messageDescriptor: any) => string
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
    const { onClick, renderForThumbnail, intl } = this.props
    if (renderForThumbnail) {
      this.saveInLocalStorage()
    } else {
      const candAddToStore = onClick()
      if (!candAddToStore) {
        Message.warning(intl.formatMessage(messages.validationMessage))
        return
      } else {
        this.saveInLocalStorage()
      }
    }
  }

  saveInLocalStorage = () => {
    const {
      intl,
      item,
      renderForThumbnail,
      getTotalItemsIncart: countCartItems
    } = this.props

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
      Message.success(
        intl.formatMessage(messages.successfulAddMessage, { name: productName })
      )
    }
  }
}

const AddToCartEnhanced = compose(
  injectIntl,
  connect(null, { getTotalItemsIncart })
)(AddToCartButton)

export default AddToCartEnhanced
