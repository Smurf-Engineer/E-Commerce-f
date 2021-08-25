/**
 * UploadTab Component - Created by david on 08/06/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import remove from 'lodash/remove'
import isEmpty from 'lodash/isEmpty'
import indexOf from 'lodash/indexOf'
import last from 'lodash/last'
import Icon from 'antd/lib/icon'
import Spin from 'antd/lib/spin'
import withError from '../../WithError'
import { compose, graphql } from 'react-apollo'
import dragDropIcon from '../../../assets/dragdrop.svg'
import backIcon from '../../../assets/leftarrow.svg'
import { CanvasElements } from '../../../screens/DesignCenter/constants'
import { userfilesQuery, deleteFileMutation } from './data'
import Dragger from '../../DraggerWithLoading'
import ImageList from '../ImageList'
import messages from './messages'
import {
  ImageFile,
  QueryProps,
  CanvasElement,
  PositionSize
} from '../../../types/common'
import {
  Container,
  Header,
  Title,
  DraggerBottom,
  Recommendation,
  EmptyContainer,
  LoginMessage,
  LockContainer,
  CustomButton,
  AddTextButton,
  LayersText,
  ImageLayers,
  Layer,
  ImageLeft,
  ImageClip,
  DeleteLayer,
  EditLayer,
  ArrowIcon,
  LowerContainer,
  EmptyElements,
  Row,
  DragIcon,
  ModalTitle,
  buttonStyle,
  InfoBody,
  WarningIcon,
  SizeTitle,
  SizeBody,
  LowQualityIcon
} from './styledComponents'
import { RED } from '../../../theme/colors'
import PositionResize from '../PositionResize'
import orderBy from 'lodash/orderBy'
import Draggable from '../../Draggable'
import { getSizeInCentimeters } from '../../../utils/utilsFiles'
import LowQualityFlag from '../../../assets/warning_flag.png'

const { confirm, warning } = Modal

interface Data extends QueryProps {
  images: ImageFile[]
}

const MAX_CM = 25

const warningExtensions = [
  '.svg',
  '.eps',
  '.pdf',
  '.ai'
]

const validFileExtensions = [
  '.eps',
  '.pdf',
  '.ai',
  '.svg',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.tif',
  '.tiff',
  '.bmp',
  '.psd'
]

interface Props {
  data: Data
  images: ImageFile[]
  uploadingFile: boolean
  isUserAuthenticated: boolean
  selectedItem: number
  selectedElement: CanvasElement
  activeEl: PositionSize
  elements: {
    [id: string]: CanvasElement
  }
  hoverBlurLayer: (id: string, hover: boolean) => void
  moveLayer: (id: string, index: number) => void
  onDeleteLayer: (id: string) => void
  onSelectEl: (id: string, typeEl?: string) => void
  onPositionChange: (data: PositionSize, type: string) => void
  onApplyImage: (file: ImageFile) => void
  formatMessage: (messageDescriptor: any) => string
  onUploadFile: (file: any) => void
  deleteFile: (variables: {}) => Promise<any>
  onLockElement: (id: string, type: string) => void
  openLoginModalAction: (open: boolean, callback?: boolean) => void
}

interface State {
  file: any
  addImage: boolean
}

class UploadTab extends React.PureComponent<Props, State> {
  state = {
    file: {},
    addImage: false
  }
  componentWillReceiveProps(nextProps: Props) {
    const { uploadingFile: oldUploadingFile, data } = this.props
    const { uploadingFile } = nextProps
    if (!!data && uploadingFile !== oldUploadingFile && !uploadingFile) {
      data.refetch()
    }
  }
  render() {
    const {
      data,
      uploadingFile,
      isUserAuthenticated,
      selectedItem,
      activeEl,
      elements = {},
      onPositionChange,
      formatMessage,
      selectedElement
    } = this.props
    const { addImage } = this.state
    if (!isUserAuthenticated) {
      return (
        <Container>
          <Header>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
          </Header>
          <LoginMessage>
            <FormattedMessage {...messages.loginMessage} />
            <CustomButton onClick={this.handleOnLogin}>
              <FormattedMessage {...messages.login} />
            </CustomButton>
          </LoginMessage>
        </Container>
      )
    }

    if (!!data && data.networkStatus === 1) {
      return (
        <EmptyContainer>
          <Spin />
        </EmptyContainer>
      )
    }

    const { images: imagesData } = data

    const dragger = (
      <Dragger
        extensions={['.eps', '.ai', '.svg', '.tiff', '.pdf', '.jpg']}
        formatMessage={formatMessage}
        loading={uploadingFile}
        onSelectImage={this.beforeUpload}
      />
    )
    const layersArray = Object.keys(elements).map((id: string) => {
      const imageOrigin = imagesData.find((image) => image.id === elements[id].fileId)
      elements[id].lowQuality = imageOrigin ? imageOrigin.lowQuality : false
      return elements[id]
    })
    const arrayElements = orderBy(layersArray, ['index'], ['desc'])
    return (
      <Container>
        {(selectedElement || addImage) && (
          <Header>
            <Row onClick={this.goBackToLayer}>
              <ArrowIcon src={backIcon} />
              <Title>
                <FormattedMessage {...messages.backToLayers} />
              </Title>
            </Row>
            {selectedElement && (
              <LockContainer onClick={this.handleOnLockElement}>
                <Icon type={selectedElement.lock ? 'lock' : 'unlock'} />
              </LockContainer>
            )}
          </Header>
        )}
        {selectedElement ? (
          <PositionResize {...{ activeEl }} handleChange={onPositionChange} />
        ) : (
          <LowerContainer>
            {addImage ? (
              <>
                <ImageList
                  onClickImage={this.handleOnAddImage}
                  images={imagesData}
                  onClickDelete={this.handleOnDelete}
                  currentSelected={selectedItem}
                  {...{ formatMessage }}
                />
                <DraggerBottom>{dragger}</DraggerBottom>
                <Recommendation color={RED}>
                  <FormattedMessage {...messages.recommendationTitle} />
                </Recommendation>
                <Recommendation>
                  <FormattedMessage {...messages.recommendationMessage} />
                </Recommendation>
              </>
            ) : (
              <>
                <AddTextButton onClick={this.addImage}>
                  {formatMessage(messages.uploadFile)}
                </AddTextButton>
                <LayersText>{formatMessage(messages.uploadLayers)}</LayersText>
                <ImageLayers>
                  {arrayElements.length ? (
                    arrayElements.map(({ id, src, lowQuality }, index: number) => (
                      <Draggable
                        {...{ id, index }}
                        index={id}
                        key={index}
                        section="imageLayers"
                        onDropRow={this.handleMoveLayer}
                      >
                        <Layer
                          {...{ id }}
                          onMouseEnter={this.hoverLayer}
                          onMouseLeave={this.blurLayer}
                        >
                          <DragIcon src={dragDropIcon} />
                          <ImageLeft>
                            {lowQuality && <LowQualityIcon src={LowQualityFlag} />}
                            <ImageClip {...{ src }} />
                          </ImageLeft>
                          <DeleteLayer {...{ id }} onClick={this.onDeleteLayer}>
                            {formatMessage(messages.delete)}
                          </DeleteLayer>
                          <EditLayer {...{ id }} onClick={this.onSelectLayer}>
                            {formatMessage(messages.edit)}
                          </EditLayer>
                        </Layer>
                      </Draggable>
                    ))
                  ) : (
                    <EmptyElements>
                      {formatMessage(messages.empty)}
                    </EmptyElements>
                  )}
                </ImageLayers>
              </>
            )}
          </LowerContainer>
        )}
      </Container>
    )
  }

  hoverLayer = (evt: React.MouseEvent<EventTarget>) => {
    const { hoverBlurLayer } = this.props
    const {
      currentTarget: { id }
    } = evt
    hoverBlurLayer(id, true)
  }

  blurLayer = (evt: React.MouseEvent<EventTarget>) => {
    const { hoverBlurLayer } = this.props
    const {
      currentTarget: { id }
    } = evt
    hoverBlurLayer(id, false)
  }

  handleMoveLayer = (dragId: string, dropId: string) => {
    const { elements, moveLayer } = this.props
    const { index } = elements[dropId]
    moveLayer(dragId, index)
  }

  onSelectLayer = (event: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = event
    const { onSelectEl } = this.props
    onSelectEl(id, 'image')
  }

  onDeleteLayer = (event: React.MouseEvent<EventTarget>) => {
    const {
      currentTarget: { id }
    } = event
    const { onDeleteLayer } = this.props
    onDeleteLayer(id)
  }

  addImage = () => {
    this.setState({ addImage: true })
  }

  goBackToLayer = () => {
    const { onSelectEl } = this.props
    this.setState({ addImage: false })
    onSelectEl('', 'image')
  }

  handleOnLogin = () => {
    const { openLoginModalAction } = this.props
    openLoginModalAction(true)
  }
  handleOnAddImage = (file: ImageFile) => {
    const { onApplyImage } = this.props
    onApplyImage(file)
  }

  getFileExtension = (fileName: string) => {
    const extensionPattern = /\.[a-zA-Z]+/g
    let extension = fileName.match(extensionPattern)
    if (!isEmpty(extension)) {
      return last(extension as RegExpMatchArray)
    }
    return ''
  }

  beforeUpload = (file: any) => {
    if (file) {
      const { formatMessage, onUploadFile } = this.props
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = this.getFileExtension(name)
      if (
        indexOf(
          validFileExtensions,
          (fileExtension as String).toLowerCase()
        ) === -1
      ) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      if (warningExtensions.includes(fileExtension.toLowerCase())) {
        warning({
          title: <ModalTitle>{formatMessage(messages.vectorCheck)}</ModalTitle>,
          width: 494,
          okText: formatMessage(messages.gotIt),
          icon: <WarningIcon theme="filled" type="exclamation-circle" />,
          okButtonProps: {
            style: buttonStyle
          },
          content: <InfoBody>{formatMessage(messages.vectorInfo)}</InfoBody>,
          onOk: () => onUploadFile(file)
        })
      } else {
        const img = new Image()
        const objectUrl = URL.createObjectURL(file)
        img.onload = async () => {
          const width = getSizeInCentimeters(img.width)
          const height = getSizeInCentimeters(img.height)
          if (width <= MAX_CM && height <= MAX_CM) {
            onUploadFile(file)
          } else {
            warning({
              title: <SizeTitle>{formatMessage(messages.somethingWrong)}</SizeTitle>,
              icon: ' ',
              okText: formatMessage(messages.gotIt),
              okButtonProps: {
                style: buttonStyle
              },
              content:
                <SizeBody
                  dangerouslySetInnerHTML={{ __html: formatMessage(messages.sizeBody, { width, height }) }}
                />
            })
          }
          URL.revokeObjectURL(objectUrl)
        }
        img.src = objectUrl
      }
    }
    return false
  }

  handleOnDelete = async (fileId: number) => {
    const { formatMessage } = this.props
    confirm({
      title: formatMessage(messages.confirmTitle),
      content: formatMessage(messages.confirmMessage),
      onOk: async () => {
        try {
          const { deleteFile } = this.props
          await deleteFile({
            variables: { fileId },
            update: (store: any) => {
              const data = store.readQuery({ query: userfilesQuery })
              const updatedImages = remove(
                data.images,
                (image: ImageFile) => image.id !== fileId
              )
              data.images = updatedImages
              store.writeQuery({ query: userfilesQuery, data })
            }
          })
        } catch (e) {
          message.error(e.message)
        }
      }
    })
  }
  handleOnLockElement = () => {
    const { selectedElement, onLockElement } = this.props
    onLockElement(selectedElement.id, CanvasElements.Image)
    this.forceUpdate()
  }

  clearState = () => {
    this.setState({ file: null })
  }
}

const UploadTabEnhance = compose(
  graphql<Data, Props>(userfilesQuery, {
    options: ({ isUserAuthenticated }) => ({
      skip: !isUserAuthenticated,
      notifyOnNetworkStatusChange: true
    })
  }),
  deleteFileMutation,
  withError
)(UploadTab)

export default UploadTabEnhance
