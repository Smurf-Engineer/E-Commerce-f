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

interface Props {
  colors: string[]
  goToBaseColors: () => void
  goToStitching: () => void
  formatMessage: (messageDescriptor: any) => string
  showContent: boolean
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
      showContent
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
        {/* Stitching */}
        <AccessoryColor
          name={formatMessage(messages.stitching)}
          colorName={'FSC-01'}
          stitching={true}
          {...{ goToStitching }}
        />
        {/* Binding */}
        <AccessoryColor name={formatMessage(messages.binding)} />
        {/* Zipper */}
        <AccessoryColor name={formatMessage(messages.zipper)} />
        {/* Bid brace color */}
        <AccessoryColor name={formatMessage(messages.bidColor)} />
      </Container>
    )
  }
}

export default SelectColors
