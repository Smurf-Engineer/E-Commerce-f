/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import { Icon, Upload } from 'antd'
import Spin from 'antd/lib/spin'
import {
  Container,
  Label,
  ImageBlock,
  ImageBox,
  Loader,
  EmptyBox,
  StyledIcon,
  UploadContainer
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
                <div>
                  {image.src !== 'loading' ? (
                    <ImageBox src={image.src} alt="avatar" />
                  ) : (
                    <Loader>
                      <Spin size="large" />
                    </Loader>
                  )}
                </div>
              ) : (
                <EmptyBox>
                  <div />
                  <Icon type={'plus'} />
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
