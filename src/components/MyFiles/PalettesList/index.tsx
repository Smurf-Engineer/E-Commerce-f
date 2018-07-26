/**
 * PalettesList Component - Created by miguelcanobbio on 25/07/18.
 */
import * as React from 'react'
import messages from './messages'
import {
  Container,
  WrapperPalette,
  EmptyContainer,
  EmptyMessage
} from './styledComponents'
import PaletteCard from '../../PaletteCard'
import { Palette } from '../../../types/common'

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
      <EmptyContainer>
        <EmptyMessage>{formatMessage(messages.emptyPalettes)}</EmptyMessage>
      </EmptyContainer>
    )
  }
  return <Container>{list}</Container>
}

export default PalettesList
