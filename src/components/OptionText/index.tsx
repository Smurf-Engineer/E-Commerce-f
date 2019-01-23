/**
 * OptionText Component - Created by david on 17/04/18.
 */
import * as React from 'react'
import rightArrow from '../../assets/rightarrow.svg'
import {
  Container,
  Title,
  Option,
  Circle,
  Row,
  Icon,
  RowContent
} from './styledComponents'

interface Props {
  title: string
  option?: string
  color?: string | null
  onClick?: () => void
  content?: JSX.Element
}

const OptionText = ({ title, option, color, onClick, content }: Props) => {
  return (
    <Container {...{ onClick }}>
      <Title>{title}</Title>
      <Row>
        {content || (
          <RowContent>
            {!color && <Option>{option}</Option>}
            {color && <Circle {...{ color }} />}
            <Icon src={rightArrow} />
          </RowContent>
        )}
      </Row>
    </Container>
  )
}

export default OptionText
