/**
 * YotpoReviews Component - Created by cazarez on 14/03/18.
 */
import * as React from 'react'
import {
  Container,
  YotpoReviewsContainer,
  YotpoCarousel
} from './styledComponents'
import ReactDOM from 'react-dom'

interface Props {
  yotpoId: string
}

declare global {
  interface Window {
    yotpo: any
  }
}

class YotpoReviews extends React.Component<Props, any> {
  yotpo: any
  yotpoGallery: any
  componentWillReceiveProps({ yotpoId }: Props) {
    const { yotpoId: oldYotpoId } = this.props
    if (yotpoId !== oldYotpoId) {
      this.updateYotpoWidget(yotpoId)
    }
  }

  componentDidMount() {
    const { yotpoId } = this.props
    this.updateYotpoWidget(yotpoId)
  }

  updateYotpoWidget = (id: string) => {
    try {
      const yotpoReviews = ReactDOM.findDOMNode(this.yotpo)
      yotpoReviews.setAttribute('class', 'yotpo yotpo-main-widget')
      yotpoReviews.setAttribute('data-product-id', id)
      yotpoReviews.setAttribute('data-price', 'Product Price')
      yotpoReviews.setAttribute('data-currency', 'Price Currency')
      yotpoReviews.setAttribute('data-name', 'Product Title')

      const yotpoCarousel = ReactDOM.findDOMNode(this.yotpoGallery)
      yotpoCarousel.setAttribute('class', 'yotpo yotpo-slider yotpo-size-7')
      yotpoCarousel.setAttribute('data-product-id', id)
      yotpoCarousel.setAttribute('data-yotpo-element-id', '3')

      if (window.yotpo.inview) {
        window.yotpo.refreshWidgets()
      }
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <Container>
        <YotpoCarousel innerRef={yotpo => (this.yotpoGallery = yotpo)} />
        <YotpoReviewsContainer innerRef={yotpo => (this.yotpo = yotpo)} />
      </Container>
    )
  }
}

export default YotpoReviews
