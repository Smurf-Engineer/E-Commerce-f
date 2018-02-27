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
  colorBlock: number
}

const DesignCenterCustomize = ({ onSelectColorBlock, colorBlock }: Props) => {
  return (
    <Container>
      <Tabs {...{ colorBlock, onSelectColorBlock }} />
      <Render3D />
    </Container>
  )
}

export default DesignCenterCustomize
