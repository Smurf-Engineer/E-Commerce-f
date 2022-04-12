/**
 * MenuRegion Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import Popover from 'antd/lib/popover'
import Menu from './Menu'
import {
  RegionConfig,
  Region as RegionType
} from '../../types/common'
import * as thunkActions from './thunkActions'
import currencySound from '../../assets/lock.wav'
import { Regions, overStyle } from './styledComponents'

interface Props {
  regionsResult: RegionType[]
  onChangeLocation: (payload: RegionConfig) => void
  saveRegion: (regionObject: RegionConfig) => void
  currentRegion?: string
  currentLanguage?: string
  currentCurrency?: string
  isMobile?: boolean
  darkMode?: boolean
}

interface State {
  currentRegionTemp: number | null
  currentLanguageTemp: number | null
  currentCurrencyTemp: number | null
  openModal: boolean
  visiblePopover: boolean
}

export class MenuRegion extends React.PureComponent<Props, State> {
  state = {
    currentRegionTemp: null,
    currentLanguageTemp: null,
    currentCurrencyTemp: null,
    openModal: false,
    visiblePopover: false
  }

  handleOnSelectRegion = ({ key }: any) =>
    this.setState({
      // tslint:disable-next-line:radix
      currentRegionTemp: parseInt(key),
      currentLanguageTemp: 0,
      currentCurrencyTemp: 0
    })

  handleOnSelectLanguage = (currentLanguageTemp: number) => {
    this.setState({ currentLanguageTemp })
  }

  handleOnSelectCurrency = (currentCurrencyTemp: number) => {
    this.setState({ currentCurrencyTemp })
  }

  handleModalClick = () => {
    const { openModal } = this.state
    this.setState({ openModal: !openModal })
  }

  getCurrentIndex = (list: any[], param: string, key: string): number => {
    const index = findIndex(list, (item) => item[key] === param)

    if (index >= 0) {
      return index
    }

    return 0
  }

  handleOnClickConfirm = async () => {
    const {
      currentRegionTemp,
      currentLanguageTemp,
      currentCurrencyTemp
    } = this.state

    const {
      currentRegion = '',
      currentLanguage = '',
      currentCurrency = '',
      regionsResult
    } = this.props

    const regionIndex =
      !!currentRegion &&
      this.getCurrentIndex(regionsResult, currentRegion, 'code')
    const region =
      regionsResult[
        currentRegionTemp !== null ? currentRegionTemp : regionIndex
      ] || {}

    const languageIndex = this.getCurrentIndex(
      region.languages,
      currentLanguage,
      'shortName'
    )

    const language =
      region.languages[
        currentLanguageTemp !== null ? currentLanguageTemp : languageIndex
      ] || {}

    const currencyIndex = this.getCurrentIndex(
      region.currencies,
      currentCurrency,
      'abbreviation'
    )
    const currency =
      region.currencies[
        currentCurrencyTemp !== null ? currentCurrencyTemp : currencyIndex
      ] || {}

    const { code: regionCode } = region
    const { shortName: langCode } = language
    const { abbreviation: currencyCode } = currency
    const { saveRegion } = this.props
    const regionObject = {
      region: regionCode,
      localeIndex: languageIndex,
      locale: langCode,
      currency: currencyCode
    }
    this.setState({ visiblePopover: false, openModal: false })
    message.success('Currency updated!')
    const snd = new Audio(currencySound)
    snd.play()
    snd.remove()
    await saveRegion(regionObject)
  }

  handleOnVisibleChange = (visible: boolean) => {
    if (!visible) {
      this.setState({
        currentRegionTemp: null,
        currentLanguageTemp: null,
        currentCurrencyTemp: null
      })
    }
    this.setState({ visiblePopover: visible })
  }

  render() {
    const {
      currentRegionTemp,
      currentLanguageTemp,
      currentCurrencyTemp,
      openModal,
      visiblePopover
    } = this.state
    const {
      currentRegion = '',
      currentLanguage = '',
      currentCurrency = '',
      isMobile,
      regionsResult = []
    } = this.props

    let region = {} as RegionType
    // let currency = {} as Currency
    let regionIndex = 0
    let languageIndex = 0
    let currencyIndex = 0

    if (regionsResult && regionsResult.length) {
      regionIndex = this.getCurrentIndex(regionsResult, currentRegion, 'code')
      region = regionsResult[regionIndex] || {}

      languageIndex = this.getCurrentIndex(
        region.languages,
        currentLanguage,
        'shortName'
      )

      currencyIndex = this.getCurrentIndex(
        region.currencies,
        currentCurrency,
        'abbreviation'
      )
      // currency = region.currencies[currencyIndex] || {}
    }

    const innerContent = (
      <Menu
        regions={regionsResult}
        currentRegion={
          currentRegionTemp !== null ? currentRegionTemp : regionIndex
        }
        currentLanguage={
          currentLanguageTemp !== null ? currentLanguageTemp : languageIndex
        }
        currentCurrency={
          currentCurrencyTemp !== null ? currentCurrencyTemp : currencyIndex
        }
        onSelectRegion={this.handleOnSelectRegion}
        onSelectLanguage={this.handleOnSelectLanguage}
        onSelectCurrency={this.handleOnSelectCurrency}
        onClickConfirm={this.handleOnClickConfirm}
      />
    )

    return !isMobile ? (
      <Popover
        visible={visiblePopover}
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        onVisibleChange={this.handleOnVisibleChange}
        content={innerContent}
      >
        <Regions>
          <img src={region.icon} />
          {/* <TopText {...{darkMode}}>
            {!currency.shortName ? null : currency.shortName.toUpperCase()}
          </TopText> */}
        </Regions>
      </Popover>
    ) : (
      <div>
        <Regions onClick={this.handleModalClick}>
          <img src={region.icon} />
          {/* <TopText {...{darkMode}}>
            {!currency.shortName ? null : currency.shortName.toUpperCase()}
          </TopText> */}
        </Regions>
        <Modal
          visible={openModal}
          footer={null}
          closable={false}
          maskClosable={true}
          onCancel={this.handleModalClick}
          width={'80%'}
        >
          {innerContent}
        </Modal>
      </div>
    )
  }
}

const MenuRegionEnhance = compose(
  connect(
    null,
    { ...thunkActions }
  )
)(MenuRegion)

export default MenuRegionEnhance
