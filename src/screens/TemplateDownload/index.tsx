/**
 * TemplateDownload Screen - Created by miguelcanobbio on 15/06/18.
 */
import * as React from 'react'
import { graphql, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import messages from './messages'
import { Container, Title, TemplatesList } from './styledComponents'
import Layout from '../../components/MainLayout'
import TemplateDownloadItem from '../../components/TemplateDownloadItem'
import { QueryProps, ITemplateDownload } from '../../types/common'
import { templatesQuery } from './data'
import withError from '../../components/WithError'
import withLoading from '../../components/WithLoading'

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
      data: { templates }
    } = this.props
    console.log(templates)
    const { formatMessage } = intl
    const templatesList = templates.map(
      ({ pictures, name, description, fileUrl }, i) => (
        <TemplateDownloadItem
          key={i}
          imageSource={pictures[0].imageSource}
          {...{ formatMessage, name, description, fileUrl }}
        />
      )
    )
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <Title>{formatMessage(messages.title)}</Title>
          <TemplatesList>{templatesList}</TemplatesList>
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
  withLoading,
  withError,
  injectIntl
)(TemplateDownload)

export default TemplateDownloadEnhanced
