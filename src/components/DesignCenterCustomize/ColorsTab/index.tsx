/**
 * ColorsTab Component - Created by miguelcanobbio on 31/07/18.
 */
import * as React from 'react'
import messages from './messages'
import get from 'lodash/get'
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
  Color
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
  disableTooltip: boolean
  colorsList: any
  colorChartSending: boolean
  colorChartModalOpen: boolean
  colorChartModalFormOpen: boolean
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string, name: string) => void
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
    const { names } = this.state
    this.prepareColorNames(colors, names)
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
        <SwipeableViews disabled={true} {...{ index }}>
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
            {...{
              onSelectColorBlock,
              onHoverColorBlock,
              colorBlock,
              colorBlockHovered,
              colors,
              names,
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
    try {
      baseColors = JSON.parse(get(colorsList, 'colorsResult.colors', []))
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

  handleOnSelectColor = (color: string, name: string) => {
    this.setState(({ names }: State) => {
      const { onSelectColor, colorBlock } = this.props
      const updatedNames = [...names]
      onSelectColor(color, name)
      updatedNames[colorBlock] = name
      return { names: updatedNames }
    })
  }
}

export default ColorsTab
