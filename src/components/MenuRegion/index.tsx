/**
 * MenuRegion Component - Created by david on 20/02/18.
 */
import * as React from 'react'
import Popover from 'antd/lib/popover'
import Menu from './Menu'
import caFlag from '../../assets/CA.svg'
import euFlag from '../../assets/EU.svg'
import usFlag from '../../assets/US.svg'
import { RegionConfig, Region as RegionType } from '../../types/common'
import { Container, TopText, Region, overStyle } from './styledComponents'

interface Props {
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

const regions: RegionType[] = [
  {
    icon: usFlag,
    label: 'global',
    languages: ['en', 'jpn'],
    currencies: ['$usd', '$aud', '¥jpy']
  },
  {
    icon: caFlag,
    label: 'canada',
    languages: ['en', 'fr'],
    currencies: ['$cad']
  },
  {
    icon: euFlag,
    label: 'europe',
    languages: ['en', 'de'],
    currencies: ['$eur', '₣CHF']
  }
]

class MenuRegion extends React.PureComponent<Props, State> {
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

  handleOnSelectLanguage = (currentLanguageTemp: number) =>
    this.setState({ currentLanguageTemp })

  handleOnSelectCurrency = (currentCurrencyTemp: number) =>
    this.setState({ currentCurrencyTemp })

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
      regions[currentRegionTemp !== null ? currentRegionTemp : currentRegion]
    const locale =
      region.languages[
        currentLanguageTemp !== null ? currentLanguageTemp : currentLanguage
      ]
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
    const { currentRegion, currentLanguage, currentCurrency } = this.props
    const region = regions[currentRegion || 0]
    const currency = region.currencies[currentCurrency || 0]
    return (
      <Popover
        overlayStyle={overStyle}
        trigger="hover"
        placement="bottom"
        onVisibleChange={this.handleOnVisibleChange}
        content={
          <Menu
            regions={regions}
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
        <Region>
          <img src={region.icon} />
          <TopText>{currency.toUpperCase()}</TopText>
        </Region>
      </Popover>
    )
  }
}

export default MenuRegion
