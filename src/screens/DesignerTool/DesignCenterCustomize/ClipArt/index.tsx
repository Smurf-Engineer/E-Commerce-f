/**
 * ClipArt Component - Created by david on 05/09/18.
 */
import * as React from 'react'
import { Container, Icon, Button } from './styledComponents'

interface Props {
  selected: boolean
  url: string
  id: number
  hidden: boolean
  onClickApply: (url: string, id: number) => void
}

class ClipArt extends React.Component<Props, {}> {
  render() {
    const { selected, url, hidden } = this.props
    return (
      <Container {...{ selected }}>
        <Button
          onClick={this.handleOnApplyArt}
          shape="circle"
          icon={hidden ? 'eye' : 'eye-invisible'}
        />
        <Icon isHidden={hidden} src={url} />
      </Container>
    )
  }

  handleOnApplyArt = () => {
    const { url, id, onClickApply } = this.props
    onClickApply(url, id)
  }
}

export default ClipArt
