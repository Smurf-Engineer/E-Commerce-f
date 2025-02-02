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
  noClick?: boolean
}

class UnderlinedLink extends React.Component<Props, {}> {
  render() {
    const { children, url } = this.props

    const renderComponent = url ? (
      <StyledA target="_blank" href={url}>{children}</StyledA>
    ) : (
        <StyledSpan onClick={this.handleClick}>{children}</StyledSpan>
      )

    return renderComponent
  }

  handleClick = () => {
    const { link, history, noClick } = this.props
    if (!noClick) {
      history.push(link)
    }
  }
}

const EnhancedUnderlinedLink = compose(withRouter)(UnderlinedLink)
export default EnhancedUnderlinedLink
