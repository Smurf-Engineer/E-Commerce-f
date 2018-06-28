/**
 * SymbolTab Component - Created by david on 28/06/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { compose } from 'react-apollo'
import { clipArtsQuery } from './data'
import messages from './messages'
import { Container } from './styledComponents'

interface Props {}

class SymbolTab extends React.PureComponent<Props, {}> {
  render() {
    console.log('---------------------------')
    console.log(this.props)
    console.log('---------------------------')
    return (
      <Container>
        <FormattedMessage {...messages.title} />
      </Container>
    )
  }
}

const SymbolTabEnhance = compose(clipArtsQuery)(SymbolTab)

export default SymbolTabEnhance
