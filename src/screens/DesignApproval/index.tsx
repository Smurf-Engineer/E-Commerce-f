/**
 * DesignApproval Screen - Created by Jesús on 28/21/20.
 */
import * as React from 'react'
import { injectIntl, InjectedIntl } from 'react-intl'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import GoogleFontLoader from 'react-google-font-loader'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { compose, graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import queryString from 'query-string'
import AntdMessage from 'antd/lib/message'
import messageIcon from '../../assets/approval_log.svg'
import JakRooLogo from '../../assets/Jackroologo.svg'
import colorIcon from '../../assets/color_white.svg'
import { getFonts, getProdesignItemQuery } from './data'
import { restoreUserSession } from '../../components/MainLayout/api'
import * as designsActions from './actions'
import * as designsApiActions from './api'
import AntdTabs from 'antd/lib/tabs'
import { QueryProps, Font, UserType, ProDesignItem, ProDesignMessage, UploadFile } from '../../types/common'
// TODO: Commented all quickview related until confirm it won't be needed
// import quickView from '../../assets/quickview.svg'
import {
  ApprovalTitle,
  ButtonContainer,
  CancelButton,
  ChatMessages,
  Clip,
  Container,
  DateMessage,
  DesignChat,
  FileLabel,
  FileName,
  IncomingMessage,
  InfoDiv,
  Initials,
  JakrooLogo,
  Layout,
  LoadingContainer,
  MessageBody,
  MessageBox,
  MessageHeader,
  MessageType,
  ModalSubtitle,
  ModalTitle,
  ParentText,
  PurchaseButton,
  RequestButtons,
  RequestEdit,
  RequestText,
  RequiredText,
  SaveButton,
  StyledIcon,
  StyledTabs,
  StyledUpload,
  TabContent,
  TextAreaStyled,
  UploadButton,
  UserIcon,
  UserName
} from './styledComponents'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Tab from './Tab'
import { COLOR, APPROVAL, LIMIT_REQUESTS } from './constants'
import { EDIT, FROM_ADMIN } from '../../constants'
import moment from 'moment'
import messages from './messages'
import Modal from 'antd/lib/modal'
import Spin from 'antd/lib/spin'
import { getFileWithExtension } from '../../utils/utilsFiles'
import { UploadChangeParam } from 'antd/lib/upload'

const { TabPane } = AntdTabs

interface Data extends QueryProps {
  projectItem: ProDesignItem
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
  fontsData: any
  uploadingFile: boolean
  parentMessageId: string
  parentMessage: string
  setReplyAction: (id: string, message: string) => void
  changeNoteAction: (value: string) => void
  uploadFileAction: (file: UploadFile) => void
  restoreUserSessionAction: (client: any) => void
  setOpenModal: (open: boolean) => void
}

export class DesignApproval extends React.Component<Props, {}> {
  state = {
    selectedKey: APPROVAL
  }
  private listMsg: any
  componentWillMount() {
    const { user, client } = this.props
    if (typeof window !== 'undefined' && !user) {
      const { restoreUserSessionAction } = this.props
      restoreUserSessionAction(client)
    }
  }
  async componentDidMount() {
    await LoadScripts(threeDScripts)
  }
  onTabClickAction = (selectedKey: string) => {
    this.setState({ selectedKey })
  }
  handleOpenRequest = () => {
    const { setOpenModal } = this.props
    setOpenModal(true)
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

  replyMessage = (id: string, message: string) => () => {
    const { setReplyAction } = this.props
    setReplyAction(id, message)
  }

  // handleOpenQuickView = () => {
  //   const {
  //     data: {
  //       design: { product }
  //     },
  //     openQuickViewAction: openQuickView
  //   } = this.props
  //   openQuickView(product.id)
  // }

  render() {
    const {
      fontsData,
      data,
      openRequest,
      parentMessageId,
      parentMessage,
      note,
      uploadingFile,
      file,
      sendingNote,
      intl: { formatMessage }
    } = this.props
    const { selectedKey } = this.state
    const fontList: Font[] = get(fontsData, 'fonts', [])
    const { loading = true, projectItem } = data || {}
    const requestMessages = get(projectItem, 'messages', []) as ProDesignMessage[]
    const installedFonts = fontList.reduce<{ font: string }[]>(
      (fontObject, { active, family }) => {
        if (active) {
          fontObject.push({ font: family })
        }
        return fontObject
      },
      []
    )
    const requestedEdits = requestMessages.filter(({ type }) => type === EDIT).length
    const fileName = file ? getFileWithExtension(file) : ''
    return (
      <Container>
        {installedFonts.length ? (
          <GoogleFontLoader fonts={installedFonts} />
        ) : null}
        <Layout>
          {loading && <LoadingContainer><Spin size="large" /></LoadingContainer> }
          <StyledTabs activeKey={selectedKey} onTabClick={this.onTabClickAction}>
            <TabPane tab={<Tab label={APPROVAL} icon={messageIcon} />} key={APPROVAL}>
              <TabContent>
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
                </DesignChat>
              </TabContent>
            </TabPane>
            <TabPane tab={<Tab label={COLOR} icon={colorIcon} />} key={COLOR}>
              I EAT PEARS
            </TabPane>
          </StyledTabs>
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
                onClick={() => {}}
              >
                {formatMessage(messages[!!parentMessageId ? 'reply' : 'send'])}
              </SaveButton>
            </ButtonContainer>
          </Modal>
        </Layout>
      </Container>
    )
  }
}

interface OwnProps {
  location?: any
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
  })
)(DesignApproval)

export default DesignsEnhance
