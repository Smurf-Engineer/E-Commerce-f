/**
 * ImageItem Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Tile,
  TileImage,
  TileText,
  TileTitle,
  TileSubTitle
} from './styledComponents'
import ProBoxImage from '../../../assets/pro_box.png'
import ProCertBoxImage from '../../../assets/procert_box.png'
import WarningBoxImage from '../../../assets/warning_box.png'

type TileInfo = {
  title: any
  subTitle: any
  image: string
}
const tileInfos: TileInfo[] = [
  {
    title: messages.proCertified,
    subTitle: messages.proCertifiedDesc,
    image: ProCertBoxImage
  }, {
    title: messages.proDesign,
    subTitle: messages.proDesignDesc,
    image: ProBoxImage
  }, {
    title: messages.qualityWarning,
    subTitle: messages.qualityWarningDesc,
    image: WarningBoxImage
  }
]

interface TileProps {
  tileInfo: TileInfo
  formatMessage: (messageDescriptor: any, values?: {}) => string
}
const FlagDescriptionTile = ({ tileInfo, formatMessage }: TileProps) => {
  return (
    <Tile>
      <TileImage src={tileInfo.image} />
      <TileText>
        <TileTitle>{formatMessage(tileInfo.title)}</TileTitle>
        <TileSubTitle>{formatMessage(tileInfo.subTitle)}</TileSubTitle>
      </TileText>
    </Tile>
  )
}

interface Props {
  formatMessage: (messageDescriptor: any, values?: {}) => string
}
const FlagDescription = ({ formatMessage }: Props) => {
  return (
    <Container>
      {tileInfos.map((tileInfo: TileInfo, index: number) =>
        <FlagDescriptionTile key={index} {...{ tileInfo, formatMessage }} />
      )}
    </Container>
  )
}

export default FlagDescription
