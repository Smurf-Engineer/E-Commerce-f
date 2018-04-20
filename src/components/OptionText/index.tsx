/**
 * OptionText Component - Created by david on 17/04/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import rightArrow from '../../assets/rightarrow.svg'
import { Container, Title, Option, Circle, Row, Icon } from './styledComponents'

interface Props {
  title: string
  option: string
  color?: string
}

const OptionText = ({ title, option, color }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Row>
        {!color && <Option>{option}</Option>}
        {color && <Circle {...{ color }} />}
        <Icon src={rightArrow} />
      </Row>
    </Container>
  )
}

export default OptionText
