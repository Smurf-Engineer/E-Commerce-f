/**
 * DiscountsData Component - Created by eduardoquintero on 27/05/19.
 */
import * as React from 'react'
import { Container, Title } from './styledComponents'
import messages from './messages'
import Icon from 'antd/lib/icon'
import Checkbox from 'antd/lib/checkbox'
import message from 'antd/lib/message'
import debounce from 'lodash/debounce'
import { USAGE, PRODUCT, USERS } from '../constants'
import SimpleTable from '../../SimpleTable'
import { BLUE } from '../../../theme/colors'
import {
  StyledInput,
  StyledSelect,
  Row,
  Column,
  Label,
  StyledButton,
  ButtonWrapper,
  ButtonsContainer,
  StyledInputNumber,
  StyledDatePicker,
  ViewContainer,
  SectionButton,
  RestrictionContainer,
  StyledSwitch,
  StyledSearch,
  SearchButton,
  CheckboxContainer,
  CheckboxLabel
} from './styledComponents'
import Select, { SelectValue } from 'antd/lib/select'
import moment, { Moment } from 'moment'
import { User, UserDiscount, Header, HiddenSymbols } from '../../../types/common'

interface Props {
  title?: string
  discountTypes: string[]
  couponCode: string
  discountItemId: string
  discountType: string
  rate: number
  discountActive: boolean
  expiry: string
  loading: boolean
  restrictionType: HiddenSymbols
  searchResults: string[]
  searchResultsProducts: string[]
  user: string
  selectedUsers: User[]
  usageNumber: number
  unlimitedUsage: boolean
  selectedProducts: string[]
  goBack: () => void
  formatMessage: (messageDescriptor: any) => string
  handleOnInputChange: (event: any) => void
  onSelectDiscountType: (value: string) => void
  onChangeRate: (value: number) => void
  onActivateDiscount: (checked: boolean) => void
  onSaveDiscount: () => void
  onSelectDate: (date: Moment, dateString: string) => void
  onSelectRestriction: (restriction: string) => () => void
  handleOnChange: (value: string) => void
  onAddProduct: (value: string) => void
  onDeleteItem: (id: number, section: string) => void
  onAddUser: (user: UserDiscount) => void
  onChangeUsage: (value: number) => void
  onCheckUsage: (checked: boolean) => void
}

const { Option } = Select
const discountRestrictionTypes = [PRODUCT, USERS, USAGE]

interface StateProps {
  searchValue: string
  searchValueProducts: string
}

const usersHeader: Header[] = [
  { message: 'clientId', width: 25, tabletWidth: 20, fieldName: 'netsuiteId' },
  { message: 'name', width: 40, tabletWidth: 40, fieldName: 'name' },
  { message: 'email', width: 20, tabletWidth: 20, fieldName: 'email' },
  { message: '', width: 15, tabletWidth: 15 }
]

const productsHeader: Header[] = [
  { message: 'name', width: 40, tabletWidth: 40, fieldName: 'name' }
]

class DiscountsData extends React.Component<Props, StateProps> {
  state = {
    searchValue: '',
    searchValueProducts: ''
  }
  debounceSearchUser = debounce(
    () => this.props.handleOnChange(this.state.searchValue),
    300
  )
  debounceSearchProduct = debounce(
    () => this.props.handleOnChange(this.state.searchValueProducts),
    300
  )
  componentDidUpdate(prevProps: Props) {
    const { user } = this.props
    if (prevProps.user !== user) {
      this.setState({ searchValue: user })
    }
  }
  handleOnSelectProduct = (value: SelectValue) => {
    const { onAddProduct } = this.props
    const parsedValue = value.toString()
    onAddProduct(parsedValue)
  }

  handleOnSelectUser = (value: SelectValue) => {
    const {
      onAddUser,
      searchResults,
      selectedUsers,
      formatMessage
    } = this.props
    const userId = value.toString()

    const userInfo = searchResults.find(
      (element: UserDiscount) => element.value === userId
    )
    const userAlreadyAdded = selectedUsers.find(
      element => element.netsuiteId === userInfo.netsuiteId
    )
    if (!userAlreadyAdded) {
      onAddUser(userInfo)
      return
    }
    message.warning(formatMessage(messages.userAlreadyAdded))
  }

  handleSearchInputChange = (value: string) =>
    this.setState({ searchValue: value }, () => {
      this.debounceSearchUser()
    })

  handleProductInputChange = (value: string) =>
    this.setState({ searchValueProducts: value }, () => {
      this.debounceSearchProduct()
    })

  goBack = () => {
    const { goBack } = this.props
    this.setState({ searchValue: '', searchValueProducts: '' }, () => {
      goBack()
    })
  }

  handleOnCheckUsage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked }
    } = event
    const { onCheckUsage } = this.props
    onCheckUsage(checked)
  }

  render() {
    const {
      formatMessage,
      discountTypes,
      handleOnInputChange,
      couponCode,
      discountItemId,
      onSelectDiscountType,
      discountType,
      rate,
      onChangeRate,
      onActivateDiscount,
      discountActive,
      onSaveDiscount,
      onSelectDate,
      expiry,
      loading,
      restrictionType,
      onSelectRestriction,
      searchResults,
      searchResultsProducts,
      onDeleteItem,
      selectedUsers,
      onChangeUsage,
      usageNumber,
      unlimitedUsage,
      selectedProducts
    } = this.props
    const disableSave =
      !couponCode.length ||
      !discountItemId.length ||
      !rate ||
      !expiry ||
      (!restrictionType[USERS] && !restrictionType[PRODUCT] && !restrictionType[USAGE]) ||
      (!!restrictionType[USERS] && !selectedUsers.length) ||
      (!!restrictionType[PRODUCT] && !selectedProducts.length) ||
      (!!restrictionType[USAGE] && !unlimitedUsage && usageNumber <= 0)
    const { searchValue, searchValueProducts } = this.state
    return (
      <Container>
        <ViewContainer onClick={this.goBack}>
          <Icon type="left" />
          <span>{formatMessage(messages.back)}</span>
        </ViewContainer>
        <Title>
          {formatMessage(
            discountItemId ? messages.editDiscount : messages.newDiscount
          )}
        </Title>
        <Row>
          <Column>
            <Label>{formatMessage(messages.restrictionType)}</Label>
            <RestrictionContainer>
              {discountRestrictionTypes.map((restriction, index) => (
                <SectionButton
                  key={index}
                  id={restriction}
                  large={true}
                  selected={restrictionType[restriction]}
                  onClick={onSelectRestriction(restriction)}
                >
                  {formatMessage(messages[restriction])}
                </SectionButton>
              ))}
            </RestrictionContainer>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.couponCode)}</Label>
            <StyledInput
              id={'couponCode'}
              onChange={handleOnInputChange}
              maxLength={15}
              value={couponCode}
            />
          </Column>
          <Column>
            <Label>{formatMessage(messages.discountItemId)}</Label>
            <StyledInput
              id={'discountItemId'}
              onChange={handleOnInputChange}
              maxLength={7}
              data-is-number={true}
              value={discountItemId}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.discountType)}</Label>
            <StyledSelect
              onSelect={onSelectDiscountType}
              defaultValue={discountType}
              value={discountType}
            >
              {discountTypes.map((value: string, index: number) => {
                return (
                  <Option key={`${index}`} value={value}>
                    {value}
                  </Option>
                )
              })}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.rate)}</Label>
            <StyledInputNumber
              min={1}
              step={0.1}
              value={rate}
              onChange={onChangeRate}
            />
          </Column>
          <Column>
            <Label>{formatMessage(messages.expiryDate)}</Label>
            <StyledDatePicker
              placeholder={''}
              onChange={onSelectDate}
              value={expiry && moment(expiry, 'DD-MM-YYYY')}
            />
          </Column>
          <Column>
            <Label>{formatMessage(messages.activateDiscount)}</Label>
            <StyledSwitch
              checked={discountActive}
              onChange={onActivateDiscount}
            />
          </Column>
        </Row>
        {restrictionType[USERS] && (
          <div>
            <Row>
              <Column>
                <Title>{formatMessage(messages.discountUser)}</Title>
                <Label>{formatMessage(messages.addUsers)}</Label>
                <StyledSearch
                  onChange={this.handleSearchInputChange}
                  dataSource={searchResults}
                  onSelect={this.handleOnSelectUser}
                  value={searchValue}
                  placeholder={formatMessage(messages.searchBy)}
                >
                  <StyledInput
                    suffix={
                      <SearchButton
                        className="search-btn"
                        size="large"
                        type="ghost"
                      >
                        <Icon type="search" />
                      </SearchButton>
                    }
                  />
                </StyledSearch>
              </Column>
            </Row>
            <SimpleTable
              {...{
                formatMessage
              }}
              data={selectedUsers}
              headerTitles={usersHeader}
              targetGroup={'selectedUsers'}
              onPressDelete={onDeleteItem}
            />
          </div>
        )}
        {restrictionType[USAGE] && (
          <div>
            <Row>
              <Column>
                <Label>{formatMessage(messages.discountUsage)}</Label>
                <StyledInputNumber
                  min={0}
                  step={1}
                  value={usageNumber}
                  onChange={onChangeUsage}
                  disabled={unlimitedUsage}
                />
              </Column>
              <Column>
                <CheckboxContainer>
                  <Checkbox
                    checked={unlimitedUsage}
                    onChange={this.handleOnCheckUsage}
                  >
                    <CheckboxLabel>
                      {formatMessage(messages.unlimitedUsages)}
                    </CheckboxLabel>
                  </Checkbox>
                </CheckboxContainer>
              </Column>
            </Row>
          </div>
        )}
        {restrictionType[PRODUCT] && (
          <div>
            <Row>
              <Column>
                <Title>{formatMessage(messages.discountProduct)}</Title>
                <Label>{formatMessage(messages.addProduct)}</Label>
                <StyledSearch
                  onChange={this.handleProductInputChange}
                  dataSource={searchResultsProducts}
                  onSelect={this.handleOnSelectProduct}
                  value={searchValueProducts}
                  placeholder={formatMessage(messages.searchByProduct)}
                >
                  <StyledInput
                    suffix={
                      <SearchButton
                        className="search-btn"
                        size="large"
                        type="ghost"
                      >
                        <Icon type="search" />
                      </SearchButton>
                    }
                  />
                </StyledSearch>
              </Column>
            </Row>
            <SimpleTable
              {...{
                formatMessage
              }}
              data={selectedProducts}
              headerTitles={productsHeader}
              targetGroup={'selectedProducts'}
              onPressDelete={onDeleteItem}
            />
          </div>
        )}
        <ButtonsContainer>
          <StyledButton disabled={loading} onClick={this.goBack}>
            {formatMessage(messages.cancel)}
          </StyledButton>
          <ButtonWrapper color={BLUE}>
            <StyledButton
              disabled={disableSave}
              type="primary"
              onClick={onSaveDiscount}
              loading={loading}
            >
              {formatMessage(messages.save)}
            </StyledButton>
          </ButtonWrapper>
        </ButtonsContainer>
      </Container>
    )
  }
}

export default DiscountsData
