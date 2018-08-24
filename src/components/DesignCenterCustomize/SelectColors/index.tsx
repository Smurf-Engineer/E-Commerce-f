/**
 * SelectColors Component - Created by miguelcanobbio on 01/08/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  BaseColors,
  BaseTitle,
  ColorLabel,
  Arrow,
  Divider
} from './styledComponents'
import AccessoryColor from '../AccessoryColor'
import { StitchingColor, AccesoryColor } from '../../../types/common'
import { AccessoryColors } from '../../../screens/DesignCenter/constants'
import ColorButtons from '../ColorButtons'

interface Props {
  colors: string[]
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bibColor?: AccesoryColor
  hasStitching: boolean
  hasZipper: boolean
  hasBinding: boolean
  hasBibBrace: boolean
  colorBlockHovered: number
  onSelectColorBlock: (index: number) => void
  onHoverColorBlock: (index: number) => void
  goToBaseColors: () => void
  goToStitching: () => void
  showContent: boolean
  formatMessage: (messageDescriptor: any) => string
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
}

class SelectColors extends React.PureComponent<Props, {}> {
  render() {
    const {
      goToBaseColors,
      goToStitching,
      formatMessage,
      colors,
      showContent,
      stitchingColor,
      bindingColor,
      zipperColor,
      bibColor,
      onAccessoryColorSelected = () => {},
      hasStitching,
      hasZipper,
      hasBinding,
      hasBibBrace,
      colorBlockHovered,
      onSelectColorBlock,
      onHoverColorBlock
    } = this.props
    if (!showContent) {
      return null
    }
    return (
      <Container>
        <BaseColors onClick={goToBaseColors}>
          <BaseTitle>
            <ColorLabel>{formatMessage(messages.baseColors)}</ColorLabel>
            <Arrow type="right" />
          </BaseTitle>
          <ColorButtons
            {...{
              colors,
              onSelectColorBlock,
              colorBlockHovered,
              onHoverColorBlock,
              formatMessage
            }}
          />
        </BaseColors>
        <Divider />
        {hasStitching && (
          <AccessoryColor
            name={formatMessage(messages.stitching)}
            {...{ goToStitching, stitchingColor }}
          />
        )}
        {hasBinding && (
          <AccessoryColor
            id={AccessoryColors.Binding}
            colorSelected={bindingColor}
            name={formatMessage(messages.binding)}
            {...{ onAccessoryColorSelected }}
          />
        )}
        {hasZipper && (
          <AccessoryColor
            id={AccessoryColors.Zipper}
            colorSelected={zipperColor}
            name={formatMessage(messages.zipper)}
            {...{ onAccessoryColorSelected }}
          />
        )}
        {hasBibBrace && (
          <AccessoryColor
            id={AccessoryColors.Bib}
            colorSelected={bibColor}
            name={formatMessage(messages.bibColor)}
            {...{ onAccessoryColorSelected }}
          />
        )}
      </Container>
    )
  }
}

export default SelectColors
