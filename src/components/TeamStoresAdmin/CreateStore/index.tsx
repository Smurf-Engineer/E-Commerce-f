/**
 * CreateStore Component - Created by Jesús Apodaca on 04/10/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Select from 'antd/lib/select'
import get from 'lodash/get'
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
  SwitchInput
} from './styledComponents'
import { History } from 'history'
import LockerTable from '../../LockerTable'
import Dragger from '../../TeamDragger'
import ImageCropper from '../../ImageCropper'
import LockerModal from '../../LockerModal'
import {
  SelectedDesignObjectType,
  LockerTableType,
  DesignType
} from '../../../types/common'
const Option = Select.Option

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
  setItemsAddAction: () => void
  setPaginationData: (offset: number, page: number) => void
  onUnselectItemAction: (index: number) => void
  setItemSelectedAction: (item: DesignType, checked: boolean) => void
  setOpenLockerAction: (open: boolean) => void
  formatMessage: (messageDescriptor: any) => string
}

export class CreateStore extends React.Component<Props, {}> {
  handleGoBack = () => {
    const { history } = this.props
    history.push('/admin/team-stores')
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
    const { setOpenLockerAction } = this.props
    setOpenLockerAction(true)
  }
  handleOnCloseLocker = () => {
    const { setOpenLockerAction } = this.props
    setOpenLockerAction(false)
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
      currentPageModal,
      onUnselectItemAction,
      setItemSelectedAction,
      selectedItems,
      setItemsAddAction,
      openLocker,
      banner
    } = this.props
    const tableItems = this.getCheckedItems(items)
    return (
      <Container>
        <BackButton onClick={this.handleGoBack}>
          <Icon type="left" />
          <FormattedMessage {...messages.back} />
        </BackButton>
        <RowInput>
          <InputDiv fullSize={true}>
            <FormattedMessage {...messages.teamStoreName} />
            <Input
              size="large"
              value={''}
              name="name"
              onChange={() => {}}
              placeholder={formatMessage(messages.teamStoreNameHolder)}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv fullSize={true}>
            <FormattedMessage {...messages.selectUser} />
            <Input
              size="large"
              value={''}
              name="name"
              onChange={() => {}}
              placeholder={formatMessage(messages.selectUserHolder)}
            />
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.teamStoreType} />
            <StyledSelect size="large" value={''} onChange={() => {}}>
              <Option value="onDemand">
                <FormattedMessage {...messages.onDemand} />
              </Option>
              <Option value="fixedDate">
                <FormattedMessage {...messages.fixedDate} />
              </Option>
            </StyledSelect>
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv>
            <FormattedMessage {...messages.cutOffDate} />
            <StyledDatePicker
              size="large"
              dateFormat="YYYY-MM-DD"
              disabled={true}
            />
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.desiredDate} />
            <StyledDatePicker
              size="large"
              dateFormat="YYYY-MM-DD"
              disabled={true}
            />
          </InputDiv>
          <InputDiv>
            <FormattedMessage {...messages.featured} />
            <SwitchInput checked={true} onChange={() => {}} />
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
          {...{ formatMessage, teamSizeRange, currentCurrency, items }}
          hideQuickView={true}
          onPressDelete={() => {}}
          onPressQuickView={() => {}}
          onPressVisible={() => {}}
          onMoveRow={() => {}}
        />
        <UploadSection>
          <Label>
            <FormattedMessage {...messages.addBanner} />
            <SubLabel>
              <FormattedMessage {...messages.optional} />
            </SubLabel>
          </Label>
          <Upload
            beforeUpload={() => {}}
            multiple={false}
            showUploadList={false}
            supportServerRender={true}
          >
            <Button>{formatMessage(messages.changeLabel)}</Button>
          </Upload>
          <ButtonDelete onClick={() => {}}>
            {formatMessage(messages.deleteLabel)}
          </ButtonDelete>
        </UploadSection>
        {imagePreviewUrl || banner ? (
          <PreviewImage src={imagePreviewUrl || banner} />
        ) : (
          <Dragger onSelectImage={() => {}} />
        )}
        <BuildButton>
          <FormattedMessage {...messages.buildStore} />
        </BuildButton>
        <LockerModal
          {...{
            selectedItems,
            tableItems,
            limit,
            offset
          }}
          proDesign={true}
          userId={'H1R0yFr0V'}
          currentPage={currentPageModal}
          visible={openLocker}
          onRequestClose={this.handleOnCloseLocker}
          onSelectItem={setItemSelectedAction}
          onUnselectItem={onUnselectItemAction}
          onAddItems={setItemsAddAction}
          changePage={this.changePage}
        />
        <ImageCropper
          {...{ formatMessage }}
          open={openCropper}
          requestClose={() => {}}
          setImage={() => {}}
          image={''}
        />
      </Container>
    )
  }
}

export default CreateStore
