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
        <MediaQuery maxWidth={640}>
          {matches => 
            <VideoPreview
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              controls={true}
              disablePictureInPicture={true}
              controlsList="nofullscreen nodownload noremoteplayback"
            >
              <source src={matches && item.mobileImage ? item.mobileImage : item.desktopImage} type="video/mp4" />
            </VideoPreview>
          }
        </MediaQuery>
      )}
    </Container>
  )
}

export default CarouselItem
