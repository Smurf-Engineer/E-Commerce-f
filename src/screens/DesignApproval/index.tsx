/**
 * DesignApproval Screen - Created by Jesús on 28/21/20.
 */
import * as React from 'react'
import ReactDOM from 'react-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import GoogleFontLoader from 'react-google-font-loader'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { compose, graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import AntdMessage from 'antd/lib/message'
import Button from 'antd/lib/button'
import Select from 'antd/lib/select'
import messageIcon from '../../assets/approval_log.svg'
import JakRooLogo from '../../assets/Jackroologo.svg'
import quickView from '../../assets/quickview.svg'
import teamIcon from '../../assets/team.svg'
import commentsIcon from '../../assets/comments.svg'
import printPreviewImg from '../../assets/printpreview.svg'
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
  getVariantsFromProduct,
  getEditRequestPrices,
  sendInvitationsMutation,
  changeMemberRoleMutation
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
  Notification,
  ServicePrice
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
  AddMemberButton,
  ButtonContainer,
  buttonPrompt,
  InviteContainer,
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
  StyledTooltipMobile,
  InfoIconMobile,
  InfoDiv,
  InfoIcon,
  IconTitle,
  TextBody,
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
  StyledTooltip,
  StyledUpload,
  stylesDraggable,
  stylesDraggableMobile,
  TabContent,
  TextAreaStyled,
  TooltipBody,
  TypeLabel,
  UploadButton,
  UserIcon,
  VariantButton,
  Variants,
  FileContainer,
  DeleteFile,
  EditSquares,
  EditTitle,
  Squares,
  EditSquareDiv,
  UsedSquare,
  LabelSquare,
  AvailableSquare,
  PaidLabel,
  PrintPreviewIcon,
  PrintPreviewLabel,
  PreviewDiv,
  CloseIcon,
  PreviewImg,
  DownloadDiv,
  DownloadIcon,
  Collaboration,
  CollabInfo,
  CollabTitle,
  CollabDescription,
  CollabMembers,
  MembersList,
  Member,
  MemberData,
  MemberDate,
  MemberDelete,
  MemberEmail,
  MemberImage,
  MemberName,
  MemberType,
  PendingDiv,
  PendingLabel,
  Resend,
  InviteTitle,
  MailsContainer,
  EmailsLabel,
  StyledEmailTags,
  SendInvitationButton,
  BottomSection,
  CopyLinkButton,
  GearIcon,
  InfoIconLink,
  InviteLink,
  InviteLinkLabel,
  ConfirmEmailTags,
  InfoConfirmation,
  ConfirmBottom,
  CancelInvitation,
  StyledSpinInvitation,
  CollabWarning,
  MemberOwnerLabel,
  StarIcon
} from './styledComponents'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Tab from './Tab'
import Modal from 'antd/lib/modal'
import { COLOR, APPROVAL, COLLAB, COMMENTS, memberColors, memberTypeOptions } from './constants'
import {
  COMMENTER_ROLE,
  CUSTOMER_APPROVED,
  CUSTOMER_PREVIEW,
  DATE_FORMAT,
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
import set from 'lodash/set'
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
import config from '../../config'

const Option = Select.Option
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

interface EditRequestData extends QueryProps {
  editRequestPrices: ServicePrice
}

interface StateProps {
  items: String[]
  savingInvitations: boolean
  showConfirmInvites: boolean
  openInviteModal: boolean
  showRenderWindow: boolean
  selectedKey: string
  openShare: boolean
  openBottom: boolean
  openPurchase: boolean
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
  file: [string]
  sendingNote: boolean
  history: History
  currentCurrency: string
  fontsData: any
  uploadingFile: boolean
  parentMessageId: string
  parentMessage: string
  predyedData: PredyedData
  editRequestData: EditRequestData
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
  changeMemberRole: (variables: {}) => Promise<MessagePayload>
  sendInvitations: (variables: {}) => Promise<MessagePayload>
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
  deleteFileAction: (file: string) => void
}

export class DesignApproval extends React.Component<Props, StateProps> {
  state = {
    showRenderWindow: true,
    selectedKey: APPROVAL,
    openShare: false,
    openBottom: false,
    openPurchase: false,
    openAddToStoreModal: false,
    teamStoreId: '',
    itemToAdd: {},
    designToApply: '',
    selectedVariant: -1,
    retryLoad: false,
    openPrintPreview: false,
    items: [],
    value: '',
    error: null,
    openInviteModal: false,
    showConfirmInvites: false,
    savingInvitations: false
  }
  private listMsg: any
  private chatDiv: any
  private catalogDiv: any
  private emailInput: any
  async componentDidMount() {
    await LoadScripts(threeDScripts)
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', this.reloadMessages)
    }
    const { history, user, openLoginAction: openLoginModalAction } = this.props
    const userSaved = localStorage.getItem('user')
    if (!user && !userSaved) {
      this.setState({ retryLoad: true })
      openLoginModalAction(true)
      return
    }
    const search = get(history, 'location.search', '')
    const { project, product } = queryString.parse(search)
    if (!!project && !!product) {
      this.handleEditProject(project, product)
    }
    if (/mobile/i.test(navigator.userAgent)) {
      setTimeout(() => { window.scrollTo(0, 1) }, 3000)
    }
    if (window) {
      window.addEventListener('resize', this.resizeRender, false)
    }
  }
  componentWillUnmount() {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.removeEventListener('message', this.reloadMessages)
    }
    if (window) {
      window.removeEventListener('resize', this.resizeRender, false)
    }
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
    const { retryLoad } = this.state
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
    const { data: notificationData } = notification
    const payload = get(notificationData, 'firebase-messaging-msg-data.data', notificationData)
    const { notification_type } = payload
    if (notification_type === PROJECT_MESSAGE || notification_type === PROJECT_REVIEW) {
      const { data } = this.props
      await data.refetch()
    }
  }
  openPurchaseModal = () => {
    this.setState({ openPurchase: true })
  }
  closePurchaseModal = () => {
    this.setState({ openPurchase: false })
  }
  successPurchase = (orderId: string) => {
    if (orderId) {
      const { client, data: storedData } = this.props
      const projectItem = get(storedData, 'projectItem', {})
      const itemId = get(projectItem, 'projectItem.id', '') as string
      projectItem.paidRequests += 1
      client.writeQuery({
        query: getProdesignItemQuery,
        variables: { shortId: itemId },
        data: storedData
      })
      this.closePurchaseModal()
      this.handleOpenRequest()
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

  resizeRender = () => {
    this.setState({ showRenderWindow: false })
    debounce(() => {
      this.setState({ showRenderWindow: true })
    // tslint:disable-next-line: align
    }, 1500)()
  }

  handleChangeNote = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value }
    } = evt
    const { changeNoteAction } = this.props
    changeNoteAction(value)
  }

  openInviteModal = () => {
    this.setState({ openInviteModal: true, showConfirmInvites: false })
  }

  closeInviteModal = () => {
    this.setState({ openInviteModal: false, showConfirmInvites: false, items: [] })
  }

  showConfirmInvites = () => {
    const { items } = this.state
    if (items && items.length > 0) {
      this.setState({ showConfirmInvites: true })
    }
  }

  closeConfirmInvites = () => {
    this.setState({ showConfirmInvites: false })
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
      const { id: itemId } = queryParams || {}
      if (itemId) {
        setSendingAction(true)
        if (parentMessageId) {
          await sendNoteProdesign({
            variables: {
              itemId,
              message: note,
              file: JSON.stringify(file),
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
              const updateRequireIndex = messagesArray.findIndex((e: ProDesignMessage) =>
                e.id === Number(parentMessageId)
              )
              messagesArray[updateRequireIndex].requireAnswer = false
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
              file: JSON.stringify(file),
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
            file: JSON.stringify(file)
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
    const projectName = get(data, 'projectItem.project.name', '')
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
              {formatMessage(messages[approved ? 'takeToLocker' : 'backToMyProject'], { project: projectName })}
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
    const { history, data } = this.props
    Modal.destroyAll()
    const projectId = get(data, 'projectItem.project.id', '')
    history.push(`/account?option=proDesignProjects&id=${projectId}`)
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

  sendInvitationsAction = async () => {
    const {
      intl: { formatMessage },
      sendInvitations,
      data,
    } = this.props
    try {
      const projectId = get(data, 'projectItem.project.shortId', '')
      if (!!projectId) {
        const { items: emails } = this.state
        this.setState({ savingInvitations: true })
        await sendInvitations({ variables: { projectId, emails } })
        data.refetch()
        AntdMessage.success(formatMessage(messages.invitationsSent))
        this.closeInviteModal()
      }
    } catch (e) {
      AntdMessage.error(e.message)
    } finally {
      this.setState({ savingInvitations: false })
    }
  }

  onSelectRole = async (value: string, memberId: string) => {
    const {
      data,
      intl: { formatMessage },
      changeMemberRole
    } = this.props
    try {
      if (!!memberId) {
        const membersArray = get(data, 'projectItem.project.members', [])
        const newMembers = membersArray.map(element => {
          element.role = element.shortId === memberId ? value : COMMENTER_ROLE
          return element
        })
        set(data, 'projectItem.project.members', newMembers)
        this.forceUpdate()
        await changeMemberRole(
          { variables: { role: value, memberId }
        })
        AntdMessage.success(formatMessage(messages.userUpdated))
      }
    } catch (e) {
      AntdMessage.error(e.message)
    }
  }

  approveDesign = async () => {
    const {
      intl: { formatMessage },
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
    const { data } = this.props
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
      const { intl: { formatMessage } } = this.props
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

  openPreview = () => {
    const { openPrintPreview } = this.state
    this.setState({ openPrintPreview: !openPrintPreview })
  }

  handleKeyDown = evt => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault()
      var value = this.state.value.trim()
      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ''
        })
      }
    }
  }

  handleChange = (evt: any) => {
    this.setState({
      value: evt.target.value,
      error: null
    })
  }

  handleDelete = (item: any, e: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    this.setState({
      items: this.state.items.filter(i => i !== item)
    })
  }

  focusOnInput = () => {
    if (this.emailInput) {
      this.emailInput.focus()
    }
  }

  handlePaste = (evt: any) => {
    evt.preventDefault()
    var paste = evt.clipboardData.getData('text')
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g)
    if (emails) {
      var toBeAdded = emails.filter((email: string) => !this.isInList(email))
      this.setState({
        items: [...this.state.items, ...toBeAdded]
      })
    }
  }

  isValid = (email: string) => {
    let error = null
    if (this.isInList(email)) {
      error = `${email} has already been added.`
    }
    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`
    }
    if (error) {
      this.setState({ error })
      return false
    }
    return true
  }

  isInList = (email: string) => {
    return this.state.items.includes(email)
  }

  isEmail = (email: string) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email)
  }

  render() {
    const {
      fontsData,
      data,
      project,
      openRequest,
      parentMessageId,
      editRequestData,
      currentCurrency,
      parentMessage,
      approveLoading,
      note,
      history,
      dataVariants,
      predyedData,
      uploadingFile,
      file,
      sendingNote,
      intl,
      deleteFileAction
    } = this.props
    const { formatMessage } = intl
    const {
      savingInvitations,
      showConfirmInvites,
      openInviteModal,
      showRenderWindow,
      selectedKey,
      openBottom,
      openPurchase,
      openShare,
      designToApply,
      openAddToStoreModal,
      teamStoreId,
      selectedVariant,
      openPrintPreview
    } = this.state
    const currency = currentCurrency || config.defaultCurrency
    const fontList: Font[] = get(fontsData, 'fonts', [])
    const { loading = true, projectItem, error } = data || {}
    const incomingMessages = get(projectItem, 'messages', []) as ProDesignMessage[]
    const product = get(projectItem, 'product', {}) as Product
    const design = get(projectItem, 'design', {}) as DesignType
    const colors = get(projectItem, 'colors', []) as ColorType[]
    const projectItemId = get(projectItem, 'id', '') as string
    const itemCode = get(projectItem, 'code', '') as string
    const editRequestPrice = get(editRequestData, ['editRequestPrices', currency], 0) as number
    const highlight = get(projectItem, 'showNotification', false) as boolean
    const projectDesigns = get(projectItem, 'project.designs', []) as DesignType[]
    const itemStatus = get(projectItem, 'status', '') as string
    const requestsLimit = get(projectItem, 'limitRequests', 0) as number
    const paidRequests = get(projectItem, 'paidRequests', 0) as number
    const limitRequests = paidRequests + requestsLimit
    const predyedColors = get(predyedData, 'getPredyedColors', [])
    const projectMembers = get(projectItem, 'project.members', [])
    const ownerName = get(projectItem, 'project.customer', '')
    const ownerEmail = get(projectItem, 'project.customerEmail', '')
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
      proCertified,
      proDesign,
      code: designCode,
      shared
    } = design
    const {
      hasPredyed,
      predyedlabel,
      modelSize,
      name: productName
    } = product || {}

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
      designCode: designCode || itemCode,
      designId: designSerialId,
      designImage,
      proCertified,
      proDesign,
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

    const fileNames = file && file.length ? file.map(e => getFileWithExtension(e)) : []
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
              paid,
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

            let files = []
            if (!!messageFile) {
              try {
                files = JSON.parse(messageFile)
              } catch (e) {
                files.push(messageFile)
              }
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
                          formatMessage(messages.congratulationsMessage) :
                          incomingMessage
                      }}
                    />

                    {required &&
                      <RequiredText onClick={this.replyMessage(id, incomingMessage)}>
                        {formatMessage(messages.required)}
                      </RequiredText>
                    }
                    {files.map((fileString: string, index: number) =>
                      <MessageFile onClick={this.openFile(fileString)} key={index}>
                        <Clip type="paper-clip" />
                        <FileName>
                          {getFileWithExtension(fileString || '')}
                        </FileName>
                      </MessageFile>
                    )}
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
                    {messageType === EDIT &&
                      <PaidLabel secondary={paid}>
                        {formatMessage(messages[paid ? 'paid' : 'free'])}
                      </PaidLabel>
                    }
                  </MessageBox>
                  <DateMessage>
                    {createdMessage ? moment(createdMessage).format('DD/MM/YYYY HH:mm') : '-'}
                  </DateMessage>
                </InfoDiv>
              </IncomingMessage>
            )
          }
          )}
        </ChatMessages>
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

    const collabComponent = !!itemStatus ?
      <Collaboration>
        <ApprovalTitle>{formatMessage(messages.teamMembers)}</ApprovalTitle>
        <CollabInfo>
          <CollabTitle>
            {formatMessage(messages.teamCollaborationTitle)}
          </CollabTitle>
          <CollabDescription>
            {formatMessage(messages.teamCollaborationDesc)}
          </CollabDescription>
          <CollabWarning>
            {formatMessage(messages.teamCollabWarning)}
          </CollabWarning>
          <AddMemberButton
            disabled={projectMembers.length >= 5}
            onClick={projectMembers.length >= 5 ? () => {} : this.openInviteModal}
          >
            {formatMessage(messages.inviteMembers)}
          </AddMemberButton>
        </CollabInfo>
        <CollabMembers>
          <CollabTitle>
            {formatMessage(messages.myTeam)}
          </CollabTitle>
          <MembersList>
            <Member>
              <StarIcon type="star" theme="filled" />
              <MemberImage codeColor={'#395CA9'} type="user" />
              <MemberData>
                <MemberName>{formatMessage(messages.name)} {ownerName || '-'}</MemberName>
                <MemberEmail>{ownerEmail || '-'}</MemberEmail>
              </MemberData>
              <MemberOwnerLabel>
                {formatMessage(messages.owner)}
              </MemberOwnerLabel>
            </Member>
            {projectMembers.map((member, key: number) =>
              <Member {...{ key }}>
                <MemberImage codeColor={memberColors[Math.floor(key % 7)]} type="user" />
                <MemberData>
                  <MemberName>{formatMessage(messages.name)} {member.firstName || '-'} {member.lastName}</MemberName>
                  <MemberEmail>{member.email}</MemberEmail>
                  {member.dateAdded &&
                    <MemberDate>
                      {formatMessage(messages.dateAdded)} {moment(member.dateAdded).local().format(DATE_FORMAT)}
                    </MemberDate>
                  }
                  {member.dateInvited &&
                    <MemberDate>
                      {formatMessage(messages.dateInvited)} {moment(member.dateInvited).local().format(DATE_FORMAT)}
                    </MemberDate>
                  }
                  {!member.dateAdded &&
                    <PendingDiv>
                      <PendingLabel>{formatMessage(messages.pending)}</PendingLabel>
                      <Resend>{formatMessage(messages.resend)}</Resend>
                    </PendingDiv>
                  }
                </MemberData>
                <MemberType
                  onChange={(e: string) => this.onSelectRole(e, member.shortId)}
                  value={member.role}>
                  {memberTypeOptions.map((value: string, index: number) => (
                    <Option key={index} value={value}>
                      {value}
                    </Option>
                  ))}
                </MemberType>
                <MemberDelete type="delete" />
              </Member>
            )}
          </MembersList>
        </CollabMembers>
        <Modal
          visible={openInviteModal}
          footer={null}
          onCancel={this.closeInviteModal}
          wrapClassName="rounded-corner"
          width={'545px'}
        >
          {!showConfirmInvites ? 
            <InviteContainer>
              <InviteTitle>{formatMessage(messages.inviteToTeam)}</InviteTitle>
              <MailsContainer>
                <EmailsLabel>{formatMessage(messages.emails)}</EmailsLabel>
                <StyledEmailTags onClick={this.focusOnInput} secondary={this.state.items.length > 0}>
                  {this.state.items.map(item => (
                    <div className="tag-item" key={item}>
                      {item}
                      <button
                        type="button"
                        className="button"
                        onClick={(e) => this.handleDelete(item, e)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    ref={(emailInput) => { this.emailInput = emailInput }} 
                    className={'input ' + (this.state.error && ' has-error')}
                    value={this.state.value}
                    placeholder={this.state.items.length > 0 ? null : 'You can copy and paste a list of emails...'}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                  />
                  {this.state.error && <p className="error">{this.state.error}</p>}
                </StyledEmailTags>
                <SendInvitationButton
                  disabled={!this.state.items.length}
                  onClick={this.showConfirmInvites}
                >
                  {formatMessage(messages.sendInvitations)}
                </SendInvitationButton>
                <BottomSection>
                  <InviteLink>
                    <GearIcon type="link" />
                    <InviteLinkLabel>{formatMessage(messages.teamInviteLink)}</InviteLinkLabel>
                    <InfoIconLink type="question-circle" theme="filled" />
                  </InviteLink>
                  <CopyLinkButton>{formatMessage(messages.copyLink)}</CopyLinkButton>
                </BottomSection>
              </MailsContainer>
            </InviteContainer> :
            <InviteContainer>
              <InviteTitle>{formatMessage(messages.confirmTitle)}</InviteTitle>
              <ConfirmEmailTags>
                {this.state.items.map(item => (
                  <div className="tag-item" key={item}>
                    {item}
                    <button
                      type="button"
                      className="button"
                      onClick={(e) => this.handleDelete(item, e)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </ConfirmEmailTags>
              <InfoConfirmation>
                {formatMessage(messages.infoConfirmation)}
              </InfoConfirmation>
              <ConfirmBottom>
                <SendInvitationButton
                  disabled={!this.state.items.length || savingInvitations}
                  onClick={this.sendInvitationsAction}
                >
                  {savingInvitations ? <StyledSpinInvitation size="small" /> : formatMessage(messages.addToTeamCollab)}
                </SendInvitationButton>
                <CancelInvitation onClick={this.closeConfirmInvites}>
                  {formatMessage(messages.cancel)}
                </CancelInvitation>
              </ConfirmBottom>
            </InviteContainer>
          }
        </Modal>
      </Collaboration> : null

    const commentsComponent = null

    return (
      <Layout {...{ history, intl }} hideBottomHeader={true} hideFooter={true}>
        <Container>
          {installedFonts.length ? (
            <GoogleFontLoader fonts={installedFonts} />
          ) : null}
          {loading && !error && <LoadingContainer><Spin size="large" /></LoadingContainer>}
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
                <TabPane tab={<Tab label={COLLAB} icon={teamIcon} />} key={COLLAB}>
                  <TabContent>
                    {collabComponent}
                  </TabContent>
                </TabPane>
                <TabPane tab={<Tab label={APPROVAL} icon={messageIcon} />} key={APPROVAL}>
                  <TabContent>
                    {chatComponent}
                  </TabContent>
                </TabPane>
                <TabPane tab={<Tab label={COMMENTS} icon={commentsIcon} />} key={COMMENTS}>
                  <TabContent>
                    {commentsComponent}
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
                    {designCode || itemCode}
                  </DesignLabel>
                </NameLabel>
              }
              {!!itemStatus &&
                <StatusLabel color={statusColor}>
                  {itemLabels[itemStatus] || formatMessage(messages.inDesign)}
                </StatusLabel>
              }
              {(!!designToApply || readyToShow) &&
                <PrintPreviewLabel selected={openPrintPreview} onClick={this.openPreview}>
                  <PrintPreviewIcon src={printPreviewImg} />
                </PrintPreviewLabel>
              }
              <PreviewDiv selected={openPrintPreview}>
                <DownloadDiv onClick={this.openFile(designToApply || outputPng)}>
                  {formatMessage(messages.download)}
                  <DownloadIcon type="download" />
                </DownloadDiv>
                <CloseIcon onClick={this.openPreview} type="cross" />
                <PreviewImg src={designToApply || outputPng} />
              </PreviewDiv>
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
                {!!itemStatus && projectItemId && !loading && itemStatus !== CUSTOMER_APPROVED &&
                  <EditSquares>
                    <EditTitle>{formatMessage(messages.designEdits)}</EditTitle>
                    <Squares>
                      <EditSquareDiv>
                        <UsedSquare>
                          {requestedEdits}
                        </UsedSquare>
                        <LabelSquare>
                          {formatMessage(messages.used)}
                        </LabelSquare>
                      </EditSquareDiv>
                      <EditSquareDiv>
                        <AvailableSquare secondary={(limitRequests - requestedEdits) <= 0}>
                          {limitRequests - requestedEdits}
                        </AvailableSquare>
                        <LabelSquare>
                          {formatMessage(messages.availableOnly)}
                        </LabelSquare>
                      </EditSquareDiv>
                    </Squares>
                  </EditSquares>
                }
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
                      {...{ designName, designImage, formatMessage, designId, proCertified, proDesign }}
                    />
                  </ButtonWrapper>
                </BottomButtons>
              }
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
                {requestedEdits >= limitRequests &&
                  <StyledTooltip
                    trigger="hover"
                    content={
                      <TooltipBody>
                        <IconTitle theme="filled" type="info-circle" />
                        <TextBody
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(messages.editRequestInfo)
                          }}
                        />
                      </TooltipBody>
                    }
                  >
                    <InfoIcon type="info-circle" />
                  </StyledTooltip>
                }
                <RequestEdit
                  disabled={itemStatus !== CUSTOMER_PREVIEW}
                  onClick={requestedEdits >= limitRequests ? this.openPurchaseModal : this.handleOpenRequest}
                >
                  <RequestText secondary={itemStatus !== CUSTOMER_PREVIEW}>
                    {formatMessage(messages[requestedEdits >= limitRequests ? 'purchaseMore' : 'requestEdit'])}
                  </RequestText>
                  {requestedEdits < limitRequests && <EditsLabel>{requestedEdits} of {limitRequests}</EditsLabel>}
                </RequestEdit>
              </RequestButtons>
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
                  onClick={requestedEdits >= limitRequests ? this.openPurchaseModal : this.handleOpenRequest}
                >
                  <RequestText secondary={itemStatus !== CUSTOMER_PREVIEW}>
                    {formatMessage(messages[requestedEdits >= limitRequests ? 'purchaseMore' : 'requestEdit'])}
                  </RequestText>
                  {requestedEdits < limitRequests && <EditsLabel>{requestedEdits} of {limitRequests}</EditsLabel>}
                </RequestEdit>
                {requestedEdits >= limitRequests &&
                  <StyledTooltipMobile
                    trigger="click"
                    content={
                      <TooltipBody>
                        <IconTitle theme="filled" type="info-circle" />
                        <TextBody
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(messages.editRequestInfo)
                          }}
                        />
                      </TooltipBody>
                    }
                  >
                    <InfoIconMobile type="info-circle" />
                  </StyledTooltipMobile>
                }
              </MobileRequestButtons>
              {!!itemStatus && false &&
                <RenderSection>
                  {(readyToShow || designToApply) && designId && showRenderWindow &&
                    <Render3D
                      fullHeight={true}
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
                  {!readyToShow && product && showRenderWindow &&
                    <Render3D
                      fullHeight={true}
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
                          product: { name: nameProduct, pictures = [{ front: '' }] }
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
                        )
                      }
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
                          product: { name: nameProduct, pictures = [{ front: '' }] }
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
                        )
                      }
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
              isOpen={openRequest || !!project}
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
                disabled={uploadingFile || (file && file.length === 5)}
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
              <FileContainer>
                {file && file.length ?
                  file.map((e, i) => (
                    <FileLabel>
                      <Clip type="paper-clip" />
                      <FileName>
                        {fileNames[i]}
                      </FileName>
                      <DeleteFile type="delete" onClick={() => deleteFileAction(e)} />
                    </FileLabel>
                  ))
                  : null
                }
              </FileContainer>
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
            open={openPurchase}
            callback={this.successPurchase}
            requestClose={this.closePurchaseModal}
            items={[
              {
                name: 'Edit Request',
                price: editRequestPrice,
                itemId: projectItemId,
                description: `Design edit request for ${itemCode}`
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
  const langProps = state.get('languageProvider').toJS()
  const app = state.get('app').toJS()
  return {
    ...app,
    ...langProps,
    ...designs,
    ...responsive,
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
  graphql(changeMemberRoleMutation, { name: 'changeMemberRole' }),
  graphql(sendInvitationsMutation, { name: 'sendInvitations' }),
  graphql(getEditRequestPrices, { name: 'editRequestData' }),
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
