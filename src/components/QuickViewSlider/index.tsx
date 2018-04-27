/**
 * QuickViewSlider Component - Created by cazarez on 12/02/18.
 */
import * as React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { ImageType } from '../../types/common'
import NextArrow from '../../assets/arrow.svg'
import PreviousArrow from '../../assets/leftarrow.svg'
import {
  Container,
  StyledButton,
  ButtonRow,
  Available,
  SliderPage,
  StyledImage,
  Arrows,
  ArrowRight,
  ArrowLeft
} from './styledComponents'

interface Props {
  productImages: ImageType[]
  available: number
  isRetail: boolean
  hideSliderButtons?: boolean
  gotoCustomize?: () => void
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
      available,
      isRetail,
      hideSliderButtons
    } = this.props
    const { index } = this.state

    // TODO: filter by gender
    const images = productImages[0]

    const customizeButton = (
      <StyledButton onClick={gotoCustomize}>{'CUSTOMIZE'}</StyledButton>
    )
    const addToCartButton = (
      <StyledButton onClick={gotoCustomize}>{'ADD TO CART'}</StyledButton>
    )

    const renderButton = isRetail ? addToCartButton : customizeButton
    return (
      <Container>
        <SwipeableViews enableMouseEvents={true} {...{ index }}>
          <SliderPage>
            <StyledImage src={images.front} />
          </SliderPage>
          <SliderPage>
            <StyledImage src={images.right} />
          </SliderPage>
          <SliderPage>
            <StyledImage src={images.left} />
          </SliderPage>
          <SliderPage>
            <StyledImage src={images.back} />
          </SliderPage>
        </SwipeableViews>
        <Arrows>
          <ArrowLeft src={PreviousArrow} onClick={this.handlePreviousPage} />
          <ArrowRight src={NextArrow} onClick={this.handleNextPage} />
        </Arrows>
        {!hideSliderButtons && (
          <ButtonRow>
            {renderButton}
            {!isRetail && (
              <Available>{`${available} Collections Available`}</Available>
            )}
          </ButtonRow>
        )}
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
