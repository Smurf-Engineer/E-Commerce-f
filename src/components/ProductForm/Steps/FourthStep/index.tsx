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
  colorsProducts: any[]
  customizable: boolean
  setBannerActions: (banners: any) => void
  addPicture: (index: number, item: any) => void
  removeBanner: (index: number) => void
  addBanner: (item: any) => void
  setBanner: (index: number, field: string, value: any) => void
  removeFile: (array: string, index: number) => void
  addFile: (array: string, item: any) => void
  setFileField: (
    array: string,
    index: number,
    field: string,
    value: any
  ) => void
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
      colorsProducts,
      bannerMaterials
    } = this.props
    let productsImagesForm
    const arrayType = customizable
      ? gendersArray
      : Object.keys(colorsProducts).reduce((arr: any[], id: any) => {
          if (colorsProducts[id]) {
            arr.push({ id, name: colorsProducts[id] })
          }
          return arr
          // tslint:disable-next-line: align
        }, [])
    if (productImages && arrayType) {
      productsImagesForm = arrayType.map((gender: any) => ({
        genderName: gender.name || gender.gender,
        genderId: gender.id,
        genderBlockImages: productImages.reduce((arr: any[], block: any) => {
          if (
            (customizable ? block.gender_id : block.color_id) ===
            parseInt(gender.id, 10)
          ) {
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
    setCheck('productMaterials', name, checked)
  }

  handleRemoveMaterial = (index: number) => () => {
    const { removeBanner, setBanner, bannerMaterials, setCheck } = this.props
    setCheck('productMaterials', bannerMaterials[index].id, false)
    if (bannerMaterials[index].toUpload) {
      removeBanner(index)
    } else {
      setBanner(index, 'active', false)
    }
  }

  handleAddMaterial = (event: any) => {
    const { addBanner, bannerMaterials } = this.props
    const { file } = event
    const id = bannerMaterials.length
      ? Math.max.apply(Math, bannerMaterials.map(item => item.id))
      : 0
    console.log('id:', id)
    this.getBase64(file, (base64Image: string) => {
      addBanner({
        url: base64Image,
        active: true,
        id: id + 1,
        toUpload: file
      })
    })
  }

  removeMediaFile = (index: number) => () => {
    const { removeFile } = this.props
    removeFile('mediaFiles', index)
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
    const { addFile, mediaFiles } = this.props
    const { file } = event
    if (file.type === 'video/mp4') {
      addFile('mediaFiles', {
        url: videoPlaceHolder,
        toUpload: file,
        id: mediaFiles.length + 1,
        name: getFileName(file.name),
        extension: '.mp4'
      })
    } else {
      this.getBase64(file, (base64Image: string) => {
        addFile('mediaFiles', {
          url: base64Image,
          toUpload: file,
          id: mediaFiles.length + 1,
          name: getFileName(file.name),
          extension: getFileExtension(file.name)
        })
      })
    }
  }

  handleSetFile = (event: any) => {
    const { addPicture, pictures: productImages, customizable } = this.props
    const { file } = event
    const parameters = event.filename.split('@')
    const genderId = parameters[0]
    const name = parameters[1]
    const index = productImages.findIndex(
      (item: any) =>
        (customizable ? item.gender_id : item.color_id) ===
        parseInt(genderId, 10)
    )
    this.getBase64(file, (base64Image: string) => {
      const item = productImages[index]
      item[name] = base64Image
      if (!item.toUpload) {
        item.toUpload = {}
      }
      item.toUpload[name] = file
      addPicture(index, item)
    })
  }
}

export default FourthStep
