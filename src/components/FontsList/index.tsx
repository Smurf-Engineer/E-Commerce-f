/**
 * FontsList Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import get from 'lodash/get'
import messages from './messages'
import Input from 'antd/lib/input'
import includes from 'lodash/includes'
import find from 'lodash/find'
import GoogleFontLoader from 'react-google-font-loader'
import { Waypoint } from 'react-waypoint'
import * as thunkActions from './thunkActions'
import { Font, Message } from '../../types/common'
import { Container, Text, Item, ScrollView } from './styledComponents'
import { getFonts, addNewFont } from './data'
import Spin from 'antd/lib/spin'

interface Props {
  fontsData: any
  fonts: string[]
  googleList: boolean
  visibleFonts: string[]
  searchText: string
  onSelectFont?: (font: string) => void
  setGoogleFontsList: (data: any) => void
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  selectFont: (font: string) => void
  installFont: (variables: {}) => void
  formatMessage: (messageDescriptor: Message) => string
  getGoogleFonts: (formatMessage: any) => any
}

const Search = Input.Search

class FontsList extends React.PureComponent<Props> {
  async componentDidMount() {
    const {
      googleList,
      setGoogleFontsList,
      formatMessage,
      getGoogleFonts
    } = this.props
    if (googleList) {

      setTimeout(
        async () => {
          const list = await getGoogleFonts(formatMessage)
          if (list) {
            setGoogleFontsList(list)
          }
        },
        200
      )
    }
  }
  installFont = (font: string) => async () => {
    const { installFont, fontsData } = this.props
    await installFont({
      variables: { font }
    })
    fontsData.refetch()
  }
  loadFont = (font: string) => () => {
    const { addFont, visibleFonts } = this.props
    if (!find(visibleFonts, { font: font })) {
      addFont(font)
    }
  }
  selectFont = (font: string) => () => {
    const { selectFont } = this.props
    selectFont(font)
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
      formatMessage,
      fonts
    } = this.props
    let list
    const fontList: Font[] = get(fontsData, 'fonts', [])
    let installedFonts: any = []

    const activeFonts = fontList.reduce<string[]>(
      (fontObject, { active, family }) => {
        if (active) {
          fontObject.push(family)
        }
        return fontObject
      },
      []
    )

    if (!googleList) {
      installedFonts = fontList.reduce<{font: string}[]>(
        (fontObject, { active, family }) => {
          if (active) {
            fontObject.push({ font: family })
          }
          return fontObject
        },
        []
      )
      fontList.map((font: Font) => {
        if (font.active) {
          installedFonts.push({ font: font.family })
        }
      })
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
              onClick={this.installFont(font.family)}
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
      list = fonts.map((font: string, index: number) => {
        const active = includes(activeFonts, font)
        if (
          !searchText.length ||
          (searchText.length &&
            font.toLowerCase().search(searchText.toLowerCase()) !== -1)
        ) {
          return (
            <Waypoint key={index} onEnter={this.loadFont(font)}>
              <Item
                onClick={this.installFont(font)}
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

const FontsListEnhance = compose(
  addNewFont,
  getFonts,
  connect(
    null,
    {
      ...thunkActions
    }
  )
)(FontsList)
export default FontsListEnhance
