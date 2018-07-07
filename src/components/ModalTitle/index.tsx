/**
 * ModalTitle Component - Created by miguelcanobbio on 06/07/18.
 */
import * as React from 'react'
import { Container } from './styledComponents'

interface Props {
  title: string
}

const ModalTitle = ({ title }: Props) => {
  return <Container>{title.toUpperCase()}</Container>
}

export default ModalTitle
