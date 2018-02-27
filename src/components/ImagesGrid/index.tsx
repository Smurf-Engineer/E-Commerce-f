/**
 * ImagesGrid Component - Created by gustavomedina on 22/02/18.
 */
import * as React from 'react'
import Slider from 'react-slick'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import {
  Container,
  Text,
  DetailsContent,
  TestimonialsContent,
  CarouselContent,
  Slide,
  QuoteContent,
  ImageQuote,
  CardQuote,
  TextQuote
} from './styledComponents'
interface Props {}

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

const ImagesGrid = () => {
  return (
    <Container>
      <QuoteContent>
        <CardQuote>
          <TextQuote>
            <FormattedMessage {...messages.quote} />
          </TextQuote>
        </CardQuote>
        <ImageQuote src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
      </QuoteContent>
      <CarouselContent>
        <Slider {...settings}>
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/herbalife-guys.jpg" />
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/kona-herba.jpg" />
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/rise-women.jpg" />
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/uhc-guys.jpg" />
          <Slide src="https://storage.googleapis.com/jakroo-storage/slider/uhc-ladies.jpg" />
        </Slider>
      </CarouselContent>
      <DetailsContent
        dangerouslySetInnerHTML={{
          __html: `
            <div class="yotpo yotpo-pictures-gallery">
            </div>`
        }}
      />
      <TestimonialsContent
        dangerouslySetInnerHTML={{
          __html: `
            <div class="yotpo yotpo-reviews-carousel">
            </div>`
        }}
      />
    </Container>
  )
}

export default ImagesGrid
