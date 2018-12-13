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
  RenderLayout
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
  downloadFile: (code: string) => void
  onUploadFile: (file: any, code: string) => void
  formatMessage: (messageDescriptor: any) => string
  onSaveThumbnail: (thumbnail: string, designId: string) => void
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
        shortId
      },
      uploadingFile,
      formatMessage,
      actualSvg,
      onSaveThumbnail,
      uploadingThumbnail,
      setUploadingThumbnailAction
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
            <DownloadItem url={svgUrl} name="Final SVG" />
          </FinalSvg>
          <AssetsLabel>
            <FormattedMessage {...messages.assets} />
          </AssetsLabel>
          <FilesList {...{ assets }} />
        </Data>
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
