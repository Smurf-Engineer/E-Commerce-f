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
  ColorButtons,
  Arrow,
  Divider
} from './styledComponents'
import ColorButton from '../../ColorButton'
import AccessoryColor from '../AccessoryColor'
import { StitchingColor, AccesoryColor } from '../../../types/common'

interface Props {
  colors: string[]
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bidColor?: AccesoryColor
  hasStitching: boolean
  hasZipper: boolean
  hasBinding: boolean
  hasBibBrace: boolean
  goToBaseColors: () => void
  goToStitching: () => void
  showContent: boolean
  formatMessage: (messageDescriptor: any) => string
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
}

const { area1, area2, area3, area4, area5 } = messages
const colorsBlocks = [area1, area2, area3, area4, area5]

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
      bidColor,
      onAccessoryColorSelected = () => {},
      hasStitching,
      hasZipper,
      hasBinding,
      hasBibBrace
    } = this.props
    if (!showContent) {
      return null
    }
    const colorButtons = colorsBlocks.map((label, i) => (
      <ColorButton
        key={i}
        index={i}
        label={formatMessage(label)}
        onSelectColorBlock={() => {}}
        currentColor={colors[i]}
      />
    ))
    return (
      <Container>
        <BaseColors onClick={goToBaseColors}>
          <BaseTitle>
            <ColorLabel>{formatMessage(messages.baseColors)}</ColorLabel>
            <Arrow type="right" />
          </BaseTitle>
          <ColorButtons>{colorButtons}</ColorButtons>
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
            id="bindingColor"
            colorSelected={bindingColor}
            name={formatMessage(messages.binding)}
            {...{ onAccessoryColorSelected }}
          />
        )}
        {hasZipper && (
          <AccessoryColor
            id="zipperColor"
            colorSelected={zipperColor}
            name={formatMessage(messages.zipper)}
            {...{ onAccessoryColorSelected }}
          />
        )}
        {hasBibBrace && (
          <AccessoryColor
            id="bidColor"
            colorSelected={bidColor}
            name={formatMessage(messages.bidColor)}
            {...{ onAccessoryColorSelected }}
          />
        )}
      </Container>
    )
  }
}

export default SelectColors
