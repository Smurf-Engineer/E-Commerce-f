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
import LockerSimpleTable from '../../LockerSimpleTable'
import SimpleTable from '../../SimpleTable'
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
  DesignType,
  User
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
  user: string
  selectedUsers: User[]
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
  setSelectedUser: (email: string) => void
  setItemSelected: (item: DesignType, checked: boolean) => void
  setItemsToAdd: () => void
  setOpenLocker: (open: boolean) => void
  onUnselectItem: (id: number) => void
  onDeleteItem: (id: number, section: string) => void
  setPaginationData: (offset: number, page: number) => void
  onAddUser: (email: string) => void
}

const { Option } = Select
const discountRestrictionTypes = [PRODUCT, USERS, USAGE]

interface StateProps {
  searchValue: string
}

class DiscountsData extends React.Component<Props, StateProps> {
  state = {
    searchValue: '',
    searchUserValue: ''
  }
  debounceSearchUser = debounce(
    () => this.props.handleOnChange(this.state.searchValue),
    300
  )
  debounceSearchUserTable = debounce(
    () => this.props.handleOnChange(this.state.searchValue),
    300
  )
  componentDidUpdate(prevProps: Props) {
    const { user } = this.props
    if (prevProps.user !== user) {
      this.setState({ searchValue: user })
    }
  }
  handleOnSelect = (value: SelectValue) => {
    const { setSelectedUser } = this.props
    const parsedValue = this.getParsedValue(value)
    setSelectedUser(parsedValue)
  }

  handleOnSelectUser = (value: SelectValue) => {
    console.log('aa')
    const { onAddUser } = this.props
    const parsedValue = this.getParsedValue(value)
    onAddUser(parsedValue)
  }

  getParsedValue = (value: SelectValue) => {
    const emailValue = value
      .toString()
      .split(' -')
      .reverse()
      .shift()
    return emailValue.replace(/ /g, '')
  }

  getCheckedItems = (lockerItems: LockerTableType[]) => {
    const checkedItems = lockerItems.reduce((obj, item) => {
      const itemId = get(item, 'design.id', item.id)
      obj[itemId] = true
      return obj
      // tslint:disable-next-line: align
    }, {})
    return checkedItems
  }
  handleOnAddItem = () => {
    const { selectedUser, formatMessage, setOpenLocker } = this.props
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
  changePage = (pageParam: number = 1) => {
    const { limit, setPaginationData } = this.props
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
  handleOnCloseLocker = () => this.props.setOpenLocker(false)

  handleSearchInputChange = (value: string) =>
    this.setState({ searchValue: value }, () => {
      this.debounceSearchUser()
    })
  handleSearchUsersInputChange = (value: string) =>
    this.setState({ searchValue: value }, () => {
      this.debounceSearchUserTable()
    })
  goBack = () => {
    const { goBack } = this.props
    this.setState({ searchValue: '' }, () => {
      goBack()
    })
  }

  render() {
    const tableItems = this.getCheckedItems(this.props.items)
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
      items,
      openLocker,
      selectedItems,
      setItemSelected,
      setItemsToAdd,
      onUnselectItem,
      onDeleteItem,
      selectTitle,
      limit,
      offset,
      currentPageModal,
      user,
      selectedUsers
    } = this.props
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
              {discountRestrictionTypes.map(restriction => (
                <SectionButton
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
        {restrictionType === USERS && (
          <div>
            <Row>
              <Column>
                <Title>{formatMessage(messages.discountUser)}</Title>
                <Label>{formatMessage(messages.addUsers)}</Label>
                <StyledSearch
                  onChange={this.handleSearchUsersInputChange}
                  dataSource={searchResults}
                  onSelect={this.handleOnSelectUser}
                  value={this.state.searchValue}
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
                formatMessage,
                users: selectedUsers
              }}
              onPressDelete={onDeleteItem}
            />
          </div>
        )}
        {restrictionType === PRODUCT && (
          <div>
            <Row>
              <Column>
                <Label>{formatMessage(messages.selectUser)}</Label>
                <StyledSearch
                  onChange={this.handleSearchInputChange}
                  dataSource={searchResults}
                  onSelect={this.handleOnSelect}
                  value={this.state.searchValue}
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
            <Title>{formatMessage(messages.addItems)}</Title>
            <AddItemButton onClick={this.handleOnAddItem}>
              {formatMessage(messages.addItem)}
            </AddItemButton>
            <LockerSimpleTable
              {...{
                formatMessage,
                items
              }}
              hideQuickView={true}
              onPressDelete={onDeleteItem}
            />
            <LockerModal
              {...{
                selectedItems,
                tableItems,
                limit,
                offset,
                title: selectTitle,
                userId: user
              }}
              proDesign={false}
              currentPage={currentPageModal}
              visible={openLocker}
              onRequestClose={this.handleOnCloseLocker}
              onSelectItem={setItemSelected}
              onUnselectItem={onUnselectItem}
              onAddItems={setItemsToAdd}
              changePage={this.changePage}
            />
          </div>
        )}
        <ButtonsContainer>
          <StyledButton disabled={loading} onClick={this.goBack}>
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
}

export default DiscountsData
