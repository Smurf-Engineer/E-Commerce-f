/**
 * UnderlinedLink Component - Created by cazarez on 02/03/18.
 */
import * as React from 'react'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router'
import { StyledSpan, StyledA } from './styledComponents'

interface Props {
  url: string
  link?: string
  history: any
  children?: any
}

class UnderlinedLink extends React.Component<Props, {}> {
  render() {
    const { children, url } = this.props

    const renderComponent = url ? (
      <StyledA href={url}>{children}</StyledA>
    ) : (
      <StyledSpan onClick={this.handleClick}>{children}</StyledSpan>
    )

    return renderComponent
  }

  handleClick = () => {
    const { link, history } = this.props
    history.push(link)
  }
}

const EnhancedUnderlinedLink = compose(withRouter)(UnderlinedLink)
export default EnhancedUnderlinedLink
