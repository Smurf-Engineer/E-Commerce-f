/**
 * DesignApproval Screen - Created by Jesús on 28/21/20.
 */
import * as React from 'react'
import ReactDOM from 'react-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import GoogleFontLoader from 'react-google-font-loader'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { compose, graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import AntdMessage from 'antd/lib/message'
import Button from 'antd/lib/button'
import messageIcon from '../../assets/approval_log.svg'
import JakRooLogo from '../../assets/Jackroologo.svg'
import quickView from '../../assets/quickview.svg'
import messageSent from '../../assets/message_sent.wav'
import colorIcon from '../../assets/color_white.svg'
import JakrooProLogo from '../../assets/pro_design_white.png'
import {
  addProMessageMutation,
  addTeamStoreItemMutation,
  approveDesignMutation,
  getFonts,
  getPredyedColors,
  getProdesignItemQuery,
  getVariantsFromProduct
} from './data'
import { restoreUserSession } from '../../components/MainLayout/api'
import Render3D from '../../components/Render3D'
import Layout from '../../components/MainLayout'
import * as designsActions from './actions'
import * as designsApiActions from './api'
import AntdTabs from 'antd/lib/tabs'
import { 
  QueryProps,
  Font,
  UserType,
  ProDesignItem,
  ProDesignMessage,
  UploadFile,
  Color as ColorType,
  Product,
  DesignType,
  PredyedColor,
  MessagePayload,
  ModelVariant,
  Notification
} from '../../types/common'
// TODO: Commented all quickview related until confirm it won't be needed
// import quickView from '../../assets/quickview.svg'
import {
  Accesories,
  ApprovalTitle,
  ApproveButton,
  ApprovedIcon,
  BackButton,
  BlackBar,
  BlackBarMobile,
  BottomButtons,
  BottomSheetWrapper,
  ButtonContainer,
  ButtonsContainer,
  ButtonWrapper,
  CancelButton,
  ChatCount,
  ChatMessages,
  Clip,
  CodeColor,
  CollapseMobile,
  CollapseWrapper,
  Color,
  ColorBlock,
  ColorContainer,
  ColorName,
  Colors,
  Container,
  CountCircle,
  DateMessage,
  DesignChat,
  DesignImage,
  DesignName,
  FileLabel,
  FileName,
  IncomingMessage,
  InfoDiv,
  InfoText,
  Initials,
  JakrooLogo,
  JakrooProDesign,
  LayoutRight,
  Layouts,
  LeftArrow,
  LoadingContainer,
  MessageBody,
  MessageBox,
  MessageFile,
  MessageHeader,
  ModalSubtitle,
  ModalTitle,
  ModelTitle,
  okButtonStyles,
  PanelIcon,
  PanelMobile,
  PanelTitle,
  ParentText,
  ProductName,
  Products,
  ProjectDesign,
  PromptTitle,
  PurchaseButton,
  QuickView,
  RenderSection,
  RequestButtons,
  RequestEdit,
  RequestText,
  RequiredText,
  RowTitle,
  SaveButton,
  StatusLabel,
  StyledIcon,
  StyledTabs,
  StyledTitle,
  StyledUpload,
  TabContent,
  TextAreaStyled,
  UploadButton,
  UserIcon,
  VariantButton,
  Variants,
  WarningIcon
} from './styledComponents'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Tab from './Tab'
import Modal from 'antd/lib/modal'
import { COLOR, APPROVAL, LIMIT_REQUESTS } from './constants'
import {
  CUSTOMER_APPROVED,
  EDIT,
  FROM_ADMIN,
  PREDYED_DEFAULT,
  PREDYED_TRANSPARENT,
  PROJECT_MESSAGE
} from '../../constants'
import moment from 'moment'
import messages from './messages'
import Spin from 'antd/lib/spin'
import { getFileWithExtension } from '../../utils/utilsFiles'
import { UploadChangeParam } from 'antd/lib/upload'
import AccessoryColors from './AccessoryColors'
import SwipeableBottomSheet from 'react-swipeable-clickeable-bottom-sheet'
// import clone from 'lodash/clone'
import ShareDesignModal from '../../components/ShareDesignModal'
import AddToCartButton from '../../components/AddToCartButton'
import AddToTeamStore from '../../components/AddToTeamStore'
import unset from 'lodash/unset'

const { confirm } = Modal
const { TabPane } = AntdTabs

interface PredyedData extends QueryProps {
  getPredyedColors: PredyedColor[]
}

interface DataVariants extends QueryProps {
  getVariants: ModelVariant[]
}

interface Data extends QueryProps {
  projectItem: ProDesignItem
}

interface StateProps {
  selectedKey: string
  openShare: boolean
  openBottom: boolean
  teamStoreId: string
  itemToAdd: any
  openAddToStoreModal: boolean
  selectedVariant: number
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  client: any
  user: UserType
  openRequest: boolean
  note: string
  file: string
  sendingNote: boolean
  history: History
  fontsData: any
  uploadingFile: boolean
  parentMessageId: string
  parentMessage: string
  predyedData: PredyedData
  approveLoading: boolean
  dataVariants: DataVariants
  openQuickViewAction: (index: number) => void
  setApproveLoading: (loading: boolean) => void
  addItemToStore: (variables: {}) => Promise<MessagePayload>
  setApproveDesign: (variables: {}) => Promise<ProDesignMessage>
  sendNoteProdesign: (variables: {}) => Promise<ProDesignMessage>
  setSendingAction: (loading: boolean) => void
  setReplyAction: (id: string, message: string) => void
  changeNoteAction: (value: string) => void
  uploadFileAction: (file: UploadFile) => void
  restoreUserSessionAction: (client: any) => void
  setOpenModal: (open: boolean) => void
}

export class DesignApproval extends React.Component<Props, StateProps> {
  state = {
    selectedKey: APPROVAL,
    openShare: false,
    openBottom: false,
    openAddToStoreModal: false,
    teamStoreId: '',
    itemToAdd: {},
    selectedVariant: -1
  }
  private listMsg: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
    navigator.serviceWorker.addEventListener('message', this.reloadMessages)
  }
  componentWillUnmount() {
    navigator.serviceWorker.removeEventListener('message', this.reloadMessages)
  }
  componentWillMount() {
    const { user, client } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSessionAction } = this.props
      restoreUserSessionAction(client)
    }
  }
  componentDidUpdate(prevProps: Props) {
    const { data } = this.props
    const { data: oldData } = prevProps
    const oldMessages = get(oldData, 'projectItem.messages', [])
    const newMessages = get(data, 'projectItem.messages', [])
    if (oldMessages.length !== newMessages.length) {
      this.scrollMessages()
    }
  }
  reloadMessages = async (notification: Notification) => {
    const { data: notificationData } = notification
    const payload = get(notificationData, 'firebase-messaging-msg-data.data', notificationData)
    const { notification_type } = payload
    if (notification_type === PROJECT_MESSAGE) {
      const { data } = this.props
      await data.refetch()
    }
  }
  onTabClickAction = (selectedKey: string) => {
    this.setState({ selectedKey })
  }
  handleOpenShare = () => {
    this.setState({ openShare: true })
  }
  handleCloseShare = () => {
    this.setState({ openShare: false })
  }
  handleOpenRequest = () => {
    const { setOpenModal } = this.props
    setOpenModal(true)
  }
  handleSetTeamStore = (itemToAdd: {}, teamStoreId: string) => {
    this.setState({ teamStoreId, itemToAdd })
  }
  handleCloseRequest = () => {
    const { setOpenModal } = this.props
    setOpenModal(false)
  }
  handleOnPressBack = () => {
    window.location.replace('/')
  }

  uploadFile = (event: UploadChangeParam) => {
    const { uploadFileAction } = this.props
    const { file } = event
    uploadFileAction(file)
  }

  beforeUpload = (file: any) => {
    const { intl: { formatMessage } } = this.props
    const isLt2M = file.size / 1024 / 1024 < 20
    if (!isLt2M) {
      AntdMessage.error(formatMessage(messages.sizeError))
    }
    return isLt2M
  }

  handleChangeNote = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value }
    } = evt
    const { changeNoteAction } = this.props
    changeNoteAction(value)
  }

  addMessage = async () => {
    const {
      intl: { formatMessage } ,
      sendNoteProdesign,
      setSendingAction,
      note,
      parentMessageId,
      file,
      location,
    } = this.props
    try {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      const itemId = queryParams.id
      if (itemId) {
        setSendingAction(true)
        await sendNoteProdesign({
          variables: {
            itemId,
            message: note,
            file,
            parentMessageId
          },
          update: (store: any, responseData: ProDesignMessage) => {
            const responseMessage = get(responseData, 'data.messageData', {})
            const data = store.readQuery({
              query: getProdesignItemQuery,
              variables: { shortId: itemId },
              fetchPolicy: 'network-only'
            })
            const messagesArray = get(data, 'projectItem.messages', [])
            messagesArray.push(responseMessage)
            store.writeQuery({
              query: getProdesignItemQuery,
              variables: { shortId: itemId },
              fetchPolicy: 'network-only',
              data,
            })
          }
        })
        this.handleCloseRequest()
        AntdMessage.success(formatMessage(messages.savedNote))
        const snd = new Audio(messageSent)
        snd.play()
        snd.remove()
        this.scrollMessages()
      }
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      AntdMessage.error(errorMessage)
    } finally {
      setSendingAction(false)
    }
  }

  handlePromptApprove = () => {
    const { intl: { formatMessage } } = this.props
    confirm({
      title: (
        <PromptTitle>
          {formatMessage(messages.areYouSure)}
        </PromptTitle>
      ),
      icon: ' ',
      width: 342,
      okText: formatMessage(messages.confirm),
      okButtonProps: {
        style: okButtonStyles
      },
      cancelText: formatMessage(messages.cancel),
      onOk: async () => {
        await this.approveDesign()
      },
      content: (
        <InfoText
          dangerouslySetInnerHTML={{
            __html: formatMessage(messages.infoApprove)
        }} />
      )
    })
  }

  approveDesign = async () => {
    const {
      intl: { formatMessage } ,
      setApproveDesign,
      data,
      setApproveLoading,
      location,
    } = this.props
    try {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      const itemId = queryParams.id
      if (!!itemId) {
        setApproveLoading(true)
        await setApproveDesign({ variables: { itemId } })
        data.refetch()
        AntdMessage.success(formatMessage(messages.approved))
      }
    } catch (e) {
      AntdMessage.error(e.message)
    } finally {
      setApproveLoading(false)
    }
  }

  scrollMessages = () => {
    if (window && this.listMsg) {
      const node = ReactDOM.findDOMNode(this.listMsg) as HTMLElement
      node.scrollTop = node.scrollHeight
    }
  }

  goToHome = () => {
    window.location.replace('/')
  }

  toggleBottomSheet = () => {
    this.setState(({ openBottom }) => ({ openBottom: !openBottom }))
  }

  replyMessage = (id: string, message: string) => () => {
    const { setReplyAction } = this.props
    setReplyAction(id, message)
  }

  handleAddToCart = () => {
    const { data } = this.props
    const status = get(data, 'projectItem.status', '')
    if (status === CUSTOMER_APPROVED) {
      return true
    }
    return false
  }

  goToDesign = (id: string) => () => {
    const { history } = this.props
    history.push(`/approval?id=${id}`)
    this.setState({ openBottom: false })
  }

  closeAddToStoreModal = () => {
    this.setState({ openAddToStoreModal: false })
  }

  openAddToStoreModal = () => {
    this.setState({ openAddToStoreModal: true })
  }

  saveItemToStore = async () => {
    const {
      addItemToStore,
      intl: { formatMessage },
    } = this.props

    const { teamStoreId, itemToAdd } = this.state
    unset(itemToAdd, 'team_store_name')
    try {
      const { data } = await addItemToStore({
        variables: { teamStoreItem: itemToAdd, teamStoreId }
      })
      const responseMessage = get(data, 'addTeamStoreItem.message')
      if (responseMessage) {
        AntdMessage.success(formatMessage(messages.addedToStore))
      }
      this.closeAddToStoreModal()
    } catch (error) {
      const errorMessage = error.graphQLErrors.map((x: any) => x.message)
      AntdMessage.error(errorMessage, 5)
    }
  }

  handleSelectVariant = (value: number) => () => {
    this.setState({ selectedVariant: value })
  }

  openFile = (url: string) => () => {
    window.open(url)
  }

  handleOpenQuickView = () => {
    const {
      data
    } = this.props
    const productId = get(data, 'projectItem.product.id', '')
    const { openQuickViewAction: openQuickView } = this.props
    openQuickView(productId)
  }

  render() {
    const {
      fontsData,
      data,
      openRequest,
      parentMessageId,
      parentMessage,
      approveLoading,
      note,
      history,
      dataVariants,
      predyedData,
      uploadingFile,
      file,
      sendingNote,
      intl
    } = this.props
    const { formatMessage } = intl
    const {
      selectedKey,
      openBottom,
      openShare,
      openAddToStoreModal,
      teamStoreId,
      selectedVariant
    } = this.state
    const fontList: Font[] = get(fontsData, 'fonts', [])
    const { loading = true, projectItem } = data || {}
    const requestMessages = get(projectItem, 'messages', []) as ProDesignMessage[]
    const product = get(projectItem, 'product', {}) as Product
    const design = get(projectItem, 'design', {}) as DesignType
    const colors = get(projectItem, 'colors', []) as ColorType[]
    const projectDesigns = get(projectItem, 'project.designs', []) as DesignType[]
    const itemStatus = get(projectItem, 'status', '') as string
    const predyedColors = get(predyedData, 'getPredyedColors', [])
    const {
      id: designSerialId,
      predyedName,
      stitchingValue,
      stitchingName,
      zipperColor,
      outputSvg,
      canvas,
      bibColor,
      bindingColor,
      name: designName,
      shortId: designId,
      createdAt: createdAtDesign,
      image: designImage,
      code: designCode,
      shared
    } = design
    const {
      hasPredyed,
      modelSize,
      name: productName
    } = product || {}

    const variants = get(dataVariants, 'getVariants', [])
    let modelObj
    let modelMtl
    if (selectedVariant !== -1) {
      const { obj, mtl } = variants[selectedVariant]
      modelObj = obj
      modelMtl = mtl
    }
    const predyedValue = predyedName || PREDYED_DEFAULT
    const hidePredyed = predyedValue === PREDYED_TRANSPARENT
    const predyedItem = predyedColors.find(({ name: colorName }) => colorName === predyedValue)
    const predyedCode = predyedItem ? predyedItem.code : predyedValue
    const installedFonts = fontList.reduce<{ font: string }[]>(
      (fontObject, { active, family }) => {
        if (active) {
          fontObject.push({ font: family })
        }
        return fontObject
      },
      []
    )

    const proDesignModel = {
      createdAt: createdAtDesign,
      designCode,
      designId: designSerialId,
      designImage,
      designName,
      product,
      shared,
      shortId: designId,
      svg: outputSvg,
      canvas,
      bibBraceColor: bibColor,
      bindingColor,
      flatlockCode: stitchingName,
      flatlockColor: stitchingValue,
      zipperColor,
      itemDetails: [{ quantity: 1 }]
    }
    const requestedEdits = requestMessages.filter(({ type }) => type === EDIT).length
    const fileName = file ? getFileWithExtension(file) : ''
    const adminMessages = requestMessages.filter(({ type }) => type === FROM_ADMIN).length
    const chatComponent = (!!itemStatus && itemStatus !== CUSTOMER_APPROVED) ?
      <DesignChat>
        <ApprovalTitle>{formatMessage(messages.approvalLog)}</ApprovalTitle>
        <ChatMessages ref={(listMsgs: any) => { this.listMsg = listMsgs }}>
          {requestMessages.map((
            { 
              id,
              message: incomingMessage,
              createdAt: createdMessage,
              type: messageType,
              requireAnswer: required,
              answer,
              file: messageFile,
              parentMessageId: parentId,
            }, 
            key: number
            ) =>
            <IncomingMessage isAdmin={messageType === FROM_ADMIN} {...{ key }} >
              <MessageHeader isAdmin={messageType === FROM_ADMIN}>
                <Initials>
                  {messageType === FROM_ADMIN ?
                    <JakrooLogo src={JakRooLogo} /> : <UserIcon type="user" />
                  }
                </Initials>                        
              </MessageHeader>
              <InfoDiv isAdmin={messageType === FROM_ADMIN}>
                <MessageBox>
                  {(!!parentId && answer) &&
                    <ParentText>
                      {answer.message}
                    </ParentText>
                  }
                  <MessageBody>
                    {incomingMessage}
                  </MessageBody>
                  {required && 
                    <RequiredText onClick={this.replyMessage(id, incomingMessage)}>
                      {formatMessage(messages.required)}
                    </RequiredText>
                  }
                  {!!messageFile &&
                    <MessageFile onClick={this.openFile(messageFile)}>
                      <Clip type="paper-clip" />
                      <FileName>
                        {getFileWithExtension(messageFile || '')}
                      </FileName>
                    </MessageFile>
                  }
                </MessageBox>
                <DateMessage>
                  {createdMessage ? moment(createdMessage).format('DD/MM/YYYY HH:mm') : '-'}
                </DateMessage>
              </InfoDiv>
            </IncomingMessage>
          )}
        </ChatMessages>
        <RequestButtons>
          <RequestEdit onClick={this.handleOpenRequest}>
            <RequestText>{formatMessage(messages.requestEdit)}</RequestText>
            {requestedEdits} of {LIMIT_REQUESTS}
          </RequestEdit>
          <PurchaseButton>
            {formatMessage(messages.purchaseMore)}
          </PurchaseButton>
        </RequestButtons>
      </DesignChat> : null

    const colorComponent = (!!itemStatus && itemStatus !== CUSTOMER_APPROVED) ?
      <Colors>
        <ApprovalTitle>{formatMessage(messages.colors)}</ApprovalTitle>
        <ColorBlock>
          <CodeColor>Colors:</CodeColor>
          {colors.map(({ name, value }, index) =>
            <ColorContainer key={index}>
              <Color color={value} />
              <ColorName>
                {name}
              </ColorName>
            </ColorContainer>
          )}
        </ColorBlock>
        <Accesories>
          <AccessoryColors
            {...{
              hasPredyed,
              predyedValue,
              predyedCode,
              stitchingValue,
              stitchingName,
              zipperColor,
              bibColor,
              bindingColor
            }}
          />
        </Accesories>
      </Colors> : null

    return (
      <Layout {...{ history, intl }} hideBottomHeader={true} hideFooter={true}>
        <Container>
          {installedFonts.length ? (
            <GoogleFontLoader fonts={installedFonts} />
          ) : null}
          {loading && <LoadingContainer><Spin size="large" /></LoadingContainer> }
          <BlackBarMobile>
            <BackButton onClick={this.goToHome}>
              <LeftArrow type="left-circle" />
              {designName || productName}
            </BackButton>
            <StatusLabel>
              {itemStatus === CUSTOMER_APPROVED ? 
                <ApprovedIcon theme="filled" type="check-circle" />
                : <WarningIcon theme="filled" type="exclamation-circle" />
              }
              {itemStatus}
            </StatusLabel>
          </BlackBarMobile>
          <BlackBar>
            <BackButton onClick={this.goToHome}>
              <LeftArrow type="left" />
              {formatMessage(messages.back)}
            </BackButton>
            <JakrooProDesign src={JakrooProLogo} />
            <StatusLabel>
              {itemStatus === CUSTOMER_APPROVED ? 
                <ApprovedIcon theme="filled" type="check-circle" />
                : <WarningIcon theme="filled" type="exclamation-circle" />
              }
              {itemStatus}
            </StatusLabel>
          </BlackBar>
          <Layouts>
            {(!!itemStatus && itemStatus !== CUSTOMER_APPROVED) &&
              <StyledTabs activeKey={selectedKey} onTabClick={this.onTabClickAction}>
                <TabPane tab={<Tab label={APPROVAL} icon={messageIcon} />} key={APPROVAL}>
                  <TabContent>
                    {chatComponent}                      
                  </TabContent>
                </TabPane>
                <TabPane tab={<Tab label={COLOR} icon={colorIcon} />} key={COLOR}>
                  <TabContent>
                    {colorComponent}
                  </TabContent>
                </TabPane>
              </StyledTabs>
            }
            <LayoutRight>
              <ApproveButton
                loading={approveLoading}
                disabled={approveLoading || itemStatus === CUSTOMER_APPROVED}
                onClick={this.handlePromptApprove}
              >
                {formatMessage(messages.approve)}
              </ApproveButton>
              <ButtonsContainer>
                <RowTitle>
                  <ModelTitle>{productName}</ModelTitle>
                  <QuickView onClick={this.handleOpenQuickView} src={quickView} />
                </RowTitle>
                {itemStatus === CUSTOMER_APPROVED &&
                  <ButtonWrapper>
                    <Button type="primary" onClick={this.handleOpenShare}>
                      {formatMessage(messages.shareButton)}
                    </Button>
                  </ButtonWrapper>
                }
              </ButtonsContainer>
              {variants.length > 1 && (
                <Variants secondary={itemStatus === CUSTOMER_APPROVED}>
                  {variants.map(({ icon }, index) => (
                    <VariantButton
                      key={index}
                      onClick={this.handleSelectVariant(index)}
                      selected={selectedVariant === index}
                      src={icon || JakRooLogo}
                    />
                  ))}
                </Variants>
              )}
              {(itemStatus === CUSTOMER_APPROVED) &&
                <BottomButtons>
                  <ButtonWrapper noMargin={true}>
                    <Button onClick={this.openAddToStoreModal}>
                      {formatMessage(messages.addToTeam)}
                    </Button>
                  </ButtonWrapper>
                  <ButtonWrapper marginTop={true} noMargin={true}>
                    <AddToCartButton
                      orderDetails={true}
                      label={formatMessage(messages.addToCart)}
                      onClick={this.handleAddToCart}
                      item={proDesignModel}
                      {...{ designName, designImage, formatMessage, designId }}
                    />
                  </ButtonWrapper>
                </BottomButtons>
              }
              {!!designId && 
                <RenderSection>
                  <Render3D
                    customProduct={true}
                    textColor="white"
                    {...{
                      designId,
                      modelSize,
                      modelObj,
                      modelMtl,
                      hidePredyed
                    }}
                    zoomedIn={true}
                  />
                </RenderSection>
              }
            </LayoutRight>
          </Layouts>
          {(!!itemStatus && itemStatus !== CUSTOMER_APPROVED) &&
            <CollapseWrapper>
              <CollapseMobile accordion={true} destroyInactivePanel={true}>
                <PanelMobile 
                  header={
                    <PanelTitle>
                      <PanelIcon src={messageIcon} />
                      {formatMessage(messages.approvalLog)}
                      <ChatCount>
                        <CountCircle>
                          {adminMessages}
                        </CountCircle>
                      </ChatCount>
                    </PanelTitle>
                  }
                  key="1"
                >
                  {chatComponent}
                </PanelMobile>
                <PanelMobile 
                  header={
                    <PanelTitle>
                      <PanelIcon src={colorIcon} />
                      {formatMessage(messages.colors)}
                    </PanelTitle>
                  }
                  key="2"
                >
                  {colorComponent}
                </PanelMobile>
              </CollapseMobile>
            </CollapseWrapper>
          }
          <BottomSheetWrapper>
            {(!loading && product) &&
              <SwipeableBottomSheet
                overflowHeight={64}
                open={openBottom}
                overlayClicked={this.toggleBottomSheet}
                style={{ zIndex: 3 }}
              >
                <StyledTitle onClick={this.toggleBottomSheet}>
                  {formatMessage(messages.products)}
                </StyledTitle>
                <Products>
                  {projectDesigns.map((
                    { 
                      id,
                      name: nameDesign,
                      image,
                      product: { name: nameProduct, pictures = [{ front: ''}] }
                    }: DesignType, 
                    index: number) => 
                    <ProjectDesign onClick={this.goToDesign(id)} key={index}>
                      <DesignImage src={image || pictures[0].front} />
                      <DesignName>{nameDesign || '<Pending>'}</DesignName>
                      <ProductName>{nameProduct}</ProductName>
                    </ProjectDesign>
                  )}
                </Products>
              </SwipeableBottomSheet>
            }
          </BottomSheetWrapper>
          <ShareDesignModal
            open={openShare}
            requestClose={this.handleCloseShare}
            savedDesignId={designId}
            {...{ formatMessage }}
          />
          <Modal
            visible={openAddToStoreModal}
            footer={null}
            onCancel={this.closeAddToStoreModal}
            destroyOnClose={true}
            maskClosable={true}
          >
            <AddToTeamStore
              {...{
                history,
                teamStoreId
              }}
              addItemToStore={this.saveItemToStore}
              setItemToAddAction={this.handleSetTeamStore}
              openAddToTeamStoreModalAction={this.openAddToStoreModal}
              savedDesignId={designId}
            />
          </Modal>
          <Modal 
            visible={openRequest}
            footer={null}
            closable={false}
            width={'612px'}
          >
            <ModalTitle>{formatMessage(messages[!!parentMessageId ? 'enterAnswer' : 'enterEditNotes'])}</ModalTitle>
            {!!parentMessageId ?
              <ParentText>
                {parentMessage}
              </ParentText> :
              <ModalSubtitle>
                {requestedEdits} of {LIMIT_REQUESTS}
              </ModalSubtitle>
            }
            <TextAreaStyled
              value={note}
              disabled={sendingNote}
              placeholder={formatMessage(messages.sendCustomerMessage)}
              onChange={this.handleChangeNote}
              autosize={{ minRows: 4, maxRows: 12 }}
              rows={4}
            />
            <ModalSubtitle>{formatMessage(messages.fileQuestion)}</ModalSubtitle>
            <StyledUpload
              listType="picture-card"
              className="avatar-uploader"
              disabled={uploadingFile}
              customRequest={this.uploadFile}
              showUploadList={false}
              beforeUpload={this.beforeUpload}
            >
              <UploadButton>
                {uploadingFile ? 
                  <Spin size="small" />
                  : <>
                      <StyledIcon type="upload" />
                      {formatMessage(messages.selectFile)}
                    </>
                  }
              </UploadButton>
            </StyledUpload>
            {!!fileName &&
              <FileLabel>
                <Clip type="paper-clip" />
                <FileName>
                  {fileName}
                </FileName>
              </FileLabel>
            }
            <ButtonContainer>
              <CancelButton
                disabled={sendingNote}
                onClick={this.handleCloseRequest}
              >
                {formatMessage(messages.cancel)}
              </CancelButton>
              <SaveButton
                loading={sendingNote}
                disabled={!note || sendingNote}
                onClick={this.addMessage}
              >
                {formatMessage(messages[!!parentMessageId ? 'reply' : 'send'])}
              </SaveButton>
            </ButtonContainer>
          </Modal>
        </Container>
      </Layout>
    )
  }
}

interface OwnProps {
  location?: any
  data?: Data
}

const mapStateToProps = (state: any) => {
  const designs = state.get('designApproval').toJS()
  const responsive = state.get('responsive').toJS()
  const app = state.get('app').toJS()
  return {
    ...app,
    ...designs,
    ...responsive
  }
}

const DesignsEnhance = compose(
  injectIntl,
  getFonts,
  withApollo,
  connect(mapStateToProps, {
    ...designsActions,
    ...designsApiActions,
    openQuickViewAction,
    restoreUserSessionAction: restoreUserSession
  }),
  graphql(addTeamStoreItemMutation, { name: 'addItemToStore' }),
  graphql(getPredyedColors, { name: 'predyedData' }),
  graphql(approveDesignMutation, { name: 'setApproveDesign' }),
  graphql(addProMessageMutation, { name: 'sendNoteProdesign' }),
  graphql(getProdesignItemQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      return {
        variables: { shortId: queryParams.id },
        fetchPolicy: 'network-only',
        skip: !queryParams.id
      }
    }
  }),
  graphql(getVariantsFromProduct, {
    options: ({ data }: OwnProps) => {
      const productId = get(data, 'projectItem.product.id', '')
      return {
        fetchPolicy: 'network-only',
        skip: !productId,
        variables: {
          id: productId
        }
      }
    },
    name: 'dataVariants'
  }),
)(DesignApproval)

export default DesignsEnhance
