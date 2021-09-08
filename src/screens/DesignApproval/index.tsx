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
import viewDesignsIcon from '../../assets/view_designs_icon.svg'
import JakrooProLogo from '../../assets/pro_design_white.png'
import {
  addProMessageMutation,
  addTeamStoreItemMutation,
  approveDesignMutation,
  getFonts,
  addProductProjectMutation,
  getPredyedColors,
  getProdesignItemQuery,
  getVariantsFromProduct
} from './data'
import {
  openLoginAction
} from '../../components/MainLayout/actions'
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
  AvailableCircle,
  AvailableLabel,
  BackButton,
  BlackBar,
  BlackBarMobile,
  BottomButtons,
  BottomSheetWrapper,
  ButtonContainer,
  buttonPrompt,
  ButtonsContainer,
  ButtonWrapper,
  CancelButton,
  ChatCount,
  ChatMessages,
  Clip,
  CodeColor,
  CodeLabel,
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
  DescLabel,
  DesignChat,
  DesignImage,
  DesignLabel,
  DesignName,
  DraggableModalStyled,
  EditsLabel,
  FileLabel,
  FileName,
  FullTitle,
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
  MobileRequestButtons,
  ModalSubtitle,
  ModalTitle,
  ModelTitle,
  NameLabel,
  okButtonStyles,
  PanelIcon,
  PanelMobile,
  PanelTitle,
  ParentText,
  ProductName,
  Products,
  ProjectDesign,
  ProLabel,
  PromptBody,
  PrompText,
  PromptLink,
  PromptSubtitle,
  PromptTitle,
  ProStatus,
  QuickView,
  RenderSection,
  RequestButtons,
  RequestEdit,
  RequestsTitle,
  RequestText,
  RequiredText,
  RowTitle,
  SaveButton,
  StatusLabel,
  StyledIcon,
  StyledTabs,
  StyledTitle,
  StyledUpload,
  stylesDraggable,
  stylesDraggableMobile,
  TabContent,
  TextAreaStyled,
  TypeLabel,
  UploadButton,
  UserIcon,
  VariantButton,
  Variants
} from './styledComponents'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Tab from './Tab'
import Modal from 'antd/lib/modal'
import { COLOR, APPROVAL } from './constants'
import {
  CUSTOMER_APPROVED,
  CUSTOMER_PREVIEW,
  EDIT,
  FROM_ADMIN,
  IN_DESIGN,
  itemLabels,
  NEW_PRODUCT,
  PREDYED_DEFAULT,
  PREDYED_TRANSPARENT,
  PREFLIGHT_STATUS,
  PROJECT_MESSAGE,
  PROJECT_REVIEW
} from '../../constants'
import moment from 'moment'
import messages from './messages'
import Spin from 'antd/lib/spin'
import { getFileWithExtension } from '../../utils/utilsFiles'
import { UploadChangeParam } from 'antd/lib/upload'
import AccessoryColors from './AccessoryColors'
import SwipeableBottomSheet from 'react-swipeable-clickeable-bottom-sheet'
import ShareDesignModal from '../../components/ShareDesignModal'
import AddToCartButton from '../../components/AddToCartButton'
import AddToTeamStore from '../../components/AddToTeamStore'
import unset from 'lodash/unset'
import {
  BLUE_STATUS,
  BLACK,
  GREEN_STATUS,
  ORANGE_STATUS,
  ORANGE,
  GRAY_DARK,
  WHITE,
  FACEBOOKBLUE
} from '../../theme/colors'
import PayModal from '../../components/PayModal'

const { confirm, info } = Modal
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
  project: string
  product: string
  openLoginAction: (open: boolean, callback?: boolean) => void
  setEditProject: (project?: number, product?: number) => void
  openQuickViewAction: (
    id: number,
    yotpoId: string | null,
    gender?: number,
    hideSliderButtons?: boolean
  ) => void
  setApproveLoading: (loading: boolean) => void
  addProductProject: (variables: {}) => Promise<MessagePayload>
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
    designToApply: '',
    selectedVariant: -1,
    retryLoad: false
  }
  private listMsg: any
  private chatDiv: any
  private catalogDiv: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
    navigator.serviceWorker.addEventListener('message', this.reloadMessages)
    const { history, user, openLoginAction: openLoginModalAction } = this.props
    const userSaved = localStorage.getItem('user')
    if (!user && !userSaved) {
      this.setState({ retryLoad: true })
      openLoginModalAction(true)
      return
    }
    const search = get(history, 'location.search', '')
    const { project, product } = queryString.parse(search)
    if (!!project && !!product) {
      this.handleEditProject(project, product)
    }
    if (/mobile/i.test(navigator.userAgent)) {
      setTimeout(() => { window.scrollTo(0, 1) }, 3000)
    }
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
    const { data, user } = this.props
    const { data: oldData, user: oldUser } = prevProps
    const { retryLoad } = this.state
    const oldMessages = get(oldData, 'projectItem.messages', [])
    const newMessages = get(data, 'projectItem.messages', [])
    if (user !== oldUser && retryLoad) {
      location.reload()
    }
    if (oldMessages.length !== newMessages.length) {
      setTimeout(() => { this.scrollMessages() }, 2000)
    }
    if (window._slaask) {
      window._slaask.destroy()
    }
  }
  handleEditProject = (project?: number, product?: number) => {
    const { setEditProject } = this.props 
    setEditProject(project, product)
  }
  reloadMessages = async (notification: Notification) => {
    const { data: notificationData } = notification
    const payload = get(notificationData, 'firebase-messaging-msg-data.data', notificationData)
    const { notification_type } = payload
    if (notification_type === PROJECT_MESSAGE || notification_type === PROJECT_REVIEW) {
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
    const { setOpenModal, project, product, history } = this.props
    if (project && product) {
      history.replace(`/pro-design?id=${project}`)
    } else {
      setOpenModal(false)
    }
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

  openMessages = () => {
    const node = ReactDOM.findDOMNode(this.chatDiv) as HTMLElement
    if (node) {
      node.click()
    }
  }

  clickCatalog = () => {
    const node = ReactDOM.findDOMNode(this.catalogDiv) as HTMLElement
    if (node) {
      node.click()
    }
  }

  addMessage = async () => {
    const {
      intl: { formatMessage },
      sendNoteProdesign,
      setSendingAction,
      note,
      parentMessageId,
      file,
      history,
      project,
      product,
      addProductProject,
      location,
    } = this.props
    try {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      const { id: itemId } = queryParams || {}
      if (itemId) {
        setSendingAction(true)
        if (parentMessageId) {
          await sendNoteProdesign({
            variables: {
              itemId,
              message: note,
              file,
              parentMessageId
            },
            update: (store: any, responseData: ProDesignMessage) => {
              const responseMessage = get(responseData, 'data.messageData', {})
              const storedData = store.readQuery({
                query: getProdesignItemQuery,
                variables: { shortId: itemId }
              })
              const messagesArray = get(storedData, 'projectItem.messages', [])
              messagesArray.push(responseMessage)
              setTimeout(() => { this.scrollMessages() }, 1000)
              store.writeQuery({
                query: getProdesignItemQuery,
                variables: { shortId: itemId },
                data: storedData
              })
            },
          })
        } else {
          await sendNoteProdesign({
            variables: {
              itemId,
              message: note,
              file,
              parentMessageId
            },
            refetchQueries: [{
              query: getProdesignItemQuery,
              variables: { shortId: itemId },
              options: {
                fetchPolicy: 'network-only'
              }
            }]
          })
        }
        this.handleCloseRequest()
        AntdMessage.success(formatMessage(messages.savedNote))
        const snd = new Audio(messageSent)
        snd.play()
        snd.remove()
        if (!parentMessageId) {
          this.openMessages()
          this.promptEditRequest()
        }
      } else if (project && product) {
        setSendingAction(true)
        const response = await addProductProject({
          variables: {
            project,
            product,
            message: note,
            file
          }
        })
        const responseId = get(response, 'data.addProductProject.shortId', '')
        history.replace(`/approval?id=${responseId}`)
        this.handleEditProject()
        AntdMessage.success(formatMessage(messages.savedProduct))
      }
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      AntdMessage.error(errorMessage)
    } finally {
      setSendingAction(false)
    }
  }

  promptEditRequest = (approved?: boolean) => {
    const { data, intl: { formatMessage }, location } = this.props
    const projectDesigns = get(data, 'projectItem.project.designs', []) as DesignType[]
    const search = location ? location.search : ''
    const queryParams = queryString.parse(search)
    const filteredDesigns = projectDesigns.filter((item: DesignType) => 
      item.status === CUSTOMER_PREVIEW && item.id !== queryParams.id
    )
    info({
      title: <FullTitle secondary={approved}>
              {formatMessage(messages[approved ? 'approvedCode' : 'editRequestedTitle'])}
            </FullTitle>,
      icon: ' ',
      width: '470px',
      className: 'centeredButtons',
      okText: formatMessage(messages.close),
      okButtonProps: {
        style: buttonPrompt
      },
      content:
        <PromptBody>
          <PromptSubtitle>
            {formatMessage(messages[approved ? 'congratulations' : 'editRequestedSubtitle'])}
          </PromptSubtitle>
          {!approved && 
            <PrompText>
              {formatMessage(messages.editRequestedBody)}
            </PrompText>
          }
          {filteredDesigns.length > 0 ?
            <>
              <PromptSubtitle>
                {formatMessage(messages.editsLeft, { amount: filteredDesigns.length })}
              </PromptSubtitle>
              <PromptLink onClick={this.reviewAnother}>
                  {formatMessage(messages.continueWithReview)}
              </PromptLink>
            </> :
            <PromptLink onClick={approved ? this.goToLocker : this.backToProjects}>
              {formatMessage(messages[approved ? 'takeToLocker' : 'backToMyProject'])}
            </PromptLink>
          }
        </PromptBody>
    })
  }

  goToLocker = () => {
    const { history } = this.props
    Modal.destroyAll()
    history.push('/account?option=myLocker')
  }

  reviewAnother = () => {
    const { location, data, history } = this.props
    const search = location ? location.search : ''
    const queryParams = queryString.parse(search)
    const projectDesigns = get(data, 'projectItem.project.designs', []) as DesignType[]
    const nextDesign = projectDesigns.find((item: DesignType) => 
      item.status === CUSTOMER_PREVIEW && item.id !== queryParams.id
    )
    if (nextDesign && projectDesigns.length > 0) {
      const { id } = nextDesign
      Modal.destroyAll()
      history.replace(`/approval?id=${id}`)
    }
  }

  backToProjects = () => {
    const { history } = this.props
    Modal.destroyAll()
    history.push('/account?option=proDesignProjects')
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
        this.openMessages()
        this.promptEditRequest(true)
      }
    } catch (e) {
      AntdMessage.error(e.message)
    } finally {
      setApproveLoading(false)
    }
  }

  scrollMessages = () => {
    if (window && this.listMsg) {
      const node = document.getElementsByClassName('chatLog')[0] as HTMLElement
      if (node) {
        node.scrollTop = node.scrollHeight
      }
    }
  }

  goToHome = () => {
    const { history, data } = this.props
    const projectId = get(data, 'projectItem.project.id', '')
    if (projectId) {
      history.push(`/account?option=proDesignProjects&id=${projectId}`)
    }
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
    this.clickCatalog()
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

  changeDesign = (design: string) => () => {
    if (design) {
      const { intl: { formatMessage } } = this.props
      this.setState({ designToApply: design })
      AntdMessage.success(formatMessage(messages.designApplied))
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
    openQuickView(productId, null, undefined, true)
  }

  render() {
    const {
      fontsData,
      data,
      project,
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
      designToApply,
      openAddToStoreModal,
      teamStoreId,
      selectedVariant
    } = this.state
    const fontList: Font[] = get(fontsData, 'fonts', [])
    const { loading = true, projectItem, error } = data || {}
    const incomingMessages = get(projectItem, 'messages', []) as ProDesignMessage[]
    const product = get(projectItem, 'product', {}) as Product
    const design = get(projectItem, 'design', {}) as DesignType
    const colors = get(projectItem, 'colors', []) as ColorType[]
    const highlight = get(projectItem, 'showNotification', false) as boolean
    const projectDesigns = get(projectItem, 'project.designs', []) as DesignType[]
    const itemStatus = get(projectItem, 'status', '') as string
    const limitRequests = get(projectItem, 'limitRequests', 0) as number
    const predyedColors = get(predyedData, 'getPredyedColors', [])
    const {
      id: designSerialId,
      predyedName,
      stitchingValue,
      stitchingName,
      zipperColor,
      outputSvg,
      outputPng,
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
      predyedlabel,
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
    const stylesToApply = typeof window !== 'undefined' && 
      window.innerWidth > 614 ? stylesDraggable : stylesDraggableMobile
    const predyedValue = predyedName || PREDYED_DEFAULT
    const hidePredyed = predyedValue === PREDYED_TRANSPARENT
    const readyToShow = !!designId && (itemStatus === CUSTOMER_APPROVED || itemStatus === CUSTOMER_PREVIEW)
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
    let statusColor = null
    if (!!itemStatus) {
      switch (itemStatus) {
        case PREFLIGHT_STATUS:
          statusColor = BLACK
          break
        case CUSTOMER_APPROVED:
          statusColor = GREEN_STATUS
          break
        case CUSTOMER_PREVIEW:
          statusColor = ORANGE_STATUS
          break
        default:
          statusColor = BLUE_STATUS
          break
      }
    }

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
    let requestedEdits = 0
    let adminMessages = 0
    const requestMessages = incomingMessages.reduce((arr: ProDesignMessage[], messageItem: ProDesignMessage) => {
      const { type, createdAt, code } = messageItem
      arr.push(messageItem)
      switch (type) {
        case EDIT:
          arr.push({
            id: -1,
            createdAt,
            type: FROM_ADMIN,
            message: formatMessage(messages.editAutoMessage),
            code
          })
          requestedEdits += 1
          break
        case FROM_ADMIN:
          adminMessages += 1
          break
        case NEW_PRODUCT:
          arr.push({
            id: 0,
            createdAt,
            type: FROM_ADMIN,
            message: formatMessage(messages.newProduct),
            code
          })
          break
        default:
          break
      }
      return arr
    // tslint:disable-next-line: align
    }, [])
    const fileName = file ? getFileWithExtension(file) : ''
    const chatLog = requestMessages.length > 0 ?
      requestMessages :
      [{
        id: 1,
        message: formatMessage(messages.initialMessage),
        createdAt: new Date(),
        type: FROM_ADMIN,
        requireAnswer: false,
      }]
    const chatComponent = !!itemStatus ?
      <DesignChat>
        <ApprovalTitle>{formatMessage(messages.approvalLog)}</ApprovalTitle>
        <ChatMessages
          highlight={chatLog && chatLog.length && highlight}
          className="chatLog"
          ref={(listMsgs: any) => { this.listMsg = listMsgs }}
        >
          {chatLog.map((
            { 
              id,
              message: incomingMessage,
              createdAt: createdMessage,
              type: messageType,
              requireAnswer: required,
              answer,
              design: designFile,
              code: messageCode,
              file: messageFile,
              parentMessageId: parentId,
            }: ProDesignMessage, 
            key: number
            ) => {
              const fromSystem = messageType === FROM_ADMIN || messageType === CUSTOMER_APPROVED
              let codeColor = ORANGE
              if (messageType === FROM_ADMIN && id !== -1) {
                codeColor = GRAY_DARK
              } else if (messageType === CUSTOMER_APPROVED) {
                codeColor = GREEN_STATUS
              }
              return (
                <IncomingMessage isAdmin={fromSystem} {...{ key }} >
                  <MessageHeader isAdmin={fromSystem}>
                    <Initials>
                      {fromSystem ?
                        <JakrooLogo src={JakRooLogo} /> : <UserIcon type="user" />
                      }
                    </Initials>                        
                  </MessageHeader>
                  <InfoDiv isAdmin={fromSystem}>
                    <MessageBox highlight={chatLog && chatLog.length && highlight}>
                      {(!!parentId && answer) &&
                        <ParentText>
                          {answer.message}
                        </ParentText>
                      }
                      <MessageBody
                        dangerouslySetInnerHTML={{
                          __html: messageType === CUSTOMER_APPROVED ? 
                            formatMessage(messages.congratulations) :
                            incomingMessage
                        }}
                      />
                        
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
                      {messageType === NEW_PRODUCT &&
                        <TypeLabel>{formatMessage(messages.newDesign)}</TypeLabel>
                      }
                      {(!!messageCode || messageType === CUSTOMER_APPROVED) &&
                        <CodeLabel
                          {...{ codeColor }}
                          codeColor={designToApply !== designFile ? codeColor : FACEBOOKBLUE}
                          isAdmin={fromSystem}
                          onClick={this.changeDesign(designFile)}
                          secondary={!!designFile}
                        >
                          {messageType === CUSTOMER_APPROVED ? formatMessage(messages.approvedCode) : messageCode}
                        </CodeLabel>
                      }
                    </MessageBox>
                    <DateMessage>
                      {createdMessage ? moment(createdMessage).format('DD/MM/YYYY HH:mm') : '-'}
                    </DateMessage>
                  </InfoDiv>
                </IncomingMessage>
            )}
          )}
        </ChatMessages>
        <RequestButtons>
          <ApproveButton
            loading={approveLoading}
            disabled={
              approveLoading || 
              itemStatus !== CUSTOMER_PREVIEW || 
              (!!designToApply && outputPng !== designToApply)
            }
            onClick={this.handlePromptApprove}
          >
            {formatMessage(messages.approve)}
          </ApproveButton>
          <RequestEdit
            disabled={itemStatus !== CUSTOMER_PREVIEW}
            onClick={this.handleOpenRequest}
          >
            <RequestText secondary={itemStatus !== CUSTOMER_PREVIEW}>
              {formatMessage(messages.requestEdit)}
            </RequestText>
            <EditsLabel>{requestedEdits} of {limitRequests}</EditsLabel>
          </RequestEdit>
        </RequestButtons>
      </DesignChat> : null

    const colorComponent = !!itemStatus ?
      <Colors>
        <ApprovalTitle>{formatMessage(messages.colors)}</ApprovalTitle>
        <ColorBlock>
          <CodeColor>{formatMessage(messages.baseColors)}</CodeColor>
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
              predyedlabel,
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
          {loading && !error && <LoadingContainer><Spin size="large" /></LoadingContainer> }
          <BlackBarMobile>
            <BackButton onClick={this.goToHome}>
              <LeftArrow type="left-circle" />
              {designName || productName}
            </BackButton>
          </BlackBarMobile>
          <BlackBar>
            <BackButton onClick={this.goToHome}>
              <LeftArrow type="left" />
              {formatMessage(messages.back)}
            </BackButton>
            <JakrooProDesign src={JakrooProLogo} />
          </BlackBar>
          <Layouts>
            {!!itemStatus &&
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
              {readyToShow &&
                <NameLabel>
                  <DesignLabel>
                    <DescLabel>{formatMessage(messages.designName)}</DescLabel>
                    {designName}
                  </DesignLabel>
                  <DesignLabel>
                    <DescLabel>{formatMessage(messages.designNo)}</DescLabel>
                    {designCode}
                  </DesignLabel>
                </NameLabel>
              }
              {!!itemStatus && 
                <StatusLabel color={statusColor}>
                  {itemLabels[itemStatus] || formatMessage(messages.inDesign)}
                </StatusLabel>
              }
              <ButtonsContainer>
                {readyToShow &&
                  <ButtonWrapper secondary={true}>
                    <Button type="primary" onClick={this.handleOpenShare}>
                      {formatMessage(messages.shareButton)}
                    </Button>
                  </ButtonWrapper>
                }
                <RowTitle>
                  <ModelTitle>{productName}</ModelTitle>
                  <QuickView onClick={this.handleOpenQuickView} src={quickView} />
                </RowTitle>
              </ButtonsContainer>
              {variants.length > 1 && (
                <Variants secondary={itemStatus !== PREFLIGHT_STATUS && !!designId}>
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
              {itemStatus === CUSTOMER_APPROVED && !designId &&
                <BottomButtons>
                  <ButtonWrapper noMargin={true}>
                    <Button onClick={this.openAddToStoreModal}>
                      {formatMessage(messages.addToTeam)}
                    </Button>
                  </ButtonWrapper>
                  <ButtonWrapper selected={true} marginTop={true} noMargin={true}>
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
              <MobileRequestButtons>
                <ApproveButton
                  loading={approveLoading}
                  disabled={
                    approveLoading || 
                    itemStatus !== CUSTOMER_PREVIEW || 
                    (!!designToApply && outputPng !== designToApply)
                  }
                  onClick={this.handlePromptApprove}
                >
                  {formatMessage(messages.approve)}
                </ApproveButton>
                <RequestEdit
                  disabled={itemStatus !== CUSTOMER_PREVIEW}
                  onClick={this.handleOpenRequest}
                >
                  <RequestText secondary={itemStatus !== CUSTOMER_PREVIEW}>
                    {formatMessage(messages.requestEdit)}
                  </RequestText>
                  <EditsLabel>{requestedEdits} of {limitRequests}</EditsLabel>
                </RequestEdit>
              </MobileRequestButtons>
              {!!itemStatus && false &&
                <RenderSection>
                  {(readyToShow || designToApply) && designId &&
                    <Render3D
                      customProduct={true}
                      actualImage={designToApply}
                      textColor="white"
                      {...{
                        designId,
                        modelSize,
                        modelObj,
                        modelMtl,
                        hidePredyed
                      }}
                      proDesign={true}
                      zoomedIn={true}
                    />
                  }
                  {!readyToShow && product &&
                    <Render3D
                      customProduct={true}
                      designId={0}
                      isProduct={true}
                      {...{ product, modelObj, modelMtl }}
                    />
                  }
                </RenderSection>
              }
            </LayoutRight>
          </Layouts>
          {!!itemStatus &&
            <CollapseWrapper>
              <CollapseMobile
                defaultActiveKey={chatLog && chatLog.length && highlight ? '1' : ''}
                accordion={true} 
                destroyInactivePanel={true}
              >
                <PanelMobile
                  header={
                    <PanelTitle ref={e => { this.chatDiv = e }}>
                      <PanelIcon src={messageIcon} />
                      {formatMessage(messages.approvalLog)}
                      <ChatCount>
                        {adminMessages > 0 &&
                          <CountCircle className="counter">
                            ({adminMessages})
                          </CountCircle>
                        }
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
                <PanelMobile
                  header={
                    <PanelTitle ref={e => { this.catalogDiv = e }}>
                      <PanelIcon secondary={true} src={viewDesignsIcon} />
                      {formatMessage(messages.viewDesigns)}
                    </PanelTitle>
                  }
                  key="3"
                >
                  {(!loading && product) && 
                    <Products secondary={true}>
                      {projectDesigns.map((
                        { 
                          id,
                          name: nameDesign,
                          image,
                          status: designStatus,
                          product: { name: nameProduct, pictures = [{ front: ''}] }
                        }: DesignType, 
                        index: number) => {
                          const designReady = 
                            designStatus === CUSTOMER_APPROVED || designStatus === CUSTOMER_PREVIEW
                          let colorStatus = null
                          switch (designStatus) {
                            case PREFLIGHT_STATUS:
                              colorStatus = WHITE
                              break
                            case CUSTOMER_APPROVED:
                              colorStatus = GREEN_STATUS
                              break
                            case CUSTOMER_PREVIEW:
                              colorStatus = ORANGE_STATUS
                              break
                            default:
                              colorStatus = BLUE_STATUS
                              break
                          }
                          return (
                            <ProjectDesign onClick={this.goToDesign(id)} key={index}>
                              <ProLabel>
                                <ProStatus backgroundColor={colorStatus}>
                                  {itemLabels[designStatus] || itemLabels[IN_DESIGN]}
                                </ProStatus>
                              </ProLabel>
                              <DesignImage src={designReady ? image : pictures[0].front} />
                              <DesignName secondary={!nameDesign}>{nameDesign || 'Pending'}</DesignName>
                              <ProductName>{nameProduct}</ProductName>
                            </ProjectDesign>
                        )}
                      )}
                    </Products>
                  }
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
                {(!loading && product) && 
                    <Products>
                      {projectDesigns.map((
                        { 
                          id,
                          name: nameDesign,
                          image,
                          status: designStatus,
                          product: { name: nameProduct, pictures = [{ front: ''}] }
                        }: DesignType, 
                        index: number) => {
                          const designReady = 
                            designStatus === CUSTOMER_APPROVED || designStatus === CUSTOMER_PREVIEW
                          let colorStatus = null
                          switch (designStatus) {
                            case PREFLIGHT_STATUS:
                              colorStatus = WHITE
                              break
                            case CUSTOMER_APPROVED:
                              colorStatus = GREEN_STATUS
                              break
                            case CUSTOMER_PREVIEW:
                              colorStatus = ORANGE_STATUS
                              break
                            default:
                              colorStatus = BLUE_STATUS
                              break
                          }
                          return (
                            <ProjectDesign onClick={this.goToDesign(id)} key={index}>
                              <ProLabel>
                                <ProStatus backgroundColor={colorStatus}>
                                  {itemLabels[designStatus] || itemLabels[IN_DESIGN]}
                                </ProStatus>
                              </ProLabel>
                              <DesignImage src={designReady ? image : pictures[0].front} />
                              <DesignName secondary={!nameDesign}>{nameDesign || 'Pending'}</DesignName>
                              <ProductName>{nameProduct}</ProductName>
                            </ProjectDesign>
                        )}
                      )}
                    </Products>
                  }
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
          {(itemStatus || project) &&
          <DraggableModalStyled
            {...stylesToApply}
            isOpen={openRequest || !!project}
            disableResize={true}
          >
            <ModalTitle>
              {!project ? 
                formatMessage(messages[!!parentMessageId ? 'enterAnswer' : 'enterEditNotes']) :
                formatMessage(messages.enterDesignInstructions)
              }</ModalTitle>
            {!!parentMessageId &&
              <ParentText>
                {parentMessage}
              </ParentText>
            }
            {(!parentMessageId && !project) &&
              <RequestsTitle>
                <AvailableLabel>
                  {formatMessage(messages.available)}
                </AvailableLabel>
                <AvailableCircle>
                  {limitRequests - requestedEdits}
                </AvailableCircle>
              </RequestsTitle>
            }
            <TextAreaStyled
              value={note}
              disabled={sendingNote}
              placeholder={formatMessage(messages[!project ? 'sendCustomerMessage' : 'addNotes'])}
              onChange={this.handleChangeNote}
              maxLength={768}
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
                disabled={!note || sendingNote || (!parentMessageId && note.length < 15)}
                onClick={this.addMessage}
              >
                {formatMessage(messages[!!parentMessageId ? 'reply' : 'send'])}
              </SaveButton>
            </ButtonContainer>
          </DraggableModalStyled>}
          <PayModal
            open={true}
            items={[
              {
                name: 'EDIT REQUEST',
                price: 10,
                itemId: 'sjiFmzNdA',
                description: `Add a new Edit Request for the ProDesign: JV2-UVUVEWE-OSSAS1`
              },
            ]}
          />
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
    openLoginAction,
    restoreUserSessionAction: restoreUserSession
  }),
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
  graphql(addTeamStoreItemMutation, { name: 'addItemToStore' }),
  graphql(getPredyedColors, { name: 'predyedData' }),
  graphql(addProductProjectMutation, { name: 'addProductProject' }),
  graphql(approveDesignMutation, { name: 'setApproveDesign' }),
  graphql(addProMessageMutation, { name: 'sendNoteProdesign' }),
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
