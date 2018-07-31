/**
 * ColorsTab Component - Created by miguelcanobbio on 31/07/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, ColorButtons } from './styledComponents'
import ColorButton from '../../../screens/DesignerTool/DesignCenterCustomize/ColorButton'

interface Props {
  colors: string[]
  formatMessage: (messageDescriptor: any) => string
}

const colorsBlocks = ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5']

const ColorsTab = ({ colors, formatMessage }: Props) => {
  const colorButtons = colorsBlocks.map((label, index) => (
    <ColorButton
      {...{ index }}
      key={index}
      label={label}
      onSelectColorBlock={() => {}}
      currentColor={colors[index]}
    />
  ))
  return (
    <Container>
      <ColorButtons onClick={() => console.log('ecole')}>
        {colorButtons}
      </ColorButtons>
    </Container>
  )
}

export default ColorsTab
