/**
 * ColorsTab Component - Created by miguelcanobbio on 31/07/18.
 */
import * as React from 'react'
import messages from './messages'
import get from 'lodash/get'
import shuffle from 'lodash/shuffle'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
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
  Product,
  UserInfo,
  Color,
  Style
} from '../../../types/common'
import MyPalette from '../MyPalette'
import ColorList from '../ColorList'
import { EXCLUDED_AREAS } from '../../../constants'

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
  bindingName: string
  disableTooltip: boolean
  colorsList: any
  currentStyle: Style
  colorChartSending: boolean
  colorChartModalOpen: boolean
  colorChartModalFormOpen: boolean
  selectedPredyed: string
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string, name: string) => void
  onSelectPredyed: (predyedColor: string) => void
  onSelectStitchingColor: (stitchingColor: StitchingColor) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
  openPaletteModalAction: (key: string, open: boolean, value?: number) => void
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
  onRequestColorChart: (userInfo: UserInfo) => void
  onCloseColorChart: () => void
  onCloseColorChartForm: () => void
  onOpenFormChart: () => void
  onOpenColorChart: () => void
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
    const { colors: oldColors } = this.props
    if (!isEqual(colors, oldColors)) {
      const { names } = this.state
      this.prepareColorNames(colors, names)
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
      onSelectPredyed,
      onSelectStitchingColor,
      onChangePaletteName,
      paletteName,
      palettes,
      selectedPredyed,
      onSetPalettes,
      onSelectPalette,
      openPaletteModalAction,
      myPaletteModals,
      styleColors,
      stitchingColor,
      bindingColor,
      zipperColor,
      bindingName,
      currentStyle,
      bibColor,
      onAccessoryColorSelected,
      product,
      disableTooltip,
      colorsList,
      onRequestColorChart,
      colorChartSending,
      colorChartModalOpen,
      colorChartModalFormOpen,
      onCloseColorChart,
      onCloseColorChartForm,
      onOpenFormChart,
      onOpenColorChart
    } = this.props
    const { index, names } = this.state

    const hasStitching = !!product && !!product.flatlock
    const hasZipper =
      !!product &&
      !!product.zipper &&
      !!product.zipper.white &&
      !!product.zipper.black
    const hasBinding = !!product && !!product.binding
    const hasBibBrace = !!product && !!product.bibBrace
    const hasBranding = !!product && !!product.hasPredyed

    const isFirstTab = index === SELECT_COLORS_INDEX
    const baseColorsTab = index === BASE_COLORS_INDEX
    const palettesTab = index === PALETTES_COLORS_INDEX
    const stitchingTab = index === STITCHING_COLORS_INDEX
    const predyedLabel = !!product ? product.predyedlabel : ''
    let topMessage = messages.selectColors
    const excludedThemes = product ? EXCLUDED_AREAS[product.id] : {}
    const styleName = currentStyle && currentStyle.name ? currentStyle.name.toLowerCase() : ''
    const excludedAreas = styleName && excludedThemes ? excludedThemes[styleName] : {}
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
        <SwipeableViews disabled={true} {...{ index }}>
          <SelectColors
            showContent={isFirstTab}
            goToBaseColors={this.goToBaseColors}
            goToStitching={this.goToStitching}
            {...{
              colors,
              colorsList,
              onSelectPredyed,
              names,
              excludedAreas,
              stitchingColor,
              bindingColor,
              zipperColor,
              bibColor,
              onAccessoryColorSelected,
              predyedLabel,
              formatMessage,
              selectedPredyed,
              hasBranding,
              hasStitching,
              bindingName,
              hasZipper,
              hasBinding,
              hasBibBrace,
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlockHovered,
              onRequestColorChart,
              colorChartSending,
              colorChartModalOpen,
              colorChartModalFormOpen,
              onCloseColorChart,
              onCloseColorChartForm,
              onOpenFormChart,
              onOpenColorChart
            }}
          />
          <BaseColors
            showContent={baseColorsTab}
            onSelectColor={this.handleOnSelectColor}
            onSelectShuffle={this.handleShuffleColors}
            {...{
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlock,
              colorBlockHovered,
              colors,
              names,
              excludedAreas,
              styleColors,
              formatMessage,
              disableTooltip,
              colorsList
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
                stitching={true}
                {...{
                  onSelectStitchingColor,
                  stitchingColor,
                  disableTooltip,
                  colorsList,
                  formatMessage
                }}
              />
            </StitchingList>
          ) : (
              <div />
            )}
        </SwipeableViews>
      </Container>
    )
  }

  prepareColorNames = (colors: string[], oldNames: string[]) => {
    const { colorsList } = this.props
    let baseColors: Color[]
    const colorsResponse = get(colorsList, 'colorsResult.colors', [])
    if (colorsResponse.length) {
      try {
        baseColors = JSON.parse(colorsResponse)
        const names = colors.map(color => {
          const index = findIndex(
            baseColors,
            baseColor => baseColor.value === color
          )
          return !!baseColors[index] ? baseColors[index].name : ''
        })
        if (!isEqual(oldNames, names)) {
          this.setState({ names })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  handleOnSelectColor = (color: string, name: string) => {
    this.setState(({ names }: State) => {
      const { onSelectColor, colorBlock } = this.props
      const updatedNames = [...names]
      onSelectColor(color, name)
      updatedNames[colorBlock] = name
      return { names: updatedNames }
    })
  }

  handleShuffleColors = () => {
    const { colors, onSelectPalette, product, currentStyle } = this.props

    const excludedThemes = product ? EXCLUDED_AREAS[product.id] : {}
    const styleName = currentStyle && currentStyle.name ? currentStyle.name.toLowerCase() : ''
    const excludedAreas = styleName && excludedThemes ? excludedThemes[styleName] : {}
    console.log('🔴excludedAreas:', excludedAreas)
    const indexes = excludedAreas ? Object.keys(excludedAreas) : []
    console.log('🔴indexes:', indexes)
    const colorsToShuffle = colors.filter((e, index) => !excludedAreas || !excludedAreas[index])
    console.log('🔴colorsToShuffle:', colorsToShuffle)
    const shuffledColors = shuffle(colorsToShuffle)
    indexes.forEach((area: any) => {
      shuffledColors.splice(area, 0, colors[area])
    })
    onSelectPalette(shuffledColors)
  }
}

export default ColorsTab
