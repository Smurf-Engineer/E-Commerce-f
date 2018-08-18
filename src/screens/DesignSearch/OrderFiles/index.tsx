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
  // const assetsArray = []
  for (let file of files) {
    console.log(file)
  }
  for (let svg of svgs) {
    console.log(svg)
  }
  // const assetsList = assets.map(({ fileUrl, name }, index) => (
  //   <DownloadItem key={index} url={fileUrl} {...{ name }} />
  // ))
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
        {/* {assetsList} */}
      </Data>
    </Container>
  )
}

export default OrderFiles
