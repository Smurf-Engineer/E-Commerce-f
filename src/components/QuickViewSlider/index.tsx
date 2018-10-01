/**
 * QuickViewSlider Component - Created by cazarez on 12/02/18.
 */
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
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
import messages from './messages'

interface Props {
  productImages: ImageType[]
  available: number
  isRetail: boolean
  hideSliderButtons?: boolean
  product?: Product
  gender: number
  gotoCustomize?: () => void
  formatMessage: (messageDescriptor: any) => string
}

interface State {
  index: number
  numberOfSlides: number
}

class QuickViewSlider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      index: 0,
      numberOfSlides: 3
    }
  }
  render() {
    const {
      gotoCustomize,
      productImages,
      isRetail = false,
      hideSliderButtons,
      product,
      gender,
      formatMessage
    } = this.props
    const { index } = this.state

    const genderIndex = findIndex(productImages, { genderId: gender })
    const images = productImages[genderIndex] || productImages[0]

    const front = get(images, 'front', '')
    const right = get(images, 'right', '')
    const back = get(images, 'back', '')
    const left = get(images, 'left', '')

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

    const renderButton = !isRetail ? customizeButton : null
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
    const { index, numberOfSlides } = this.state
    if (index < numberOfSlides) {
      this.setState({ index: index + 1 })
    } else {
      this.resetIndex(0)
    }
  }

  handlePreviousPage = () => {
    const { index, numberOfSlides } = this.state
    if (index > 0) {
      this.setState({ index: index - 1 })
    } else {
      this.resetIndex(numberOfSlides)
    }
  }

  resetIndex = (i: number) => {
    this.setState({ index: i })
  }
}

export default QuickViewSlider
