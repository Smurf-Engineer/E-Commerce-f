/**
 * MobileMenu Component - Created by eduardoquintero on 17/11/20.
 */
import * as React from 'react'
import {
  Container,
  Previous,
  Continue
} from './styledComponents'

interface Props {
  currentRegion: number
}

const MobileMenu = ({
  currentRegion,
}: Props) => {
  return (
    <Container>
      <Previous />
      <Continue />
    </Container>
  )
}

export default MobileMenu
