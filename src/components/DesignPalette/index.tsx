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
  SaveButton
} from './styledComponents'

interface Props {
  id: number
  colors: string[]
  image?: string
  name: string
  buttonLabel?: string
  loading?: boolean
  onSelectPalette: (id: number) => void
  onEditColorIdea: (id: number) => void
}

const PaletteCard = ({
  id,
  name,
  colors,
  onSelectPalette,
  buttonLabel,
  loading = false,
  image,
  onEditColorIdea
}: Props) => {
  const handleOnSelectPalette = () => onSelectPalette(id)
  const handleOnEditIdea = () => onEditColorIdea(id)
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
          <Buttons>
            <Button onClick={handleOnEditIdea}>EDIT</Button>
            <SaveButton disabled={loading} onClick={handleOnSelectPalette}>
              {buttonLabel}
            </SaveButton>
          </Buttons>
        </Info>
      </InfoContainer>
      <Divider />
    </Container>
  )
}

export default PaletteCard
