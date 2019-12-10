/**
 * ClipArt Component - Created by Jesús Apodaca on 04/12/19.
 */
import * as React from 'react'
import { Container, Icon, Button } from './styledComponents'

interface Props {
  selected: boolean
  url: string
  id: number
  hidden: boolean
  onClickApply: (id: number) => void
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
    const { id, onClickApply } = this.props
    onClickApply(id)
  }
}

export default ClipArt
