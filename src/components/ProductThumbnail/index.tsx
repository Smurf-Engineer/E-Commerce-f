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
  image?: string
  description?: string
  priceRange?: PriceRange[]
  labelButton?: string
  isTopProduct: boolean
  collections?: number
  footer?: React.ReactNode
  yotpoId: string
  history: any
  onPressCustomize: (id: number) => void
  onPressQuickView: (id: number, yotpoId: string) => void
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
    const { onPressQuickView, id, yotpoId } = this.props
    onPressQuickView(id, yotpoId)
  }

  handlePressThumbnail = () => {
    const { id, yotpoId, history } = this.props
    history.push(`/product?id=${id}&yotpoId=${yotpoId}`)
  }

  render() {
    const {
      type,
      images,
      description,
      priceRange,
      isTopProduct,
      collections,
      footer,
      labelButton,
      image
    } = this.props
    const { isHovered, currentImage } = this.state
    const price =
      priceRange &&
      `$${priceRange[0].price} - $${priceRange[priceRange.length - 1].price}`
    return (
      <Container>
        <ImageSlide
          {...{
            isTopProduct,
            isHovered,
            images,
            currentImage,
            labelButton,
            image
          }}
          onMouseEnter={this.handleOnHover}
          onMouseLeave={this.handleOnBlur}
          onPressQuickView={this.handleOnPressQuickView}
          onPressBack={this.handleOnPressBack}
          onPressNext={this.handleOnPressNext}
          onPressCustomize={this.handleOnPressCustomize}
          onPressThumbnail={this.handlePressThumbnail}
        />
        {footer ? (
          footer
        ) : (
          <Footer>
            <Type>{type}</Type>
            <Description>{description}</Description>
            <InfoContainer>
              <Label>{`${collections || 0} Collections`}</Label>
              <Price>{price}</Price>
            </InfoContainer>
          </Footer>
        )}
      </Container>
    )
  }
}

export default compose(withRouter)(ProductThumbnail)
