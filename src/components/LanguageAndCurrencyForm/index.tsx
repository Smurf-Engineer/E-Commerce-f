/**
 * LanguageAndCurrencyForm Component - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Icon from 'antd/lib/icon'
import Menu from 'antd/lib/menu'
import upperFirst from 'lodash/upperFirst'
import find from 'lodash/find'
import messages from './messages'
import {
  Container,
  Row,
  Column,
  InputTitleContainer,
  Label,
  DropDownPlaceHolder,
  Option,
  MenuOption
} from './styledComponents'
import { ClickParam, Region, UserRegionSettings } from '../../types/common'

interface Props {
  isMobile: boolean
  region: string
  language: string
  currency: string
  languageSettings: UserRegionSettings
  regionsAndLanguageOptions: Region[]
  formatMessage: (messageDescriptor: any) => string
  selectedDropDown: (param: ClickParam) => void
}

const LanguageAndCurrencyForm = ({
  isMobile,
  regionsAndLanguageOptions,
  region,
  language,
  currency,
  formatMessage,
  selectedDropDown
}: Props) => {
  const regionItems = regionsAndLanguageOptions.map(({ icon, label, id }) => (
    <Menu.Item id="region" key={id}>
      <Option>
        <img src={icon} />
        <MenuOption>{upperFirst(label)}</MenuOption>
      </Option>
    </Menu.Item>
  ))
  const regionOptions = <Menu onClick={selectedDropDown}>{regionItems}</Menu>

  const currentRegion = region
    ? find(regionsAndLanguageOptions, r => r.id === Number(region))
    : undefined

  const languageItems = currentRegion
    ? currentRegion.languages.map(({ id, name }) => (
        <Menu.Item id="language" key={id}>
          {upperFirst(name)}
        </Menu.Item>
      ))
    : []

  const languageOptions = (
    <Menu onClick={selectedDropDown}>{languageItems}</Menu>
  )

  const currentLanguage =
    language && currentRegion
      ? find(
          (currentRegion as Region).languages,
          l => l.id === Number(language)
        )
      : undefined

  const currencyItems = currentRegion
    ? currentRegion.currencies.map(({ id, shortName }) => (
        <Menu.Item id="currency" key={id}>
          {shortName.toUpperCase()}
        </Menu.Item>
      ))
    : []

  const currencyOptions = (
    <Menu onClick={selectedDropDown}>{currencyItems}</Menu>
  )

  const currentCurrency =
    currency && currentRegion
      ? find(
          (currentRegion as Region).currencies,
          c => c.id === Number(currency)
        )
      : undefined

  return (
    <Container>
      <Row>
        <Column inputhWidth={!isMobile ? '31%' : '100%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.region)}</Label>
          </InputTitleContainer>
          <Dropdown overlay={regionOptions}>
            <DropDownPlaceHolder>
              {currentRegion ? (
                <Option>
                  <img src={currentRegion.icon} />
                  <MenuOption>{upperFirst(currentRegion.label)}</MenuOption>
                </Option>
              ) : (
                'Select Region'
              )}
              <Icon type="down" />
            </DropDownPlaceHolder>
          </Dropdown>
        </Column>
        <Column inputhWidth={!isMobile ? '31%' : '100%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.language)}</Label>
          </InputTitleContainer>
          <Dropdown disabled={!currentRegion} overlay={languageOptions}>
            <DropDownPlaceHolder>
              {currentLanguage
                ? upperFirst(currentLanguage.name)
                : 'Select Language'}
              <Icon type="down" />
            </DropDownPlaceHolder>
          </Dropdown>
        </Column>
        <Column inputhWidth={!isMobile ? '31%' : '100%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.currency)}</Label>
          </InputTitleContainer>
          <Dropdown disabled={!currentRegion} overlay={currencyOptions}>
            <DropDownPlaceHolder>
              {currentCurrency
                ? currentCurrency.shortName.toUpperCase()
                : 'Select Currency'}
              <Icon type="down" />
            </DropDownPlaceHolder>
          </Dropdown>
        </Column>
      </Row>
    </Container>
  )
}

export default LanguageAndCurrencyForm
