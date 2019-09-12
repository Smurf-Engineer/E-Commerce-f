/**
 * GenderImageBlock Component - Created by Jesús Apodaca on 13/06/19.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import {
  Container,
  Label,
  ImageBlock,
  StyledIcon,
  UploadContainer
} from './styledComponents'
import { TypePicture, BlockImage } from '../../../../../types/common'
import ImageContent from './ImageContent'

interface Props {
  picture: TypePicture
  isThumbnail?: boolean
  remove: (image: TypePicture) => () => void
  handleSetFile: (event: any) => void
  beforeUpload: (file: any) => boolean
}

const GenderBlock = ({
  isThumbnail,
  picture,
  remove,
  handleSetFile,
  beforeUpload
}: Props) => {
  const { id, images, thumbnail, name } = picture
  const imagesArray = isThumbnail ? [thumbnail] : images
  return (
    <Container>
      <Label upperCase={true}>{name}</Label>
      <ImageBlock>
        {imagesArray.map((image: BlockImage, index: number) => (
          <UploadContainer key={index}>
            {image.src && image.src !== 'loading' && (
              <StyledIcon
                type="close"
                onClick={remove({ id, name: image.name })}
              />
            )}
            <Upload
              data={{ id, name: image.name }}
              listType="picture-card"
              className="avatar-uploader"
              customRequest={handleSetFile}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              <ImageContent src={image.src} label={image.label} />
            </Upload>
          </UploadContainer>
        ))}
      </ImageBlock>
    </Container>
  )
}

export default GenderBlock
