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
  DeleteButton
} from './styledComponents'
import messages from './messages'
import { QueryProps, Project, Message, ProjectsResult, MessagePayload } from '../../types/common'
import EmptyContainer from '../EmptyContainer'
import Pagination from 'antd/lib/pagination/Pagination'
import moment from 'moment'
import get from 'lodash/get'
import { PROJECTS_LIMIT, Pages } from './constants'
import { deleteProjectMutation, getProDesignProjects } from './data'
import Spin from 'antd/lib/spin'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { DATE_FORMAT } from '../../constants'
import message from 'antd/lib/message'

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
  deleteProject: (variables: {}) => Promise<MessagePayload>
  formatMessage: (messageDescriptor: Message) => string
  setCurrentPageAction: (page: number) => void
  setCurrentSectionAction: (page: number, projectId?: number) => void
  resetDataAction: () => void
  openQuickViewAction: (id: number, yotpoId: string, gender: number, onlyView?: boolean) => void
}

class ProDesignProjects extends React.Component<Props, {}> {
  state = {
    deleting: false
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

  handleDeleteProject = async (event: React.MouseEvent<EventTarget>, projectId: string) => {
    if (event) {
      event.stopPropagation()
    }
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
      refetch()
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

  goToList = () => {
    const { setCurrentSectionAction, list } = this.props
    setCurrentSectionAction(Pages.LIST)
    list.refetch()
  }

  goToCreate = () => {
    const { history } = this.props
    history.push('/pro-design')
  }

  render() {
    const {
      list,
      history,
      currentPage,
      projectId,
      userId,
      currentSection,
      formatMessage,
    } = this.props

    const { loading } = list || {}
    const { deleting } = this.state
    const projects = get(list, 'projectsResult.projects', [])
    const fullCount = get(list, 'projectsResult.fullCount', 0)
   
    return (
      <Container>
        {!!projectId &&
          <BackContainer onClick={this.goToList}>
            <Icon type="left" />
            <span>{formatMessage(messages.back)}</span>
          </BackContainer>
        }
        <SwipeableViews disabled={true} index={currentSection}>
          <div>
            <Head>
              <Subtitle>
                <FormattedMessage {...messages.subtitle} />
              </Subtitle>
              <AddButton onClick={this.goToCreate}><FormattedMessage {...messages.addProject} /></AddButton>
            </Head>
            <ListContainer>
              <Table>
                <thead>
                  <Row>
                    <Header>{formatMessage(messages.projectName)}</Header>
                    <Header>{formatMessage(messages.createdDate)}</Header>
                    <Header>{formatMessage(messages.projectNo)}</Header>
                    <Header textAlign="center">{formatMessage(messages.products)}</Header>
                    <Header textAlign="center">{formatMessage(messages.updatedAt)}</Header>
                    <Header textAlign="center">{formatMessage(messages.notifications)}</Header>
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
                      updatedAt,
                      designs = []
                    }: Project,
                    index: number) => {
                    const handleOnClickRow = () => this.handleOnClickProject(id)
                    const handleDelete = (e) => this.handleDeleteProject(e, shortId)
                    return (<TableRow key={index} onClick={handleOnClickRow}>
                      <Cell>{name}</Cell>
                      <Cell>
                        {createdAt ? moment(createdAt).format(DATE_FORMAT) : '-'}
                      </Cell>
                      <Cell>JV2-{userId}-PD-{((currentPage - 1) * PROJECTS_LIMIT) + (index + 1)}</Cell>
                      <Cell textAlign="center">{designs.length}</Cell>
                      <Cell textAlign="center">{updatedAt ? moment(updatedAt).format(DATE_FORMAT) : '-'}</Cell>
                      <Cell textAlign="center">
                        {totalNotifications > 0 && <StyledBadge count={totalNotifications} />}
                      </Cell>
                      <Cell><DeleteButton onClick={handleDelete} type="delete"/></Cell>
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

const mapStateToProps = (state: any) => state.get('proDesignProjects').toJS()

const ProDesignProjectsEnhance = compose(
  connect(mapStateToProps, { ...AffiliatesActions, openQuickViewAction }),
  graphql(deleteProjectMutation, { name: 'deleteProject' }),
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
