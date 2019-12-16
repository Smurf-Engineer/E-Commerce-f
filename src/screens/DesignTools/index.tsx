/**
 * DesignTools Screen - Created by Jesús Apodaca on 04/12/19.
 */
import * as React from 'react'
import Helmet from 'react-helmet'
import message from 'antd/lib/message'
import * as designToolApi from './api'
import * as thunkActions from './thunkActions'
import * as publishingToolActions from './actions'
import { injectIntl, InjectedIntl } from 'react-intl'
import { compose, withApollo, graphql } from 'react-apollo'
import { getFonts, getColorsQuery, saveDesignConfigMutation } from './data'
import messages from './messages'
import { connect } from 'react-redux'
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
  SaveButton,
  Loading
} from './styledComponents'
import { History } from 'history'
import logo from '../../assets/jakroo_logo.svg'
import backIcon from '../../assets/rightarrow.svg'
import Tabs from './Tabs'
import { Color, UploadFile, ClipArt, Font } from '../../types/common'
import get from 'lodash/get'
import Spin from 'antd/lib/spin'

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
  installedFonts: Font[]
  selectedTab: number
  history: History
  loading: boolean
  hiddenSymbols: { [id: string]: boolean }
  selectedFonts: { [id: string]: boolean }
  onResetReducer: () => void
  saveDesignConfig: (variables: {}) => Promise<any>
  setUploadingAction: (isLoading: boolean) => void
  changeFont: (font: string, active: boolean) => void
  setGoogleFontsList: (data: any) => void
  addFont: (font: string) => void
  onUpdateSearchText: (text: string) => void
  onUploadColorsList: (file: any, type: string) => void
  onUploadFile: (file: UploadFile) => void
  hideSymbol: (url: string, id: string) => void
  setSearchClipParamAction: (param: string) => void
  getGoogleFonts: () => void
  onTabClick: (selectedIndex: string) => void
}
export class DesignTools extends React.Component<Props, {}> {
  componentWillUnmount() {
    const { onResetReducer } = this.props
    onResetReducer()
  }
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
      setUploadingAction(true)
      const savedFonts: Font[] = get(fontsData, 'fonts', [])
      // Check if the added symbols by the user are not in the hidden list
      const symbolsToAdd = symbols.reduce((arr: String[], { id, url }) => {
        if (hiddenSymbols[id]) {
          delete hiddenSymbols[id]
        } else {
          arr.push(url)
        }
        return arr
        // tslint:disable-next-line: align
      }, [])

      // Check and separate the fonts updates
      // Note: This is to have a separated list for the updates and then a list for the to-add
      const fontsToUpdate = savedFonts.reduce((arr: Font[], { id, family }) => {
        if (family in selectedFonts) {
          arr.push({
            id,
            family,
            active: selectedFonts[family]
          })
          delete selectedFonts[family]
        }
        return arr
        // tslint:disable-next-line: align
      }, [])

      // Create the to-add fonts list only for those that are true
      const fontsToAdd = Object.keys(selectedFonts).filter(
        (key: string) => selectedFonts[key]
      )

      // Create the hidden symbols list
      const symbolsToHide = Object.keys(hiddenSymbols)
      const colorsObject = {
        colors: colors.length ? JSON.stringify(colors) : '',
        stitching: stitchingColors.length ? JSON.stringify(stitchingColors) : ''
      }
      const response = await saveDesignConfig({
        variables: {
          colors: colorsObject,
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
      message.error(error.message)
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
      loading,
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
        <Loading active={(colorsList && colorsList.loading) || loading}>
          <Spin size="large" />
        </Loading>
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
  graphql(getColorsQuery, {
    options: () => ({
      fetchPolicy: 'network-only'
    }),
    name: 'colorsList'
  }),
  graphql(getFonts, {
    options: () => ({
      fetchPolicy: 'network-only'
    }),
    name: 'fontsData'
  }),
  graphql(saveDesignConfigMutation, { name: 'saveDesignConfig' }),
  connect(mapStateToProps, {
    ...publishingToolActions,
    ...designToolApi,
    ...thunkActions
  })
)(DesignTools)

export default DesignToolsEnhance
