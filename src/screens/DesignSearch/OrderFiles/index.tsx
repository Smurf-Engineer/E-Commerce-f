/**
 * OrderFiles Component - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'antd/lib/button'
import messages from './messages'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import indexOf from 'lodash/indexOf'
import message from 'antd/lib/message'
import Render3D from '../../../components/Render3D'
import {
  Container,
  Code,
  Data,
  Status,
  Label,
  StatusContainer,
  FinalSvg,
  AssetsLabel,
  Icon,
  ButtonContainer,
  RenderContainer,
  RenderLayout,
  ThumbnailLabel,
  ChangesContainer,
  MessageContainer
} from './styledComponents'
import DraggerWithLoading from '../../../components/DraggerWithLoading'
import { OrderSearchResult } from '../../../types/common'
import DownloadItem from '../DownloadItem'
import FilesList from '../FilesList'
import AccessoryColors from '../AccessoryColors'

interface Props {
  order: OrderSearchResult
  uploadingFile: boolean
  actualSvg: string
  uploadingThumbnail: boolean
  changes: boolean
  downloadFile: (code: string) => void
  onUploadFile: (file: any, code: string) => void
  formatMessage: (messageDescriptor: any) => string
  onSaveThumbnail: (thumbnail: string) => void
  setUploadingThumbnailAction: (uploading: boolean) => void
}
class OrderFiles extends React.PureComponent<Props> {
  render3D: any
  render() {
    const {
      order: {
        code,
        status,
        svgUrl,
        assets,
        stitchingName,
        stitchingValue,
        bibColor,
        zipperColor,
        bindingColor,
        shortId,
        image
      },
      uploadingFile,
      formatMessage,
      actualSvg,
      onSaveThumbnail,
      uploadingThumbnail,
      setUploadingThumbnailAction,
      changes
    } = this.props
    const statusOrder = status.replace(/_/g, ' ')
    return (
      <Container>
        <RenderLayout>
          <AccessoryColors
            {...{
              stitchingName,
              stitchingValue,
              bibColor,
              zipperColor,
              bindingColor
            }}
          />
          <RenderContainer>
            <Render3D
              designSearch={true}
              loading={uploadingFile}
              actualSvg={actualSvg}
              designId={shortId}
              uploadingThumbnail={uploadingThumbnail}
              onSaveThumbnail={onSaveThumbnail}
              onUploadingThumbnail={setUploadingThumbnailAction}
              ref={(render3D: any) => (this.render3D = render3D)}
            />
          </RenderContainer>
        </RenderLayout>
        <Data>
          <Code>{code}</Code>
          <StatusContainer>
            <Label>
              <FormattedMessage {...messages.status} />
            </Label>
            <Status>{statusOrder}</Status>
          </StatusContainer>
          <Button onClick={this.onDownload}>
            <ButtonContainer>
              <Icon type="download" />
              <FormattedMessage {...messages.downloadAll} />
            </ButtonContainer>
          </Button>
          <DraggerWithLoading
            className="upload"
            loading={uploadingFile}
            onSelectImage={this.beforeUpload}
            formatMessage={formatMessage}
            extensions={['.svg']}
          >
            <Button>
              <ButtonContainer>
                <Icon type="upload" />
                <FormattedMessage {...messages.uploadDesign} />
              </ButtonContainer>
            </Button>
          </DraggerWithLoading>
          <FinalSvg>
            <DownloadItem url={actualSvg || svgUrl} name="Final SVG" />
          </FinalSvg>
          <AssetsLabel>
            <FormattedMessage {...messages.assets} />
          </AssetsLabel>
          <FilesList {...{ assets }} />
          <ThumbnailLabel>
            <FormattedMessage {...messages.thumbnail} />
          </ThumbnailLabel>
          <DownloadItem url={image} />
        </Data>
        <ChangesContainer className={changes ? 'show' : ''}>
          <MessageContainer>
            <FormattedMessage {...messages.changesMessage} />
          </MessageContainer>
          <Button onClick={this.onSaveChanges} type="primary">
            <ButtonContainer>
              <Icon type="save" />
              <FormattedMessage {...messages.saveChanges} />
            </ButtonContainer>
          </Button>
        </ChangesContainer>
      </Container>
    )
  }
  onDownload = () => {
    const {
      downloadFile,
      order: { code }
    } = this.props
    downloadFile(code)
  }
  getFileExtension = (fileName: string) => {
    const extensionPattern = /\.[a-zA-Z]+/g
    let extension = fileName.match(extensionPattern)
    if (!isEmpty(extension)) {
      return last(extension as RegExpMatchArray)
    }
    return ''
  }
  onSaveChanges = () => {
    console.log(this.render3D.getWrappedInstance())
    this.render3D.getWrappedInstance().saveThumbnail()
  }
  beforeUpload = (file: any) => {
    const {
      formatMessage,
      onUploadFile,
      order: { code }
    } = this.props
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = this.getFileExtension(name)
      if (indexOf(['.svg'], (fileExtension as String).toLowerCase()) === -1) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      onUploadFile(file, code)
    }
    return false
  }
}

export default OrderFiles
