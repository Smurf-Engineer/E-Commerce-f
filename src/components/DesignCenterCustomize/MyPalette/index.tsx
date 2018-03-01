/**
 * MyPalette Component - Created by david on 28/02/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import PaletteCard from '../PaletteCard'
import messages from './messages'
import {
  Container,
  Text,
  Button,
  Input,
  Padding,
  Divider
} from './styledComponents'

interface Props {
  onSelectPalette: (colors: string[]) => void
}

const colors = ['#FFFFFF', '#BEBEBE', '#EA7444', '#F7CB4B', '#F46B3A']

const MyPalette = ({ onSelectPalette }: Props) => {
  return (
    <Container>
      <Padding>
        <Input placeholder="Name Palette" addonAfter={<Button>Save</Button>} />
      </Padding>
      <Divider />
      <PaletteCard name="Tigers" {...{ colors, onSelectPalette }} />
    </Container>
  )
}

export default MyPalette
