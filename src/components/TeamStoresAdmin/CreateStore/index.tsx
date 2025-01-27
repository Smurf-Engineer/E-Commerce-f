/**
 * CreateStore Component - Created by Jesús Apodaca on 04/10/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import moment, { Moment } from 'moment'
import { RcFile } from 'antd/lib/upload/interface'
import Select, { SelectValue } from 'antd/lib/select'
import Modal from 'antd/lib/modal'
import message from 'antd/lib/message'
import Spin from 'antd/lib/spin'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import { withRouter } from 'react-router-dom'
import { compose, withApollo, graphql } from 'react-apollo'
import messages from './messages'
import {
  Container,
  BackButton,
  RowInput,
  InputDiv,
  Input,
  StyledSelect,
  Label,
  AddItem,
  SubLabel,
  BuildButton,
  ButtonDelete,
  PreviewImage,
  UploadSection,
  StyledDatePicker,
  SwitchInput,
  InfoTitle,
  InfoUser,
  okButtonStyles,
  Loader,
  StyledSearch,
  SearchButton
} from './styledComponents'
import { History } from 'history'
import LockerTable from '../../LockerTable'
import Dragger from '../../TeamDragger'
import ImageCropper from '../../ImageCropper'
import LockerModal from '../../LockerModal'
import {
  SelectedDesignObjectType,
  LockerTableType,
  DesignType,
  UserSearchResult,
  QueryProps,
  TeamstoreType,
  AccountManagerName
} from '../../../types/common'
import { cutoffDateSettingsQuery } from './data'
import { DEFAULT_CUTOFF_DAYS } from '../../../screens/CreateStore/constants'
const Option = Select.Option
const INPUT_MAX_LENGTH = 25
const FOURTEEN_DAYS = 14
const ONE_DAY = 1
const SEVENTEEN_DAYS = 17
const SIX_DAYS = 6

interface Data extends QueryProps {
  userSearch: UserSearchResult[]
}

interface CutoffData extends QueryProps {
  cutoffDays: number
}

interface Props {
  history: History
  currentCurrency: string
  teamSizeRange: string
  openCropper: boolean
  items: LockerTableType[]
  limit: number
  offset: number
  currentPageModal: number
  selectedItems: SelectedDesignObjectType
  openLocker: boolean
  imagePreviewUrl?: string
  banner?: string
  onDemand: boolean
  name: string
  featured: boolean
  userId: string
  saving: boolean
  users: Data
  client: any
  match: any
  loading: boolean
  userToSearch: string
  storeShortId: string
  canEdit: boolean
  startDate?: Moment
  endDate?: Moment
  cutoffSettings: CutoffData
  accountManager: AccountManagerName
  getEditStore: (id: string) => void
  setTeamData: (data: TeamstoreType) => void
  setLoadingAction: (loading: boolean) => void
  setUserToSearch: (searchText: string) => void
  setSelectedUser: (user: string) => void
  resetDataAction: () => void
  buildTeamStore: () => void
  setImage: (file: Blob, openModal: boolean) => void
  openModal: (opened: boolean) => void
  setFeaturedAction: (featured: boolean) => void
  setNameAction: (name: string) => void
  deleteItemSelectedAction: (index: number) => void
  setItemVisibleAction: (index: number, visible: boolean) => void
  moveRowAction: (
    index: number,
    hoverIndex: number,
    row: LockerTableType
  ) => void
  setItemsAddAction: () => void
  setPaginationData: (offset: number, page: number) => void
  onUnselectItemAction: (index: number) => void
  setItemSelectedAction: (item: DesignType, checked: boolean) => void
  setOpenLockerAction: (open: boolean) => void
  formatMessage: (messageDescriptor: any) => string
  onSelectStartDate: (dateMoment: Moment, date: string) => void
  onSelectEndDate: (dateMoment: Moment | null, date: string) => void
  onChangeTeamStoreType: (onDemand: boolean) => void
}
interface StateProps {
  searchValue: string
}
export class CreateStore extends React.Component<Props, StateProps> {
  debounceSearchProduct = debounce(
    (value) => this.props.setUserToSearch(value.trim()),
    200
  )
  state = {
    searchValue: ''
  }
  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  async componentDidMount() {
    const { match, getEditStore } = this.props
    const id = get(match, 'params.id', '')
    getEditStore(id)
    window.scrollTo(0, 0)
  }

  handleGoBack = () => {
    const { history, storeShortId } = this.props
    if (storeShortId) {
      history.push(`/admin/team-stores/details/${storeShortId}`)
    } else {
      history.push('/admin/team-stores')
    }
  }

  changePage = (pageParam: number = 1) => {
    const { limit, setPaginationData } = this.props
    let offset = pageParam > 1 ? (pageParam - 1) * limit : 0
    let currentPage = pageParam

    if (!offset && !pageParam) {
      const fullPage = !(offset % limit)
      const maxPageNumber = offset / limit

      if (fullPage && currentPage > maxPageNumber) {
        currentPage--
        offset = currentPage > 1 ? (currentPage - 1) * limit : 0
      }
    }
    setPaginationData(offset, currentPage)
  }

  handleOnAddItem = () => {
    const { setOpenLockerAction, userId, formatMessage } = this.props
    if (userId) {
      setOpenLockerAction(true)
    } else {
      Modal.info({
        title: (
          <InfoTitle>
            <FormattedMessage {...messages.noUserSelected} />
          </InfoTitle>
        ),
        iconType: '',
        icon: null,
        width: 355,
        okButtonProps: { style: okButtonStyles },
        okText: formatMessage(messages.gotIt),
        content: (
          <InfoUser>
            <FormattedMessage {...messages.userNotSelected} />
          </InfoUser>
        )
      })
    }
  }

  getCheckedItems = (items: LockerTableType[]) => {
    const checkedItems = items.reduce((obj, item) => {
      const itemId = get(item, 'design.id', item.id)
      obj[itemId] = true
      return obj
      // tslint:disable-next-line: align
    }, {})
    return checkedItems
  }

  handleOnCloseLocker = () => {
    const { setOpenLockerAction } = this.props
    setOpenLockerAction(false)
  }

  beforeUpload = (file: RcFile) => {
    const { setImage } = this.props
    if (file) {
      setImage(file, true)
    }
    return false
  }

  handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setNameAction } = this.props
    const {
      target: { value }
    } = event
    if (value.length <= INPUT_MAX_LENGTH) {
      setNameAction(value)
    }
  }

  handleOnChange = async (value: SelectValue) => {
    try {
      const parsedValue = value.toString()
      this.setState(
        {
          searchValue: parsedValue
        },
        () => {
          this.debounceSearchProduct(parsedValue)
        }
      )
    } catch (error) {
      message.error(error.message)
    }
  }

  handleOnSelect = async (value: SelectValue) => {
    const { setSelectedUser } = this.props
    setSelectedUser(value)
  }

  handleOnDeleteImage = () => {
    const { setImage } = this.props
    setImage(null, false)
  }

  closeModal = () => {
    const { openModal } = this.props
    openModal(false)
  }

  setImageAction = (file: Blob) => {
    const { setImage } = this.props
    setImage(file, false)
  }

  disabledStartDate = (current: any) => {
    if (!current) {
      return false
    }
    const { startDate, storeShortId } = this.props
    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)

    date.add(ONE_DAY, 'days')
    const isBeforeOfCurrentDay = current.valueOf() < date.valueOf()

    date.add(FOURTEEN_DAYS, 'days')

    let momentStartDate
    if (storeShortId) {
      momentStartDate = moment(startDate)
      momentStartDate.add(SEVENTEEN_DAYS, 'days')
    }
    const isGreaterThanFourteenDays = current.valueOf() > date.valueOf()

    return isBeforeOfCurrentDay || isGreaterThanFourteenDays
  }

  handleOnSelectStart = (date: Moment, dateString: string) => {
    const { onSelectStartDate } = this.props
    onSelectStartDate(date, dateString)
  }

  handleOnSelectEnd = async (date: Moment, dateString: string) => {
    const { formatMessage, onSelectEndDate } = this.props

    if (date) {
      if (date.weekday() === 0 || date.weekday() === 6) {
        message.warning(formatMessage(messages.deliveryErrorLabel))
        onSelectEndDate(null, '')
        return
      }
    }
    onSelectEndDate(date, dateString)
  }

  disabledEndDate = (current: any) => {
    if (!current) {
      return false
    }
    const { startDate, cutoffSettings } = this.props

    const cutoffDays = get(cutoffSettings, 'cutoffDays', DEFAULT_CUTOFF_DAYS)
    let isLessThanDeliveryDate = false
    let isGreaterCutOffDays = false
    if (startDate) {
      const maxEndDate = startDate.clone()
      maxEndDate.add(cutoffDays, 'days')
      isLessThanDeliveryDate = current.valueOf() < maxEndDate.valueOf()
      maxEndDate.add(SIX_DAYS, 'days')
      isGreaterCutOffDays = current.valueOf() > maxEndDate.valueOf()
    }

    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)

    const isBeforeOfCurrentDay = current.valueOf() < date.valueOf()

    return isBeforeOfCurrentDay || isLessThanDeliveryDate || isGreaterCutOffDays
  }

  render() {
    const {
      formatMessage,
      teamSizeRange,
      currentCurrency,
      openCropper,
      imagePreviewUrl,
      limit,
      offset,
      items,
      setFeaturedAction,
      currentPageModal,
      onUnselectItemAction,
      setItemSelectedAction,
      selectedItems,
      setItemsAddAction,
      openLocker,
      userId,
      saving,
      storeShortId,
      users,
      buildTeamStore,
      canEdit,
      featured,
      onDemand,
      deleteItemSelectedAction,
      setItemVisibleAction,
      moveRowAction,
      name,
      loading,
      startDate,
      endDate,
      onChangeTeamStoreType,
      accountManager
    } = this.props
    if (!canEdit) {
      return null
    }
    const { searchValue } = this.state

    let selected = ''
    let title = ''
    const searchResults =
      users &&
      !users.loading &&
      users.userSearch.map((item: UserSearchResult) => {
        const text = `${item.id} - ${item.name} - ${item.email}`
        const value = item.shortId
        if (item.shortId === userId) {
          selected = text
          title = `${item.id} - ${item.name}`
        }
        return {
          text,
          value
        }
      })
    const tableItems = this.getCheckedItems(items)
    return (
      <Container>
        <BackButton onClick={this.handleGoBack}>
          <Icon type="left" />
          {formatMessage(storeShortId ? messages.backToDetail : messages.back)}
        </BackButton>
        <RowInput>
          <InputDiv fullSize={true}>
            <FormattedMessage {...messages.teamStoreName} />
            <Input
              size="large"
              value={name}
              name="name"
              onChange={this.handleChangeName}
              placeholder={formatMessage(messages.teamStoreNameHolder)}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv fullSize={true}>
            <FormattedMessage {...messages.selectUser} />
            <StyledSearch
              onSearch={this.handleOnChange}
              dataSource={searchResults}
              size="large"
              value={selected || searchValue}
              onSelect={this.handleOnSelect}
              placeholder={formatMessage(messages.selectUserHolder)}
              disabled={!!storeShortId}
            >
              <Input
                suffix={
                  <SearchButton
                    className="search-btn"
                    size="large"
                    type="ghost"
                    disabled={!!storeShortId}
                  >
                    <Icon type="search" />
                  </SearchButton>
                }
              />
            </StyledSearch>
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.teamStoreType} />
            <StyledSelect
              size="large"
              value={onDemand}
              onChange={onChangeTeamStoreType}
            >
              <Option value={true}>
                <FormattedMessage {...messages.onDemand} />
              </Option>
              <Option value={false}>
                <FormattedMessage {...messages.batchOrder} />
              </Option>
            </StyledSelect>
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv>
            <FormattedMessage {...messages.cutOffDate} />
            <StyledDatePicker
              size="large"
              value={startDate}
              disabledDate={this.disabledStartDate}
              disabled={onDemand}
              onChange={this.handleOnSelectStart}
              format="YYYY-MM-DD" // TODO: Change format
            />
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.desiredDate} />
            <StyledDatePicker
              value={endDate}
              disabledDate={this.disabledEndDate}
              onChange={this.handleOnSelectEnd}
              disabled={!startDate || onDemand}
              format="YYYY-MM-DD" // TODO: Change format
              size="large"
            />
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.featured} />
            <SwitchInput checked={featured} onChange={setFeaturedAction} />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv>
            <FormattedMessage {...messages.accountManager} />
            <Input
              size="large"
              value={
                accountManager.first_name
                  ? `${accountManager.first_name} ${accountManager.last_name}`
                  : '-'
              }
              name="accountManager"
              disabled={true}
            />
          </InputDiv>
        </RowInput>
        <Label>
          <FormattedMessage {...messages.addStoreItems} />
        </Label>
        <AddItem
          onClick={this.handleOnAddItem}
          type="primary"
          ghost={true}
          size="large"
        >
          {`+ ${formatMessage(messages.addItem)}`}
        </AddItem>
        <LockerTable
          {...{
            formatMessage,
            teamSizeRange,
            currentCurrency,
            items,
            onDemand
          }}
          hideQuickView={true}
          onPressDelete={deleteItemSelectedAction}
          onPressVisible={setItemVisibleAction}
          onMoveRow={moveRowAction}
        />
        <UploadSection>
          <Label>
            <FormattedMessage {...messages.addBanner} />
            <SubLabel>
              <FormattedMessage {...messages.optional} />
            </SubLabel>
          </Label>
          <Upload
            beforeUpload={this.beforeUpload}
            multiple={false}
            showUploadList={false}
            supportServerRender={true}
          >
            <Button>{formatMessage(messages.changeLabel)}</Button>
          </Upload>
          <ButtonDelete onClick={this.handleOnDeleteImage}>
            {formatMessage(messages.deleteLabel)}
          </ButtonDelete>
        </UploadSection>
        {imagePreviewUrl ? (
          <PreviewImage src={imagePreviewUrl} />
        ) : (
          <Dragger onSelectImage={this.beforeUpload} />
        )}
        <BuildButton disabled={!name || !userId} onClick={buildTeamStore}>
          {formatMessage(storeShortId ? messages.save : messages.buildStore)}
        </BuildButton>
        <LockerModal
          {...{
            selectedItems,
            tableItems,
            limit,
            offset,
            title,
            userId
          }}
          proDesign={false}
          currentPage={currentPageModal}
          visible={openLocker}
          onRequestClose={this.handleOnCloseLocker}
          onSelectItem={setItemSelectedAction}
          onUnselectItem={onUnselectItemAction}
          onAddItems={setItemsAddAction}
          changePage={this.changePage}
        />
        <ImageCropper
          {...{ formatMessage, saving }}
          open={openCropper}
          requestClose={this.closeModal}
          setImage={this.setImageAction}
          image={imagePreviewUrl}
        />
        {(saving || loading) && (
          <Loader>
            <Spin size="large" />
          </Loader>
        )}
      </Container>
    )
  }
}

const CreateStoreEnhance = compose(
  withRouter,
  withApollo,
  graphql(cutoffDateSettingsQuery, {
    name: 'cutoffSettings',
    options: {
      fetchPolicy: 'network-only'
    }
  })
)(CreateStore)

export default CreateStoreEnhance
