/**
 * QuickViewSlider Component - Created by cazarez on 12/02/18.
 */
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import get from 'lodash/get'
import { ImageType, CartItemDetail, Product } from '../../types/common'
import NextArrow from '../../assets/arrow.svg'
import PreviousArrow from '../../assets/leftarrow.svg'
import {
  Container,
  StyledButton,
  ButtonRow,
  SliderPage,
  StyledImage,
  Arrows,
  ArrowRight,
  ArrowLeft
} from './styledComponents'
import AddToCartButton from '../../components/AddToCartButton'
import messages from './messages'

interface Props {
  productImages: ImageType[]
  available: number
  isRetail: boolean
  hideSliderButtons?: boolean
  product?: Product
  gotoCustomize?: () => void
  formatMessage: (messageDescriptor: any) => string
}

interface State {
  index: number
}

class QuickViewSlider extends React.Component<Props, State> {
  state = {
    index: 0
  }
  render() {
    const {
      gotoCustomize,
      productImages,
      isRetail,
      hideSliderButtons,
      product,
      formatMessage
    } = this.props
    const { index } = this.state

    // TODO: filter by gender
    const front = get(productImages[0], 'front', '')
    const right = get(productImages[0], 'right', '')
    const back = get(productImages[0], 'back', '')
    const left = get(productImages[0], 'left', '')
    // const { front, right, left, back } = productImages[0] || (new ImageType)

    const customizeButton = (
      <StyledButton onClick={gotoCustomize}>
        {formatMessage(messages.customize)}
      </StyledButton>
    )

    const itemDetails = [] as CartItemDetail[]

    if (product) {
      const detail: CartItemDetail = { quantity: 1 }

      itemDetails.push(detail)
    }

    const item = Object.assign({}, { product }, { itemDetails })

    const onClick = () => true

    const addToCartButton = product && (
      <AddToCartButton
        centered={true}
        label={formatMessage(messages.addToCart)}
        {...{ item, onClick, formatMessage }}
      />
    )

    const renderButton = isRetail ? addToCartButton : customizeButton
    return (
      <Container>
        <SwipeableViews enableMouseEvents={true} {...{ index }}>
          <SliderPage>
            <StyledImage src={front} />
          </SliderPage>
          <SliderPage>
            <StyledImage src={right} />
          </SliderPage>
          <SliderPage>
            <StyledImage src={left} />
          </SliderPage>
          <SliderPage>
            <StyledImage src={back} />
          </SliderPage>
        </SwipeableViews>
        <Arrows>
          <ArrowLeft src={PreviousArrow} onClick={this.handlePreviousPage} />
          <ArrowRight src={NextArrow} onClick={this.handleNextPage} />
        </Arrows>
        {!hideSliderButtons && <ButtonRow>{renderButton}</ButtonRow>}
      </Container>
    )
  }
  handleNextPage = () => {
    const { index } = this.state
    if (index < 3) {
      this.setState({ index: index + 1 })
    }
  }

  handlePreviousPage = () => {
    const { index } = this.state
    if (index > 0) {
      this.setState({ index: index - 1 })
    }
  }
}

export default QuickViewSlider
