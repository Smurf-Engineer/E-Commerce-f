/**
 * ColorsTab Component - Created by miguelcanobbio on 31/07/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  BaseColorsContainer,
  ColorButtons,
  ColorLabel,
  BaseTitle,
  Arrow,
  Top,
  TextColors,
  Row,
  Text,
  Title
} from './styledComponents'
import ColorButton from '../../../screens/DesignerTool/DesignCenterCustomize/ColorButton'
import SwipeableViews from 'react-swipeable-views'
import BaseColors from '../BaseColors'
import { Palette, MyPaletteDesignCenterModals } from '../../../types/common'
import MyPalette from '../MyPalette'

interface State {
  index: number
}

interface Props {
  colorBlock: number
  colorBlockHovered: number
  paletteName: string
  palettes: Palette[]
  colors: string[]
  styleColors: string[]
  myPaletteModals: MyPaletteDesignCenterModals
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
}
const { area1, area2, area3, area4, area5 } = messages
const colorsBlocks = [area1, area2, area3, area4, area5]

const SELECT_COLORS_INDEX = 0
const BASE_COLORS_INDEX = 1
const PALETTES_COLORS_INDEX = 2

class ColorsTab extends React.PureComponent<Props, State> {
  state = {
    index: SELECT_COLORS_INDEX
  }

  handleOnBack = () => this.setState(({ index }) => ({ index: index - 1 }))

  goToBaseColors = () => this.setState({ index: BASE_COLORS_INDEX })

  goToPalettes = () => this.setState({ index: PALETTES_COLORS_INDEX })

  render() {
    const {
      formatMessage,
      colors,
      onSelectColorBlock,
      onHoverColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      onChangePaletteName,
      paletteName,
      palettes,
      onSetPalettes,
      onSelectPalette,
      openPaletteModalAction,
      myPaletteModals,
      styleColors
    } = this.props
    const { index } = this.state
    const colorButtons = colorsBlocks.map((label, i) => (
      <ColorButton
        key={i}
        index={i}
        label={formatMessage(label)}
        onSelectColorBlock={() => {}}
        currentColor={colors[i]}
      />
    ))

    const baseColorsTab = index === BASE_COLORS_INDEX
    const palettesTab = index === PALETTES_COLORS_INDEX
    const isFirstPage = index === SELECT_COLORS_INDEX

    let topMessage = messages.selectColors

    if (palettesTab) {
      topMessage = messages.myPalettes
    }

    return (
      <Container>
        <Top>
          <Title onClick={this.handleOnBack}>
            {!isFirstPage && <Arrow type={'left'} />}
            <TextColors {...{ isFirstPage }}>
              {formatMessage(topMessage)}
            </TextColors>
          </Title>
          {baseColorsTab ? (
            <Row onClick={this.goToPalettes}>
              <Text>{formatMessage(messages.myPalettes)}</Text>
              <Arrow type="right" />
            </Row>
          ) : null}
        </Top>
        <SwipeableViews {...{ index }}>
          <BaseColorsContainer onClick={this.goToBaseColors}>
            <BaseTitle>
              <ColorLabel>{formatMessage(messages.baseColors)}</ColorLabel>
              <Arrow type="right" />
            </BaseTitle>
            <ColorButtons>{colorButtons}</ColorButtons>
          </BaseColorsContainer>
          <BaseColors
            {...{
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlock,
              colorBlockHovered,
              onSelectColor,
              colors,
              styleColors
            }}
          />
          <MyPalette
            {...{
              onSelectPalette,
              onChangePaletteName,
              paletteName,
              palettes,
              onSetPalettes,
              colors,
              formatMessage,
              openPaletteModalAction,
              myPaletteModals
            }}
          />
        </SwipeableViews>
      </Container>
    )
  }
}

export default ColorsTab
