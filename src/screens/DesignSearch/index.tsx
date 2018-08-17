/**
 * DesignSearch Screen - Created by miguelcanobbio on 15/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as designSearchActions from './actions'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

export class DesignSearch extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('designSearch').toJS()

const DesignSearchEnhance = compose(
  connect(
    mapStateToProps,
    { ...designSearchActions }
  )
)(DesignSearch)

export default DesignSearchEnhance
