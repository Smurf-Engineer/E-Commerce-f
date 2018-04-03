/**
 * ImagesGrid Component - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import Slider from 'react-slick'
import { FormattedMessage } from 'react-intl'
import Responsive from 'react-responsive'
import messages from './messages'
import {
  Container,
  CarouselContent,
  Slide,
  QuoteContent,
  ImageQuote,
  CardQuote,
  TextQuote
} from './styledComponents'

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  autoplay: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false
}

const Desktop = (props: any) => <Responsive {...props} minWidth={992} />
const Mobile = (props: any) => <Responsive {...props} maxWidth={767} />
const Default = (props: any) => <Responsive {...props} minWidth={768} />

const ImagesGrid = () => {
  return (
    <Container>
      <QuoteContent>
        <CardQuote>
          <TextQuote>
            <FormattedMessage {...messages.quote} />
          </TextQuote>
        </CardQuote>
        <Desktop>
          <ImageQuote src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
        </Desktop>
        <Mobile>
          <ImageQuote src="https://storage.googleapis.com/jakroo-storage/slider/R2C2.jpg" />
        </Mobile>
        <Default>
          <ImageQuote src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
        </Default>
      </QuoteContent>
      <CarouselContent>
        <Slider {...settings}>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/herbalife-guys.jpg" />
          </div>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
          </div>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/rise-women.jpg" />
          </div>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/uhc-guys.jpg" />
          </div>
          <div>
            <Slide src="https://storage.googleapis.com/jakroo-storage/slider/uhc-ladies.jpg" />
          </div>
        </Slider>
      </CarouselContent>
    </Container>
  )
}

export default ImagesGrid
