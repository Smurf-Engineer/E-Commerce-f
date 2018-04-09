/**
 * CreateStore Screen - Created by david on 09/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as createStoreActions from './actions'
import messages from './messages'
import { Container, Title } from './styledComponents'

interface Props {}

export class CreateStore extends React.Component<Props, {}> {
  render() {
    if (
      typeof window !== 'undefined' &&
      !JSON.parse(localStorage.getItem('user') as string)
    ) {
      return <Redirect to="/us?lang=en&currency=usd" />
    }

    return (
      <Container>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => state.get('createStore').toJS()

const CreateStoreEnhance = compose(
  connect(mapStateToProps, { ...createStoreActions })
)(CreateStore)

export default CreateStoreEnhance
