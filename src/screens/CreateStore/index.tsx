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
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import * as thunkActions from './thunkActions'
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
  TeamstoreType,
  QueryProps,
  DesignResultType,
  LockerTableType,
  DesignType,
  SelectedDesignObjectType
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
  BannerTitleContainer,
  OptionalLabel,
  ButtonOptionStyle,
  ButtonOptionsWrapper,
  Loading,
  TextBlock,
  SaveButton,
  RowColumn,
  BulletinLabel
} from './styledComponents'
import config from '../../config/index'
import ImageCropper from '../../components/ImageCropper'
const passwordRegex = /^[a-zA-Z0-9]{4,10}$/g
const BULLETIN_MAX_LENGTH = 100

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
  open: boolean
  startDateMoment?: Moment
  endDate: string
  endDateMoment?: Moment
  passCode: string
  openLocker: boolean
  selectedItems: SelectedDesignObjectType
  items: LockerTableType[]
  teamSizeRange: string
  createStore: any
  updateStore: any
  loading: boolean
  client: any
  banner: string
  storeId: number
  currentCurrency: string
  limit: number
  offset: number
  currentPage: number
  bulletin: string
  // Redux actions
  setTeamSizeAction: (id: number, range: string) => void
  updateNameAction: (name: string) => void
  changeBulletinAction: (value: string) => void
  updateStartDateAction: (dateMoment: Moment, date: string) => void
  updateEndDateAction: (dateMoment: Moment, date: string) => void
  updatePrivateAction: (active: boolean) => void
  updateOnDemandAction: (active: boolean) => void
  updatePassCodeAction: (code: string) => void
  setOpenLockerAction: (open: boolean) => void
  setItemSelectedAction: (item: DesignType, checked: boolean) => void
  deleteItemSelectedAction: (index: number) => void
  setItemsAddAction: () => void
  openQuickViewAction: (
    id: number,
    yotpoId: string,
    hideSliderButtons?: boolean
  ) => void
  openModal: (open: boolean) => void
  setItemVisibleAction: (index: number, visible: boolean) => void
  setLoadingAction: (loading: boolean) => void
  clearStoreAction: () => void
  moveRowAction: (index: number, row: any) => void
  setDataToEditAction: (data: TeamstoreType) => void
  deleteBannerOnEditAction: () => void
  clearDataAction: () => void
  setPaginationData: (offset: number, page: number) => void
  onUnselectItemAction: (keyName: string) => void
}

interface StateProps {
  hasError: boolean
  file: Blob | null
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
    items: LockerTableType[],
    passCode: string,
    onDemand: boolean
  ) => {
    const {
      privateStore,
      intl: { formatMessage }
    } = this.props
    let validForm = true
    if (!name || ((!startDate || !endDate) && !onDemand)) {
      this.setState({
        hasError: !name || !startDate || !endDate || !items.length
      })
      validForm = false
      zenscroll.toY(0)
    } else if (items.length < 1) {
      zenscroll.to(this.lockerTable)
      message.warning(formatMessage(messages.emptyList))
      validForm = false
    } else if (privateStore && (!passCode || !passwordRegex.test(passCode))) {
      this.setState({
        hasError: true
      })
      validForm = false
    }

    return validForm
  }
  closeModal = () => {
    const { openModal } = this.props
    openModal(false)
  }
  setImage = (file: Blob) => {
    const { openModal } = this.props
    this.setState({ file, imagePreviewUrl: URL.createObjectURL(file) })
    openModal(false)
  }
  beforeUpload = (file: any) => {
    const { openModal } = this.props
    const reader = new FileReader()

    reader.onloadend = () => {
      this.setState({ file, imagePreviewUrl: reader.result })
    }

    if (file) {
      reader.readAsDataURL(file)
    }
    openModal(true)
    return false
  }
  handleOnBulletinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { changeBulletinAction } = this.props
    const {
      target: { value }
    } = event
    if (value.length <= BULLETIN_MAX_LENGTH) {
      changeBulletinAction(value)
    }
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

  changePage = (pageParam: number = 1) => {
    const { limit } = this.props
    const offsetParam = pageParam > 1 ? (pageParam - 1) * limit : 0
    const {
      offset: offsetProp,
      currentPage: pageProp,
      setPaginationData
    } = this.props
    let offset = offsetParam !== undefined ? offsetParam : offsetProp
    let currentPage = pageParam !== undefined ? pageParam : pageProp

    if (!offsetParam && !pageParam) {
      const fullPage = !(offset % limit)
      const maxPageNumber = offset / limit

      if (fullPage && currentPage > maxPageNumber) {
        currentPage--
        offset = currentPage > 1 ? (currentPage - 1) * limit : 0
      }
    }

    setPaginationData(offset, currentPage)
  }

  clearState = () => {
    this.setState({
      file: null,
      imagePreviewUrl: '',
      hasError: false
    })
  }

  handleCancelTeamStore = () => {
    history.back()
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
      bulletin,
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
      passCode,
      onDemand
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
      let bannerResp = banner
      if (file) {
        const formData = new FormData()
        formData.append('file', file as any, 'banner.jpeg')
        const user = JSON.parse(localStorage.getItem('user') || '')

        const uploadResp = await fetch(`${config.graphqlUriBase}uploadBanner`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        })
        const { image } = await uploadResp.json()
        bannerResp = image
      }

      const teamStore = {
        id: storeId,
        short_id: storeShortId,
        name,
        bulletin,
        cutoffDate: startDate,
        deliveryDate: endDate,
        private: privateStore,
        passcode: passCode,
        items,
        teamsizeId: teamSizeId,
        demandMode: onDemand,
        banner: bannerResp
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
      message.error(
        `Something wrong happened. Please try again! ${error.message}`
      )
      setLoadingAction(false)
    }
  }

  getCheckedItems = (items: LockerTableType[]) => {
    const checkedItems = {}
    for (const item of items) {
      const itemId = get(item, 'design.id', item.id)
      checkedItems[itemId] = true
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
      setLoadingAction,
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
    } else {
      setLoadingAction(false)
    }
    window.scrollTo(0, 0)
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
      // updateOnDemandAction,
      updatePassCodeAction,
      setItemSelectedAction,
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
      bulletin,
      loading,
      open,
      banner,
      location: { search },
      currentCurrency,
      currentPage,
      limit,
      offset,
      onUnselectItemAction
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

    const storeShortId = this.getStoreId()

    return (
      <Layout {...{ history, intl }}>
        {loading ? (
          <Loading>
            <Spin />
          </Loading>
        ) : (
          <Container>
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <StoreForm
              {...{ formatMessage, onDemand }}
              name={name}
              startDate={startDateMoment}
              endDate={endDateMoment}
              onUpdateName={updateNameAction}
              onSelectStartDate={updateStartDateAction}
              onSelectEndDate={updateEndDateAction}
              {...{ hasError }}
            />
            {onDemand ? (
              <React.Fragment>
                <TextBlock>
                  <Subtitle>
                    <FormattedMessage {...messages.pricingCheckout} />
                  </Subtitle>
                  <FormattedMessage
                    {...messages.pricingCheckoutContent}
                    values={{
                      onDemandTeam: (
                        <b>{formatMessage(messages.onDemandTeamStore)}</b>
                      ),
                      discount: <b>{formatMessage(messages.percent)}</b>
                    }}
                  />
                </TextBlock>
                <TextBlock>
                  <Subtitle>
                    <FormattedMessage {...messages.productionDelivery} />
                  </Subtitle>
                  <FormattedMessage
                    {...messages.productionDeliveryContent}
                    values={{
                      orderDays: <b>{formatMessage(messages.orderDays)}</b>,
                      shippingCompany: (
                        <b>{formatMessage(messages.shippingCompany)}</b>
                      ),
                      signature: <b>{formatMessage(messages.signature)}</b>
                    }}
                  />
                </TextBlock>
              </React.Fragment>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
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
            <LockerTable
              {...{ formatMessage, teamSizeRange, currentCurrency }}
              items={items}
              hideQuickView={true}
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
            <RowColumn>
              <BulletinLabel>
                <Subtitle>
                  <FormattedMessage {...messages.bulletin} />
                </Subtitle>
                <OptionalLabel>
                  {`(${formatMessage(messages.optional)})`}
                </OptionalLabel>
              </BulletinLabel>
              <Input
                value={bulletin}
                placeholder={formatMessage(messages.bulletinPlaceholder)}
                size="large"
                onChange={this.handleOnBulletinChange}
              />
            </RowColumn>
            <RowSwitch>
              <SwitchWithLabel
                hasError={hasError}
                defaultChecked={true}
                {...{ passCode, updatePassCodeAction }}
                withInput={true}
                checked={privateStore}
                onChange={this.handlePrivateSwitch}
                placeholder={formatMessage(messages.passcode)}
                label={formatMessage(messages.privateLabel)}
                subLabel={formatMessage(messages.passFormat)}
                message={formatMessage(messages.privateMessage)}
                errorLabel={formatMessage(messages.requiredFieldLabel)}
              />
              {/* TODO: Hidding onDemand-FixedDate Switch until FixDate feature */}
              {/* {storeId && (
                <SwitchWithLabel
                  checked={onDemand}
                  onChange={updateOnDemandAction}
                  label={formatMessage(messages.onDemandLabel)}
                  message={formatMessage(messages.onDemandMessage)}
                />
              )} */}
            </RowSwitch>
            {storeShortId ? (
              <ButtonOptionsWrapper>
                <ButtonOptionStyle
                  {...{ loading }}
                  size="large"
                  onClick={this.handleCancelTeamStore}
                >
                  {formatMessage(messages.cancel)}
                </ButtonOptionStyle>
                <SaveButton
                  {...{ loading }}
                  size="large"
                  onClick={this.handleBuildTeamStore}
                >
                  {formatMessage(messages.save)}
                </SaveButton>
              </ButtonOptionsWrapper>
            ) : (
              <SaveButton
                {...{ loading }}
                type="primary"
                width="316px"
                size="large"
                onClick={this.handleBuildTeamStore}
              >
                {formatMessage(messages.buttonBuild)}
              </SaveButton>
            )}
            <LockerModal
              {...{
                selectedItems,
                tableItems,
                currentPage,
                limit,
                offset
              }}
              visible={openLocker}
              onRequestClose={this.handleOnCloseLocker}
              onSelectItem={setItemSelectedAction}
              onUnselectItem={onUnselectItemAction}
              onAddItems={setItemsAddAction}
              changePage={this.changePage}
            />
            <ImageCropper
              {...{ formatMessage, open }}
              requestClose={this.closeModal}
              setImage={this.setImage}
              image={imagePreviewUrl}
            />
          </Container>
        )}
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => {
  const createStore = state.get('createStore').toJS()
  const langProps = state.get('languageProvider').toJS()
  return { ...createStore, ...langProps }
}

const CreateStoreEnhance = compose(
  injectIntl,
  withApollo,
  createStoreMutation,
  updateStoreMutation,
  connect(
    mapStateToProps,
    { ...createStoreActions, ...thunkActions }
  )
)(CreateStore)

export default CreateStoreEnhance
