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
  CrossLine,
  RowContent
} from './styledComponents'

interface Props {
  title: string
  option?: string
  color?: string | null
  onClick?: () => void
  selected?: boolean
  content?: JSX.Element
}

const OptionText = ({
  title,
  selected = true,
  option,
  color,
  onClick,
  content
}: Props) => {
  return (
    <Container {...{ onClick }}>
      <Title>{title}</Title>
      <Row>
        {content || (
          <RowContent>
            {!color && <Option>{option}</Option>}
            {color && selected && <Circle {...{ color }} />}
            {color && !selected && (
              <Circle color="white">
                <CrossLine />
              </Circle>
            )}
            <Icon src={rightArrow} />
          </RowContent>
        )}
      </Row>
    </Container>
  )
}

export default OptionText
