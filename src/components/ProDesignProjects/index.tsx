/**
 * ProDesignProjects Component - Created by eduardoquintero on 17/12/20.
 */
import * as React from 'react'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
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
  BackContainer
} from './styledComponents'
import messages from './messages'
import { QueryProps, Project, Message, ProjectsResult } from '../../types/common'
import EmptyContainer from '../EmptyContainer'
import Pagination from 'antd/lib/pagination/Pagination'
import moment from 'moment'
import get from 'lodash/get'
import { PROJECTS_LIMIT, Pages } from './constants'
import { getProDesignProjects } from './data'
import Spin from 'antd/lib/spin'
import { openQuickViewAction } from '../../components/MainLayout/actions'
import { DATE_FORMAT } from '../../constants'

interface Data extends QueryProps {
  rows: ProjectsResult
}

interface Props {
  data: Data
  currentPage: number
  projectId: number
  currentSection: number
  formatMessage: (messageDescriptor: Message) => string
  setCurrentPageAction: (page: number) => void
  setCurrentSectionAction: (page: number, projectId?: number) => void
  resetDataAction: () => void
  openQuickViewAction: (id: number, yotpoId: string, gender: number, onlyView?: boolean) => void
}

class ProDesignProjects extends React.Component<Props, {}> {
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

  handleOnOpenQuickView = (id: number, yotpoId: string, gender: number) => {
    const { openQuickViewAction: openQuickView } = this.props
    openQuickView(id, yotpoId, gender, true)
  }

  goToList = () => {
    const { setCurrentSectionAction } = this.props
    setCurrentSectionAction(Pages.LIST)
  }

  render() {
    const {
      data,
      currentPage,
      projectId,
      currentSection,
      formatMessage,
    } = this.props

    const { loading } = data || {}
    const projects = get<ProjectsResult, 'projects', Project[]>(
      data.rows,
      'projects',
      []
    )
    const fullCount = get(data, 'rows.fullCount', 0)
   
    return (
      <Container>
        {!!projectId &&
          <BackContainer onClick={this.goToList}>
            <Icon type="left" />
            <span>{formatMessage(messages.back)}</span>
          </BackContainer>
        }
        <SwipeableViews disabled={true} index={currentSection}>
          <>
            <FormattedMessage {...messages.subtitle} />
            <ListContainer>
              <Table>
                <thead>
                  <Row>
                    <Header>{formatMessage(messages.projectName)}</Header>
                    <Header>{formatMessage(messages.createdDate)}</Header>
                    <Header>{formatMessage(messages.projectNo)}</Header>
                    <Header>{formatMessage(messages.projectStatus)}</Header>
                  </Row>
                </thead>
                {loading ?
                  <LoadingContainer><Spin /></LoadingContainer>
                  : <tbody>
                      {projects.length ? projects.map((
                        {
                          createdAt,
                          status,
                          id,
                          name
                        }: Project,
                        index: number) => {
                        const handleOnClickRow = () => this.handleOnClickProject(id)
                        return (<TableRow key={index} onClick={handleOnClickRow}>
                          <Cell>{name}</Cell>
                          <Cell>
                            {createdAt ? moment(createdAt).format(DATE_FORMAT) : '-'}
                          </Cell>
                          <Cell>{id}</Cell>
                          <Cell>{status}</Cell>
                        </TableRow>)
                        }
                      )
                      : null }
                  </tbody>}
              </Table>
              {!loading && !projects.length ? 
                (<EmptyContainer message={formatMessage(messages.empty)} />) : null}
              <Pagination
                current={currentPage}
                pageSize={PROJECTS_LIMIT}
                total={Number(fullCount)}
                onChange={this.handleOnChangePage}
              />
            </ListContainer>
          </>
          <Review
            {...{formatMessage}}
            project={projectId}
            onOpenQuickView={this.handleOnOpenQuickView}
            goBack={this.goToList}
          />
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
  graphql(getProDesignProjects, {
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
