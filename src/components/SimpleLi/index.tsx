import * as React from 'react'
import { Container, ImgContainer, Img, Text } from './styledComponents'
import CheckImg from '../../assets/green_check.svg'

interface Props {
  message: String
}

class SimpleLi extends React.Component<Props, {}> {
  render() {
    const { message } = this.props
    return (
      <Container>
        <ImgContainer>
          <Img src={CheckImg} />
        </ImgContainer>
        <Text>{message}</Text>
      </Container>
    )
  }
}

export default SimpleLi
