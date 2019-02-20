/**
 * FontsList Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import get from 'lodash/get'
import GoogleFontLoader from 'react-google-font-loader'
import { Font } from '../../types/common'
import { Container, Text, Item, FontName } from './styledComponents'
import { getFonts } from './data'
import config from '../../config/index'

/* const fonts = [
  'Advent Pro',
  'Alfa Slab One',
  'Archivo Black',
  'Bangers',
  'Baumans',
  'Black Ops One',
  'Ceviche One',
  'Clicker Script',
  'Creepster',
  'Dancing Script',
  'Fontdiner Swanky',
  'Goudy Bookletter 1911',
  'Great Vibes',
  'Luckiest Guy',
  'Maven Pro',
  'Metal Mania',
  'Oswald',
  'Pacifico',
  'Permanent Marker',
  'Pinyon Script',
  'Racing Sans One',
  'Rancho',
  'Righteous',
  'Rock Salt',
  'Russo One',
  'Sanchez',
  'Satisfy',
  'Slackey',
  'Stardos Stencil',
  'UnifrakturMaguntia',
  'Yellowtail',
  'Yesteryear'
] */

interface Props {
  text: string
  fontsData: any
  onSelectFont?: (font: string) => void
}

class FontsList extends React.PureComponent<Props> {
  componentDidMount() {
    this.getGoogleFonts()
  }
  getGoogleFonts = async () => {
    const response = await fetch(
      `${config.googleFontsUrl}key=${config.googleFontsKey}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    )
    const responseJson = await response.json()
    console.log(responseJson)
  }
  render() {
    const { text, fontsData } = this.props
    const fontList = get(fontsData, 'fonts', [])
    const fonts: any = []
    fontList.map((font: Font) => fonts.push({ font: font.family }))
    const list = fontList.map((font: any, index: number) => (
      <Item key={index}>
        <Text font={font.family}>{text}</Text>
        {console.log(font)}
        <FontName>{font.family}</FontName>
      </Item>
    ))
    return (
      <Container>
        {fonts.length && <GoogleFontLoader {...{ fonts }} />}
        {list}
      </Container>
    )
  }
}

const FontsListEnhance = compose(getFonts)(FontsList)
export default FontsListEnhance
