/**
 * CreateStore Screen - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl'
import { compose, withApollo } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import get from 'lodash/get'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import { Moment } from 'moment'
import message from 'antd/lib/message'
import { RouteComponentProps } from 'react-router-dom'
import zenscroll from 'zenscroll'
import Layout from '../../components/MainLayout'
import LockerTable from '../../components/LockerTable'
import LockerModal from '../../components/LockerModal'
import SwitchWithLabel from '../../components/SwitchWithLabel'
import Dragger from '../../components/TeamDragger'
import StoreForm from '../../components/StoreForm'
import TeamSizes from '../../components/TeamSizes'
import {
  createStoreMutation,
  GetTeamStoreQuery,
  updateStoreMutation
} from './data'
import {
  DesignType,
  SelectedItem,
  TeamstoreType,
  QueryProps,
  DesignResultType
} from '../../types/common'
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
  AddItem,
  ButtonBuildStyle,
  BannerTitleContainer,
  OptionalLabel
} from './styledComponents'
import config from '../../config/index'

interface Data extends QueryProps {
  teamStore: DesignResultType
}

interface Props extends RouteComponentProps<any> {
  data: Data
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
  updateStore: any
  loading: boolean
  client: any
  banner: string
  storeId: number
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
  openQuickViewAction: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  setItemVisibleAction: (index: number, visible: boolean) => void
  setLoadingAction: (loading: boolean) => void
  clearStoreAction: () => void
  moveRowAction: (index: number, row: any) => void
  setDataToEditAction: (data: TeamstoreType) => void
  deleteBannerOnEditAction: () => void
  clearDataAction: () => void
}

interface StateProps {
  hasError: boolean
  file: string | null
  imagePreviewUrl: string | null
}
export class CreateStore extends React.Component<Props, StateProps> {
  state = {
    file: null,
    imagePreviewUrl: '',
    hasError: false
  }
  private lockerTable: any

  validateForm = (
    name: string,
    startDate: string,
    endDate: string,
    items: DesignType[],
    passCode: string
  ) => {
    const { privateStore } = this.props
    let validForm = true

    if (!name || !startDate || !endDate) {
      this.setState({
        hasError: !name || !startDate || !endDate || !items.length
      })
      validForm = false
      zenscroll.toY(0)
    } else if (items.length < 1) {
      zenscroll.to(this.lockerTable)
      message.warning('you need to add Items to your store!')
      validForm = false
    } else if (privateStore && !passCode) {
      this.setState({
        hasError: true
      })
      validForm = false
    }

    return validForm
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

  handleOnDeleteImage = () => {
    const { banner, deleteBannerOnEditAction: deleteBanner } = this.props
    if (banner) {
      deleteBanner()
    }
    this.setState({ file: null, imagePreviewUrl: null })
  }

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
    openQuickViewAction(id, yotpoId, true)
  }

  handleOnPressVisible = (index: number, visible: boolean) => {
    const { setItemVisibleAction } = this.props
    setItemVisibleAction(index, visible)
  }

  getStoreId = () => {
    const {
      location: { search }
    } = this.props
    const { storeId } = queryString.parse(search)

    return storeId
  }

  clearState = () => {
    this.setState({
      file: null,
      imagePreviewUrl: '',
      hasError: false
    })
  }

  handleBuildTeamStore = async () => {
    const {
      storeId,
      createStore,
      updateStore,
      name,
      startDate,
      endDate,
      privateStore,
      passCode,
      items: itemsSelected,
      setLoadingAction,
      history,
      teamSizeId,
      onDemand,
      banner
    } = this.props
    const { file } = this.state
    const validForm = this.validateForm(
      name,
      startDate,
      endDate,
      itemsSelected,
      passCode
    )

    if (!validForm) {
      return
    }

    const storeShortId = this.getStoreId()
    setLoadingAction(true)
    const items = itemsSelected.map(item => {
      return {
        design_id: get(item, 'design.shortId'),
        visible: get(item, 'visible')
      }
    })

    try {
      const formData = new FormData()

      formData.append('file', file as any)
      const user = JSON.parse(localStorage.getItem('user') || '')

      const uploadResp = await fetch(`${config.graphqlUriBase}uploadBanner`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: formData
      })
      const bannerResp = await uploadResp.json()

      const teamStore = {
        id: storeId,
        short_id: storeShortId,
        name,
        cutoffDate: startDate,
        deliveryDate: endDate,
        private: privateStore,
        passcode: passCode,
        items,
        teamsizeId: teamSizeId,
        demandMode: onDemand,
        banner: bannerResp.image || banner
      }

      if (storeShortId) {
        const {
          data: {
            store: { message: messageResp }
          }
        } = await updateStore({
          variables: { teamStore },
          refetchQueries: [
            {
              query: GetTeamStoreQuery,
              variables: { teamStoreId: storeShortId }
            }
          ]
        })

        if (messageResp) {
          message.success(messageResp)
        }

        history.push(`/store-front?storeId=${storeShortId}`)
      } else {
        const {
          data: { store }
        } = await createStore({
          variables: { teamStore }
        })

        const { shortId } = store as any
        history.push(`/store-front?storeId=${shortId}`)
      }
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

  handlePrivateSwitch = (checked: boolean) => {
    const { updatePrivateAction } = this.props
    updatePrivateAction(checked)
  }

  async componentDidMount() {
    const {
      setDataToEditAction,
      location: { search },
      client: { query }
    } = this.props
    const { storeId } = queryString.parse(search)

    if (storeId) {
      query({
        query: GetTeamStoreQuery,
        variables: { teamStoreId: storeId },
        fetchPolicy: 'network-only'
      })
        .then(({ data: { teamStore } }: any) => {
          setDataToEditAction(teamStore)
        })
        .catch((err: any) => {
          console.error(err)
        })
    }
  }

  componentWillUnmount() {
    const { clearDataAction } = this.props
    this.setState({
      file: null,
      imagePreviewUrl: '',
      hasError: false
    })
    clearDataAction()
  }

  render() {
    const { imagePreviewUrl, hasError } = this.state
    const {
      intl,
      history,
      teamSizeId,
      openLocker,
      updateNameAction,
      updateStartDateAction,
      updateEndDateAction,
      updateOnDemandAction,
      updatePassCodeAction,
      setItemSelectedAction,
      deleteItemSelectedAction,
      setItemsAddAction,
      moveRowAction,
      name,
      startDateMoment,
      endDateMoment,
      privateStore,
      onDemand,
      passCode,
      selectedItems,
      items,
      teamSizeRange,
      loading,
      banner,
      location: { search }
    } = this.props
    const { formatMessage } = intl
    const { storeId } = queryString.parse(search)

    if (
      typeof window !== 'undefined' &&
      !JSON.parse(localStorage.getItem('user') as string)
    ) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    const bannerComponent =
      imagePreviewUrl || (storeId && banner) ? (
        <PreviewImage src={imagePreviewUrl || banner} />
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
            {...{ formatMessage }}
            name={name}
            startDate={startDateMoment}
            endDate={endDateMoment}
            onUpdateName={updateNameAction}
            onSelectStartDate={updateStartDateAction}
            onSelectEndDate={updateEndDateAction}
            {...{ hasError }}
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
            <div
              ref={table => {
                this.lockerTable = table
              }}
            >
              <FormattedMessage {...messages.storeItemsTitle} />
            </div>
          </Subtitle>
          <LockerMessage>
            <FormattedMessage {...messages.storeItemsMessage} />
          </LockerMessage>
          <AddItem
            type="primary"
            ghost={true}
            size="large"
            onClick={this.handleOnAddItem}
          >
            {`+ ${formatMessage(messages.addItem)}`}
          </AddItem>
          <Subtitle>
            <FormattedMessage {...messages.stock} />
          </Subtitle>
          <LockerTable
            {...{ formatMessage, teamSizeRange }}
            items={items}
            onPressDelete={this.handleOnDeleteItem}
            onPressQuickView={this.handleOnPressQuickView}
            onPressVisible={this.handleOnPressVisible}
            onMoveRow={moveRowAction}
          />
          <Row>
            <BannerTitleContainer>
              <Subtitle>
                <FormattedMessage {...messages.bannerMessage} />
              </Subtitle>
              <OptionalLabel>
                {`(${formatMessage(messages.optional)})`}
              </OptionalLabel>
            </BannerTitleContainer>
            {(!!imagePreviewUrl || storeId) && (
              <RowButtons>
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
              </RowButtons>
            )}
          </Row>
          {bannerComponent}
          <RowSwitch>
            <SwitchWithLabel
              hasError={hasError}
              defaultChecked={true}
              {...{ passCode, updatePassCodeAction }}
              withInput={true}
              checked={privateStore}
              onChange={this.handlePrivateSwitch}
              label={formatMessage(messages.privateLabel)}
              message={formatMessage(messages.privateMessage)}
              errorLabel={formatMessage(messages.requiredFieldLabel)}
            />
            {storeId && (
              <SwitchWithLabel
                checked={onDemand}
                onChange={updateOnDemandAction}
                label={formatMessage(messages.onDemandLabel)}
                message={formatMessage(messages.onDemandMessage)}
              />
            )}
          </RowSwitch>
          <ButtonBuildStyle
            {...{ loading }}
            type="primary"
            size="large"
            onClick={this.handleBuildTeamStore}
          >
            {formatMessage(messages.buttonBuild)}
          </ButtonBuildStyle>
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
  updateStoreMutation,
  connect(mapStateToProps, { ...createStoreActions })
)(CreateStore)

export default CreateStoreEnhance
