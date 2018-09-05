/**
 * ColorsTab Component - Created by miguelcanobbio on 31/07/18.
 */
import * as React from 'react'
import messages from './messages'
import findIndex from 'lodash/findIndex'
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
import baseColors from '../ColorList/colors'
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
  names: string[]
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
  bibColor?: AccesoryColor
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
    index: SELECT_COLORS_INDEX,
    names: []
  }

  componentWillReceiveProps({ colors }: Props) {
    const { names } = this.state
    if (!names.length && !!colors.length) {
      this.prepareInitialColorNames(colors)
    }
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
      bibColor,
      onAccessoryColorSelected,
      product
    } = this.props
    const { index, names } = this.state

    const hasStitching = !!product && !!product.flatlock
    const hasZipper = !!product && !!product.zipper
    const hasBinding = !!product && !!product.binding
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
              !isFirstTab && !stitchingTab
                ? this.handleOnBack
                : this.handleOnResetIndex
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
              names,
              stitchingColor,
              bindingColor,
              zipperColor,
              bibColor,
              onAccessoryColorSelected,
              formatMessage,
              hasStitching,
              hasZipper,
              hasBinding,
              hasBibBrace,
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlockHovered
            }}
          />
          <BaseColors
            showContent={baseColorsTab}
            onSelectColor={this.handleOnSelectColor}
            {...{
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlock,
              colorBlockHovered,
              colors,
              names,
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

  prepareInitialColorNames = (colors: string[]) => {
    const names = colors.map(color => {
      const index = findIndex(baseColors, o => o.value === color)
      return !!baseColors[index] ? baseColors[index].name : ''
    })
    this.setState({ names })
  }

  handleOnSelectColor = (color: string, name: string) => {
    this.setState(({ names }: State) => {
      const { onSelectColor, colorBlock } = this.props
      const updatedNames = [...names]
      onSelectColor(color)
      updatedNames[colorBlock] = name
      return { names: updatedNames }
    })
  }
}

export default ColorsTab
