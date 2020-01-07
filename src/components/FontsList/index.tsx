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
import { Font, Message, SelectedFonts, QueryProps } from '../../types/common'
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
    const { addFont, visibleFonts } = this.props
    if (!find(visibleFonts, { font: font })) {
      addFont(font)
    }
  }
  handleOnUpdateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: text } = e.target
    const { onUpdateSearchText } = this.props
    onUpdateSearchText(text)
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
    let list
    const savedFonts: Font[] = get(fontsData, 'fonts', [])
    let installedFonts: any = []

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

    if (!googleList) {
      installedFonts = fontList.reduce<{ font: string }[]>(
        (fontObject, { active, family }) => {
          if (active) {
            fontObject.push({ font: family })
          }
          return fontObject
        },
        []
      )
      list = fontList.map((font: Font, index: number) => {
        if (
          font.active &&
          (!searchText.length ||
            (searchText.length &&
              font.family.toLowerCase().search(searchText.toLowerCase()) !==
                -1))
        ) {
          return (
            <Item
              key={index}
              onClick={this.changeFont(font.family, false)}
              className={'active'}
            >
              <Text className={'white'} font={font.family}>
                {font.family}
              </Text>
            </Item>
          )
        }
        return
      })
    } else {
      list =
        fonts &&
        fonts.map((font: string, index: number) => {
          const active = fontsSelected[font]
          if (
            !searchText.length ||
            (searchText.length &&
              font.toLowerCase().search(searchText.toLowerCase()) !== -1)
          ) {
            return (
              <Waypoint key={index} onEnter={this.loadFont(font)}>
                <Item
                  onClick={this.changeFont(font, true)}
                  className={active ? 'active' : ''}
                >
                  <Text className={active ? 'white' : ''} font={font}>
                    {font}
                  </Text>
                </Item>
              </Waypoint>
            )
          }
          return
        })
    }
    return (
      <Container>
        {googleList && !fonts.length ? (
          <Spin />
        ) : (
          <div>
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
          </div>
        )}
      </Container>
    )
  }
}

export default FontsList
