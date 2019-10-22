import * as React from 'react'
import MediaQuery from 'react-responsive'
import { Container, ImagePreview, VideoPreview } from './styledComponents'
import { HeaderImagePlaceHolder } from '../../types/common'

interface Props {
  item: HeaderImagePlaceHolder
  onClick: () => void
}

const CarouselItem = ({ item, onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      {item.assetType !== 'video' ? (
        <MediaQuery maxWidth={640}>
          {matches => {
            if (matches) {
              return <ImagePreview src={item.mobileImage} />
            }
            return <ImagePreview src={item.desktopImage} />
          }}
        </MediaQuery>
      ) : (
        <VideoPreview autoPlay={true} loop={true} muted={true}>
          <source src={item.desktopImage} type="video/mp4" />
        </VideoPreview>
      )}
    </Container>
  )
}

export default CarouselItem
