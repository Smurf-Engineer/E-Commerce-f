/**
 * DesignTools Screen - Created by Jesús Apodaca on 04/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as publishingToolActions from './actions'
import * as designToolApi from './api'
import * as thunkActions from './thunkActions'
import { getFonts, getColorsQuery } from './data'
import messages from './messages'
import { connect } from 'react-redux'
import { compose, withApollo, graphql } from 'react-apollo'
import {
  Container,
  Header,
  Logo,
  Title,
  BackIcon,
  BackButton,
  Back,
  TopMenu,
  Layout,
  SaveContainer,
  SaveButton
} from './styledComponents'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Tabs from './Tabs'
import {
  ModelDesign,
  SelectedAsset,
  CanvasType,
  TextFormat,
  CanvasElement,
  Color,
  UploadFile,
  ClipArt,
  Font
} from '../../types/common'
import get from 'lodash/get'

interface Props {
  intl: InjectedIntl
  colors: Color[]
  fonts: string[]
  symbols: ClipArt[]
  visibleFonts: any[]
  searchText: string
  colorsList: any
  fontsData: any
  stitchingColors: Color[]
  uploadingColors: boolean
  uploadingStitchingColors: boolean
  uploadingSymbol: boolean
  searchClipParam: string
  styleColors: string[]
  installedFonts: any
  selectedTab: number
  hiddenSymbols: { [id: string]: boolean }
  selectedFonts: { [id: string]: boolean }
  changeFont: (font: string, active: boolean) => void
  setColorList: (listType: string, colors: string[]) => void
  setGoogleFontsList: (data: any) => void
  formatMessage: (messageDescriptor: any) => string
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  onUploadColorsList: (file: any, type: string) => void
  onUploadFile: (file: UploadFile) => void
  addSymbolAction: (url: string) => void
  hideSymbol: (id: string) => void
  setSearchClipParamAction: (param: string) => void
  getGoogleFonts: () => void
  onTabClick: (selectedIndex: number) => void
}
export class DesignTools extends React.Component<Props, {}> {
  handleOnPressBack = () => {
    window.location.replace('/admin')
  }
  saveSettings = () => {
    const {
      colors,
      stitchingColors,
      symbols,
      fontsData,
      hiddenSymbols,
      selectedFonts
    } = this.props
    const savedFonts: Font[] = get(fontsData, 'fonts', [])
    const symbolsToAdd = symbols.reduce((arr: ClipArt[], symbol) => {
      if (!hiddenSymbols[symbol.id]) {
        arr.push(symbol)
      } else {
        delete hiddenSymbols[symbol.id]
      }
      return arr
      // tslint:disable-next-line: align
    }, [])
  }
  render() {
    const {
      intl,
      colors,
      stitchingColors,
      setGoogleFontsList,
      fonts,
      fontsData,
      addFont,
      selectedFonts,
      changeFont,
      hiddenSymbols,
      hideSymbol,
      visibleFonts,
      onUpdateSearchText,
      searchText,
      onUploadColorsList,
      colorsList,
      uploadingColors,
      uploadingStitchingColors,
      onUploadFile,
      uploadingSymbol,
      searchClipParam,
      setSearchClipParamAction,
      getGoogleFonts,
      installedFonts,
      selectedTab,
      symbols,
      onTabClick
    } = this.props
    const { formatMessage } = intl

    return (
      <Container>
        <Helmet title={formatMessage(messages.title)} />
        <Header>
          <Logo src={logo} />
          <Title>{formatMessage(messages.title)}</Title>
        </Header>
        <TopMenu>
          <BackButton onClick={this.handleOnPressBack}>
            <BackIcon src={backIcon} />
            <Back>{formatMessage(messages.back)}</Back>
          </BackButton>
        </TopMenu>
        <Layout>
          <Tabs
            {...{
              colors,
              stitchingColors,
              formatMessage,
              setGoogleFontsList,
              fonts,
              addFont,
              fontsData,
              hideSymbol,
              symbols,
              visibleFonts,
              selectedFonts,
              changeFont,
              hiddenSymbols,
              onUpdateSearchText,
              searchText,
              onUploadColorsList,
              colorsList,
              uploadingColors,
              uploadingStitchingColors,
              onUploadFile,
              uploadingSymbol,
              searchClipParam,
              setSearchClipParamAction,
              getGoogleFonts,
              installedFonts,
              selectedTab,
              onTabClick
            }}
          />
          <SaveContainer>
            <SaveButton onClick={this.saveSettings}>
              {formatMessage(messages.update)}
            </SaveButton>
            <Logo src={logo} />
          </SaveContainer>
        </Layout>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => {
  const publishingTool = state.get('designTools').toJS()
  return {
    ...publishingTool
  }
}

const DesignToolsEnhance = compose(
  withApollo,
  injectIntl,
  graphql(getColorsQuery, { name: 'colorsList' }),
  graphql(getFonts, { name: 'fontsData' }),
  connect(mapStateToProps, {
    ...publishingToolActions,
    ...designToolApi,
    ...thunkActions
  })
)(DesignTools)

export default DesignToolsEnhance
