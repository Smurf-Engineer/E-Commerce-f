/**
 * LanguageAndCurrencyForm Component - Created by miguelcanobbio on 05/06/18.
 */
import * as React from 'react'
import Dropdown from 'antd/lib/dropdown'
import Icon from 'antd/lib/icon'
import Menu from 'antd/lib/menu'
import messages from './messages'
import {
  Container,
  Row,
  Column,
  InputTitleContainer,
  Label,
  DropDownPlaceHolder
} from './styledComponents'
import { ClickParam, Region } from '../../types/common'

interface Props {
  region: string
  language: string
  currency: string
  regionsOptions: Region[]
  formatMessage: (messageDescriptor: any) => string
  selectedDropDown: (param: ClickParam) => void
}

const LanguageAndCurrencyForm = ({
  regionsOptions,
  region,
  language,
  currency,
  formatMessage,
  selectedDropDown
}: Props) => {
  console.log(regionsOptions)
  const regionOptions = (
    <Menu onClick={selectedDropDown}>
      <Menu.Item id="region" key={'Global'}>
        {'Global'}
      </Menu.Item>
      <Menu.Item id="region" key={'Canada'}>
        {'Canada'}
      </Menu.Item>
      <Menu.Item id="region" key={'Europe'}>
        {'Europe'}
      </Menu.Item>
    </Menu>
  )

  const languageOptions = (
    <Menu onClick={selectedDropDown}>
      <Menu.Item id="language" key={'English'}>
        {'English'}
      </Menu.Item>
      {/* <Menu.Item id="language" key={'Japanese'}>
        {'Japanese'}
      </Menu.Item> */}
    </Menu>
  )
  const currencyOptions = (
    <Menu onClick={selectedDropDown}>
      <Menu.Item id="currency" key={'$USD'}>
        {'$USD'}
      </Menu.Item>
    </Menu>
  )
  return (
    <Container>
      <Row>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.region)}</Label>
          </InputTitleContainer>
          <Dropdown overlay={regionOptions}>
            <DropDownPlaceHolder>
              {region ? region : 'Select Region'}
              <Icon type="down" />
            </DropDownPlaceHolder>
          </Dropdown>
        </Column>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.language)}</Label>
          </InputTitleContainer>
          <Dropdown overlay={languageOptions}>
            <DropDownPlaceHolder>
              {language ? language : 'Select Language'}
              <Icon type="down" />
            </DropDownPlaceHolder>
          </Dropdown>
        </Column>
        <Column inputhWidth={'31%'}>
          <InputTitleContainer>
            <Label>{formatMessage(messages.currency)}</Label>
          </InputTitleContainer>
          <Dropdown overlay={currencyOptions}>
            <DropDownPlaceHolder>
              {currency ? currency : 'Select Currency'}
              <Icon type="down" />
            </DropDownPlaceHolder>
          </Dropdown>
        </Column>
      </Row>
    </Container>
  )
}

export default LanguageAndCurrencyForm
