/**
 * ProDesign Screen - Created by eduardoquintero on 19/09/19.
 */
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { injectIntl, InjectedIntl } from 'react-intl'
import * as proDesignActions from './actions'
import { connect } from 'react-redux'
import { compose, withApollo } from 'react-apollo'
import { Container } from './styledComponents'

interface Props extends RouteComponentProps<any> {
  intl: InjectedIntl
}
export class ProDesign extends React.Component<Props, {}> {
  render() {
    return <Container />
  }
}

const mapStateToProps = (state: any) => {
  const proDesign = state.get('proDesign').toJS()
  return {
    ...proDesign
  }
}

const ProDesignEnhance = compose(
  withApollo,
  injectIntl,
  connect(
    mapStateToProps,
    {
      ...proDesignActions
    }
  )
)(ProDesign)

export default ProDesignEnhance
