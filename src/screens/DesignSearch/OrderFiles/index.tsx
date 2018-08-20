/**
 * OrderFiles Component - Created by miguelcanobbio on 16/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
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
  AssetsLabel
} from './styledComponents'
import { OrderSearchResult } from '../../../types/common'
import DownloadItem from '../DownloadItem'
import FilesList from '../FilesList'
import AccessoryColors from '../AccessoryColors'

interface Props {
  order: OrderSearchResult
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
  }
}: Props) => {
  const statusOrder = status.replace(/_/g, ' ')
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
