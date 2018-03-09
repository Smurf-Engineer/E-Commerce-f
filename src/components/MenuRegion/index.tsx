/**
 * MenuRegion Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { regionsQuery } from './data'
import Popover from 'antd/lib/popover'
import Menu from './Menu'
import caFlag from '../../assets/CA.svg'
import euFlag from '../../assets/EU.svg'
import usFlag from '../../assets/US.svg'
import {
  QueryProps,
  RegionConfig,
  Region as RegionType,
  Currency
} from '../../types/common'
import { Container, TopText, Regions, overStyle } from './styledComponents'

interface Data extends QueryProps {
  regionsResult: RegionType[]
}

interface Props {
  data: Data
  onChangeLocation: (payload: RegionConfig) => void
  currentRegion: number
  currentLanguage: number
  currentCurrency: number
}

interface State {
  currentRegionTemp: number | null
  currentLanguageTemp: number | null
  currentCurrencyTemp: number | null
}

let regionList = [] as RegionType[]

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
      currentCurrency
    } = this.props
    const region =
      regionList[currentRegionTemp !== null ? currentRegionTemp : currentRegion]
    const locale =
      region.languages[
        currentLanguageTemp !== null ? currentLanguageTemp : currentLanguage
      ].shortName
    onChangeLocation({
      locale,
      region: currentRegionTemp !== null ? currentRegionTemp : currentRegion,
      localeIndex:
        currentLanguageTemp !== null ? currentLanguageTemp : currentLanguage,
      currency:
        currentCurrencyTemp !== null ? currentCurrencyTemp : currentCurrency
    })
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

    if (!loading && regionsResult) {
      regionList = regionsResult
      region = regionList[currentRegion || 0]
      currency = region.currencies[currentCurrency || 0]
    }

    return (
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        onVisibleChange={this.handleOnVisibleChange}
        content={
          <Menu
            regions={regionList}
            currentRegion={
              currentRegionTemp !== null ? currentRegionTemp : currentRegion
            }
            currentLanguage={
              currentLanguageTemp !== null
                ? currentLanguageTemp
                : currentLanguage
            }
            currentCurrency={
              currentCurrencyTemp !== null
                ? currentCurrencyTemp
                : currentCurrency
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
            {loading || error ? null : currency.shortName.toUpperCase()}
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
