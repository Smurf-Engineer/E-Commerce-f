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
  labelButton?: string | React.ReactNode
  isTopProduct: boolean
  collections?: number
  footer?: React.ReactNode
  gender?: number
  hideCustomButton?: boolean
  hideQuickView?: boolean
  yotpoId: string
  history: any
  isStoreThumbnail?: boolean
  teamStoreShortId?: string
  customizable?: boolean
  myLockerList?: boolean
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

  getUrlProduct = () => {
    const { id, yotpoId, teamStoreShortId, gender } = this.props
    if (teamStoreShortId) {
      return `/teamstore-product-page?store=${teamStoreShortId}&id=${id}&yotpoId=${yotpoId}`
    }
    return `/product?id=${id}&yotpoId=${yotpoId}${
      gender ? `&gender=${gender}` : ''
    }`
  }

  handlePressThumbnail = () => {
    const { history } = this.props
    history.push(this.getUrlProduct())
  }

  render() {
    const {
      type,
      images,
      description,
      priceRange,
      isTopProduct,
      footer,
      labelButton,
      image,
      hideCustomButton,
      hideQuickView,
      customizable,
      myLockerList
    } = this.props
    console.log(myLockerList, 'myLockerListProdThu')
    const { isHovered, currentImage } = this.state
    const price =
      priceRange &&
      `$${priceRange[0].price} - $${priceRange[priceRange.length - 1].price}`

    let urlProduct = this.getUrlProduct()
    return (
      <Container>
        <ImageSlide
          {...{
            isTopProduct,
            isHovered,
            images,
            currentImage,
            labelButton,
            image,
            hideCustomButton,
            hideQuickView,
            urlProduct,
            myLockerList
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
              <Label>{customizable ? 'Customize' : ''}</Label>
              <Price>{price}</Price>
            </InfoContainer>
          </Footer>
        )}
      </Container>
    )
  }
}

export default compose(withRouter)(ProductThumbnail)
