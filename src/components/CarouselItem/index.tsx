import * as React from 'react'
import MediaQuery from 'react-responsive'
import { Container, ImagePreview, VideoPreview } from './styledComponents'
import { HeaderImagePlaceHolder } from '../../types/common'

interface Props {
  item: HeaderImagePlaceHolder
  onClick: () => void
}

const CarouselItem = ({ item, onClick }: Props) => {
  const unMute = () => {
    if (item.assetType === 'video' && item.volume) {
      const element = document.getElementById(`video${item.id}`)
      if (element && element.readyState === 4 && element.muted === true) {
        element.muted = false
      }
    }
  }
  unMute()
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
              id={`video${item.id}`}
              autoPlay={true}
              loop={true}
              muted={true}
              onMouseOver={unMute}
              playsInline={true}
              controls={item.volume}
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
