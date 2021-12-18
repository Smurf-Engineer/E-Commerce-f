/**
 * ProDesignProjects Component - Created by eduardoquintero on 17/12/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import queryString from 'query-string'
import Icon from 'antd/lib/icon'
import Review from '../ProDesignProjectDetails'
import { FormattedMessage } from 'react-intl'
import * as AffiliatesActions from './actions'
import {
  Container,
  ListContainer,
  Table,
  Row,
  Header,
  TableRow,
  Cell,
  LoadingContainer,
  BackContainer,
  AddButton,
  Head,
  StyledBadge,
  Subtitle,
  DeleteButton,
  ModalTitle,
  cancelButtonStyle,
  buttonStyle,
  InfoBody,
  CarouselContainer,
  Title,
  FAQSection,
  FAQBody,
  FaqTitle,
  CircleMember,
  MemberList,
  StyledPopOver,
  PopoverText,
  PopOverValue,
  SharedIcon
} from './styledComponents'
import messages from './messages'
import {
  QueryProps,
  Project,
  Message,
  ProjectsResult,
  MessagePayload,
  HeaderImagePlaceHolder,
  HomepageImagesType,
  User
} from '../../types/common'
import EmptyContainer from '../EmptyContainer'
import Pagination from 'antd/lib/pagination/Pagination'
import moment from 'moment'
import get from 'lodash/get'
import { PROJECTS_LIMIT, Pages, memberColors } from './constants'
import { deleteProjectMutation, getHomepageInfo, getProDesignProjects } from './data'
import Spin from 'antd/lib/spin'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { DATE_FORMAT } from '../../constants'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import Carousel from 'antd/lib/carousel'
import CarouselItem from '../CarouselItem'
import ProductInfo from '../ProductInfo'

const { confirm } = Modal

interface Data extends QueryProps {
  projectsResult: ProjectsResult
}

interface Props {
  list: Data
  currentPage: number
  projectId: number
  currentSection: number
  userId: number
  history: History
  user: User
  carouselImages: HomepageImagesType[]
  deleteProject: (variables: {}) => Promise<MessagePayload>
  formatMessage: (messageDescriptor: Message) => string
  setCurrentPageAction: (page: number) => void
  setCurrentSectionAction: (page: number, projectId?: number) => void
  resetDataAction: () => void
  openQuickViewAction: (id: number, yotpoId: string, gender: number, onlyView?: boolean) => void
}

class ProDesignProjects extends React.Component<Props, {}> {
  state = {
    deleting: false,
    showFirst: false,
    showSecond: false,
    showThird: false,
    showFourth: false,
    showFifth: false
  }
  componentDidMount() {
    const {
      history: {
        location: { search }
      }
    } = this.props
    const queryParams = queryString.parse(search)
    const { id } = queryParams
    if (!!id) {
      this.handleOnClickProject(parseInt(id, 10))
    }
  }

  componentWillUnmount() {
    const { resetDataAction } = this.props
    resetDataAction()
  }

  handleOnChangePage = (page: number) => {
    const { setCurrentPageAction } = this.props
    setCurrentPageAction(page)
  }

  handleOnClickProject = (projectId: number) => {
    const { setCurrentSectionAction } = this.props
    setCurrentSectionAction(Pages.DETAILS, projectId)
  }

  handleDeleteItem = (event: React.MouseEvent<EventTarget>, projectId: string, shared: boolean) => {
    const { formatMessage } = this.props
    if (event) {
      event.stopPropagation()
    }
    confirm({
      title: <ModalTitle>{formatMessage(messages.areYouSure)}</ModalTitle>,
      icon: ' ',
      centered: true,
      cancelText: formatMessage(messages.cancel),
      okText: formatMessage(messages.yesDelete),
      cancelButtonProps: {
        style: cancelButtonStyle
      },
      okButtonProps: {
        style: buttonStyle
      },
      onOk: async () => await this.handleDeleteProject(projectId),
      content: <InfoBody>{formatMessage(messages[shared ? 'deleteShared' : 'promptDelete'])}</InfoBody>
    })
  }

  handleDeleteProject = async (projectId: string) => {
    const {
      formatMessage,
      deleteProject,
      list: { refetch }
    } = this.props
    try {
      this.setState({ deleting: true })
      await deleteProject({
        variables: { projectId }
      })
      await refetch()
      message.success(formatMessage(messages.success))
    } catch (e) {
      const errorMessage = e.graphQLErrors.map((x: any) => x.message)
      message.error(errorMessage, 5)
    } finally {
      this.setState({ deleting: false })
    }
  }

  handleOnOpenQuickView = (id: number, yotpoId: string, gender: number) => {
    const { openQuickViewAction: openQuickView } = this.props
    openQuickView(id, yotpoId, gender, true)
  }

  handleGoToUrl = (link?: string) => () => {
    const { history } = this.props
    if (link) {
      history.push(`/${link}`)
    }
  }

  getInitials = (value = '') => {
    let names = value.split(' ')
    let initials = names[0].substring(0, 1).toUpperCase()
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
    return initials
  }

  toggleProductInfo = (id: string) => {
    const stateValue = this.state[id]
    this.setState({ [id]: !stateValue } as any)
  }

  goToList = () => {
    const { setCurrentSectionAction, list } = this.props
    setCurrentSectionAction(Pages.LIST)
    list.refetch()
  }

  goToCreate = () => {
    const { history } = this.props
    history.push('/pro-design')
  }

  preventDefault = (evt: React.MouseEvent) => {
    if (evt) {
      evt.preventDefault()
      evt.stopPropagation()
    }
  }

  render() {
    const {
      list,
      user,
      carouselImages,
      history,
      currentPage,
      projectId,
      userId,
      currentSection,
      formatMessage,
    } = this.props

    const { loading } = list || {}
    const {
      deleting,
      showFirst,
      showSecond,
      showThird,
      showFourth,
      showFifth
    } = this.state
    const projects = get(list, 'projectsResult.projects', [])
    const fullCount = get(list, 'projectsResult.fullCount', 0)
    const mainHeaderImages = get(carouselImages, 'getHomepageContent.mainHeaderImages', [])
    const carouselSettings = get(carouselImages, 'getHomepageContent.carouselSettings', {})
    const authorId = get(user, 'id', '')
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 604px)').matches
    const {
      slideTransition,
      slideDuration
    } = carouselSettings || {}
    const mainHeaderItems = mainHeaderImages.map(
      (item: HeaderImagePlaceHolder, index: number) => (
        <div>
          <CarouselItem
            key={index}
            onClick={this.handleGoToUrl(item.url)}
            {...{ item }}
          />
        </div>
      )
    )
    return (
      <Container>
        {!!projectId ?
          <BackContainer onClick={this.goToList}>
            <Icon type="left" />
            <span>{formatMessage(messages.back)}</span>
          </BackContainer> :
          mainHeaderItems.length ? (
            <CarouselContainer>
              <Carousel
                autoplaySpeed={slideDuration}
                fade={slideTransition === 'fade'}
                autoplay={true}
                pauseOnHover={false}
              >
                {mainHeaderItems}
              </Carousel>
            </CarouselContainer>
          ) : null
        }
        <SwipeableViews disabled={true} index={currentSection}>
          <div>
            <Head>
              <Subtitle>
                {mainHeaderItems && mainHeaderItems.length > 0 &&
                  <Title>
                    <FormattedMessage {...messages.title} />
                  </Title>
                }
                <FormattedMessage {...messages.subtitle} />
              </Subtitle>
              <AddButton onClick={this.goToCreate}><FormattedMessage {...messages.addProject} /></AddButton>
            </Head>
            <ListContainer>
              <Table>
                <thead>
                  <Row>
                    <Header>{formatMessage(messages.projectName)}</Header>
                    <Header>{formatMessage(messages.access)}</Header>
                    <Header>{formatMessage(messages.role)}</Header>
                    <Header>{formatMessage(messages.createdDate)}</Header>
                    {!isMobile && <Header>{formatMessage(messages.projectNo)}</Header>}
                    <Header textAlign="center">{formatMessage(messages.products)}</Header>
                    {!isMobile && <Header textAlign="center">{formatMessage(messages.updatedAt)}</Header>}
                    <Header textAlign="center">{formatMessage(messages[isMobile ? 'notif' : 'notifications'])}</Header>
                    <Header />
                  </Row>
                </thead>
                <tbody>
                  {projects.length ? projects.map((
                    {
                      createdAt,
                      id,
                      shortId,
                      name,
                      totalNotifications = 0,
                      lastUpdated,
                      updatedAt,
                      shared,
                      members = [],
                      designs = []
                    }: Project,
                    index: number) => {
                    const handleOnClickRow = () => this.handleOnClickProject(id)
                    const handleDelete = (e) => this.handleDeleteItem(e, shortId, shared)
                    const roleAssigned = get(members.find((memb) => memb.userId === authorId), 'role', '')
                    return (<TableRow key={index} onClick={handleOnClickRow}>
                      <Cell>{name} {shared && <SharedIcon type="team"/>}</Cell>
                      <Cell>
                        {members.length > 0 ?
                          <StyledPopOver
                            onClick={this.preventDefault}
                            overlayClassName="innerClassTooltip"
                            title={
                              <PopoverText onClick={this.preventDefault}>
                                {members.map((member: User, key: number) => 
                                  <PopOverValue
                                    {...{ key }}
                                    dangerouslySetInnerHTML={{
                                      __html: member.firstName ? 
                                      `👤<b>${member.firstName} ${member.lastName}</b> - ${member.role}
                                        <br/>(${member.email})` :
                                      `✉️<i>Pending</i><br/>(${member.email})`
                                    }}
                                  />
                                )}
                              </PopoverText>
                            }
                          >
                            <MemberList>
                              {members.map((member: User, key: number) => 
                                <CircleMember
                                  {...{ key }}
                                  secondary={key > 0}
                                  codeColor={memberColors[Math.floor(key % 7)]}
                                >
                                  {this.getInitials(member.firstName ? 
                                    `${member.firstName} ${member.lastName}` : member.email
                                  )}
                                </CircleMember>
                              )}
                            </MemberList>
                          </StyledPopOver> :
                          formatMessage(messages.private)
                        }
                      </Cell>
                      <Cell>
                        {roleAssigned || formatMessage(messages.owner)}
                      </Cell>
                      <Cell>
                        {createdAt ? moment(createdAt).format(DATE_FORMAT) : '-'}
                      </Cell>
                      {!isMobile && <Cell>JV2-{userId}-PD-{((currentPage - 1) * PROJECTS_LIMIT) + (index + 1)}</Cell>}
                      <Cell textAlign="center">{designs.length}</Cell>
                      {!isMobile &&
                        <Cell textAlign="center">
                          {lastUpdated || updatedAt ? moment(lastUpdated || updatedAt).format(DATE_FORMAT) : '-'}
                        </Cell>
                      }
                      <Cell textAlign="center">
                        {totalNotifications > 0 && <StyledBadge count={totalNotifications} />}
                      </Cell>
                      <Cell>
                        <DeleteButton onClick={handleDelete} type="delete"/>
                      </Cell>
                    </TableRow>)
                    }
                  ) : null}
                </tbody>
              </Table>
              {(loading || deleting) && <LoadingContainer><Spin /></LoadingContainer>}
              {!loading && !projects.length ? 
                (<EmptyContainer message={formatMessage(messages.empty)} />) : null}
              <Pagination
                current={currentPage}
                pageSize={PROJECTS_LIMIT}
                total={Number(fullCount)}
                onChange={this.handleOnChangePage}
              />
            </ListContainer>
            <FAQSection>
              <FaqTitle>
                {formatMessage(messages.faqTitle)}
              </FaqTitle>
              <FAQBody>
                <ProductInfo
                  id="showFirst"
                  titleWidth={'100%'}
                  title={formatMessage(messages.firstQuestion)}
                  showContent={showFirst}
                  toggleView={this.toggleProductInfo}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.firstAnswer)
                    }}
                  />
                </ProductInfo>
                <ProductInfo
                  id="showSecond"
                  titleWidth={'100%'}
                  title={formatMessage(messages.secondQuestion)}
                  showContent={showSecond}
                  toggleView={this.toggleProductInfo}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.secondAnswer)
                    }}
                  />
                </ProductInfo>
                <ProductInfo
                  id="showThird"
                  title={formatMessage(messages.thirdQuestion)}
                  titleWidth={'100%'}
                  showContent={showThird}
                  toggleView={this.toggleProductInfo}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.thirdAnswer)
                    }}
                  />
                </ProductInfo>
                <ProductInfo
                  id="showFourth"
                  title={formatMessage(messages.fourthQuestion)}
                  titleWidth={'100%'}
                  showContent={showFourth}
                  toggleView={this.toggleProductInfo}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.fourthAnswer)
                    }}
                  />
                </ProductInfo>
                <ProductInfo
                  id="showFifth"
                  title={formatMessage(messages.fifthQuestion)}
                  titleWidth={'100%'}
                  showContent={showFifth}
                  toggleView={this.toggleProductInfo}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(messages.fifthAnswer)
                    }}
                  />
                </ProductInfo>
              </FAQBody>
            </FAQSection>
          </div>
          <div>
            <Review
              {...{ formatMessage, history }}
              project={projectId}
              onOpenQuickView={this.handleOnOpenQuickView}
              goBack={this.goToList}
            />
          </div>
        </SwipeableViews>
      </Container>
    )
  }
}

interface OwnProps {
  currentPage?: number
  orderBy?: string
  sort?: string
}

const mapStateToProps = (state: any) => {
  const projectsState = state.get('proDesignProjects').toJS()
  const app = state.get('app').toJS()
  return {
    ...projectsState,
    ...app
  }
}

const ProDesignProjectsEnhance = compose(
  connect(mapStateToProps, { ...AffiliatesActions, openQuickViewAction }),
  graphql(deleteProjectMutation, { name: 'deleteProject' }),
  graphql(getHomepageInfo, {
    name: 'carouselImages',
    options:
    {
      variables: {
        sportRoute: 'pro-design'
      }
    }
  }),
  graphql<Data>(getProDesignProjects, {
    name: 'list',
    options: ({ currentPage, orderBy, sort }: OwnProps) => {
      const offset = currentPage ? (currentPage - 1) * PROJECTS_LIMIT : 0
      return {
        variables: {
          limit: PROJECTS_LIMIT,
          offset,
          order: orderBy,
          orderAs: sort,
        },
        fetchPolicy: 'network-only'
      }
    }
  }),
)(ProDesignProjects)

export default ProDesignProjectsEnhance
