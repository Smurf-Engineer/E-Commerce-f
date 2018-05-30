/**
 * FontsList Component - Created by david on 29/05/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text } from './styledComponents'

// TODO: Dummie data
const fonts = ['Arial Black', 'Courier New', 'Luminari', 'Sathu', 'Trattatello']

interface Props {
  text: string
}

const FontsList = ({ text }: Props) => {
  console.log('---------------------------')
  console.log(text)
  console.log('---------------------------')
  const list = fonts.map((font, index) => (
    <Text key={index} {...{ font }}>
      {text}
    </Text>
  ))
  console.log('---------------------------')
  console.log(list)
  console.log('---------------------------')
  return <Container>{list}</Container>
}

export default FontsList
