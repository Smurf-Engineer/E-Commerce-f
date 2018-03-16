/**
 * ProductThumbnail Component - Created by david on 12/02/18.
 */
import * as React from 'react'
import { withRouter } from 'react-router'
import { compose } from 'react-apollo'
import {
  Container,
  Footer,
  Type,
  Description,
  InfoContainer,
  Label,
  Price
} from './styledComponents'
import ImageSlide from './ProductSlide'
import { ImageType, PriceRange } from '../../types/common'

interface Props {
  id: number
  type?: string
  images?: ImageType
  description?: string
  priceRange?: PriceRange[]
  isTopProduct: boolean
  collections?: number
  history: any
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number) => void
}

class ProductThumbnail extends React.Component<Props, {}> {
  state = {
    isHovered: false,
    currentImage: 0
  }

  handleOnHover = () => this.setState({ isHovered: true })

  handleOnBlur = () => this.setState({ isHovered: false })

  handleOnPressBack = () => {
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
    onPressCustomize(id)
  }

  handleOnPressQuickView = () => {
    const { onPressQuickView, id } = this.props
    onPressQuickView(id)
  }

  handlePressThumbnail = () => {
    const { id, history } = this.props
    console.log(this.props)
    history.push(`/product/${id}`)
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
    const price =
      priceRange &&
      `$${priceRange[0].price} - $${priceRange[priceRange.length - 1].price}`
    return (
      <Container>
        <ImageSlide
          {...{ isTopProduct, isHovered, images, currentImage }}
          onMouseEnter={this.handleOnHover}
          onMouseLeave={this.handleOnBlur}
          onPressQuickView={this.handleOnPressQuickView}
          onPressBack={this.handleOnPressBack}
          onPressNext={this.handleOnPressNext}
          onPressCustomize={this.handleOnPressCustomize}
          onPressThumbnail={this.handlePressThumbnail}
        />
        <Footer>
          <Type>{type}</Type>
          <Description>{description}</Description>
          <InfoContainer>
            <Label>{`${collections} Collection`}</Label>
            <Price>{price}</Price>
          </InfoContainer>
        </Footer>
      </Container>
    )
  }
}

export default compose(withRouter)(ProductThumbnail)
