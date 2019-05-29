/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import { Icon, message, Upload } from 'antd'
import get from 'lodash/get'
import {
  Container,
  Separator,
  ImageBox,
  RowInput,
  EmptyBox,
  GenderBlock,
  ImageBlock,
  Label,
  InputDiv
} from './styledComponents'
import { Product } from '../../../../types/common'
const Dragger = Upload.Dragger
interface Props {
  product: Product
  setValue: (field: string, value: any) => void
  formatMessage: (messageDescriptor: any) => string
}
interface State {
  loading: boolean
  productImages: any[]
}
export class FourthStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { product } = this.props
    const productImages = get(product, 'pictures', '')
    this.state = {
      loading: false,
      productImages
    }
  }

  render() {
    const { product } = this.props
    const {
      material_banner,
      media_files,
      customizable,
      genders: gendersArray
    } = product
    let { productImages } = this.state
    if (productImages && gendersArray) {
      productImages = gendersArray.map((gender: any) => ({
        genderName: gender.name || gender.gender,
        genderId: gender.id,
        genderBlockImages: productImages
          .filter((picture: any) => picture.gender_id === gender.id)
          .map((block: any) => {
            const images = []
            images.push({
              name: 'front_image',
              label: 'Front',
              src: block.front_image || ''
            })
            images.push({
              name: 'left_image',
              label: 'Left',
              src: block.left_image || ''
            })
            images.push({
              name: 'back_image',
              label: 'Back',
              src: block.back_image || ''
            })
            images.push({
              name: 'right_image',
              label: 'Right',
              src: block.right_image || ''
            })
            return images
          })
      }))
    }
    return (
      <Container>
        <Separator>
          <FormattedMessage
            {...(customizable ? messages.howItFits : messages.productImages)}
          />
        </Separator>
        {productImages.map((gender: any, index: number) => (
          <GenderBlock key={index}>
            <Label upperCase={true}>{gender.genderName}</Label>
            {gender.genderBlockImages.map(
              (imageBlock: any, blockIndex: number) => (
                <ImageBlock>
                  {imageBlock.map((image: any, subindex: number) => (
                    <Upload
                      name={`${gender.genderId}@${image.name}`}
                      listType="picture-card"
                      className="avatar-uploader"
                      customRequest={this.handleSetFile}
                      showUploadList={false}
                      beforeUpload={this.beforeUpload}
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
              )
            )}
          </GenderBlock>
        ))}
        {customizable && (
          <div>
            <Separator inline={true}>
              <FormattedMessage {...messages.assetsOnPage} />
            </Separator>
            <RowInput>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.banner} />
                </Label>
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={this.handleSetFile}
                  showUploadList={false}
                  beforeUpload={this.beforeUpload}
                >
                  {material_banner ? (
                    <ImageBox src={material_banner} alt="avatar" />
                  ) : (
                    <EmptyBox big={true}>
                      <div />
                      <Icon type={'plus'} />
                      <Label marginTop="16px" className="ant-upload-text">
                        <FormattedMessage {...messages.materialsBanner} />
                      </Label>
                    </EmptyBox>
                  )}
                </Upload>
              </InputDiv>
            </RowInput>
            <RowInput>
              <InputDiv>
                <Label>
                  <FormattedMessage {...messages.featuredImages} />
                </Label>
                <Dragger
                  multiple={true}
                  listType="picture-card"
                  className="avatar-uploader"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // customRequest={this.handleSetBanner}
                  // showUploadList={false}
                  beforeUpload={this.beforeUpload}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Dragger>
              </InputDiv>
            </RowInput>
          </div>
        )}
      </Container>
    )
  }
  getBase64 = (img: any, callback: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  beforeUpload = (file: any) => {
    const isJPG = file.type === 'image/jpeg'
    if (!isJPG) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJPG && isLt2M
  }
  handleSetBanner = (event: any) => {
    console.log('event:', event)
  }
  handleSetFile = (event: any) => {
    const { file } = event
    const { productImages } = this.state
    const parameters = event.filename.split('@')
    const genderId = parameters[0]
    const name = parameters[1]
    const index = productImages.findIndex(
      (item: any) => item.gender_id.toString() === genderId
    )
    this.getBase64(file, (base64Image: string) => {
      productImages[index][name] = base64Image
      productImages[index].toUpload = true
      this.setState({ productImages })
    })
  }
}

export default FourthStep
