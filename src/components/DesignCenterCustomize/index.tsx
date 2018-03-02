/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Tabs from './Tabs'
import Render3D from './Render3D'
import { Palette } from '../../types/common'
import { Container, Text } from './styledComponents'

interface Props {
  colorBlock: number
  paletteName: string
  palettes: Palette[]
  colors: string[]
  loadingModel: boolean
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectPalette: (colors: string[]) => void
  onChangePaletteName: (name: string) => void
  onSetPalettes: (palettes: Palette[]) => void
  onLoadModel: (loading: boolean) => void
}

const DesignCenterCustomize = ({
  onSelectColorBlock,
  colorBlock,
  onSelectColor,
  onSelectPalette,
  onChangePaletteName,
  paletteName,
  palettes,
  onSetPalettes,
  colors,
  loadingModel,
  onLoadModel
}: Props) => {
  return (
    <Container>
      <Tabs
        {...{
          palettes,
          colorBlock,
          onSelectColorBlock,
          onSelectColor,
          colors,
          onSelectPalette,
          onChangePaletteName,
          paletteName,
          onSetPalettes
        }}
      />
      <Render3D {...{ colors, onLoadModel, loadingModel }} />
    </Container>
  )
}

export default DesignCenterCustomize
