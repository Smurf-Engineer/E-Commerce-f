/**
 * DiscountsData Component - Created by eduardoquintero on 27/05/19.
 */
import * as React from 'react'
import { Container, Title } from './styledComponents'
import messages from './messages'
import get from 'lodash/get'
import Icon from 'antd/lib/icon'
import debounce from 'lodash/debounce'
import Modal from 'antd/lib/modal'
import { USAGE, PRODUCT, USERS } from '../constants'
import LockerModal from '../../LockerModal'
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
  AddItemButton,
  InfoTitle,
  InfoUser,
  okButtonStyles
} from './styledComponents'
import Select, { SelectValue } from 'antd/lib/select'
import moment, { Moment } from 'moment'
import {
  LockerTableType,
  SelectedDesignObjectType,
  DesignType
} from '../../../types/common'

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
  restrictionType: string
  searchResults: string[]
  items: LockerTableType[]
  openLocker: boolean
  selectedItems: SelectedDesignObjectType
  selectedUser: string
  selectedValue: string
  selectTitle: string
  limit: number
  offset: number
  currentPageModal: number
  goBack?: () => void
  formatMessage: (messageDescriptor: any) => string
  handleOnInputChange: (event: any) => void
  onSelectDiscountType: (value: string) => void
  onChangeRate: (value: number) => void
  onActivateDiscount: (checked: boolean) => void
  onSaveDiscount: () => void
  onSelectDate: (date: Moment, dateString: string) => void
  onSelectRestriction: (restriction: string) => () => void
  handleOnChange: (value: string) => void
  setSelectedUser: (email: string) => void
  setItemSelected: (item: DesignType, checked: boolean) => void
  setItemsToAdd: () => void
  setOpenLocker: (open: boolean) => void
  onUnselectItem: (id: number) => void
  onDeleteItem: (id: number) => void
  setPaginationData: (offset: number, page: number) => void
}

const { Option } = Select
const discountRestrictionTypes = [PRODUCT, USERS, USAGE]

const DiscountsData = ({
  goBack,
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
  handleOnChange,
  searchResults,
  setSelectedUser,
  items,
  openLocker,
  selectedItems,
  setItemSelected,
  setItemsToAdd,
  selectedUser,
  setOpenLocker,
  onUnselectItem,
  onDeleteItem,
  selectTitle,
  limit,
  offset,
  setPaginationData,
  currentPageModal
}: Props) => {
  const debounceSearchProduct = debounce(value => handleOnChange(value), 300)
  const handleOnSelect = (value: SelectValue) => {
    const emailValue = value
      .toString()
      .split(' -')
      .reverse()
      .shift()
    const parsedValue = emailValue.replace(/ /g, '')
    setSelectedUser(parsedValue)
  }

  const getCheckedItems = (lockerItems: LockerTableType[]) => {
    const checkedItems = lockerItems.reduce((obj, item) => {
      const itemId = get(item, 'design.id', item.id)
      obj[itemId] = true
      return obj
      // tslint:disable-next-line: align
    }, {})
    return checkedItems
  }
  const handleOnAddItem = () => {
    if (selectedUser) {
      setOpenLocker(true)
    } else {
      Modal.info({
        title: <InfoTitle>{formatMessage(messages.noUserSelected)}</InfoTitle>,
        iconType: '',
        icon: null,
        width: 355,
        okButtonProps: { style: okButtonStyles },
        okText: formatMessage(messages.gotIt),
        content: <InfoUser>{formatMessage(messages.userNotSelected)}</InfoUser>
      })
    }
  }
  const changePage = (pageParam: number = 1) => {
    let currentOffset = pageParam > 1 ? (pageParam - 1) * limit : 0
    let currentPage = pageParam

    if (!currentOffset && !pageParam) {
      const fullPage = !(currentOffset % limit)
      const maxPageNumber = currentOffset / limit

      if (fullPage && currentPage > maxPageNumber) {
        currentPage--
        currentOffset = currentPage > 1 ? (currentPage - 1) * limit : 0
      }
    }
    setPaginationData(currentOffset, currentPage)
  }
  const handleOnCloseLocker = () => setOpenLocker(false)
  const tableItems = getCheckedItems(items)
  return (
    <Container>
      <ViewContainer onClick={goBack}>
        <Icon type="left" />
        <span>{formatMessage(messages.back)}</span>
      </ViewContainer>
      <Title>{formatMessage(messages.newDiscount)}</Title>
      <Row>
        <Column>
          <Label>{formatMessage(messages.restrictionType)}</Label>
          <RestrictionContainer>
            {discountRestrictionTypes.map((restriction, index) => (
              <SectionButton
                key={index}
                id={restriction}
                large={true}
                selected={restriction === restrictionType}
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
            {discountTypes.map(value => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
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
      <Row>
        <Column>
          <Label>{formatMessage(messages.selectUser)}</Label>
          <StyledSearch
            onChange={debounceSearchProduct}
            dataSource={searchResults}
            onSelect={handleOnSelect}
            placeholder={formatMessage(messages.searchBy)}
          >
            <StyledInput
              suffix={
                <SearchButton className="search-btn" size="large" type="ghost">
                  <Icon type="search" />
                </SearchButton>
              }
            />
          </StyledSearch>
        </Column>
      </Row>
      <Title>{formatMessage(messages.addItems)}</Title>
      <AddItemButton onClick={handleOnAddItem}>
        {formatMessage(messages.addItem)}
      </AddItemButton>
      <LockerModal
        {...{
          selectedItems,
          tableItems,
          limit,
          offset,
          title: selectTitle,
          userId: selectedUser,
          changePage,
          onUnselectItem
        }}
        proDesign={false}
        currentPage={currentPageModal}
        visible={openLocker}
        onRequestClose={handleOnCloseLocker}
        onSelectItem={setItemSelected}
        onAddItems={setItemsToAdd}
      />
      <ButtonsContainer>
        <StyledButton disabled={loading} onClick={goBack}>
          {formatMessage(messages.cancel)}
        </StyledButton>
        <ButtonWrapper color={BLUE}>
          <StyledButton
            disabled={
              !couponCode.length || !discountItemId.length || !rate || !expiry
            }
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

export default DiscountsData
