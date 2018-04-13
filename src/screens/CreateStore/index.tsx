/**
 * CreateStore Screen - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import { Moment } from 'moment'
import message from 'antd/lib/message'
import { RouteComponentProps } from 'react-router-dom'
import Layout from '../../components/MainLayout'
import LockerTable from '../../components/LockerTable'
import LockerModal from '../../components/LockerModal'
import SwitchWithLabel from '../../components/SwitchWithLabel'
import Dragger from '../../components/TeamDragger'
import StoreForm from '../../components/StoreForm'
import TeamSizes from '../../components/TeamSizes'
import { createStoreMutation } from './data'
import { DesignType, SelectedItem } from '../../types/common'
import * as createStoreActions from './actions'
import messages from './messages'
import {
  Container,
  Title,
  Subtitle,
  Message,
  PriceMessage,
  LockerMessage,
  PreviewImage,
  Row,
  RowButtons,
  RowSwitch,
  ButtonDelete,
  buttonStyle,
  buttonBuildStyle
} from './styledComponents'

interface Props extends RouteComponentProps<any> {
  teamSizeId: number
  intl: InjectedIntl
  name: string
  privateStore: boolean
  onDemand: boolean
  startDate: string
  startDateMoment?: Moment
  endDate: string
  endDateMoment?: Moment
  passCode: string
  openLocker: boolean
  selectedItems: SelectedItem
  items: DesignType[]
  teamSizeRange: string
  createStore: any
  loading: boolean
  // Redux actions
  setTeamSizeAction: (id: number, range: string) => void
  updateNameAction: (name: string) => void
  updateStartDateAction: (dateMoment: Moment, date: string) => void
  updateEndDateAction: (dateMoment: Moment, date: string) => void
  updatePrivateAction: (active: boolean) => void
  updateOnDemandAction: (active: boolean) => void
  updatePassCodeAction: (code: string) => void
  setOpenLockerAction: (open: boolean) => void
  setItemSelectedAction: (id: number, checked: boolean) => void
  deleteItemSelectedAction: (index: number) => void
  setItemsAddAction: (items: DesignType[]) => void
  openQuickViewAction: (id: number, yotpoId: string) => void
  setItemVisibleAction: (index: number, visible: boolean) => void
  setLoadingAction: (loading: boolean) => void
  clearStoreAction: () => void
}

export class CreateStore extends React.Component<Props, {}> {
  state = {
    file: null,
    imagePreviewUrl: null
  }

  validateForm = () => {
    // TODO: Add form validation
  }

  beforeUpload = (file: any) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({ file, imagePreviewUrl: reader.result })
    }

    if (file) {
      reader.readAsDataURL(file)
    }

    return false
  }

  handleOnSelectRange = (id: number, range: string) => {
    const { setTeamSizeAction } = this.props
    setTeamSizeAction(id, range)
  }

  handleOnDeleteImage = () =>
    this.setState({ file: null, imagePreviewUrl: null })

  handleOnAddItem = () => {
    const { setOpenLockerAction } = this.props
    setOpenLockerAction(true)
  }

  handleOnCloseLocker = () => {
    const { setOpenLockerAction } = this.props
    setOpenLockerAction(false)
  }

  handleOnDeleteItem = (index: number) => {
    const { deleteItemSelectedAction } = this.props
    deleteItemSelectedAction(index)
  }

  handleOnPressQuickView = (id: number, yotpoId: string) => {
    const { openQuickViewAction } = this.props
    openQuickViewAction(id, yotpoId)
  }

  handleOnPressVisible = (index: number, visible: boolean) => {
    const { setItemVisibleAction } = this.props
    setItemVisibleAction(index, visible)
  }

  handleBuildTeamStore = async () => {
    const {
      createStore,
      name,
      startDate,
      endDate,
      privateStore,
      passCode,
      items: itemsSelected,
      setLoadingAction,
      clearStoreAction,
      history
    } = this.props
    const { file } = this.state
    setLoadingAction(true)
    const items = itemsSelected.map(({ id, visible, shortId }) => ({
      design_id: shortId,
      team_store_id: 1, // TODO: Delete after update mutation
      expected_quantity: 1, // TODO: Delete after update mutation
      visible: !!visible
    }))
    try {
      const teamStore = {
        name,
        cutoffDate: startDate,
        deliveryDate: endDate,
        private: privateStore,
        passcode: passCode,
        items
      }
      const { data: { store } } = await createStore({
        variables: { teamStore, file }
      })
      const { shortId } = store as any
      history.push(`/store-front?storeId=${shortId}`)
      clearStoreAction()
    } catch (error) {
      message.error('Something wrong happened. Please try again!')
      setLoadingAction(false)
    }
  }

  getCheckedItems = (items: DesignType[]) => {
    const checkedItems = {}
    for (const item of items) {
      checkedItems[item.id] = true
    }

    return checkedItems
  }

  render() {
    const { imagePreviewUrl } = this.state
    const {
      intl,
      history,
      teamSizeId,
      openLocker,
      updateNameAction,
      updateStartDateAction,
      updateEndDateAction,
      updatePrivateAction,
      updateOnDemandAction,
      updatePassCodeAction,
      setItemSelectedAction,
      deleteItemSelectedAction,
      setItemsAddAction,
      name,
      startDateMoment,
      endDateMoment,
      privateStore,
      onDemand,
      passCode,
      selectedItems,
      items,
      teamSizeRange,
      loading
    } = this.props
    const { formatMessage } = intl
    if (
      typeof window !== 'undefined' &&
      !JSON.parse(localStorage.getItem('user') as string)
    ) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    const bannerComponent = imagePreviewUrl ? (
      <PreviewImage src={imagePreviewUrl} />
    ) : (
      <Dragger onSelectImage={this.beforeUpload} />
    )

    const tableItems = this.getCheckedItems(items)

    return (
      <Layout {...{ history, intl }}>
        <Container>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <StoreForm
            {...{ name }}
            startDate={startDateMoment}
            endDate={endDateMoment}
            onUpdateName={updateNameAction}
            onSelectStartDate={updateStartDateAction}
            onSelectEndDate={updateEndDateAction}
          />
          <Subtitle>
            <FormattedMessage {...messages.teamSizeTitle} />
          </Subtitle>
          <Message>
            <FormattedMessage {...messages.teamSizeMessage} />
          </Message>
          <TeamSizes
            currentSelected={teamSizeId}
            onSelectRange={this.handleOnSelectRange}
          />
          <Subtitle>
            <FormattedMessage {...messages.priceDropTitle} />
          </Subtitle>
          <PriceMessage>
            <p>{formatMessage(messages.priceDropMessageP1)}</p>
            <p>{formatMessage(messages.priceDropMessageP2)}</p>
            <p>{formatMessage(messages.priceDropMessageP3)}</p>
          </PriceMessage>
          <Subtitle>
            <FormattedMessage {...messages.storeItemsTitle} />
          </Subtitle>
          <LockerMessage>
            <FormattedMessage {...messages.storeItemsMessage} />
          </LockerMessage>
          <Button
            type="primary"
            ghost={true}
            size="large"
            style={buttonStyle}
            onClick={this.handleOnAddItem}
          >
            {`+ ${formatMessage(messages.addItem)}`}
          </Button>
          <Subtitle>
            <FormattedMessage {...messages.stock} />
          </Subtitle>
          <LockerTable
            {...{ formatMessage, items, teamSizeRange }}
            onPressDelete={this.handleOnDeleteItem}
            onPressQuickView={this.handleOnPressQuickView}
            onPressVisible={this.handleOnPressVisible}
          />
          <Row>
            <Subtitle>
              <FormattedMessage {...messages.bannerMessage} />
            </Subtitle>
            {!!imagePreviewUrl && (
              <RowButtons>
                <Upload
                  beforeUpload={this.beforeUpload}
                  multiple={false}
                  showUploadList={false}
                  supportServerRender={true}
                >
                  <Button>Change</Button>
                </Upload>
                <ButtonDelete onClick={this.handleOnDeleteImage}>
                  Delete
                </ButtonDelete>
              </RowButtons>
            )}
          </Row>
          {bannerComponent}
          <RowSwitch>
            <SwitchWithLabel
              {...{ passCode, updatePassCodeAction }}
              withInput={true}
              checked={privateStore}
              onChange={updatePrivateAction}
              label={formatMessage(messages.privateLabel)}
              message={formatMessage(messages.privateMessage)}
            />
            <SwitchWithLabel
              checked={onDemand}
              onChange={updateOnDemandAction}
              label={formatMessage(messages.onDemandLabel)}
              message={formatMessage(messages.onDemandMessage)}
            />
          </RowSwitch>
          <Button
            {...{ loading }}
            type="primary"
            size="large"
            style={buttonBuildStyle}
            onClick={this.handleBuildTeamStore}
          >
            {formatMessage(messages.buttonBuild)}
          </Button>
          <LockerModal
            {...{ selectedItems, tableItems }}
            visible={openLocker}
            onRequestClose={this.handleOnCloseLocker}
            onSelectItem={setItemSelectedAction}
            onUnselectItem={deleteItemSelectedAction}
            onAddItems={setItemsAddAction}
          />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('createStore').toJS()

const CreateStoreEnhance = compose(
  injectIntl,
  withApollo,
  createStoreMutation,
  connect(mapStateToProps, { ...createStoreActions })
)(CreateStore)

export default CreateStoreEnhance
