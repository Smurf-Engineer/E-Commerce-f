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
import messageIcon from '../../assets/approval_log.svg'
import JakRooLogo from '../../assets/Jackroologo.svg'
import colorIcon from '../../assets/color_white.svg'
import { getFonts, getProdesignItemQuery } from './data'
import { restoreUserSession } from '../../components/MainLayout/api'
import * as designsActions from './actions'
import AntdTabs from 'antd/lib/tabs'
import { QueryProps, Font, UserType, ProDesignItem, ProDesignMessage } from '../../types/common'
// TODO: Commented all quickview related until confirm it won't be needed
// import quickView from '../../assets/quickview.svg'
import {
  ButtonContainer,
  ChatMessages,
  Container,
  DateMessage,
  DesignChat,
  IncomingMessage,
  InfoDiv,
  Initials,
  JakrooLogo,
  Layout,
  MessageBody,
  MessageBox,
  MessageHeader,
  MessageType,
  ParentText,
  RequiredText,
  SaveButton,
  StyledTabs,
  TabContent,
  TextAreaStyled,
  UserIcon,
  UserName
} from './styledComponents'
import { LoadScripts } from '../../utils/scriptLoader'
import { threeDScripts } from '../../utils/scripts'
import Tab from './Tab'
import { COLOR, APPROVAL } from './constants'
import { EDIT, FROM_ADMIN } from '../../constants'
import moment from 'moment'
import messages from './messages'
import Modal from 'antd/lib/modal/Modal'

const { TabPane } = AntdTabs

interface Data extends QueryProps {
  projectItem: ProDesignItem
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  data: Data
  client: any
  user: UserType
  // openQuickViewAction: (index: number) => void
  loadingModel: boolean
  fontsData: any
  phone: boolean
  // Redux actions
  restoreUserSessionAction: (client: any) => void
  setLoadingAction: (loading: boolean) => void
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
    await LoadScripts(threeDScripts, this.handleModelLoaded)
  }
  onTabClickAction = (selectedKey: string) => {
    this.setState({ selectedKey })
  }
  handleModelLoaded = () => {
    const { setLoadingAction } = this.props
    setLoadingAction(false)
  }
  handleOnPressBack = () => {
    window.location.replace('/')
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
    const { location, fontsData, data, intl: { formatMessage } } = this.props
    const { selectedKey } = this.state
    const { search } = location
    const queryParams = queryString.parse(search)
    const designId = queryParams.id || ''
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
    return (
      <Container>
        {installedFonts.length ? (
          <GoogleFontLoader fonts={installedFonts} />
        ) : null}
        <Layout>
          <StyledTabs activeKey={selectedKey} onTabClick={this.onTabClickAction}>
            <TabPane tab={<Tab label={APPROVAL} icon={messageIcon} />} key={APPROVAL}>
              <TabContent>
                <DesignChat>
                  <ChatMessages ref={(listMsgs: any) => { this.listMsg = listMsgs }}>
                    {requestMessages.map((
                      { 
                        message: incomingMessage,
                        userName,
                        createdAt: createdMessage,
                        type: messageType,
                        requireAnswer: required,
                        answer,
                        parentMessageId
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
                            {(!!parentMessageId && answer) &&
                              <ParentText>
                                {answer.message}
                              </ParentText>
                            }
                            <MessageBody>
                              {incomingMessage}
                            </MessageBody>
                            {required && <RequiredText>{formatMessage(messages.required)}</RequiredText>}
                          </MessageBox>
                          <DateMessage>
                            {createdMessage ? moment(createdMessage).format('DD/MM/YYYY HH:mm') : '-'}
                          </DateMessage>
                        </InfoDiv>
                      </IncomingMessage>
                    )}
                  </ChatMessages>
                </DesignChat>
              </TabContent>
            </TabPane>
            <TabPane tab={<Tab label={COLOR} icon={colorIcon} />} key={COLOR}>
              I EAT PEARS
            </TabPane>
          </StyledTabs>
          <Modal open={false}>
            <TextAreaStyled
              value={'note'}
              disabled={false}
              placeholder={formatMessage(messages.sendCustomerMessage)}
              onChange={() => {}}
              autosize={{ minRows: 2, maxRows: 8 }}
              rows={4}
            />
            <ButtonContainer>
              <SaveButton
                loading={false}
                disabled={!'note' || false}
                onClick={() => {}}
              >
                {formatMessage(messages.send)}
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
