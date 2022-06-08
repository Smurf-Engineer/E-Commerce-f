import * as React from 'react'
import MediaQuery from 'react-responsive'
import { Container, ImagePreview, VideoPreview } from './styledComponents'
import { HeaderImagePlaceHolder } from '../../types/common'

interface Props {
  item: HeaderImagePlaceHolder
  onClick: () => void
}

const CarouselItem = ({ item, onClick }: Props) => {
  const element = document.getElementById(`video_${item.id}`)
  if (item && item.assetType === 'video' && element && item.volume) {
    setInterval(() => { element.muted = false }, 1000)
  }
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
          {matches => <>
            {item.volume &&
              <iframe
                src="https://olafwempe.com/mp3/silence/silence.mp3"
                type="audio/mp3"
                allow="autoplay"
                id="audio"
                style={{ display: 'none'}}
              />
            }
            <VideoPreview
              id={`video_${item.id}`}
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              disablePictureInPicture={true}
              controlsList="nofullscreen nodownload noremoteplayback"
            >
              <source src={matches && item.mobileImage ? item.mobileImage : item.desktopImage} type="video/mp4" />
            </VideoPreview></>
          }
        </MediaQuery>
      )}
    </Container>
  )
}

export default CarouselItem
