/**
 * CreateStore Component - Created by Jesús Apodaca on 04/10/19.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import { RcFile } from 'antd/lib/upload/interface'
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
const INPUT_MAX_LENGTH = 25

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
  setImage: (file: Blob, imagePreviewUrl: string, openModal: boolean) => void
  openModal: (opened: boolean) => void
  setFeaturedAction: (featured: boolean) => void
  setNameAction: (name: string) => void
  deleteItemSelectedAction: (index: number) => void
  setItemVisibleAction: (index: number, visible: boolean) => void
  moveRowAction: (index: number, row: any) => void
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
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(file, reader.result, true)
    }
    if (file) {
      reader.readAsDataURL(file)
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

  handleOnDeleteImage = () => {
    const { setImage } = this.props
    setImage(null, '', false)
  }

  closeModal = () => {
    const { openModal } = this.props
    openModal(false)
  }

  setImageAction = (file: Blob) => {
    const { setImage } = this.props
    setImage(file, URL.createObjectURL(file), false)
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
      featured,
      onDemand,
      deleteItemSelectedAction,
      setItemVisibleAction,
      moveRowAction,
      name
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
            <StyledSelect size="large" value={onDemand} disabled={true}>
              <Option value={true}>
                <FormattedMessage {...messages.onDemand} />
              </Option>
              <Option value={false}>
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
            <SwitchInput checked={featured} onChange={setFeaturedAction} />
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
          requestClose={this.closeModal}
          setImage={this.setImageAction}
          image={imagePreviewUrl}
        />
      </Container>
    )
  }
}

export default CreateStore
