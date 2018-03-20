/**
 * YotpoHome Component
 */
import * as React from 'react'
import { Container, YotpoHomeContainer, YotpoReviews } from './styledComponents'
import ReactDOM from 'react-dom'

interface Props {}

declare global {
  interface Window {
    yotpo: any
  }
}

class YotpoHome extends React.Component<Props, any> {
  yotpo: any
  yotpoReviews: any
  componentWillReceiveProps() {
    this.updateYotpoWidget()
  }

  componentDidMount() {
    this.updateYotpoWidget()
  }

  updateYotpoWidget = () => {
    try {
      const yotpoGrid = ReactDOM.findDOMNode(this.yotpo)
      yotpoGrid.setAttribute('class', 'yotpo yotpo-pictures-gallery')
      yotpoGrid.setAttribute('data-layout-rows', '2')
      yotpoGrid.setAttribute('data-spacing', '1')
      yotpoGrid.setAttribute('data-source', 'all')
      yotpoGrid.setAttribute('data-title', '0')
      yotpoGrid.setAttribute('data-hover-color', '#ffffff')
      yotpoGrid.setAttribute('data-hover-opacity', '0.8')
      yotpoGrid.setAttribute('data-hover-icon', 'true')
      yotpoGrid.setAttribute('data-cta-text', 'CUSTOMIZE')
      yotpoGrid.setAttribute('data-cta-color', '#2f84ed')
      yotpoGrid.setAttribute('data-yotpo-element-id', '2')

      const yotpoReviewsCarousel = ReactDOM.findDOMNode(this.yotpoReviews)
      yotpoReviewsCarousel.setAttribute('class', 'yotpo yotpo-reviews-carousel')
      yotpoReviewsCarousel.setAttribute('data-background-color', 'transparent')
      yotpoReviewsCarousel.setAttribute('data-mode', 'top_rated')
      yotpoReviewsCarousel.setAttribute('data-type', 'both')
      yotpoReviewsCarousel.setAttribute('data-count', '9')
      yotpoReviewsCarousel.setAttribute('data-show-bottomline', '1')
      yotpoReviewsCarousel.setAttribute('data-autoplay-enabled', '1')
      yotpoReviewsCarousel.setAttribute('data-autoplay-speed', '3000')
      yotpoReviewsCarousel.setAttribute('data-show-navigation', '1')
      yotpoReviewsCarousel.setAttribute('data-yotpo-element-id', '1')
      yotpoReviewsCarousel.setAttribute(
        'style',
        'margin-right: 5%; margin-left: 5%;'
      )

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
        <YotpoHomeContainer innerRef={yotpo => (this.yotpo = yotpo)} />
        <YotpoReviews innerRef={yotpo => (this.yotpoReviews = yotpo)} />
      </Container>
    )
  }
}

export default YotpoHome
