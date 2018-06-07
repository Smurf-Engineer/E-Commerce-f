/**
 * WarrantyProgram Screen - Created by gustavomedina on 07/06/18.
 */
// tslint:disable:max-line-length
import * as React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl'
import * as warrantyProgramActions from './actions'
import messages from './messages'
import {
  Container,
  Text,
  LineCopy,
  TitleParagraph,
  CoverageTitle,
  CoverageSubTitle,
  CoverageText
} from './styledComponents'
import Layout from '../../components/MainLayout'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}

export class WarrantyProgram extends React.Component<Props, {}> {
  render() {
    const { history, intl } = this.props
    return (
      <Layout {...{ intl, history }}>
        <Container>
          <Text>
            <FormattedMessage {...messages.title} />
          </Text>
          <TitleParagraph
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(messages.titleText)
            }}
          />
          <LineCopy />
          <CoverageTitle>
            <FormattedMessage {...messages.warrantyTitle} />
          </CoverageTitle>
          <CoverageSubTitle>
            <FormattedMessage {...messages.warrantySubtitle} />
          </CoverageSubTitle>
          <CoverageText
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(messages.warrantyText)
            }}
          />
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state: any) => state.get('warrantyProgram').toJS()

const WarrantyProgramEnhance = compose(
  injectIntl,
  connect(
    mapStateToProps,
    { ...warrantyProgramActions }
  )
)(WarrantyProgram)

export default WarrantyProgramEnhance
