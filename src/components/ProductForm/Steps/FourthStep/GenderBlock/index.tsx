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
  EmptyBox
} from './styledComponents'
import { TypePicture, BlockImage } from '../../../../../types/common'

interface Props {
  picture: TypePicture
  handleSetFile: (event: any) => void
  beforeUpload: (file: any) => boolean
}

const GenderBlock = ({ picture, handleSetFile, beforeUpload }: Props) => {
  return (
    <Container>
      <Label upperCase={true}>{picture.name}</Label>
      <ImageBlock>
        {picture.images.map((image: BlockImage, index: number) => (
          <Upload
            key={index}
            data={{ id: picture.id, name: image.name }}
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
        ))}
      </ImageBlock>
    </Container>
  )
}

export default GenderBlock
