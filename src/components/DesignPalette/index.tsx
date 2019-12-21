/**
 * PaletteCard Component - Created by david on 28/02/18.
 */
import * as React from 'react'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import {
  Container,
  ColorButtons,
  Oval,
  Name,
  Info,
  Image,
  InfoContainer,
  Buttons,
  SaveButton,
  Delete,
  DeleteButton
} from './styledComponents'

interface Props {
  id: number
  inspirationId?: number
  colors: string[]
  image?: string
  name: string
  buttonLabel?: string
  loading?: boolean
  showDelete?: boolean
  onSelectPalette: (id: number) => void
  onEditColorIdea?: (id: number) => void
  onDeleteInspiration?: (id: number, index: number) => void
}

const PaletteCard = ({
  id,
  name,
  colors,
  onSelectPalette,
  buttonLabel,
  loading = false,
  image,
  onEditColorIdea,
  onDeleteInspiration,
  inspirationId = 0,
  showDelete = true
}: Props) => {
  const handleOnDelete = () => {
    if (onDeleteInspiration) {
      onDeleteInspiration(inspirationId, id)
    }
  }
  const handleOnSelectPalette = () => onSelectPalette(id)
  const handleOnEditIdea = () => {
    if (onEditColorIdea) {
      onEditColorIdea(id)
    }
  }
  const colorButtons = colors.map((color, index) => (
    <Oval key={index} currentColor={color} />
  ))
  return (
    <Container>
      <InfoContainer>
        <Image src={image} />
        <Info>
          <Name>{name}</Name>
          <ColorButtons>{colorButtons}</ColorButtons>
        </Info>
      </InfoContainer>
      <Buttons>
        <Button onClick={handleOnEditIdea}>EDIT</Button>
        <SaveButton disabled={loading} onClick={handleOnSelectPalette}>
          {buttonLabel}
        </SaveButton>
      </Buttons>
      <Divider />
      {showDelete && (
        <DeleteButton onClick={handleOnDelete}>
          <Delete type="delete" />
        </DeleteButton>
      )}
    </Container>
  )
}

export default PaletteCard
