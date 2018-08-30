/**
 * PalettesList Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  WrapperPalette,
} from './styledComponents'
import PaletteCard from '../../PaletteCard'
import { Palette } from '../../../types/common'
import EmptyContainer from '../../EmptyContainer'

interface Props {
  palettes: Palette[]
  formatMessage: (messageDescriptor: any) => string
  onClickDelete: (index: number) => void
}

const PalettesList = ({ palettes, formatMessage, onClickDelete }: Props) => {
  const list = palettes.map(({ name, colors }, index) => (
    <WrapperPalette key={index}>
      <PaletteCard
        id={index}
        myFilesList={true}
        {...{ name, colors, formatMessage, onClickDelete }}
      />
    </WrapperPalette>
  ))
  if (!palettes.length) {
    return (
      <EmptyContainer message={formatMessage(messages.emptyPalettes)} />
    )
  }
  return <Container>{list}</Container>
}

export default PalettesList
