/**
 * MyPalette Component - Created by david on 28/02/18.
 */
import * as React from 'react'
import { List } from 'immutable'

import PaletteCard from '../PaletteCard'

import { Palette } from '../../../types/common'
import {
  Container,
  Button,
  Input,
  Padding,
  Divider,
  ListContainer,
  InputWrapper
} from './styledComponents'

interface Props {
  palettes: Palette[]
  paletteName: string
  colors: string[]
  onSelectPalette: (colors: string[]) => void
  onSetPalettes: (palettes: Palette[]) => void
  onChangePaletteName: (name: string) => void
}

class MyPalette extends React.PureComponent<Props> {
  componentWillMount() {
    const { onSetPalettes } = this.props
    let palettes: Palette[] = []
    if (typeof window !== 'undefined') {
      const palettesJson = localStorage.getItem('palettes')
      if (palettesJson) {
        palettes = JSON.parse(palettesJson)
      }
    }
    onSetPalettes(palettes)
  }

  updatePaletteName = (event: React.FormEvent<HTMLInputElement>) => {
    const { onChangePaletteName } = this.props
    const { currentTarget: { value } } = event
    onChangePaletteName(value)
  }

  onSavePalette = () => {
    const {
      onSetPalettes,
      paletteName,
      onChangePaletteName,
      colors
    } = this.props
    const palettesTest: Palette = {
      name: paletteName,
      colors
    }
    if (typeof window !== 'undefined') {
      const palettesJson = localStorage.getItem('palettes')
      let myPalettes: Palette[] = []
      if (palettesJson) {
        myPalettes = JSON.parse(palettesJson)
        myPalettes.push(palettesTest)
      } else {
        myPalettes.push(palettesTest)
      }
      localStorage.setItem('palettes', JSON.stringify(myPalettes))
      onSetPalettes(myPalettes)
      onChangePaletteName('')
    }
  }

  onDeletePalette = (index: number) => {
    const { onSetPalettes } = this.props
    if (typeof window !== 'undefined') {
      const palettesJson = localStorage.getItem('palettes')
      if (palettesJson) {
        const myPalettes = JSON.parse(palettesJson)
        const listOfPalettes = List.of(...myPalettes)
        const updatedList = listOfPalettes.remove(index)
        const updatedPalettes = updatedList.toJS()
        localStorage.setItem('palettes', JSON.stringify(updatedPalettes))
        onSetPalettes(updatedPalettes)
      }
    }
  }

  render() {
    const { onSelectPalette, palettes, paletteName } = this.props
    const paletteList = palettes.map(({ name, colors }, id) => (
      <PaletteCard
        key={id}
        onClickDelete={this.onDeletePalette}
        {...{ id, name, colors, onSelectPalette }}
      />
    ))
    return (
      <Container>
        <Padding>
          <InputWrapper>
            <Input
              value={paletteName}
              onChange={this.updatePaletteName}
              placeholder="Name Palette"
              addonAfter={<Button onClick={this.onSavePalette}>Save</Button>}
            />
          </InputWrapper>
        </Padding>
        <Divider />
        <ListContainer>{paletteList}</ListContainer>
      </Container>
    )
  }
}

export default MyPalette
