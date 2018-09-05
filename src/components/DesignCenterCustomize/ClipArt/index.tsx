/**
 * ClipArt Component - Created by david on 05/09/18.
 */
import * as React from 'react'
import { Container, Icon, Button } from './styledComponents'

interface Props {
  selected: boolean
  url: string
  id: number
  onClickApply: (url: string, id: number) => void
}

class ClipArt extends React.Component<Props, {}> {
  render() {
    const { selected, url } = this.props
    return (
      <Container {...{ selected }}>
        <Button onClick={this.handleOnApplyArt} shape="circle" icon="plus" />
        <Icon src={url} />
      </Container>
    )
  }

  handleOnApplyArt = () => {
    const { url, id, onClickApply } = this.props
    console.log('---------------------------')
    console.log(url, id)
    console.log('---------------------------')
    onClickApply(url, id)
  }
}

export default ClipArt
