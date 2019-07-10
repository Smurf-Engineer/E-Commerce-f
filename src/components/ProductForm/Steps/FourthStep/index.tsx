/**
 * FourthStep Component - Created by Apodaca on 14/05/19.
 */
import * as React from 'react'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import Spin from 'antd/lib/spin'
import { Icon, message, Upload } from 'antd'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {
  Container,
  Separator,
  RowInput,
  AddMaterial,
  MediaSection,
  LoaderBox,
  Label,
  InputDiv
} from './styledComponents'
import GenderBlock from './GenderBlock'
import { uploadFile } from '../../api'
import {
  ProductFile,
  TypePicture,
  ItemDetailType
} from '../../../../types/common'
import { getFileExtension, getFileName } from '../../../../utils/utilsFiles'
import { validTypes } from '../../constants'
import MediaBlock from './MediaBlock'
import BannerBlock from './BannerBlock'
const Dragger = Upload.Dragger
interface Props {
  productMaterials: ProductFile[]
  mediaFiles: ProductFile[]
  selectedGenders: object
  colorsProducts: object
  genders: ItemDetailType[]
  colors: ItemDetailType[]
  bannersLoading: boolean
  customizable: boolean
  setBannersLoading: (value: boolean) => void
  removeBanner: (index: number) => void
  moveFile: (array: string, index: number, indexTo: number) => void
  moveBanner: (index: number, indexTo: number) => void
  addBanner: (item: any) => void
  setBanner: (index: number, field: string, value: any) => void
  removeFile: (array: string, index: number) => void
  addFile: (array: string, item: any) => void
  setFileField: (
    selected: string,
    id: string,
    name: string,
    value: string
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
      selectedGenders,
      customizable,
      genders,
      colors,
      colorsProducts,
      bannersLoading,
      bannerMaterials
    } = this.props
    let productsImagesForm
    const names = (customizable ? genders : colors).reduce(
      (obj: object, item: ItemDetailType) => {
        obj[item.id] = item.gender || item.name
        return obj
        // tslint:disable-next-line: align
      },
      {}
    )
    const arrayType = customizable ? selectedGenders : colorsProducts
    if (arrayType) {
      productsImagesForm = Object.keys(arrayType).reduce(
        (arr: TypePicture[], id: string) => {
          if (arrayType[id].selected) {
            arr.push({
              name: names[id],
              id,
              images: [
                {
                  name: 'front_image',
                  label: 'Front',
                  src: arrayType[id].front_image || ''
                },
                {
                  name: 'left_image',
                  label: 'Left',
                  src: arrayType[id].left_image || ''
                },
                {
                  name: 'back_image',
                  label: 'Back',
                  src: arrayType[id].back_image || ''
                },
                {
                  name: 'right_image',
                  label: 'Right',
                  src: arrayType[id].right_image || ''
                }
              ]
            })
          }
          return arr
        },
        []
      )
    }
    return (
      <Container>
        <Separator>
          <FormattedMessage
            {...(customizable ? messages.howItFits : messages.productImages)}
          />
        </Separator>
        {productsImagesForm.map((picture: TypePicture, index: number) => (
          <GenderBlock
            {...{ picture }}
            key={index}
            handleSetFile={this.handleSetFile}
            beforeUpload={this.beforeUpload}
          />
        ))}
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
                (material: ProductFile, index: number) =>
                  material.active && (
                    <BannerBlock
                      {...{ index }}
                      id={material.id}
                      url={material.url}
                      selected={productMaterials[material.id]}
                      section="banner"
                      onDropRow={this.handleMoveBanner}
                      handleCheckMaterial={this.handleCheckMaterial}
                      handleRemoveMaterial={this.handleRemoveMaterial}
                    />
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
        {customizable && (
          <div>
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
                {mediaFiles.map((mediaFile: ProductFile, index: number) => (
                  <MediaBlock
                    {...{ index, mediaFile }}
                    openMedia={this.openMedia}
                    section="media"
                    removeMediaFile={this.removeMediaFile}
                    onDropRow={this.handleOnDropRow}
                  />
                ))}
              </MediaSection>
            ) : (
              <div />
            )}
            {bannersLoading && (
              <LoaderBox>
                <Spin size="large" />
              </LoaderBox>
            )}
          </div>
        )}
      </Container>
    )
  }
  openMedia = ({ url }: ProductFile) => () => {
    window.open(url)
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
    const fileId = id + 1
    // Antd Upload doesn't support async functions
    uploadFile(file, fileId.toString(), 'banner').then(({ imageUri }) => {
      addBanner({
        url: imageUri,
        active: true,
        id: fileId,
        toUpload: true
      })
    })
  }

  removeMediaFile = (index: number) => () => {
    const { removeFile } = this.props
    removeFile('mediaFiles', index)
  }

  beforeUpload = (file: any) => {
    const isValidType = validTypes.includes(file.type)
    if (!isValidType) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isValidType && isLt2M
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
    const { addFile, mediaFiles, setBannersLoading } = this.props
    const { file } = event
    const id = mediaFiles.length + 1
    setBannersLoading(true)
    uploadFile(file, id.toString(), 'media').then(({ imageUri }) => {
      addFile('mediaFiles', {
        url: imageUri,
        id,
        name: getFileName(file.name),
        extension: getFileExtension(file.name)
      })
    })
  }

  handleSetFile = (event: any) => {
    const { setFileField, customizable } = this.props
    const {
      file,
      data: { id: fileId, name }
    } = event
    const fileType = customizable ? 'genders' : 'colors'
    setFileField(fileType, fileId, name, 'loading')
    uploadFile(file, fileId, 'picture', name).then(({ imageUri }) => {
      setFileField(fileType, fileId, name, imageUri)
    })
  }
  handleOnDropRow = (dragIndex: number, dropIndex: number) => {
    const { moveFile } = this.props
    moveFile('mediaFiles', dragIndex, dropIndex)
  }
  handleMoveBanner = (dragIndex: number, dropIndex: number) => {
    const { moveBanner } = this.props
    moveBanner(dragIndex, dropIndex)
  }
}

export default DragDropContext(HTML5Backend)(FourthStep)
