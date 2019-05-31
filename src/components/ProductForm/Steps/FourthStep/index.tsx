/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import { Icon, message, Upload, Checkbox } from 'antd'
import get from 'lodash/get'
import {
  Container,
  Separator,
  ImageBox,
  RowInput,
  MediaDiv,
  AddMaterial,
  EmptyBox,
  MediaFooter,
  FileName,
  MaterialDiv,
  MaterialImage,
  MaterialButtons,
  MaterialButton,
  FileExtension,
  DeleteFile,
  GenderBlock,
  MediaSection,
  ImageBlock,
  Label,
  InputDiv
} from './styledComponents'
import videoPlaceHolder from '../../../../assets/video-placeholder.jpg'
import { Product } from '../../../../types/common'
import { getFileExtension, getFileName } from '../../../../utils/utilsFiles'
import Item from 'antd/lib/list/Item'
const Dragger = Upload.Dragger
interface Props {
  product: Product
  bannerMaterials: any[]
  setValue: (field: string, value: any) => void
  formatMessage: (messageDescriptor: any) => string
}
interface State {
  newBanner: boolean
  materialBanner?: string
  bannerMaterials: any[]
  productMaterials: any[]
  mediaFiles: any[]
  productImages: any[]
}
export class FourthStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { product, bannerMaterials } = props
    const productImages = get(product, 'pictures', [])
    const productMaterials = get(product, 'product_materials', [])
    const mediaFiles = get(product, 'media_files', []).map((file: any) => ({
      toUpload: false,
      url: file.url,
      extension: getFileExtension(file.url),
      name: getFileName(file.url)
    }))
    const detailedBannerMaterials = bannerMaterials.map((item: any) => ({
      ...item,
      active: true,
      toUpload: false
    }))
    this.state = {
      newBanner: false,
      productMaterials,
      mediaFiles,
      bannerMaterials: detailedBannerMaterials,
      productImages
    }
  }

  render() {
    const { product } = this.props
    const { customizable, genders: gendersArray } = product
    let {
      productImages,
      mediaFiles,
      productMaterials,
      bannerMaterials
    } = this.state
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
    const checkedMaterials = productMaterials.map((item: any) => item.id)
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
              <InputDiv flex={1}>
                <Label>
                  <FormattedMessage {...messages.materialsBanner} />
                </Label>
                <InputDiv isFlex={true}>
                  {bannerMaterials.map(
                    (material: any, index: number) =>
                      material.active && (
                        <MaterialDiv>
                          <MaterialButtons>
                            <MaterialButton
                              onClick={this.handleRemoveMaterial(index)}
                              type="close"
                            />
                            <Checkbox
                              name={material.id}
                              onChange={this.handleCheckMaterial}
                              checked={checkedMaterials.includes(material.id)}
                            />
                          </MaterialButtons>
                          <MaterialImage src={material.url} alt="avatar" />
                        </MaterialDiv>
                      )
                  )}
                  <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    customRequest={this.handleAddMaterial}
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                  >
                    <AddMaterial>
                      <div />
                      <Icon type={'plus'} />
                      <Label marginTop="16px" className="ant-upload-text">
                        <FormattedMessage {...messages.materialsBanner} />
                      </Label>
                    </AddMaterial>
                  </Upload>
                </InputDiv>
              </InputDiv>
            </RowInput>
            <RowInput>
              <InputDiv flex={1}>
                <Label>
                  <FormattedMessage {...messages.featuredImages} />
                </Label>
                <Dragger
                  multiple={true}
                  className="avatar-uploader"
                  customRequest={this.handleSetMedia}
                  showUploadList={false}
                  beforeUpload={this.beforeUploadMedia}
                >
                  <Icon type="upload" />
                  <p className="ant-upload-hint">20 MB max.</p>
                  <p className="ant-upload-text">
                    Click or drag images or videos to this area
                  </p>
                </Dragger>
              </InputDiv>
            </RowInput>
            {mediaFiles.length ? (
              <MediaSection>
                {mediaFiles.map((mediaFile: any, index: number) => (
                  <MediaDiv key={index}>
                    <ImageBox src={mediaFile.url} alt="avatar" />
                    <MediaFooter>
                      <div>
                        <FileName>{mediaFile.name}</FileName>
                        <FileExtension>{mediaFile.extension}</FileExtension>
                      </div>
                      <DeleteFile onClick={this.removeMediaFile(index)}>
                        <FormattedMessage {...messages.delete} />
                      </DeleteFile>
                    </MediaFooter>
                  </MediaDiv>
                ))}
              </MediaSection>
            ) : (
              <div />
            )}
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
  handleCheckMaterial = (event: any) => {
    const {
      target: { name, checked }
    } = event
    const { setValue } = this.props
    const id = parseInt(name, 10)
    const { productMaterials, bannerMaterials } = this.state
    if (checked) {
      productMaterials.push(bannerMaterials.find((item: any) => item.id === id))
    } else {
      const indextoRemove = productMaterials.find((item: any) => item.id === id)
      productMaterials.splice(indextoRemove, 1)
    }
    this.setState({ productMaterials })
    setValue('files', { type: 'productMaterials', array: productMaterials })
  }
  handleRemoveMaterial = (index: number) => () => {
    const { setValue } = this.props
    const { bannerMaterials, productMaterials } = this.state
    bannerMaterials[index].active = false
    const indextoRemove = productMaterials.find(
      (item: any) => item.id === bannerMaterials[index].id
    )
    productMaterials.splice(indextoRemove, 1)
    this.setState({ bannerMaterials, productMaterials })
    setValue('files', { type: 'productMaterials', array: productMaterials })
    setValue('files', { type: 'bannerMaterials', array: bannerMaterials })
  }
  handleAddMaterial = (event: any) => {
    const { setValue } = this.props
    const { file } = event
    const { bannerMaterials } = this.state
    this.getBase64(file, (base64Image: string) => {
      bannerMaterials.push({
        url: base64Image,
        active: true,
        id: bannerMaterials.length + 1,
        toUpload: file
      })
      this.setState({ bannerMaterials })
      setValue('files', { type: 'bannerMaterials', array: bannerMaterials })
    })
  }
  removeMediaFile = (index: number) => () => {
    const { setValue } = this.props
    const { mediaFiles } = this.state
    mediaFiles.splice(index, 1)
    this.setState({ mediaFiles })
    setValue('files', { type: 'mediaFiles', array: mediaFiles })
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
  beforeUploadMedia = (file: any) => {
    const isJPG = file.type === 'image/jpeg'
    const isPNG = file.type === 'image/png'
    const isMP4 = file.type === 'video/mp4'
    if (!isJPG && !isPNG && !isMP4) {
      message.error('You can only upload JPG, PNG or MP4 files!')
    }
    const isLt2M = file.size / 1024 / 1024 < 20
    if (!isLt2M) {
      message.error('Files must be smaller than 20MB!')
    }
    return (isJPG || isPNG || isMP4) && isLt2M
  }
  handleSetMedia = (event: any) => {
    const { setValue } = this.props
    const { file } = event
    const { mediaFiles } = this.state
    if (file.type === 'video/mp4') {
      mediaFiles.push({
        url: videoPlaceHolder,
        toUpload: file,
        name: getFileName(file.name),
        extension: '.mp4'
      })
      this.setState({ mediaFiles })
      setValue('files', { type: 'mediaFiles', array: mediaFiles })
    } else {
      this.getBase64(file, (base64Image: string) => {
        mediaFiles.push({
          url: base64Image,
          toUpload: file,
          name: getFileName(file.name),
          extension: getFileExtension(file.name)
        })
        this.setState({ mediaFiles })
        setValue('files', { type: 'mediaFiles', array: mediaFiles })
      })
    }
  }
  handleSetFile = (event: any) => {
    const { setValue } = this.props
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
      productImages[index].toUpload = file
      this.setState({ productImages })
      setValue('files', { type: 'productImages', array: productImages })
    })
  }
}

export default FourthStep
