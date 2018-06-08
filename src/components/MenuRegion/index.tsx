/**
 * MenuRegion Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import findIndex from 'lodash/findIndex'
import Modal from 'antd/lib/modal'
import { regionsQuery } from './data'
import Popover from 'antd/lib/popover'
import Menu from './Menu'
import {
  QueryProps,
  RegionConfig,
  Region as RegionType,
  Currency
} from '../../types/common'
import { TopText, Regions, overStyle } from './styledComponents'

interface Data extends QueryProps {
  regionsResult: RegionType[]
}

interface Props {
  data: Data
  onChangeLocation: (payload: RegionConfig) => void
  currentRegion: string
  currentLanguage: string
  currentCurrency: string
  isMobile?: boolean
}

interface State {
  currentRegionTemp: number | null
  currentLanguageTemp: number | null
  currentCurrencyTemp: number | null
  openModal: boolean
}

export class MenuRegion extends React.PureComponent<Props, State> {
  static defaultProps: Data

  state = {
    currentRegionTemp: null,
    currentLanguageTemp: null,
    currentCurrencyTemp: null,
    openModal: false
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
    const index = findIndex(list, item => item[key] === param)

    if (index >= 0) {
      return index
    }

    return 0
  }

  handleOnClickConfirm = () => {
    const {
      currentRegionTemp,
      currentLanguageTemp,
      currentCurrencyTemp
    } = this.state

    const {
      currentRegion,
      currentLanguage,
      currentCurrency,
      data: { regionsResult }
    } = this.props

    const regionIndex = this.getCurrentIndex(
      regionsResult,
      currentRegion,
      'code'
    )
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
    const url = `/${regionCode}?lang=${langCode}&currency=${currencyCode}`

    window.location.replace(url)
  }

  handleOnVisibleChange = (visible: boolean) => {
    if (!visible) {
      this.setState({
        currentRegionTemp: null,
        currentLanguageTemp: null,
        currentCurrencyTemp: null
      })
    }
  }

  render() {
    const {
      currentRegionTemp,
      currentLanguageTemp,
      currentCurrencyTemp,
      openModal
    } = this.state
    const {
      currentRegion,
      currentLanguage,
      currentCurrency,
      isMobile,
      data: { regionsResult, loading, error }
    } = this.props

    let region = {} as RegionType
    let currency = {} as Currency
    let regionIndex = 0
    let languageIndex = 0
    let currencyIndex = 0

    if (!loading && regionsResult) {
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
      currency = region.currencies[currencyIndex] || {}
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
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        onVisibleChange={this.handleOnVisibleChange}
        content={innerContent}
      >
        <Regions>
          <img src={region.icon} />
          <TopText>
            {loading || error || !currency.shortName
              ? null
              : currency.shortName.toUpperCase()}
          </TopText>
        </Regions>
      </Popover>
    ) : (
      <div>
        <Regions onClick={this.handleModalClick}>
          <img src={region.icon} />
          <TopText>
            {loading || error || !currency.shortName
              ? null
              : currency.shortName.toUpperCase()}
          </TopText>
        </Regions>
        <Modal
          visible={openModal}
          footer={null}
          closable={false}
          maskClosable={true}
          destroyOnClose={true}
          width={'80%'}
        >
          {innerContent}
        </Modal>
      </div>
    )
  }
}

const regionEnhance = compose(
  graphql<Data>(regionsQuery, {
    options: () => ({
      fetchPolicy: 'network-only',
      variables: {}
    })
  })
)(MenuRegion)
export default regionEnhance
