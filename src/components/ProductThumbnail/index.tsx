/**
 * ProductThumbnail Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import {
  Container,
  Text,
  ImageContainer,
  Image,
  Footer,
  Type,
  Description,
  InfoContainer,
  Label,
  Price,
  ImageTop,
  TopContainer,
  TopText,
  Arrows,
  Arrow,
  CustomizeButton,
  ButtonContainer
} from './styledComponents'
import ImageSlide from './ProductSlide'
import { ImageType, PriceRange } from '../../types/common'

interface Props {
  id?: string
  type?: string
  images?: ImageType
  description?: string
  priceRange?: PriceRange
  isTopProduct: boolean
  collections?: number
  onPressCustomize: (id: string) => void
}

class ProductThumbnail extends React.Component<Props, {}> {
  state = {
    isHovered: false,
    currentImage: 0
  }

  handleOnHover = () => this.setState({ isHovered: true })

  handleOnBlur = () => this.setState({ isHovered: false })

  handleOnPressBack = () => {
    const { images } = this.props
    const keys = Object.keys(images || {})
    let { currentImage } = this.state
    currentImage -= 1
    if (currentImage < 0) {
      return
    }
    this.setState({ currentImage })
  }

  handleOnPressNext = () => {
    const { images } = this.props
    let { currentImage } = this.state
    const keys = Object.keys(images || {})
    currentImage += 1
    if (currentImage >= keys.length - 1) {
      return
    }
    this.setState({ currentImage })
  }

  handleOnPressCustomize = () => {
    const { onPressCustomize, id } = this.props
    onPressCustomize(id || '')
  }

  render() {
    const {
      type,
      images,
      description,
      priceRange,
      isTopProduct,
      collections
    } = this.props
    const { isHovered, currentImage } = this.state
    const price = !!priceRange && `$${priceRange.from} - $${priceRange.to}`
    return (
      <Container>
        <ImageSlide
          {...{ isTopProduct, isHovered, images, currentImage }}
          onMouseEnter={this.handleOnHover}
          onMouseLeave={this.handleOnBlur}
          onPressBack={this.handleOnPressBack}
          onPressNext={this.handleOnPressNext}
          onPressCustomize={this.handleOnPressCustomize}
        />
        <Footer>
          <Type>{type}</Type>
          <Description>{description}</Description>
          <InfoContainer>
            <Label>{`${collections} Collection`}</Label>
            {!!priceRange && <Price>{price}</Price>}
          </InfoContainer>
        </Footer>
      </Container>
    )
  }
}

export default ProductThumbnail
