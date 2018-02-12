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
import { Product } from '../../types/common'

interface Props {
  product: Product
}

class ProductThumbnail extends React.Component<Props, {}> {
  state = {
    isHovered: false
  }

  handleOnHover = () => this.setState({ isHovered: true })
  handleOnBlur = () => this.setState({ isHovered: false })

  render() {
    const {
      product: {
        type,
        images,
        description,
        priceRange,
        isTopProduct,
        collections
      }
    } = this.props
    const { isHovered } = this.state
    return (
      <Container>
        <ImageSlide
          {...{ isTopProduct, isHovered, images }}
          onMouseEnter={this.handleOnHover}
          onMouseLeave={this.handleOnBlur}
        />
        <Footer>
          <Type>{type}</Type>
          <Description>{description}</Description>
          <InfoContainer>
            <Label>{`${collections} Collection`}</Label>
            <Price>{`$${priceRange.from} - $${priceRange.to}`}</Price>
          </InfoContainer>
        </Footer>
      </Container>
    )
  }
}

export default ProductThumbnail
