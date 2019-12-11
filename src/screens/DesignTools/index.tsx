/**
 * DesignTools Screen - Created by Jesús Apodaca on 04/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import { injectIntl, InjectedIntl } from 'react-intl'
import message from 'antd/lib/message'
import * as publishingToolActions from './actions'
import * as designToolApi from './api'
import * as thunkActions from './thunkActions'
import { getFonts, getColorsQuery, saveDesignConfigMutation } from './data'
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
import { History } from 'history'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
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
  history: History
  hiddenSymbols: { [id: string]: boolean }
  selectedFonts: { [id: string]: boolean }
  saveDesignConfig: (variables: {}) => Promise<any>
  setUploadingAction: (isLoading: boolean) => void
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
  saveSettings = async () => {
    const {
      colors,
      stitchingColors,
      symbols,
      fontsData,
      hiddenSymbols,
      saveDesignConfig,
      selectedFonts,
      history,
      setUploadingAction
    } = this.props
    try {
      const savedFonts: Font[] = get(fontsData, 'fonts', [])

      // Check if the added symbols by the user are not in the hidden list
      const symbolsToAdd = symbols.reduce((arr: ClipArt[], symbol) => {
        if (hiddenSymbols[symbol.id]) {
          delete hiddenSymbols[symbol.id]
        } else {
          arr.push(symbol)
        }
        return arr
        // tslint:disable-next-line: align
      }, [])

      // Check and separate the fonts updates
      // Note: This is to have a separated list for the updates and then a list for the to-add
      const fontsToUpdate = savedFonts.reduce((arr: Font[], font) => {
        if (font.family in selectedFonts) {
          font.active = selectedFonts[font.family]
          arr.push(font)
          delete selectedFonts[font.family]
        }
        return arr
        // tslint:disable-next-line: align
      }, [])

      // Create the to-add fonts list
      const fontsToAdd = Object.keys(selectedFonts).map(
        (key: string, id: number) => ({
          active: selectedFonts[key],
          family: key,
          id
        })
      )

      // Create the hidden symbols list
      const symbolsToHide = Object.keys(hiddenSymbols)

      setUploadingAction(true)
      const response = await saveDesignConfig({
        variables: {
          colors,
          stitchingColors,
          symbolsToHide,
          symbolsToAdd,
          fontsToUpdate,
          fontsToAdd
        }
      })
      message.success(get(response, 'data.saveDesignConfig.message', ''))
      history.push('/admin')
    } catch (error) {
      setUploadingAction(false)
      message.error('DAYUUUM')
    }
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
  graphql(saveDesignConfigMutation, { name: 'saveDesignConfig' }),
  graphql(getFonts, { name: 'fontsData' }),
  connect(mapStateToProps, {
    ...publishingToolActions,
    ...designToolApi,
    ...thunkActions
  })
)(DesignTools)

export default DesignToolsEnhance
