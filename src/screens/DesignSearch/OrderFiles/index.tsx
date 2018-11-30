/**
 * OrderFiles Component - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'antd/lib/button'
import messages from './messages'
import { isEmpty, last, indexOf } from 'lodash'
import message from 'antd/lib/message'
import {
  Container,
  Image,
  Code,
  Data,
  Status,
  Label,
  StatusContainer,
  FinalSvg,
  AssetsLabel,
  Icon,
  ButtonContainer
} from './styledComponents'
import DraggerWithLoading from '../../../components/DraggerWithLoading'
import { OrderSearchResult } from '../../../types/common'
import DownloadItem from '../DownloadItem'
import FilesList from '../FilesList'
import AccessoryColors from '../AccessoryColors'

interface Props {
  order: OrderSearchResult
  uploadingFile: boolean
  downloadFile: (code: string) => void
  onUploadFile: (file: any, code: string) => void
  formatMessage: (messageDescriptor: any) => string
}

const OrderFiles = ({
  order: {
    code,
    image,
    status,
    svgUrl,
    assets,
    stitchingName,
    stitchingValue,
    bibColor,
    zipperColor,
    bindingColor
  },
  uploadingFile,
  downloadFile,
  onUploadFile,
  formatMessage
}: Props) => {
  const statusOrder = status.replace(/_/g, ' ')
  const onDownload = () => {
    downloadFile(code)
  }
  const getFileExtension = (fileName: string) => {
    const extensionPattern = /\.[a-zA-Z]+/g
    let extension = fileName.match(extensionPattern)
    if (!isEmpty(extension)) {
      return last(extension as RegExpMatchArray)
    }
    return ''
  }
  const beforeUpload = (file: any) => {
    if (file) {
      const { size, name } = file
      // size is in byte(s) divided size / 1'000,000 to convert bytes to MB
      if (size / 1000000 > 20) {
        message.error(formatMessage(messages.imageSizeError))
        return false
      }
      const fileExtension = getFileExtension(name)
      if (indexOf(['.svg'], (fileExtension as String).toLowerCase()) === -1) {
        message.error(formatMessage(messages.imageExtensionError))
        return false
      }
      onUploadFile(file, code)
    }
    return false
  }
  return (
    <Container>
      <div>
        <AccessoryColors
          {...{
            stitchingName,
            stitchingValue,
            bibColor,
            zipperColor,
            bindingColor
          }}
        />
        <Image src={image} />
      </div>
      <p>{JSON.stringify(uploadingFile)}</p>
      <Data>
        <Code>{code}</Code>
        <StatusContainer>
          <Label>
            <FormattedMessage {...messages.status} />
          </Label>
          <Status>{statusOrder}</Status>
        </StatusContainer>
        <Button onClick={onDownload}>
          <ButtonContainer>
            <Icon type="download" />
            <FormattedMessage {...messages.downloadAll} />
          </ButtonContainer>
        </Button>
        <DraggerWithLoading
          className="upload"
          loading={uploadingFile}
          onSelectImage={beforeUpload}
          formatMessage={formatMessage}
          extensions={['.svg']}
        >
          <Button className="uploadButton">
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

export default OrderFiles
