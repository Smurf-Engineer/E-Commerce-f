/**
 * FourthStep Component - Created by Apodaca on 14/05/19.
 */
import * as React from 'react'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import { Icon, message, Upload, Checkbox } from 'antd'
import {
  Container,
  Separator,
  ImageBox,
  RowInput,
  MediaDiv,
  AddMaterial,
  MediaFooter,
  FileName,
  MaterialDiv,
  MaterialImage,
  MaterialButtons,
  MaterialButton,
  FileExtension,
  DeleteFile,
  MediaSection,
  Label,
  InputDiv
} from './styledComponents'
import GenderBlock from './GenderBlock'
import videoPlaceHolder from '../../../../assets/video-placeholder.jpg'
import { getFileExtension, getFileName } from '../../../../utils/utilsFiles'
const Dragger = Upload.Dragger
interface Props {
  productMaterials: any[]
  mediaFiles: any[]
  gendersArray: any[]
  pictures: any[]
  customizable: any[]
  setBannerActions: (banners: any) => void
  setCheck: (selected: string, id: number, checked: boolean) => void
  bannerMaterials: any[]
  setValue: (field: string, value: any) => void
  formatMessage: (messageDescriptor: any) => string
}

export class FourthStep extends React.Component<Props, {}> {
  render() {
    const {
      productMaterials,
      mediaFiles,
      gendersArray,
      pictures: productImages,
      customizable,
      bannerMaterials
    } = this.props
    let productsImagesForm
    if (productImages && gendersArray) {
      productsImagesForm = gendersArray.map((gender: any) => ({
        genderName: gender.name || gender.gender,
        genderId: gender.id,
        genderBlockImages: productImages.reduce((arr: any[], block: any) => {
          if (block.gender_id === gender.id) {
            arr.push([
              {
                name: 'front_image',
                label: 'Front',
                src: block.front_image || ''
              },
              {
                name: 'left_image',
                label: 'Left',
                src: block.left_image || ''
              },
              {
                name: 'back_image',
                label: 'Back',
                src: block.back_image || ''
              },
              {
                name: 'right_image',
                label: 'Right',
                src: block.right_image || ''
              }
            ])
          }
          return arr
          // tslint:disable-next-line: align
        }, [])
      }))
    }
    return (
      <Container>
        <Separator>
          <FormattedMessage
            {...(customizable ? messages.howItFits : messages.productImages)}
          />
        </Separator>
        {productsImagesForm.map((gender: any, index: number) => (
          <GenderBlock
            {...{ gender }}
            key={index}
            handleSetFile={this.handleSetFile}
            beforeUpload={this.beforeUpload}
          />
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
                              checked={productMaterials[material.id]}
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
    const { setCheck } = this.props
    const id = parseInt(name, 10)
    setCheck('productMaterials', id, checked)
  }

  handleRemoveMaterial = (index: number) => () => {
    const {
      setValue,
      setBannerActions,
      bannerMaterials,
      productMaterials
    } = this.props
    if (bannerMaterials[index].toUpload) {
      bannerMaterials.splice(index, 1)
    } else {
      bannerMaterials[index].active = false
    }
    const indextoRemove = productMaterials.find(
      (item: any) => item.id === bannerMaterials[index].id
    )
    productMaterials.splice(indextoRemove, 1)
    setValue('productMaterials', productMaterials)
    setBannerActions(bannerMaterials)
  }

  handleAddMaterial = (event: any) => {
    const { setBannerActions, bannerMaterials } = this.props
    const { file } = event
    this.getBase64(file, (base64Image: string) => {
      bannerMaterials.push({
        url: base64Image,
        active: true,
        id: bannerMaterials.length + 1,
        toUpload: file
      })
      setBannerActions(bannerMaterials)
    })
  }

  removeMediaFile = (index: number) => () => {
    const { setValue, mediaFiles } = this.props
    mediaFiles.splice(index, 1)
    setValue('mediaFiles', mediaFiles)
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
    const { setValue, mediaFiles } = this.props
    const { file } = event
    if (file.type === 'video/mp4') {
      mediaFiles.push({
        url: videoPlaceHolder,
        toUpload: file,
        id: mediaFiles.length + 1,
        name: getFileName(file.name),
        extension: '.mp4'
      })
      setValue('mediaFiles', mediaFiles)
    } else {
      this.getBase64(file, (base64Image: string) => {
        mediaFiles.push({
          url: base64Image,
          toUpload: file,
          id: mediaFiles.length + 1,
          name: getFileName(file.name),
          extension: getFileExtension(file.name)
        })
        setValue('mediaFiles', mediaFiles)
      })
    }
  }

  handleSetFile = (event: any) => {
    const { setValue, pictures: productImages } = this.props
    const { file } = event
    const parameters = event.filename.split('@')
    const genderId = parameters[0]
    const name = parameters[1]
    const index = productImages.findIndex(
      (item: any) => item.gender_id.toString() === genderId
    )
    this.getBase64(file, (base64Image: string) => {
      productImages[index][name] = base64Image
      if (!productImages[index].toUpload) {
        productImages[index].toUpload = {}
      }
      productImages[index].toUpload[name] = file
      setValue('pictures', productImages)
    })
  }
}

export default FourthStep
