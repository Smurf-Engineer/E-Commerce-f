/**
 * MenuRegion Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import findIndex from 'lodash/findIndex'
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
}

interface State {
  currentRegionTemp: number | null
  currentLanguageTemp: number | null
  currentCurrencyTemp: number | null
}

export class MenuRegion extends React.PureComponent<Props, State> {
  static defaultProps: Data

  state = {
    currentRegionTemp: null,
    currentLanguageTemp: null,
    currentCurrencyTemp: null
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
      onChangeLocation,
      currentRegion,
      currentLanguage,
      currentCurrency,
      data: { regionsResult }
    } = this.props

    // TODO: Get params and construct the URL.
    // const locale =
    //   region.languages[
    //     currentLanguageTemp !== null ? currentLanguageTemp : currentLanguage
    //   ].shortName

    const regionIndex =
      currentRegionTemp !== null ? currentRegionTemp : currentRegion
    const localeIndex =
      currentLanguageTemp !== null ? currentLanguageTemp : currentLanguage
    const currencyIndex =
      currentCurrencyTemp !== null ? currentCurrencyTemp : currentCurrency

    window.location.replace('/Europe?lang=DE&currency=₣CHF')

    // onChangeLocation({
    //   locale,
    //   region: currentRegionTemp !== null ? currentRegionTemp : currentRegion,
    //   localeIndex:
    //     currentLanguageTemp !== null ? currentLanguageTemp : currentLanguage,
    //   currency:
    //     currentCurrencyTemp !== null ? currentCurrencyTemp : currentCurrency
    // })
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
      currentCurrencyTemp
    } = this.state
    const {
      currentRegion,
      currentLanguage,
      currentCurrency,
      data: { regionsResult, loading, error }
    } = this.props

    let region = {} as RegionType
    let currency = {} as Currency
    let regionIndex = 0
    let languageIndex = 0
    let currencyIndex = 0

    if (!loading && regionsResult) {
      regionIndex = this.getCurrentIndex(regionsResult, currentRegion, 'label')
      region = regionsResult[regionIndex] || {}

      languageIndex = this.getCurrentIndex(
        region.languages,
        currentLanguage,
        'shortName'
      )

      currencyIndex = this.getCurrentIndex(
        region.currencies,
        currentCurrency,
        'shortName'
      )
      currency = region.currencies[currencyIndex] || {}
    }

    return (
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        onVisibleChange={this.handleOnVisibleChange}
        content={
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
        }
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
