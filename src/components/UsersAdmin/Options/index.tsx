/**
 * Options Component - Created by eduardoquintero on 21/01/20.
 */
import * as React from 'react'
import get from 'lodash/get'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import MyLocker from '../../MyLocker'

interface Props {
  history: any
  match: any
  formatMessage: (messageDescriptor: any) => string
}

class Options extends React.Component<Props> {
  handleOnGoBack = () => {
    const { history } = this.props
    history.push('/admin/users')
  }
  render() {
    const { formatMessage, history, match } = this.props

    const userId = get(match, 'params.id', '')

    return (
      <div>
        <MyLocker
          {...{
            setCurrentShare: null,
            openQuickView: null,
            formatMessage,
            history,
            teamStoreId: null,
            savedDesignId: null,
            setItemToAddAction: null,
            openAddToTeamStoreModalAction: null,
            addItemToStore: null,
            userId
          }}
          openAddToStoreModal={false}
          onGoBack={this.handleOnGoBack}
          admin={true}
        />
      </div>
    )
  }
}
const OptionsEnhance = compose(withRouter)(Options)
export default OptionsEnhance
