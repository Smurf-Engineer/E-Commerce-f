/**
 * ColorsTab Component - Created by miguelcanobbio on 31/07/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  Arrow,
  Top,
  TextColors,
  Row,
  Text,
  StitchingList
} from './styledComponents'
import SwipeableViews from 'react-swipeable-views'
import BaseColors from '../BaseColors'
import SelectColors from '../SelectColors'
import {
  Palette,
  MyPaletteDesignCenterModals,
  StitchingColor
} from '../../../types/common'
import MyPalette from '../MyPalette'
import ColorList from '../ColorList'

interface State {
  index: number
}

interface Props {
  colorBlock: number
  colorBlockHovered: number
  paletteName: string
  palettes: Palette[]
  colors: string[]
  stitchingColor: StitchingColor
  styleColors: string[]
  myPaletteModals: MyPaletteDesignCenterModals
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
}

const SELECT_COLORS_INDEX = 0
const BASE_COLORS_INDEX = 1
const PALETTES_COLORS_INDEX = 2
const STITCHING_COLORS_INDEX = 3

class ColorsTab extends React.PureComponent<Props, State> {
  state = {
    index: SELECT_COLORS_INDEX
  }

  handleOnBack = () => this.setState(({ index }) => ({ index: index - 1 }))

  handleOnResetIndex = () => this.setState({ index: SELECT_COLORS_INDEX })

  goToBaseColors = () => this.setState({ index: BASE_COLORS_INDEX })

  goToPalettes = () => this.setState({ index: PALETTES_COLORS_INDEX })

  goToStitching = () => this.setState({ index: STITCHING_COLORS_INDEX })

  render() {
    const {
      formatMessage,
      colors,
      onSelectColorBlock,
      onHoverColorBlock,
      colorBlock,
      colorBlockHovered,
      onSelectColor,
      onSelectStitchingColor,
      onChangePaletteName,
      paletteName,
      palettes,
      onSetPalettes,
      onSelectPalette,
      openPaletteModalAction,
      myPaletteModals,
      styleColors,
      stitchingColor
    } = this.props
    const { index } = this.state

    const baseColorsTab = index === BASE_COLORS_INDEX
    const palettesTab = index === PALETTES_COLORS_INDEX
    const isFirstPage = index === SELECT_COLORS_INDEX
    const isStitching = index === STITCHING_COLORS_INDEX

    let topMessage = messages.selectColors

    if (palettesTab) {
      topMessage = messages.myPalettes
    }

    return (
      <Container>
        <Top>
          <Row
            onClick={!isStitching ? this.handleOnBack : this.handleOnResetIndex}
          >
            {!isFirstPage && <Arrow type={'left'} />}
            <TextColors {...{ isFirstPage }}>
              {formatMessage(topMessage)}
            </TextColors>
          </Row>
          {baseColorsTab ? (
            <Row onClick={this.goToPalettes}>
              <Text>{formatMessage(messages.myPalettes)}</Text>
              <Arrow type="right" />
            </Row>
          ) : null}
        </Top>
        <SwipeableViews {...{ index }}>
          <SelectColors
            showContent={index === SELECT_COLORS_INDEX}
            goToBaseColors={this.goToBaseColors}
            goToStitching={this.goToStitching}
            {...{ colors, stitchingColor, formatMessage }}
          />
          <BaseColors
            showContent={index === BASE_COLORS_INDEX}
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
            showContent={index === PALETTES_COLORS_INDEX}
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
          {index === STITCHING_COLORS_INDEX ? (
            <StitchingList>
              <ColorList
                {...{ onSelectStitchingColor, stitchingColor }}
                stitching={true}
              />
            </StitchingList>
          ) : (
            <div />
          )}
        </SwipeableViews>
      </Container>
    )
  }
}

export default ColorsTab
