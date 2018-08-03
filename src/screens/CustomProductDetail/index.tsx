/**
 * CustomProductDetail Screen - Created by jorge on 03/08/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import * as customProductDetailActions from './actions'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

export class CustomProductDetail extends React.Component<Props, {}> {
  render() {
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('customProductDetail').toJS()

const CustomProductDetailEnhance = compose(
  connect(
    mapStateToProps,
    { ...customProductDetailActions }
  )
)(CustomProductDetail)

export default CustomProductDetailEnhance
