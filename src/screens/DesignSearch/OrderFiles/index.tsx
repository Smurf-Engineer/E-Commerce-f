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
// import AccessoryColor from '../AccessoryColor'

interface Props {
  order: OrderSearchResult
}

const OrderFiles = ({
  order: {
    code,
    image,
    status,
    svgUrl,
    assets: { svgs, files }
  }
}: Props) => {
  const assetsArray = []
  for (let file of files) {
    const { original, fileUrl } = file
    const url = original ? original : fileUrl
    assetsArray.push(url)
  }
  for (let svg of svgs) {
    assetsArray.push(svg.fileUrl)
  }
  const assetsList = assetsArray.map((fileUrl, index) => (
    <DownloadItem key={index} url={fileUrl} />
  ))
  return (
    <Container>
      <div>
        {/* <AccessoryColor name="Bid brace color" color="black" />
        <AccessoryColor
          name="Stitching"
          stitchingColor={{ name: 'FSC-22', value: '#92499E' }}
        /> */}
        <Image src={image} />
      </div>
      <Data>
        <Code>{code}</Code>
        <StatusContainer>
          <Label>
            <FormattedMessage {...messages.status} />
          </Label>
          <Status>{status}</Status>
        </StatusContainer>
        <FinalSvg>
          <DownloadItem url={svgUrl} name="Final SVG" />
        </FinalSvg>
        <AssetsLabel>
          <FormattedMessage {...messages.assets} />
        </AssetsLabel>
        {assetsList}
      </Data>
    </Container>
  )
}

export default OrderFiles
