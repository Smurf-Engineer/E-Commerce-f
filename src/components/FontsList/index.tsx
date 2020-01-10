/**
 * FontsList Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import get from 'lodash/get'
import messages from './messages'
import Input from 'antd/lib/input'
import find from 'lodash/find'
import GoogleFontLoader from 'react-google-font-loader'
import { Waypoint } from 'react-waypoint'
import {
  Font,
  Message,
  SelectedFonts,
  QueryProps,
  SelectedItem
} from '../../types/common'
import { Container, Text, Item, ScrollView } from './styledComponents'
import Spin from 'antd/lib/spin'

interface FontsData extends QueryProps {
  fonts: Font[]
}

interface Props {
  fontsData: FontsData
  fonts: string[]
  googleList: boolean
  visibleFonts: string[]
  searchText: string
  selectedFonts: SelectedFonts
  changeFont: (font: string, active: boolean) => void
  setGoogleFontsList: (data: any) => void
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  selectFont: (font: string) => void
  formatMessage: (messageDescriptor: Message) => string
  getGoogleFonts: () => void
}

const Search = Input.Search

class FontsList extends React.PureComponent<Props> {
  async componentDidMount() {
    const { googleList, getGoogleFonts } = this.props
    if (googleList) {
      setTimeout(async () => {
        await getGoogleFonts()
        // tslint:disable-next-line: align
      }, 200)
    }
  }
  changeFont = (font: string, active: boolean) => async () => {
    const { changeFont } = this.props
    changeFont(font, active)
  }
  loadFont = (font: string) => () => {
    const { addFont, visibleFonts, googleList } = this.props
    if (!find(visibleFonts, { font: font }) && googleList) {
      addFont(font)
    }
  }
  handleOnUpdateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: text } = e.target
    const { onUpdateSearchText } = this.props
    onUpdateSearchText(text)
  }
  getFontsList = (fontsSelected: SelectedItem, fontList: Font[]) => {
    const { googleList, searchText, fonts } = this.props
    const arrayFont = googleList ? fonts || [] : fontList
    const list = arrayFont.map((font: Font | string, index: number) => {
      const available = googleList ? fontsSelected[font] : font.active
      const fontFamily = googleList ? font : font.family
      const active = available || !googleList
      if (
        (available || googleList) &&
        (!searchText.length ||
          (searchText.length &&
            fontFamily.toLowerCase().search(searchText.toLowerCase()) !== -1))
      ) {
        return (
          <Waypoint key={index} onEnter={this.loadFont(fontFamily)}>
            <Item
              key={index}
              onClick={this.changeFont(fontFamily, googleList)}
              className={active ? 'active' : ''}
            >
              <Text className={active ? 'white' : ''} font={fontFamily}>
                {fontFamily}
              </Text>
            </Item>
          </Waypoint>
        )
      }
    })
    return list
  }

  render() {
    const {
      fontsData,
      googleList,
      visibleFonts,
      searchText,
      selectedFonts,
      formatMessage,
      fonts
    } = this.props
    const savedFonts: Font[] = get(fontsData, 'fonts', [])
    const objectFonts = savedFonts.reduce((fontObject, { active, family }) => {
      fontObject[family] = active
      return fontObject
      // tslint:disable-next-line: align
    }, {})

    const fontsSelected = { ...objectFonts, ...selectedFonts }

    const fontList = Object.keys(fontsSelected)
      .sort()
      .map((key: string) => ({
        active: fontsSelected[key],
        family: key
      }))
    const installedFonts = !googleList
      ? fontList.reduce<{ font: string }[]>(
          (fontObject, { active, family }) => {
            if (active) {
              fontObject.push({ font: family })
            }
            return fontObject
          },
          []
        )
      : []
    const list = this.getFontsList(fontsSelected, fontList)
    return (
      <Container>
        {googleList && !fonts.length ? (
          <Spin />
        ) : (
          <>
            <Search
              value={searchText}
              onChange={this.handleOnUpdateText}
              placeholder={formatMessage(messages.searchPlaceholder)}
            />
            <ScrollView>
              {installedFonts.length || visibleFonts.length ? (
                <GoogleFontLoader
                  fonts={googleList ? visibleFonts : installedFonts}
                />
              ) : null}
              {list}
            </ScrollView>
          </>
        )}
      </Container>
    )
  }
}

export default FontsList
