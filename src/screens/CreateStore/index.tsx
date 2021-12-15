/**
 * CreateStore Screen - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl'
import { compose, withApollo, graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { FormattedHTMLMessage } from 'react-intl'
import { connect } from 'react-redux'
import Modal from 'antd/lib/modal'
import queryString from 'query-string'
import get from 'lodash/get'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Spin from 'antd/lib/spin'
import * as thunkActions from './thunkActions'
import PinSVG from '../../assets/pin.svg'
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
import {
  createStoreMutation,
  GetTeamStoreQuery,
  profileSettingsQuery,
  updateStoreMutation,
} from './data'
import {
  TeamstoreType,
  QueryProps,
  DesignResultType,
  LockerTableType,
  DesignType,
  SelectedDesignObjectType,
  UserType,
  IProfileSettings,
} from '../../types/common'
import * as createStoreActions from './actions'
import { cutoffDateSettingsQuery } from './data'
import dropLogo from '../../assets/dynamic_drop.png'
import messages from './messages'
import {
  Container,
  Title,
  Subtitle,
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
  BulletinLabel,
  Bulletin,
  PinDiv,
  Pin,
  Corner,
  BulletinInput,
  DynamicDropLogo,
  TitleContainer,
  ModalTitle,
  InfoBody,
  buttonStyle,
  DescDiv,
} from './styledComponents'
import config from '../../config/index'
import ImageCropper from '../../components/ImageCropper'
import {
  FIXED_TEAMSTORE,
  ON_DEMAND_TEAMSTORE,
  DEFAULT_CUTOFF_DAYS,
} from './constants'
import { APPROVED } from '../../constants'
import find from 'lodash/find'
import { getDesignLabInfo } from '../Home/data'
import { DesignLab } from '../Home'
const passwordRegex = /^[a-zA-Z0-9]{4,10}$/g
const BULLETIN_MAX_LENGTH = 120

interface Data extends QueryProps {
  teamStore: DesignResultType
}

interface ProfileData extends QueryProps {
  profileData: IProfileSettings
}

interface CutoffData extends QueryProps {
  cutoffDays: number
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
  initialStartDate?: Moment
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
  user: UserType
  cutoffSettings: CutoffData
  datesEdited: boolean
  datesEditedTemporal: boolean
  profileData: ProfileData
  dataDesignLabInfo: DesignLab
  // Redux actions
  setPriceAction: (
    value: number,
    currency: number,
    itemIndex: number,
    abbreviation: string
  ) => void
  setTeamSizeAction: (id: number, range: string) => void
  updateNameAction: (name: string) => void
  changeBulletinAction: (value: string) => void
  updateStartDateAction: (
    dateMoment: Moment,
    date: string,
    datesEdited: boolean
  ) => void
  updateEndDateAction: (
    dateMoment: Moment,
    date: string,
    datesEdited: boolean
  ) => void
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

const { info, confirm } = Modal

interface StateProps {
  hasError: boolean
  file: Blob | null
  imagePreviewUrl: string | null
}
export class CreateStore extends React.Component<Props, StateProps> {
  state = {
    file: null,
    imagePreviewUrl: '',
    hasError: false,
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
      intl: { formatMessage },
    } = this.props
    let validForm = true
    if (!name || ((!startDate || !endDate) && !onDemand)) {
      this.setState({
        hasError: !name || !startDate || !endDate || !items.length,
      })
      validForm = false
      zenscroll.toY(0)
    } else if (items.length < 1) {
      zenscroll.to(this.lockerTable)
      message.warning(formatMessage(messages.emptyList))
      validForm = false
    } else if (privateStore && (!passCode || !passwordRegex.test(passCode))) {
      this.setState({
        hasError: true,
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
      target: { value },
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
      location: { search },
    } = this.props
    const { storeId } = queryString.parse(search)

    return storeId
  }

  isOnDemand = () => {
    const {
      location: { search },
      profileData,
    } = this.props
    const { type, storeId } = queryString.parse(search)
    const resellerStatus = get(profileData, 'profileData.reseller.status', '')
    if (resellerStatus === APPROVED) {
      return true
    }
    if (storeId) {
      const { onDemand } = this.props
      return onDemand
    }
    if (type !== FIXED_TEAMSTORE && type !== ON_DEMAND_TEAMSTORE) {
      return true
    }
    return type === ON_DEMAND_TEAMSTORE
  }

  changePage = (pageParam: number = 1) => {
    const { limit } = this.props
    const offsetParam = pageParam > 1 ? (pageParam - 1) * limit : 0
    const {
      offset: offsetProp,
      currentPage: pageProp,
      setPaginationData,
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
      hasError: false,
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
      profileData,
      privateStore,
      bulletin,
      passCode,
      items: itemsSelected,
      setLoadingAction,
      history,
      teamSizeId,
      onDemand,
      banner,
      datesEditedTemporal,
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
    const reseller = get(profileData, 'profileData.reseller', {})
    const { currency: resellerCurrency, status: resellerStatus } =
      reseller || {}
    const isReseller = resellerStatus === APPROVED && onDemand
    const storeShortId = this.getStoreId()
    setLoadingAction(true)
    const items = itemsSelected.map((item) => {
      let resellerPrice = 0
      if (isReseller) {
        const priceSelected = get(
          find(item.resellerRange || [], ['abbreviation', resellerCurrency]),
          'price',
          0
        )
        const productPriceRange = get(item, 'design.product.priceRange', [])
        const normalPrice = find(productPriceRange, {
          quantity: '2-5',
          abbreviation: resellerCurrency,
        })
        const purchasePrice = normalPrice ? normalPrice.price : 0
        resellerPrice =
          priceSelected < purchasePrice ? purchasePrice : priceSelected
      }
      return {
        design_id: get(item, 'design.shortId'),
        visible: get(item, 'visible'),
        reseller_price: resellerPrice,
      }
    })

    try {
      let bannerResp = banner
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const user = JSON.parse(localStorage.getItem('user') || '')

        const uploadResp = await fetch(`${config.graphqlUriBase}uploadBanner`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
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
        demandMode: this.isOnDemand(),
        banner: bannerResp,
        datesEdited: datesEditedTemporal,
      }

      if (storeShortId) {
        const {
          data: {
            store: { message: messageResp },
          },
        } = await updateStore({
          variables: { teamStore },
          refetchQueries: [
            {
              query: GetTeamStoreQuery,
              variables: { teamStoreId: storeShortId },
            },
          ],
        })

        if (messageResp) {
          message.success(messageResp)
        }

        window.location.replace(`/store-front?storeId=${storeShortId}`)
      } else {
        const {
          data: { store },
        } = await createStore({
          variables: { teamStore },
        })

        const { shortId } = store as any
        history.push(`/store-front?storeId=${shortId}`)
      }
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      message.error(errorMessage)
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
      client: { query },
    } = this.props
    const { storeId } = queryString.parse(search)

    if (storeId) {
      query({
        query: GetTeamStoreQuery,
        variables: { teamStoreId: storeId },
        fetchPolicy: 'network-only',
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
      hasError: false,
    })
    clearDataAction()
  }

  openInfo = () => {
    const {
      intl: { formatMessage },
      onDemand,
    } = this.props
    info({
      title: (
        <ModalTitle>
          {formatMessage(
            onDemand ? messages.batchOrderTitle : messages.onDemandTitle
          )}
        </ModalTitle>
      ),
      icon: ' ',
      okText: formatMessage(messages.gotIt),
      okButtonProps: {
        style: buttonStyle,
      },
      content: (
        <InfoBody
          dangerouslySetInnerHTML={{
            __html: formatMessage(
              onDemand ? messages.batchOrderContent : messages.omDemandContent
            ),
          }}
        />
      ),
    })
  }

  openEditDatesInfo = async () => {
    const {
      intl: { formatMessage },
      endDateMoment,
      startDateMoment,
    } = this.props
    if (startDateMoment && endDateMoment) {
      confirm({
        title: formatMessage(messages.editDatesTitle),
        okText: formatMessage(messages.proceed),
        okButtonProps: {
          style: buttonStyle,
        },
        content: formatMessage(messages.editDatesMessage, {
          cutOff: startDateMoment.format('DD-MM-YYYY'),
          delivery: endDateMoment.format('DD-MM-YYYY'),
        }),
        onOk: async () => {
          try {
            await this.handleBuildTeamStore()
          } catch (e) {
            message.error(e.message)
          }
        },
      })
    } else {
      await this.handleBuildTeamStore()
    }
  }

  handleOnSetPrice = (value: number, currency: number, itemIndex: number) => {
    const { setPriceAction, profileData } = this.props
    const abbreviation = get(profileData, 'profileData.reseller.currency', {})
    setPriceAction(value, currency, itemIndex, abbreviation)
  }

  render() {
    const { imagePreviewUrl, hasError } = this.state
    const {
      intl,
      history,
      openLocker,
      updateNameAction,
      updateStartDateAction,
      updateEndDateAction,
      updateOnDemandAction,
      updatePassCodeAction,
      setItemSelectedAction,
      setItemsAddAction,
      moveRowAction,
      name,
      initialStartDate,
      startDateMoment,
      endDateMoment,
      privateStore,
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
      profileData,
      onUnselectItemAction,
      user,
      cutoffSettings,
      onDemand,
      startDate,
      datesEdited,
      dataDesignLabInfo,
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
    const reseller = get(profileData, 'profileData.reseller', {})
    const {
      comission: resellerComission,
      status: resellerStatus,
      currency: resellerCurrency,
    } = reseller
    const tableItems = this.getCheckedItems(items)
    const storeShortId = this.getStoreId()
    const isOnDemand = this.isOnDemand()
    const cutoffDays = get(cutoffSettings, 'cutoffDays', DEFAULT_CUTOFF_DAYS)
    const isReseller = resellerStatus === APPROVED && isOnDemand
    const deliveryDays = get(dataDesignLabInfo, 'deliveryDays.days', null)
    return (
      <Layout {...{ history, intl }}>
        {loading ? (
          <Loading>
            <Spin />
          </Loading>
        ) : (
          <Container>
            <TitleContainer>
              <Title>
                <FormattedMessage
                  {...messages[isReseller ? 'buildCustom' : 'title']}
                />
              </Title>
              {storeId && (isOnDemand || !startDate) && !isReseller && (
                <SwitchWithLabel
                  checked={onDemand}
                  onChange={updateOnDemandAction}
                  label={formatMessage(
                    isOnDemand
                      ? messages.switchToBatch
                      : messages.switchToDemand
                  )}
                  message={''}
                  infoIcon={true}
                  handleOpenInfo={this.openInfo}
                />
              )}
            </TitleContainer>
            <StoreForm
              {...{ formatMessage }}
              name={name}
              startDate={startDateMoment}
              endDate={endDateMoment}
              onUpdateName={updateNameAction}
              onSelectStartDate={updateStartDateAction}
              onSelectEndDate={updateEndDateAction}
              onDemand={isOnDemand}
              {...{
                hasError,
                cutoffDays,
                storeId,
                datesEdited,
                initialStartDate,
                isReseller,
              }}
            />
            {isOnDemand ? (
              <React.Fragment>
                <TextBlock>
                  <Subtitle>
                    <FormattedMessage {...messages.pricingCheckout} />
                  </Subtitle>
                  {isReseller ? (
                    <DescDiv
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.priceDropReseller),
                      }}
                    />
                  ) : (
                    <FormattedMessage
                      {...messages.pricingCheckoutContent}
                      values={{
                        onDemandTeam: (
                          <strong>
                            {formatMessage(messages.onDemandTeamStore)}
                          </strong>
                        ),
                        discount: (
                          <strong>{formatMessage(messages.percent)}</strong>
                        ),
                      }}
                    />
                  )}
                </TextBlock>
                <TextBlock>
                  <Subtitle>
                    <FormattedMessage {...messages.productionDelivery} />
                  </Subtitle>
                  {isReseller ? (
                    <DescDiv
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.deliveryReseller),
                      }}
                    />
                  ) : (
                    <FormattedMessage
                      {...messages.productionDeliveryContent}
                      values={{
                        orderDays: (
                          <strong>
                            {formatMessage(messages.orderDays, {
                              deliveryDays,
                            })}
                          </strong>
                        ),
                        shippingCompany: (
                          <strong>
                            {formatMessage(messages.shippingCompany)}
                          </strong>
                        ),
                        signature: (
                          <strong>{formatMessage(messages.signature)}</strong>
                        ),
                      }}
                    />
                  )}
                </TextBlock>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <DynamicDropLogo src={dropLogo} />
                <PriceMessage>
                  <FormattedHTMLMessage {...messages.priceDropMessage} />
                </PriceMessage>
              </React.Fragment>
            )}
            <Subtitle>
              <div
                ref={(table) => {
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
              {formatMessage(messages.addItem)}
            </AddItem>
            <LockerTable
              {...{
                formatMessage,
                teamSizeRange,
                currentCurrency,
                resellerComission,
                isReseller,
              }}
              items={items}
              hideQuickView={true}
              isFixed={!isOnDemand}
              currentCurrency={isReseller ? resellerCurrency : currentCurrency}
              onPressDelete={this.handleOnDeleteItem}
              onPressQuickView={this.handleOnPressQuickView}
              onPressVisible={this.handleOnPressVisible}
              handleOnSetPrice={this.handleOnSetPrice}
              onMoveRow={moveRowAction}
            />
            <Row>
              <BannerTitleContainer>
                <Subtitle>
                  <FormattedMessage {...messages.bannerMessage} />
                </Subtitle>
                <OptionalLabel>
                  {formatMessage(messages.optional)}
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
                  <FormattedMessage
                    {...messages[isReseller ? 'bulletinStore' : 'bulletin']}
                  />
                </Subtitle>
                <OptionalLabel>
                  {formatMessage(messages.optional)}
                </OptionalLabel>
              </BulletinLabel>
              <Bulletin>
                <PinDiv>
                  <Pin src={PinSVG} left={true} />
                  <Pin src={PinSVG} />
                </PinDiv>
                <BulletinInput
                  value={bulletin}
                  autosize={true}
                  placeholder={formatMessage(messages.bulletinPlaceholder)}
                  size="large"
                  onChange={this.handleOnBulletinChange}
                />
                <Corner />
              </Bulletin>
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
                  onClick={
                    !datesEdited
                      ? this.openEditDatesInfo
                      : this.handleBuildTeamStore
                  }
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
                offset,
              }}
              visible={openLocker}
              onRequestClose={this.handleOnCloseLocker}
              onSelectItem={setItemSelectedAction}
              onUnselectItem={onUnselectItemAction}
              onAddItems={setItemsAddAction}
              changePage={this.changePage}
              proDesign={false}
              userId={user ? user.id : ''}
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
  const app = state.get('app').toJS()
  return { ...createStore, ...langProps, ...app }
}

const CreateStoreEnhance = compose(
  injectIntl,
  withApollo,
  createStoreMutation,
  updateStoreMutation,
  graphql(profileSettingsQuery, {
    name: 'profileData',
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql(cutoffDateSettingsQuery, {
    name: 'cutoffSettings',
    options: {
      fetchPolicy: 'network-only',
    },
  }),
  graphql<DesignLab>(getDesignLabInfo, {
    options: () => ({
      fetchPolicy: 'network-only',
    }),
    name: 'dataDesignLabInfo',
  }),
  connect(
    mapStateToProps,
    { ...createStoreActions, ...thunkActions }
  )
)(CreateStore)

export default CreateStoreEnhance
