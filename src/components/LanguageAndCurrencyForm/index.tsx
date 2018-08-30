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
  MenuOption,
  StyledButton
} from './styledComponents'
import { ClickParam, Region, UserRegionSettings } from '../../types/common'

interface Props {
  isMobile: boolean
  loading: boolean
  region: string
  language: string
  currency: string
  languageSettings: UserRegionSettings
  regionsAndLanguageOptions: Region[]
  formatMessage: (messageDescriptor: any) => string
  selectedDropDown: (param: ClickParam) => void
  onSaveLanguageSettings: () => void
}

const LanguageAndCurrencyForm = ({
  languageSettings: {
    region: regionLS,
    language: languageLS,
    currency: currencyLS
  },
  loading,
  isMobile,
  regionsAndLanguageOptions,
  region,
  language,
  currency,
  formatMessage,
  selectedDropDown,
  onSaveLanguageSettings
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

  const currentRegionId = region !== null ? region : regionLS && regionLS.id
  const currentRegion = find(
    regionsAndLanguageOptions,
    r => r.id === Number(currentRegionId)
  )

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

  const currentLanguageId =
    language !== null ? language : languageLS && languageLS.id
  const currentLanguage =
    currentRegion &&
    find(
      (currentRegion as Region).languages,
      l => l.id === Number(currentLanguageId)
    )

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

  const currentCurrencyId =
    currency != null ? currency : currencyLS && currencyLS.id
  const currentCurrency =
    currentRegion &&
    find(
      (currentRegion as Region).currencies,
      c => c.id === Number(currentCurrencyId)
    )

  const languageButtonDisabled =
    ((region === null || region === String(regionLS.id)) &&
      (language === null || language === String(languageLS.id)) &&
      (currency === null || currency === String(currencyLS.id))) ||
    !currentRegion ||
    !currentLanguage ||
    !currentCurrency

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
                formatMessage(messages.selectRegion)
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
                : formatMessage(messages.selectLanguage)}
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
                : formatMessage(messages.selectCurrency)}
              <Icon type="down" />
            </DropDownPlaceHolder>
          </Dropdown>
        </Column>
      </Row>
      <Row>
        <Column inputhWidth={!isMobile ? '27%' : '48%'}>
          <StyledButton
            {...{ loading }}
            type="primary"
            disabled={languageButtonDisabled}
            onClick={onSaveLanguageSettings}
          >
            {formatMessage(messages.save)}
          </StyledButton>
        </Column>
      </Row>
    </Container>
  )
}

export default LanguageAndCurrencyForm
