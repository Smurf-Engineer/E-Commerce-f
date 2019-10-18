/**
 * CarouselModal Component - Created by eduardo on 14/10/19.
 */
import * as React from 'react'
import {
  Container,
  Arrow,
  CarouselItem,
  ImagePreview,
  VideoPreview,
  CarouselContainer
} from './styledComponents'
import Carousel from 'react-slick'
import CustomModal from '../Common/JakrooModal'
import leftArrow from '../../assets/leftarrow.svg'
import rightArrow from '../../assets/arrow.svg'
import { CarouselSettings } from '../../types/common'

interface Props {
  visible: boolean
  items: any
  carouselSettings: CarouselSettings
  requestClose: () => void
}

const arrowLeft = <Arrow src={leftArrow} />
const arrowRight = <Arrow src={rightArrow} />

const settings = {
  dots: false,
  infinite: true,
  fade: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: arrowLeft,
  nextArrow: arrowRight,
  autoplay: true,
  lazyLoad: true,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 780,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: false
      }
    }
  ]
}

export class CarouselModal extends React.Component<Props, {}> {
  render() {
    const {
      visible,
      requestClose,
      items,
      carouselSettings: { duration, transition }
    } = this.props
    const carouselItems = items.map((item: any, index: number) => (
      <CarouselItem key={index}>
        {item.assetType !== 'video' ? (
          <ImagePreview src={item.desktopImage} />
        ) : (
          <VideoPreview autoPlay={true} loop={true}>
            <source src={item.desktopImage} />
          </VideoPreview>
        )}
      </CarouselItem>
    ))
    return (
      <Container>
        <CustomModal
          open={visible}
          withLogo={false}
          width={'1200px'}
          requestClose={requestClose}
        >
          <CarouselContainer>
            <Carousel
              {...settings}
              autoplaySpeed={Number(duration)}
              fade={transition === 'fade'}
            >
              {carouselItems}
            </Carousel>
          </CarouselContainer>
        </CustomModal>
      </Container>
    )
  }
}

export default CarouselModal
