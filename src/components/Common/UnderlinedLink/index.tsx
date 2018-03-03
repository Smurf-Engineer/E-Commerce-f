/**
 * UnderlinedLink Component - Created by cazarez on 02/03/18.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Container, Text, Span } from './styledComponents'

interface Props {
  link: string
  children?: any
}

const UnderlinedLink = ({ children, link }: Props) => {
  return <Span href={link}>{children}</Span>
}

export default UnderlinedLink
