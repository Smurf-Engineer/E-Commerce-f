/**
 * OrderFiles Component - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from 'antd/lib/button'
import messages from './messages'
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
  DownloadAll
} from './styledComponents'
import { OrderSearchResult } from '../../../types/common'
import DownloadItem from '../DownloadItem'
import FilesList from '../FilesList'
import AccessoryColors from '../AccessoryColors'

interface Props {
  order: OrderSearchResult
  downloadFile: (code: string) => void
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
  downloadFile
}: Props) => {
  const statusOrder = status.replace(/_/g, ' ')
  const onDownload = () => {
    downloadFile(code)
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
      <Data>
        <Code>{code}</Code>
        <StatusContainer>
          <Label>
            <FormattedMessage {...messages.status} />
          </Label>
          <Status>{statusOrder}</Status>
        </StatusContainer>
        <Button onClick={onDownload}>
          <DownloadAll>
            <Icon type="download" />
            <FormattedMessage {...messages.downloadAll} />
          </DownloadAll>
        </Button>
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
