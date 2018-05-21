/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import Tabs from './Tabs'
import Render3D from './Render3D'
import { Palette } from '../../types/common'
import { Container } from './styledComponents'

interface Props {
  colorBlock: number
  colorBlockHovered: number
  paletteName: string
  palettes: Palette[]
  colors: string[]
  styleColors: string[]
  currentStyle: number
  loadingModel: boolean
  undoEnabled: boolean
  redoEnabled: boolean
  currentTab: number
  swipingView: boolean
  productName: string
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onLoadModel: (loading: boolean) => void
  onUndoAction: () => void
  onRedoAction: () => void
  onResetAction: () => void
  onClearAction: () => void
  onPressQuickView: () => void
  onOpenSaveDesign: (open: boolean, imageBase64: string) => void
  onHoverColorBlock: (index: number) => void
  formatMessage: (messageDescriptor: any) => string
}

const DesignCenterCustomize = ({
  onSelectColorBlock,
  colorBlock,
  colorBlockHovered,
  onSelectColor,
  onSelectPalette,
  onChangePaletteName,
  paletteName,
  palettes,
  onSetPalettes,
  currentTab,
  colors,
  styleColors,
  currentStyle,
  loadingModel,
  onLoadModel,
  onUndoAction,
  onRedoAction,
  onResetAction,
  onClearAction,
  onPressQuickView,
  undoEnabled,
  redoEnabled,
  swipingView,
  onOpenSaveDesign,
  onHoverColorBlock,
  formatMessage,
  productName
}: Props) => {
  return (
    <Container>
      <Tabs
        {...{
          palettes,
          colorBlock,
          colorBlockHovered,
          onSelectColorBlock,
          onHoverColorBlock,
          onSelectColor,
          colors,
          styleColors,
          onSelectPalette,
          onChangePaletteName,
          paletteName,
          onSetPalettes
        }}
      />
      {currentTab === 2 && !swipingView ? (
        <Render3D
          {...{
            colors,
            colorBlockHovered,
            styleColors,
            onLoadModel,
            loadingModel,
            onUndoAction,
            onRedoAction,
            onResetAction,
            onClearAction,
            onPressQuickView,
            undoEnabled,
            redoEnabled,
            onOpenSaveDesign,
            formatMessage,
            currentStyle,
            productName
          }}
        />
      ) : null}
    </Container>
  )
}

export default DesignCenterCustomize
