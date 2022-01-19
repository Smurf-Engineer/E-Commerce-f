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
import { uploadFileAction as uploadFileComment } from '../../screens/ResellerSignup/api'
import messageIcon from '../../assets/approval_log.svg'
import JakRooLogo from '../../assets/Jackroologo.svg'
import quickView from '../../assets/quickview.svg'
import novaBlank from '../../assets/novablank.jpg'
import novaFull from '../../assets/novafull.jpg'
import arrowLong from '../../assets/arrowlong.svg'
import arrowShort from '../../assets/arrowshort.svg'
import teamIcon from '../../assets/team.svg'
import commentsIcon from '../../assets/comments.svg'
import printPreviewImg from '../../assets/printpreview.svg'
import messageSent from '../../assets/message_sent.wav'
import colorIcon from '../../assets/color_white.svg'
import viewDesignsIconSelected from '../../assets/view_designs_icon_selected.svg'
import viewDesignsIconMobile from '../../assets/view_designs_icon_mobile.svg'
import JakrooProLogo from '../../assets/pro_design_white.png'
import messageIconSelected from '../../assets/approval_log_selected.svg'
import teamIconSelected from '../../assets/team_selected.svg'
import commentsIconSelected from '../../assets/comments_selected.svg'
import colorIconSelected from '../../assets/color_white_selected.svg'
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
  changeMemberRoleMutation,
  deleteMemberMutation,
  reSendInvitationsMutation,
  getProdesignItemCommentsQuery,
  sendCommentMutation,
  updateReactionMutation
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
  ServicePrice,
  ProDesignComment
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
  StarIcon,
  StyledPopOver,
  PopoverText,
  CommentSection,
  ChatComments,
  CommentMessage,
  CommentHeader,
  MemberInitials,
  ImageMessage,
  ActionsIcons,
  LikeAction,
  LikeIcon,
  HeartAction,
  HeartIcon,
  CommentInput,
  InputComment,
  SendCommentButton,
  ClipComment,
  FullResponse,
  FileComment,
  ReplyComment,
  ReplyIcon,
  RemoveParent,
  UploadFileComment,
  RemoveFileIcon,
  MessageComment,
  CollapseStyled,
  PanelDiv,
  AdvertisingComments,
  CloseAdvertising,
  WhatsThis,
  StatusTitle,
  StatusSubTitle,
  StatusCardsSection,
  StatusCard,
  StatusCardLabel,
  StatusImage,
  StatusDescription,
  ArrowStatus,
  BottomSectionStatus,
  ArrowLong,
  CloseButtonStatus,
  StatusCardMobile,
  StatusMobileBody
} from './styledComponents'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Tab from './Tab'
import Modal from 'antd/lib/modal'
import { COLOR, APPROVAL, COLLAB, COMMENTS, memberColors, memberTypeOptions } from './constants'
import {
  APPROVER_ROLE,
  COMMENTER_ROLE,
  CUSTOMER_APPROVED,
  CUSTOMER_PREVIEW,
  DATE_FORMAT,
  EDIT,
  FROM_ADMIN,
  GUEST_ROLE,
  IN_DESIGN,
  itemLabels,
  NEW_PRODUCT,
  OWNER_ROLE,
  PREDYED_DEFAULT,
  PREDYED_TRANSPARENT,
  PREFLIGHT_STATUS,
  PROJECT_MESSAGE,
  PROJECT_REVIEW,
  TIME_FORMAT
} from '../../constants'
import moment from 'moment'
import messages from './messages'
import Spin from 'antd/lib/spin'
import { getFileExtension, getFileWithExtension } from '../../utils/utilsFiles'
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
  FACEBOOKBLUE,
  BLUE_SOFT
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

interface DataComments extends QueryProps {
  projectComments: ProDesignComment[]
}

interface EditRequestData extends QueryProps {
  editRequestPrices: ServicePrice
}

interface StateProps {
  items: string[]
  value: string
  error: string
  resendingEmail: string
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
  commentMessage: string
  commentFile: string
  commentResponding: any
  uploadingFileComment: boolean
  sendingComment: boolean
  selectedKeyMobile: string
  openStatusInfo: boolean
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
  membersComments: DataComments
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
  updateReaction: (variables: {}) => Promise<MessagePayload>
  sendComment: (variables: {}) => Promise<MessagePayload>
  deleteMember: (variables: {}) => Promise<MessagePayload>
  changeMemberRole: (variables: {}) => Promise<MessagePayload>
  reSendInvitation: (variables: {}) => Promise<MessagePayload>
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
    commentMessage: '',
    commentFile: '',
    commentResponding: {},
    sendingComment: false,
    uploadingFileComment: false,
    resendingEmail: '',
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
    savingInvitations: false,
    selectedKeyMobile: '',
    openStatusInfo: false
  }
  private commentList: any
  private listMsg: any
  private commentInput: any
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
    const { project, product, tab } = queryString.parse(search)
    if (!!project && !!product) {
      this.handleEditProject(project, product)
    }
    if (/mobile/i.test(navigator.userAgent)) {
      setTimeout(() => { window.scrollTo(0, 1) }, 3000)
    }
    if (window) {
      window.addEventListener('resize', this.resizeRender, false)
    }
    if (tab) {
      setTimeout(() => { this.onTabClickAction(tab) }, 800)
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
    const { data, user, membersComments } = this.props
    const { data: oldData, user: oldUser, membersComments: oldCommentsData } = prevProps
    const { retryLoad } = this.state
    const oldMessages = get(oldData, 'projectItem.messages', [])
    const newMessages = get(data, 'projectItem.messages', [])
    const oldComments = get(oldCommentsData, 'projectComments', [])
    const newComments = get(membersComments, 'projectComments', [])
    if (user !== oldUser && retryLoad) {
      location.reload()
    }
    if (oldMessages.length !== newMessages.length) {
      setTimeout(() => { this.scrollMessages() }, 2000)
    }
    if (oldComments.length !== newComments.length) {
      setTimeout(() => { this.scrollMessagesComment() }, 2000) 
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
    if (selectedKey === COMMENTS) {
      setTimeout(() => { this.scrollMessagesComment() }, 800)
    }
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

  clearFileComment = () => {
    this.setState({ commentFile: '' })
  }

  uploadCommentFile = async (event: UploadChangeParam) => {
    const { file } = event
    this.setState({ uploadingFileComment: true })
    const fileUrl = await uploadFileComment(file)
    this.setState({ uploadingFileComment: false , commentFile: fileUrl })
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

  openStatusModal = () => {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate([70, 50, 20])
    }
    this.setState({ openStatusInfo: true })
  }

  closeStatusModal = () => {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate([70, 50, 20])
    }
    this.setState({ openStatusInfo: false })
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

  clearReply = () => {
    this.setState({ commentResponding: {} })
  }

  setReplyComment = (evt: React.MouseEvent) => {
    const {
      currentTarget: { id }
    } = evt
    const shortId = id ? Number(id) : 0
    if (shortId) {
      const { membersComments } = this.props
      const projectComments = get(membersComments, 'projectComments', []) as ProDesignComment[]
      const item = projectComments.find((comment: ProDesignComment) => comment.id === shortId)  
      if (item && item.id) {
        this.setState({ commentResponding: item })
        if (this.commentInput) {
          this.commentInput.focus()
        }
      }
    }
  }

  hideAdvertising = () => {
    localStorage.setItem('hideAdvertising', 'true')
    setTimeout(() => this.forceUpdate(), 200)
  }

  changeCollapseMobile = (key: string) => {
    if (key === '2') {
      setTimeout(() => { this.scrollMessagesComment() }, 800)
    }
    this.setState({ selectedKeyMobile: key })
  }

  handleInputComment = (evt: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = evt
    this.setState({ commentMessage: value })
  }

  sendCommentAction = async () => {
    const {
      intl: { formatMessage },
      sendComment,
      location,
      user, 
    } = this.props
    try {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      const { id: itemId } = queryParams || {}
      const { name, lastName } = user || {}
      if (itemId) {
        this.setState({ sendingComment: true })
        const { commentMessage, commentFile, commentResponding = {} } = this.state 
        const parentMessageId = get(commentResponding, 'id', '')
        await sendComment({
          variables: {
            itemId,
            message: commentMessage,
            file: commentFile,
            parentMessageId
          },
          update: (store: any, responseData: ProDesignComment) => {
            const responseMessage = get(responseData, 'data.messageData', {})
            const storedData = store.readQuery({
              query: getProdesignItemCommentsQuery,
              variables: { shortId: itemId }
            })
            const newMessage = {
              ...responseMessage,
              userName: `${name} ${lastName}`,
              owner: true,
              userSerialId: -1,
              parentMessageId,
              parent: {
                __typename: 'ProDesignComment',
                id: parentMessageId || null,
                userSerialId: commentResponding.userSerialId || null,
                userName: commentResponding.userName || null,
                message: commentResponding.message || null
              }
            }
            const messagesArray = get(storedData, 'projectComments', [])
            messagesArray.push(newMessage)
            setTimeout(() => { this.scrollMessagesComment() }, 1000)
            store.writeQuery({
              query: getProdesignItemCommentsQuery,
              variables: { shortId: itemId },
              data: storedData,
              name: 'membersComments'
            })
          },
        })
        AntdMessage.success(formatMessage(messages.messageSent))
        const snd = new Audio(messageSent)
        snd.play()
        snd.remove()
        this.setState({ commentMessage: '', commentFile: '', commentResponding: {} })
      }
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      AntdMessage.error(errorMessage)
    } finally {
      this.setState({ sendingComment: false })
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
      const projectItemId = get(data, 'projectItem.id', '')
      if (!!projectId) {
        const { items: emails } = this.state
        this.setState({ savingInvitations: true })
        await sendInvitations({ variables: { projectId, emails, projectItemId } })
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

  reSendInvitationsAction = async (evt: React.MouseEvent) => {
    const {
      intl: { formatMessage },
      reSendInvitation,
      data,
    } = this.props
    const {
      currentTarget: { id: email }
    } = evt
    try {
      const projectId = get(data, 'projectItem.project.shortId', '')
      const projectItemId = get(data, 'projectItem.id', '')
      if (!!projectId && !!email) {
        this.setState({ resendingEmail: email })
        await reSendInvitation({ variables: { projectId, email, projectItemId } })
        AntdMessage.success(formatMessage(messages.invitationResent))
      }
    } catch (e) {
      AntdMessage.error(e.message)
    } finally {
      this.setState({ resendingEmail: '' })
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

  onDeleteMember = async (evt: React.MouseEvent<HTMLDivElement>) => {
    const {
      data,
      intl: { formatMessage },
      deleteMember
    } = this.props
    try {
      const {
        currentTarget: { id: memberId }
      } = evt
      if (!!memberId) {
        const membersArray = get(data, 'projectItem.project.members', [])
        const index = membersArray.findIndex((item) => item.shortId === memberId)
        membersArray.splice(index, 1)
        set(data, 'projectItem.project.members', membersArray)
        this.forceUpdate()
        await deleteMember(
          { variables: { memberId }
        })
        AntdMessage.success(formatMessage(messages.memberDeleted))
      }
    } catch (e) {
      AntdMessage.error(e.message)
    }
  }

  updateLike = async (evt: React.MouseEvent<HTMLDivElement>) => {
    const {
      membersComments,
      user,
      updateReaction
    } = this.props
    try {
      const {
        currentTarget: { id: messageId }
      } = evt
      if (!!messageId) {
        const { id: userId } = user || {}
        const comments = get(membersComments, 'projectComments', [])
        const itemIndex = comments.findIndex((comment: ProDesignComment) => comment.id === Number(messageId))
        const likes = itemIndex !== -1 && comments[itemIndex] ? comments[itemIndex].likes || [] : []
        let updatedLikes = likes
        const isDislike = likes.includes(userId)
        if (isDislike) {
          updatedLikes = likes.filter((idUser: string) => idUser !== userId) 
        } else {
          updatedLikes.push(userId)
        }
        set(membersComments, ['projectComments', itemIndex, 'likes'], updatedLikes)
        this.forceUpdate()
        await updateReaction(
          { variables: { messageId, isHeart: false }
        })
      }
    } catch (e) {
      AntdMessage.error(e.message)
    }
  }

  updateHeart = async (evt: React.MouseEvent<HTMLDivElement>) => {
    const {
      membersComments,
      user,
      updateReaction
    } = this.props
    try {
      const {
        currentTarget: { id: messageId }
      } = evt
      if (!!messageId) {
        const { id: userId } = user || {}
        const comments = get(membersComments, 'projectComments', [])
        const itemIndex = comments.findIndex((comment: ProDesignComment) => comment.id === Number(messageId))
        const hearts = itemIndex !== -1 && comments[itemIndex] ? comments[itemIndex].hearts || [] : []
        let updatedHearts = hearts
        const isDislike = hearts.includes(userId)
        if (isDislike) {
          updatedHearts = hearts.filter((idUser: string) => idUser !== userId) 
        } else {
          updatedHearts.push(userId)
        }
        set(membersComments, ['projectComments', itemIndex, 'hearts'], updatedHearts)
        this.forceUpdate()
        await updateReaction(
          { variables: { messageId, isHeart: true }
        })
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

  scrollMessagesComment = () => {
    if (window && this.commentList) {
      const node = document.getElementsByClassName('commentLog')[0] as HTMLElement
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
      this.setState({ designToApply: design, selectedKeyMobile: '' })
      setTimeout(() => { this.openMessages() }, 1000)
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
    if (['Enter', 'Tab', ',', ' '].includes(evt.key)) {
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

  handleBlur = evt => {
    if (evt) {
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

  copyShareLink = () => {
    const { intl: { formatMessage }, data } = this.props
    const itemId = get(data, 'projectItem.id', '')
    const tempInput = document.createElement('input')
    tempInput.value = `${config.baseUrl}approval?id=${itemId}`
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    AntdMessage.success(formatMessage(messages.copiedLink))
  }

  focusOnInput = () => {
    if (this.emailInput) {
      this.emailInput.focus()
    }
  }

  handlePaste = (evt: any) => {
    evt.preventDefault()
    const paste = evt.clipboardData.getData('text')
    const emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g)
    if (emails) {
      const { data } = this.props
      const { items } = this.state
      const projectMembers = get(data, 'projectItem.project.members', [])
      const projectMembersMails = projectMembers.map((item) => item.email.trim().toLowerCase())
      const itemsLower = items.map((item: string) => item.trim().toLowerCase())
      const toBeAdded = emails.filter(
        (email: string) => !this.isInList(email, [...projectMembersMails, ...itemsLower])
      )
      const arrayCleaned = toBeAdded.slice(0, 5 - (items.length + projectMembers.length))
      this.setState({
        items: [...this.state.items, ...arrayCleaned]
      })
    }
  }

  isAllowed = (email: string) => {
    if (email) {
      const cleanMail = email.trim().toLowerCase()
      return !(/^[a-zA-Z0-9_.+-]+@((jakroousa.com|jakroo.ca))$/g.test(cleanMail))
    }
    return false
  }

  isValid = (email: string) => {
    let error = null
    const { data } = this.props
    const { items } = this.state
    const projectMembers = get(data, 'projectItem.project.members', [])
    const projectMembersMails = projectMembers.map((item) => item.email.trim().toLowerCase())
    const itemsLower = items.map((item: string) => item.trim().toLowerCase())
    if (!this.isAllowed(email)) {
      error = 'This email domain is not allowed'
      this.setState({ error })
      return false
    }
    if (this.isInList(email, [...projectMembersMails, ...itemsLower])) {
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

  isInList = (email: string, items: string[]) => {
    if (email) {
      const { data } = this.props
      const ownerMail = get(data, 'projectItem.project.customerEmail', '')
      const cleanMail = email.trim().toLowerCase()
      const valid = this.isAllowed(cleanMail)
      return (items.includes(cleanMail) || !valid || cleanMail === ownerMail)
    }
    return true
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
      membersComments,
      approveLoading,
      note,
      user,
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
      openStatusInfo,
      commentMessage,
      commentFile,
      commentResponding,
      resendingEmail,
      uploadingFileComment,
      sendingComment,
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
      openPrintPreview,
      selectedKeyMobile
    } = this.state
    const currency = currentCurrency || config.defaultCurrency
    const fontList: Font[] = get(fontsData, 'fonts', [])
    const { loading = true, projectItem, error } = data || {}
    const search = get(history, 'location.search', '')
    const { tab } = queryString.parse(search)
    const incomingMessages = get(projectItem, 'messages', []) as ProDesignMessage[]
    const product = get(projectItem, 'product', {}) as Product
    const design = get(projectItem, 'design', {}) as DesignType
    const colors = get(projectItem, 'colors', []) as ColorType[]
    const projectItemId = get(projectItem, 'id', '') as string
    const itemCode = get(projectItem, 'code', '') as string
    const role = get(projectItem, 'role', GUEST_ROLE) as string
    const editRequestPrice = get(editRequestData, ['editRequestPrices', currency], 0) as number
    const highlight = get(projectItem, 'showNotification', 0) as number
    const commentsNotifications = get(projectItem, 'commentsNotifications', 0) as number
    const projectDesigns = get(projectItem, 'project.designs', []) as DesignType[]
    const projectComments = get(membersComments, 'projectComments', []) as ProDesignComment[]
    const itemStatus = get(projectItem, 'status', '') as string
    const requestsLimit = get(projectItem, 'limitRequests', 0) as number
    const paidRequests = get(projectItem, 'paidRequests', 0) as number
    const limitRequests = paidRequests + requestsLimit
    const predyedColors = get(predyedData, 'getPredyedColors', [])
    const projectMembers = get(projectItem, 'project.members', [])
    const ownerName = get(projectItem, 'project.customer', '')
    const ownerEmail = get(projectItem, 'project.customerEmail', '')
    const sessionUser = get(user, 'id', '')
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
    const isOwner = role === OWNER_ROLE
    const isApprover = role === APPROVER_ROLE
    const isGuest = role === GUEST_ROLE
    const variants = get(dataVariants, 'getVariants', [])
    let modelObj
    let modelMtl
    if (selectedVariant !== -1) {
      const { obj, mtl } = variants[selectedVariant]
      modelObj = obj
      modelMtl = mtl
    }
    
    const hideAdvertising = typeof window !== 'undefined' ? localStorage.getItem('hideAdvertising') : ''
    const showAdvertising = !hideAdvertising || hideAdvertising !== 'true'
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : ''
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
          highlight={chatLog && chatLog.length && highlight > 0}
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
                  <MessageBox highlight={chatLog && chatLog.length && highlight > 0}>
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
                    {required && !isGuest &&
                      <RequiredText onClick={this.replyMessage(id, incomingMessage)}>
                        {formatMessage(messages.required)}
                      </RequiredText>
                    }
                    {files.map((fileString: string, index: number) =>
                      <MessageFile isAdmin={fromSystem} onClick={this.openFile(fileString)} key={index}>
                        {/* tslint:disable-next-line: max-line-length */}
                        {['.jpg', '.jpeg', '.svg', '.png'].includes((getFileExtension(fileString) || '').toLowerCase()) ?
                          <ImageMessage src={fileString} /> :
                          <>
                            <Clip type="paper-clip" />
                            <FileName>
                              {getFileWithExtension(fileString || '')}
                            </FileName>
                          </>
                        }
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
                    {createdMessage ? moment(createdMessage).format(TIME_FORMAT) : '-'}
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
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
    const collabComponent = !!itemStatus ?
      <Collaboration>
        <ApprovalTitle>{formatMessage(messages.teamMembers)}</ApprovalTitle>
        <CollabInfo>
          {isMobile ?
            <CollapseStyled bordered={false}>
              <PanelDiv 
                header={
                  <CollabTitle>
                    {formatMessage(messages.teamCollaborationTitle)}
                  </CollabTitle>
                }
                key="1"
              >
                <CollabDescription
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(messages[isOwner ? 'teamCollaborationDesc' : 'membersDesc'])
                  }}
                />
                {isOwner &&
                  <CollabWarning>
                    {formatMessage(messages.teamCollabWarning)}
                  </CollabWarning>
                }
              </PanelDiv>
            </CollapseStyled> :
            <>
              <CollabTitle>
                {formatMessage(messages.teamCollaborationTitle)}
              </CollabTitle>
              <CollabDescription
                dangerouslySetInnerHTML={{
                  __html: formatMessage(messages[isOwner ? 'teamCollaborationDesc' : 'membersDesc'])
                }}
              />
              {isOwner &&
                <CollabWarning>
                  {formatMessage(messages.teamCollabWarning)}
                </CollabWarning>
              }
            </>
          }
          {isOwner &&
            <AddMemberButton
              disabled={projectMembers.length >= 5 || !isOwner}
              onClick={(projectMembers.length >= 5 || !isOwner) ? () => {} : this.openInviteModal}
            >
              {formatMessage(messages.inviteMembers)}
            </AddMemberButton>
          }
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
              <MemberOwnerLabel secondary={!isOwner}>
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
                      {isOwner &&
                        <Resend
                          id={member.email}
                          onClick={this.reSendInvitationsAction}
                        >
                          {resendingEmail === member.email ? <Spin size="small" /> : formatMessage(messages.resend)}
                        </Resend>
                      }
                    </PendingDiv>
                  }
                </MemberData>
                <MemberType
                  disabled={!isOwner}
                  onChange={(e: string) => this.onSelectRole(e, member.shortId)}
                  value={member.role}>
                  {memberTypeOptions.map((value: string, index: number) => (
                    <Option key={index} value={value}>
                      {value}
                    </Option>
                  ))}
                </MemberType>
                {isOwner && <MemberDelete id={member.shortId} onClick={this.onDeleteMember} type="delete" />}
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
                    disabled={this.state.items.length >= 5 || (projectMembers.length + this.state.items.length) >= 5}
                    placeholder={this.state.items.length > 0 ? null : 'You can copy and paste a list of emails...'}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                    onBlur={this.handleBlur}
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
                    <GearIcon onClick={this.copyShareLink} type="link" />
                    <InviteLinkLabel onClick={this.copyShareLink}>
                      {formatMessage(messages.teamInviteLink)}
                    </InviteLinkLabel>
                    <StyledPopOver
                      overlayClassName="innerClassTooltip"
                      title={
                        <PopoverText
                          dangerouslySetInnerHTML={{
                            __html: formatMessage(messages.linkInfo)
                          }}
                        />
                      }
                    >
                      <InfoIconLink type="question-circle" theme="filled" />
                    </StyledPopOver>
                  </InviteLink>
                  <CopyLinkButton onClick={this.copyShareLink}>{formatMessage(messages.copyLink)}</CopyLinkButton>
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

    const commentsComponent = 
      <CommentSection>
        <ChatComments className="commentLog" ref={(commentList: any) => { this.commentList = commentList }}>
          {projectComments.map((
              {
                id: idComment,
                owner,
                parent,
                likes = [],
                hearts = [],
                createdAt,
                file: fileComment,
                message,
                userName,
                userSerialId,
                parentMessageId: parentId
              }: ProDesignComment
            , key: number
            ) =>
            <IncomingMessage {...{ key }} isAdmin={!owner}>
              <MessageHeader isAdmin={!owner}>
                <MemberInitials codeColor={!owner ? memberColors[Math.floor(userSerialId % 7)] : BLUE_SOFT}>
                  <UserIcon type="user" />
                </MemberInitials>
              </MessageHeader>
              <InfoDiv isAdmin={!owner}>
                <CommentMessage isAdmin={!owner}>
                  {!owner &&
                    <CommentHeader codeColor={memberColors[Math.floor(userSerialId % 7)]}>
                      {userName}
                    </CommentHeader>
                  }
                  {parentId && parent && parent.message &&
                    <ParentText codeColor={memberColors[Math.floor(parent.userSerialId % 7)]}>
                      <CommentHeader codeColor={memberColors[Math.floor(parent.userSerialId % 7)]}>
                        {parent.userName}
                      </CommentHeader>
                      {parent.message}
                    </ParentText>
                  }
                  <MessageComment>
                    {message}
                  </MessageComment>
                  {!!fileComment &&
                    <MessageFile
                      isAdmin={!owner}
                      onClick={this.openFile(fileComment)}
                    >
                      {/* tslint:disable-next-line: max-line-length */}
                      {['.jpg', '.jpeg', '.svg', '.png'].includes((getFileExtension(fileComment) || '').toLowerCase()) ?
                        <ImageMessage src={fileComment} /> :
                        <>
                          <Clip type="paper-clip" />
                          <FileName>
                            {/* tslint:disable-next-line: max-line-length */}
                            {getFileWithExtension(fileComment || '')}
                          </FileName>
                        </>
                      }
                    </MessageFile>
                  }
                  {!owner && !isGuest && !!role &&
                    <ReplyComment id={idComment} onClick={this.setReplyComment}>
                      {formatMessage(messages.reply)}
                      <ReplyIcon type="enter" />
                    </ReplyComment>
                  }
                </CommentMessage>
                <DateMessage>
                  {createdAt ? moment(createdAt).local().format(TIME_FORMAT) : '-'}
                </DateMessage>
                <ActionsIcons>
                  <LikeAction>
                    <LikeIcon
                      id={idComment}
                      onClick={!isGuest && !!role ? this.updateLike : () => {}}
                      type="like"
                      theme={likes.includes(sessionUser) ? 'filled' : 'outlined'}
                    />
                    {likes.length}
                  </LikeAction>
                  <HeartAction>
                    <HeartIcon
                      id={idComment}
                      type="heart"
                      onClick={!isGuest && !!role ? this.updateHeart : () => {}}
                      theme={hearts.includes(sessionUser) ? 'filled' : 'outlined'}
                    />
                    {hearts.length}
                  </HeartAction>
                </ActionsIcons>
              </InfoDiv>
            </IncomingMessage>
          )}
        </ChatComments>
        {!isGuest && !!role &&
          <CommentInput>
            {showAdvertising && (isApprover || isOwner) &&
              <AdvertisingComments>
                {formatMessage(messages.advertisingMessage)}
                <CloseAdvertising onClick={this.hideAdvertising} type="close" />
              </AdvertisingComments>
            }
            {commentResponding && commentResponding.id &&
              <FullResponse>
                <ParentText codeColor={memberColors[Math.floor(commentResponding.userSerialId % 7)]}>
                  <CommentHeader codeColor={memberColors[Math.floor(commentResponding.userSerialId % 7)]}>
                    {commentResponding.userName}
                  </CommentHeader>
                  {commentResponding.message}
                </ParentText>
                <RemoveParent onClick={this.clearReply} type="close" />
              </FullResponse>
            }
            <FullResponse>
              <UploadFileComment
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                disabled={uploadingFileComment || sendingComment}
                customRequest={this.uploadCommentFile}
                beforeUpload={this.beforeUpload}
              >
                {uploadingFileComment ? <Spin size="small" /> : <ClipComment type="paper-clip" />}
              </UploadFileComment>
              <InputComment
                innerRef={(commentInput: any) => { this.commentInput = commentInput }}
                value={commentMessage}
                disabled={sendingComment}
                onChange={this.handleInputComment}
                maxLength={768}
                placeholder="You can add multiple text here..."
                autosize={{ minRows: 1, maxRows: 12 }}
                rows={4}
              />
              <SendCommentButton
                disabled={!commentMessage || sendingComment || uploadingFileComment}
                onClick={(
                  !commentMessage || sendingComment || uploadingFileComment) ? 
                  () => {} : 
                  this.sendCommentAction
                }
              >
                {sendingComment ? <Spin size="small" /> : formatMessage(messages.send)}
              </SendCommentButton>
            </FullResponse>
            {!!commentFile &&
              <FileComment>
                <Clip type="file" />
                <FileName onClick={this.openFile(commentFile)}>
                  {/* tslint:disable-next-line: max-line-length */}
                  {getFileWithExtension(commentFile || '')}
                </FileName>
                <RemoveFileIcon onClick={this.clearFileComment} type="close" />
              </FileComment>
            }
          </CommentInput>
        }
      </CommentSection>

    return (
      <Layout {...{ history, intl }} hideBottomHeader={true} hideFooter={true} hideAlerts={true}>
        <Container>
          {installedFonts.length ? (
            <GoogleFontLoader fonts={installedFonts} />
          ) : null}
          {loading && !error && <LoadingContainer><Spin size="large" /></LoadingContainer>}
          <BlackBarMobile>
            <BackButton onClick={this.goToHome}>
              <LeftArrow type="left-circle" />
              {formatMessage(messages.back)}
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
              <StyledTabs
                secondary={
                  ownerEmail === 'jesus@tailrecursive.co' || 
                  ownerEmail === 'derekw@jakroousa.com' ||
                  ownerEmail === 'acaurora@comcast.net' ||
                  ownerEmail === 'bbtester1@jakroousa.com' || 
                  ownerEmail === 'derekrwiseman@gmail.com'
                }
                activeKey={selectedKey}
                onTabClick={this.onTabClickAction}
              >
                {(ownerEmail === 'jesus@tailrecursive.co' || 
                  ownerEmail === 'derekw@jakroousa.com' ||
                  ownerEmail === 'acaurora@comcast.net' ||
                  ownerEmail === 'bbtester1@jakroousa.com' ||
                  ownerEmail === 'derekrwiseman@gmail.com') &&
                  <TabPane
                    tab={
                      <Tab
                        selected={selectedKey === COLLAB}
                        label={COLLAB}
                        icon={selectedKey === COLLAB ? teamIconSelected : teamIcon}
                      />
                    }
                    key={COLLAB}
                  >
                    <TabContent height={windowHeight}>
                      {collabComponent}
                    </TabContent>
                  </TabPane>
                }
                <TabPane
                  tab={
                    <Tab
                      selected={selectedKey === APPROVAL}
                      label={APPROVAL}
                      icon={selectedKey === APPROVAL ? messageIconSelected : messageIcon}
                    />
                  }
                  key={APPROVAL}
                >
                  <TabContent height={windowHeight}>
                    {chatComponent}
                  </TabContent>
                </TabPane>
                {(ownerEmail === 'jesus@tailrecursive.co' || 
                  ownerEmail === 'derekw@jakroousa.com' ||
                  ownerEmail === 'acaurora@comcast.net' ||
                  ownerEmail === 'bbtester1@jakroousa.com' ||
                  ownerEmail === 'derekrwiseman@gmail.com') &&
                  <TabPane
                    tab={
                      <Tab
                        selected={selectedKey === COMMENTS}
                        label={COMMENTS}
                        icon={selectedKey === COMMENTS ? commentsIconSelected : commentsIcon}
                      />
                    }
                    key={COMMENTS}
                  >
                    <TabContent height={windowHeight}>
                      {commentsComponent}
                    </TabContent>
                  </TabPane>
                }
                <TabPane
                  tab={
                    <Tab
                      selected={selectedKey === COLOR}
                      label={COLOR}
                      icon={selectedKey === COLOR ? colorIconSelected : colorIcon}
                    />
                  }
                  key={COLOR}
                >
                  <TabContent height={windowHeight}>
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
                <StatusLabel onClick={isMobile ? this.openStatusModal : () => {}} color={statusColor}>
                  {itemLabels[itemStatus] || formatMessage(messages.inDesign)}
                  {!isMobile && 
                    <WhatsThis onClick={this.openStatusModal}>
                      {formatMessage(messages.whatsThis)}
                    </WhatsThis>
                  }
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
                <Variants
                  secondary={itemStatus !== PREFLIGHT_STATUS && !!designId}
                  selected={itemStatus !== CUSTOMER_APPROVED && !!designId}
                >
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
              {(isOwner || isApprover) &&
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
              }
              {(selectedKeyMobile === '1' || !selectedKeyMobile) && (isOwner || isApprover) &&
                <MobileRequestButtons>
                  <ApproveButton
                    loading={approveLoading}
                    disabled={
                      approveLoading ||
                      itemStatus !== CUSTOMER_PREVIEW ||
                      (!!designToApply && outputPng !== designToApply) ||
                      (!isOwner && !isApprover)
                    }
                    onClick={this.handlePromptApprove}
                  >
                    {formatMessage(messages.approve)}
                  </ApproveButton>
                  <RequestEdit
                    disabled={itemStatus !== CUSTOMER_PREVIEW || (!isOwner && !isApprover)}
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
              }
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
                  {!readyToShow && product && showRenderWindow && !designToApply &&
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
            <CollapseWrapper selected={!!selectedKeyMobile}>
              <CollapseMobile
                defaultActiveKey={chatLog && chatLog.length && highlight > 0 && !tab ? 
                  '1' : (tab && tab === COMMENTS ? '2' : '')
                }
                accordion={true}
                onChange={this.changeCollapseMobile}
                destroyInactivePanel={true}
              >
                {(ownerEmail === 'jesus@tailrecursive.co' || 
                  ownerEmail === 'derekw@jakroousa.com' ||
                  ownerEmail === 'acaurora@comcast.net' ||
                  ownerEmail === 'bbtester1@jakroousa.com' ||
                  ownerEmail === 'derekrwiseman@gmail.com') &&
                  <PanelMobile
                    header={
                      <PanelTitle>
                        <PanelIcon
                          selected={selectedKeyMobile === '0'}
                          src={selectedKeyMobile === '0' ? teamIconSelected : teamIcon}
                        />
                        {formatMessage(messages.teamMembers)}
                      </PanelTitle>
                    }
                    key="0"
                  >
                    {collabComponent}
                  </PanelMobile>
                }
                <PanelMobile
                  header={
                    <PanelTitle ref={e => { this.chatDiv = e }}>
                      <PanelIcon
                        selected={selectedKeyMobile === '1'}
                        src={selectedKeyMobile === '1' ? messageIconSelected : messageIcon}
                      />
                      {formatMessage(messages.approvalLog)}
                      {highlight > 0 &&
                        <ChatCount>
                          <CountCircle className="counter">
                            {highlight}
                          </CountCircle>
                        </ChatCount>
                      }
                    </PanelTitle>
                  }
                  key="1"
                >
                  {chatComponent}
                </PanelMobile>
                {(ownerEmail === 'jesus@tailrecursive.co' || 
                  ownerEmail === 'derekw@jakroousa.com' ||
                  ownerEmail === 'acaurora@comcast.net' ||
                  ownerEmail === 'bbtester1@jakroousa.com' ||
                  ownerEmail === 'derekrwiseman@gmail.com') &&
                  <PanelMobile
                    header={
                      <PanelTitle>
                        <PanelIcon
                          selected={selectedKeyMobile === '2'}
                          src={selectedKeyMobile === '2' ? commentsIconSelected : commentsIcon}
                        />
                        {formatMessage(messages.comments)}
                        {commentsNotifications > 0 &&
                          <ChatCount>
                            <CountCircle className="counter">
                              {commentsNotifications}
                            </CountCircle>
                          </ChatCount>
                        }
                      </PanelTitle>
                    }
                    key="2"
                  >
                    {commentsComponent}
                  </PanelMobile>
                }
                <PanelMobile
                  header={
                    <PanelTitle>
                      <PanelIcon
                        selected={selectedKeyMobile === '3'}
                        src={selectedKeyMobile === '3' ? colorIconSelected : colorIcon}
                      />
                      {formatMessage(messages.colors)}
                    </PanelTitle>
                  }
                  key="3"
                >
                  {colorComponent}
                </PanelMobile>
                <PanelMobile
                  header={
                    <PanelTitle ref={e => { this.catalogDiv = e }}>
                      <PanelIcon
                        selected={selectedKeyMobile === '4'}
                        src={selectedKeyMobile === '4' ? viewDesignsIconSelected : viewDesignsIconMobile}
                      />
                      {formatMessage(messages.viewDesigns)}
                    </PanelTitle>
                  }
                  key="4"
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
            <Modal
              visible={openStatusInfo}
              footer={null}
              closable={false}
              width={isMobile ? '100%' : '1024px'}
              wrapClassName={isMobile ? 'transparentMask' : 'bigModal'}
              maskStyle={isMobile ? { background: 'rgb(0 0 0 / 80%)', backdropFilter: 'blur(7px)' } : {}}
            >
              <StatusTitle>
                {formatMessage(messages.statusTitle)}
              </StatusTitle>
              <StatusSubTitle>
                {formatMessage(messages.statusSubTitle)}
              </StatusSubTitle>
              <StatusCardsSection>
                <StatusCard>
                  <StatusCardLabel color={BLACK}>
                    {formatMessage(messages.pending)}
                  </StatusCardLabel>
                  <StatusImage src={novaBlank} />
                  <StatusDescription
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.pendingDesc)
                    }}
                  />
                </StatusCard>
                <StatusCardMobile>
                  <StatusCardLabel color={BLACK}>
                    {formatMessage(messages.pending)}
                  </StatusCardLabel>
                  <StatusMobileBody>
                    <StatusImage src={novaBlank} />
                    <StatusDescription
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.pendingDesc)
                      }}
                    />
                  </StatusMobileBody>
                </StatusCardMobile>
                <ArrowStatus src={arrowShort} />
                <StatusCard>
                  <StatusCardLabel color={BLUE_STATUS}>
                    {formatMessage(messages.inDesign)}
                  </StatusCardLabel>
                  <StatusImage src={novaBlank} />
                  <StatusDescription
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.inDesignDesc)
                    }}
                  />
                </StatusCard>
                <StatusCardMobile>
                  <StatusCardLabel color={BLUE_STATUS}>
                    {formatMessage(messages.inDesign)}
                  </StatusCardLabel>
                  <StatusMobileBody>
                    <StatusImage src={novaBlank} />
                    <StatusDescription
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.inDesignDesc)
                      }}
                    />
                  </StatusMobileBody>
                </StatusCardMobile>
                <ArrowStatus src={arrowShort} />
                <StatusCard>
                  <StatusCardLabel color={ORANGE_STATUS}>
                    {formatMessage(messages.readyToReview)}
                  </StatusCardLabel>
                  <StatusImage src={novaFull} />
                  <StatusDescription
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.reviewDesc)
                    }}
                  />
                </StatusCard>
                <StatusCardMobile>
                  <StatusCardLabel color={ORANGE_STATUS}>
                    {formatMessage(messages.readyToReview)}
                  </StatusCardLabel>
                  <StatusMobileBody>
                    <StatusImage src={novaFull} />
                    <StatusDescription
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.reviewDesc)
                      }}
                    />
                  </StatusMobileBody>
                </StatusCardMobile>
                <ArrowStatus src={arrowShort} />
                <StatusCard>
                  <StatusCardLabel color={GREEN_STATUS}>
                    {formatMessage(messages.approvedCode)}
                  </StatusCardLabel>
                  <StatusImage src={novaFull} />
                  <StatusDescription
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.approvedDesc)
                    }}
                  />
                </StatusCard>
                <StatusCardMobile>
                  <StatusCardLabel color={GREEN_STATUS}>
                    {formatMessage(messages.approvedCode)}
                  </StatusCardLabel>
                  <StatusMobileBody>
                    <StatusImage src={novaFull} />
                    <StatusDescription
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(messages.approvedDesc)
                      }}
                    />
                  </StatusMobileBody>
                </StatusCardMobile>
              </StatusCardsSection>
              <BottomSectionStatus>
                <ArrowLong src={arrowLong} />
                <CloseButtonStatus onClick={this.closeStatusModal}>
                  {formatMessage(messages.close)}
                </CloseButtonStatus>
              </BottomSectionStatus>
            </Modal>
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
  graphql(getProdesignItemCommentsQuery, {
    options: ({ location }: OwnProps) => {
      const search = location ? location.search : ''
      const queryParams = queryString.parse(search)
      return {
        variables: { shortId: queryParams.id },
        fetchPolicy: 'network-only',
        skip: !queryParams.id
      }
    },
    name: 'membersComments'
  }),
  graphql(updateReactionMutation, { name: 'updateReaction' }),
  graphql(sendCommentMutation, { name: 'sendComment' }),
  graphql(reSendInvitationsMutation, { name: 'reSendInvitation' }),
  graphql(deleteMemberMutation, { name: 'deleteMember' }),
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
