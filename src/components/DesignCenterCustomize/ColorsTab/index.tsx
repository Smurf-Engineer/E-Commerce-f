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
  StitchingColor,
  AccesoryColor,
  Product
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
  stitchingColor?: StitchingColor
  bindingColor?: AccesoryColor
  zipperColor?: AccesoryColor
  bidColor?: AccesoryColor
  styleColors: string[]
  myPaletteModals: MyPaletteDesignCenterModals
  product?: Product
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
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
      stitchingColor,
      bindingColor,
      zipperColor,
      bidColor,
      onAccessoryColorSelected,
      product
    } = this.props
    const { index } = this.state

    const hasStitching = !!product && !!product.flatlock
    const hasZipper = !!product && !!product.binding
    const hasBinding = !!product && !!product.zipper
    const hasBibBrace = !!product && !!product.bibBrace

    const isFirstTab = index === SELECT_COLORS_INDEX
    const baseColorsTab = index === BASE_COLORS_INDEX
    const palettesTab = index === PALETTES_COLORS_INDEX
    const stitchingTab = index === STITCHING_COLORS_INDEX

    let topMessage = messages.selectColors

    if (palettesTab) {
      topMessage = messages.myPalettes
    }

    return (
      <Container>
        <Top>
          <Row
            onClick={
              !stitchingTab ? this.handleOnBack : this.handleOnResetIndex
            }
          >
            {!isFirstTab && <Arrow type={'left'} />}
            <TextColors {...{ isFirstTab }}>
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
            showContent={isFirstTab}
            goToBaseColors={this.goToBaseColors}
            goToStitching={this.goToStitching}
            {...{
              colors,
              stitchingColor,
              bindingColor,
              zipperColor,
              bidColor,
              onAccessoryColorSelected,
              formatMessage,
              hasStitching,
              hasZipper,
              hasBinding,
              hasBibBrace
            }}
          />
          <BaseColors
            showContent={baseColorsTab}
            {...{
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlock,
              colorBlockHovered,
              onSelectColor,
              colors,
              styleColors,
              formatMessage
            }}
          />
          <MyPalette
            showContent={palettesTab}
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
          {stitchingTab ? (
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
