/**
 * MobileAccessoryColor Component - Created by eduardo on 21/12/18.
 */
import * as React from 'react'
import { Container, Oval, Colors, OvalSelected } from './styledComponents'
import { AccesoryColor } from '../../../types/common'
import { BLACK, WHITE } from '../../../screens/DesignCenter/constants'

interface Props {
  id?: string
  colorSelected?: AccesoryColor
  onAccessoryColorSelected?: (color: AccesoryColor, id: string) => void
}

const MobileAccessoryColor = ({
  id = '',
  colorSelected = WHITE,
  onAccessoryColorSelected = () => {}
}: Props) => {
  // tslint:disable:curly
  const onSelectBlack = () => {
    if (colorSelected !== BLACK) onAccessoryColorSelected(BLACK, id)
  }
  const onSelectWhite = () => {
    if (colorSelected !== WHITE) onAccessoryColorSelected(WHITE, id)
  }
  return (
    <div>
      <Container>
        <Colors>
          <OvalSelected
            onClick={onSelectBlack}
            selected={colorSelected === BLACK}
          >
            <Oval color={BLACK} />
          </OvalSelected>
          <OvalSelected
            onClick={onSelectWhite}
            selected={colorSelected === WHITE}
          >
            <Oval />
          </OvalSelected>
        </Colors>
      </Container>
    </div>
  )
}

export default MobileAccessoryColor
