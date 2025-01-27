/**
 * AccessoryColor Component - Created by miguelcanobbio on 01/08/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import {
  Container,
  Divider,
  Name,
  Stitching,
  ColorLabel,
  Oval,
  Arrow,
  Colors,
  OvalSelected, HintIcon, ColorWheel
} from './styledComponents'
import { StitchingColor, AccesoryColor, Message } from '../../../types/common'
import colorWheel from '../../../assets/Colorwheel.svg'
import helpTooltip from '../../../assets/tooltip.svg'
import { BLACK, WHITE } from '../../../screens/DesignCenter/constants'
import Tooltip from 'antd/lib/tooltip'
import messages from './messages'

interface Props {
  name: string
  id?: string
  isPredyed?: boolean
  stitchingColor?: StitchingColor
  stitchingLabel?: string
  goToStitching?: () => void
  colorSelected?: AccesoryColor
  allowSelection?: boolean
  openHelp?: () => void
  formatMessage: (messageDescriptor: Message) => string
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
}

const AccessoryColor = ({
  id = '',
  name,
  stitchingColor,
  stitchingLabel,
  goToStitching,
  isPredyed = false,
  colorSelected = BLACK,
  allowSelection = true,
  formatMessage,
  openHelp = () => { },
  onAccessoryColorSelected = () => { }
}: Props) => {
  // tslint:disable:curly
  const onSelectBlack = () => {
    if (colorSelected !== BLACK && allowSelection)
      onAccessoryColorSelected(BLACK, id)
  }
  const onSelectWhite = () => {
    if (colorSelected !== WHITE && allowSelection)
      onAccessoryColorSelected(WHITE, id)
  }
  // tslint:enable:curly
  const stitchingName = get(stitchingColor, 'name', '')
  const stitchingValue = get(stitchingColor, 'value', '')
  return (
    <div>
      <Container>
        <Name>
          {name}
          {isPredyed &&
            <HintIcon src={helpTooltip} onClick={openHelp} />
          }
        </Name>
        {stitchingColor ? (
          <Stitching onClick={goToStitching}>
            <ColorLabel>{stitchingLabel || stitchingName}</ColorLabel>
            <Oval color={stitchingValue} />
            <Arrow type="right" />
          </Stitching>
        ) : (
            <Colors>
              <OvalSelected
                onClick={onSelectBlack}
                selected={colorSelected === BLACK}
              >
                {isPredyed ?
                  <Tooltip placement="bottom" title={formatMessage(messages.predyed)}>
                    <Oval color={BLACK} />
                  </Tooltip> :
                  <Oval color={BLACK} />
                }
              </OvalSelected>
              <OvalSelected
                onClick={onSelectWhite}
                selected={colorSelected === WHITE}
                marginLeft={'8px'}
              >
                {isPredyed ?
                  <Tooltip placement="bottom" title={formatMessage(messages.printed)}>
                    <ColorWheel src={colorWheel} />
                  </Tooltip> :
                  <Oval {...{ isPredyed }} />
                }
              </OvalSelected>
            </Colors>
          )}
      </Container>
      <Divider />
    </div>
  )
}

export default AccessoryColor
