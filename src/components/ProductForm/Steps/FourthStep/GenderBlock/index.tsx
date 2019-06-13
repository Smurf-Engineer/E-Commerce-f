/**
 * AddressData Component - Created by miguelcanobbio on 18/07/18.
 */
import * as React from 'react'
import { Icon, Upload } from 'antd'
import {
  Container,
  Label,
  ImageBlock,
  ImageBox,
  EmptyBox
} from './styledComponents'

interface Props {
  gender: any
  handleSetFile: (event: any) => void
  beforeUpload: (file: any) => boolean
}

const GenderBlock = ({ gender, handleSetFile, beforeUpload }: Props) => {
  return (
    <Container>
      <Label upperCase={true}>{gender.genderName}</Label>
      {gender.genderBlockImages.map((imageBlock: any, blockIndex: number) => (
        <ImageBlock>
          {imageBlock.map((image: any, subindex: number) => (
            <Upload
              name={`${gender.genderId}@${image.name}`}
              listType="picture-card"
              className="avatar-uploader"
              customRequest={handleSetFile}
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {image.src ? (
                <ImageBox src={image.src} alt="avatar" />
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
      ))}
    </Container>
  )
}

export default GenderBlock
