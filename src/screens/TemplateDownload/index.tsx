/**
 * TemplateDownload Screen - Created by miguelcanobbio on 15/06/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import messages from './messages'
import {
  Container,
  Title,
  TemplatesList,
  LoadingContainer,
  TitleError,
  Message,
  EmptyContainer,
  EmptyMessage
} from './styledComponents'
import Layout from '../../components/MainLayout'
import Spin from 'antd/lib/spin'
import TemplateDownloadItem from '../../components/TemplateDownloadItem'
import { QueryProps, ITemplateDownload } from '../../types/common'
import { templatesQuery } from './data'

interface Data extends QueryProps {
  templates: ITemplateDownload[]
}

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
  history: any
  data: Data
}

export class TemplateDownload extends React.Component<Props, {}> {
  render() {
    const {
      intl,
      history,
      data: { templates, loading, error }
    } = this.props
    if (loading) {
      return (
        <Layout {...{ intl, history }}>
          <LoadingContainer>
            <Spin />
          </LoadingContainer>
        </Layout>
      )
    }
    const { formatMessage } = intl
    if (error) {
      return (
        <Layout {...{ intl, history }}>
          <LoadingContainer>
            <TitleError>{formatMessage(messages.errorTitle)}</TitleError>
            <Message>{formatMessage(messages.errorMessage)}</Message>
          </LoadingContainer>
        </Layout>
      )
    }
    const templatesList = templates.map(
      ({ pictures, name, description, fileUrl, retailMen, retailWomen }, i) =>
        !retailMen &&
        !retailWomen && (
          <TemplateDownloadItem
            key={i}
            imageSource={pictures[0].imageSource}
            {...{ formatMessage, name, description, fileUrl }}
          />
        )
    )
    const content = templates.length ? (
      <TemplatesList>{templatesList}</TemplatesList>
    ) : (
      <EmptyContainer>
        <EmptyMessage>{formatMessage(messages.emptyMessage)}</EmptyMessage>
      </EmptyContainer>
    )
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <Title>{formatMessage(messages.title)}</Title>
          {content}
        </Container>
      </Layout>
    )
  }
}

const TemplateDownloadEnhanced = compose(
  graphql(templatesQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  injectIntl
)(TemplateDownload)

export default TemplateDownloadEnhanced
