/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import Upload from 'antd/lib/upload'
import Spin from 'antd/lib/spin'
import {
  Container,
  Label,
  ImageBlock,
  ImageBox,
  Loader,
  EmptyBox,
  StyledIcon,
  UploadContainer,
  AddIcon
} from './styledComponents'
import { TypePicture, BlockImage } from '../../../../../types/common'

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
  const getContent = (src: string) =>
    src === 'loading' ? (
      <Loader>
        <Spin size="large" />
      </Loader>
    ) : (
      <ImageBox src={src} alt="avatar" />
    )
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
              {image.src ? (
                getContent(image.src)
              ) : (
                <EmptyBox>
                  <AddIcon type={'plus'} />
                  <Label marginTop="16px" className="ant-upload-text">
                    {image.label}
                  </Label>
                </EmptyBox>
              )}
            </Upload>
          </UploadContainer>
        ))}
      </ImageBlock>
    </Container>
  )
}

export default GenderBlock
