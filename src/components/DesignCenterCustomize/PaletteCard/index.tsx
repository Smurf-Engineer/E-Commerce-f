/**
 * PaletteCard Component - Created by david on 28/02/18.
 */
import * as React from 'react'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import ColorButton from '../ColorButton'
import {
  Container,
  ColorButtons,
  Name,
  Row,
  Delete,
  TopRow,
  DeleteLabel,
  buttonStyle
} from './styledComponents'

interface Props {
  id: number
  colors: string[]
  name: string
  onSelectPalette: (colors: string[]) => void
  onClickDelete: (index: number) => void
}

const colorsBlocks = ['Color 1', 'Color 2', 'Color 3', 'Color 4', 'Color 5']

const PaletteCard = ({
  id,
  name,
  colors,
  onSelectPalette,
  onClickDelete
}: Props) => {
  const handleOnSelectPalette = () => onSelectPalette(colors)
  const handleOnClickDelete = () => onClickDelete(id)
  const colorButtons = colorsBlocks.map((label, index) => (
    <ColorButton
      key={index}
      {...{ index, label }}
      onSelectColorBlock={() => {}}
      currentColor={colors[index]}
    />
  ))
  return (
    <Container>
      <Row>
        <TopRow>
          <Name>{name}</Name>
          <Delete onClick={handleOnClickDelete}>
            <DeleteLabel>-</DeleteLabel>
          </Delete>
        </TopRow>
        <Button
          onClick={handleOnSelectPalette}
          style={buttonStyle}
          type="primary"
        >
          Apply
        </Button>
      </Row>
      <ColorButtons>{colorButtons}</ColorButtons>
      <Divider />
    </Container>
  )
}

export default PaletteCard
