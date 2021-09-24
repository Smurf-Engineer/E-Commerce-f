/**
 * ImageItem Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import messages from './messages'
import {
  Container,
  Image,
  Bottom,
  Name,
  Delete,
  LowQualityIcon,
  TooltipContent,
  StyledTooltip,
  StatusIcon,
  TooltipBody,
  InfoIcon,
  TooltipContentModal,
  buttonStyle,
  ExtLabel
} from './styledComponents'
import { ImageFile } from '../../../types/common'
import infoIcon from '../../../assets/helpicon.png'
import LowQualityFlag from '../../../assets/warning_flag.png'
import {
  BLUE_STATUS,
  ORANGE_STATUS,
  GREEN_STATUS,
  RED_TRANSPARENT,
  GRAY_SOFT
} from '../../../theme/colors'

const { info } = Modal

const extColorDict = {
  svg: RED_TRANSPARENT,
  jpeg: BLUE_STATUS,
  jpg: BLUE_STATUS,
  ai: ORANGE_STATUS,
  png: GREEN_STATUS,
  other: GRAY_SOFT
}

interface Props {
  image: ImageFile
  showTooltips?: boolean
  setSeen: () => void
  formatMessage: (messageDescriptor: any) => string
  onClickDelete: (id: number) => void
}

const ImageItem = ({
  image: { id, fileUrl, lowQuality },
  formatMessage,
  setSeen,
  showTooltips,
  onClickDelete
}: Props) => {
  const onDelete = () => onClickDelete(id)
  const completeName = fileUrl.split('/').pop()
  const name = completeName && completeName.split('-').pop()
  const nameAndExt = name ? name.split('.') : ''
  const hasExtension = name && nameAndExt.length === 2
  const isMobile = window && window.matchMedia('(max-width: 767px)').matches
  const openInfo = () => {
    setSeen()
    info({
      title: ' ',
      icon: ' ',
      okText: formatMessage(messages.close),
      className: 'tightModal',
      okButtonProps: {
        style: buttonStyle
      },
      content:
        <TooltipContentModal>
          <StatusIcon src={LowQualityFlag} />
          <TooltipBody
            dangerouslySetInnerHTML={{
              __html: formatMessage(messages.qualityWarningMessage)
            }}
          />
        </TooltipContentModal>
    })
  }
  return (
    <Container>
      {showTooltips && lowQuality &&
        <InfoIcon src={infoIcon} />
      }
      {lowQuality &&
        <>
          {isMobile ?
            <LowQualityIcon onClick={openInfo} {...{ showTooltips }} src={LowQualityFlag} /> :
            <StyledTooltip
              overlayClassName="arrowEnabled"
              onVisibleChange={setSeen}
              content={
                <TooltipContent>
                  <StatusIcon src={LowQualityFlag} />
                  <TooltipBody
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.qualityWarningMessage)
                    }}
                  />
                </TooltipContent>
              }
            >
              <LowQualityIcon {...{ showTooltips }} src={LowQualityFlag} />
            </StyledTooltip>
          }
        </>
      }
      <Image src={fileUrl} />
      {hasExtension ? (
        <ExtLabel
          color={extColorDict[nameAndExt[1].toLowerCase()]
            ? extColorDict[nameAndExt[1].toLowerCase()]
            : extColorDict.other}
        >{nameAndExt[1]}</ExtLabel>
      ) : null}
      <Bottom>
        <Name>{(hasExtension ? nameAndExt[0] : name) || completeName}</Name>
        <Delete onClick={onDelete}>{formatMessage(messages.delete)}</Delete>
      </Bottom>
    </Container>
  )
}

export default ImageItem
