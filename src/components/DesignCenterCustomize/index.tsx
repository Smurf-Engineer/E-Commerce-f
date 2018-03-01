/**
 * DesignCenterCustomize Component - Created by david on 26/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import Tabs from './Tabs'
import Render3D from './Render3D'
import { Container, Text } from './styledComponents'

interface Props {
  onSelectColorBlock: (index: number) => void
  onSelectColor: (color: string) => void
  onSelectPalette: (colors: string[]) => void
  colorBlock: number
  colors: string[]
}

const DesignCenterCustomize = ({
  onSelectColorBlock,
  colorBlock,
  onSelectColor,
  onSelectPalette,
  colors
}: Props) => {
  return (
    <Container>
      <Tabs
        {...{
          colorBlock,
          onSelectColorBlock,
          onSelectColor,
          colors,
          onSelectPalette
        }}
      />
      <Render3D {...{ colors }} />
    </Container>
  )
}

export default DesignCenterCustomize
