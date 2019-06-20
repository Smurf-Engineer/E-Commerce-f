/**
 * AccessoryColor Component - Created by miguelcanobbio on 17/08/18.
 */
import * as React from 'react'
import { Container, Name, Oval, Row } from './styledComponents'
import Popover from 'antd/lib/popover'
import ColorPicker from '../ColorPicker'
import { AccesoryColor } from '../../../types/common'
import { BLACK } from '../../../screens/DesignCenter/constants'
import * as Colors from '../../../theme/colors'

interface Props {
  id: string
  name: string
  color: AccesoryColor
  onSelectColor: (color: string, id: string) => void
}

const AccessoryColor = ({ name, color, onSelectColor, id }: Props) => {
  const accessColor = color === BLACK ? Colors.BLACK : Colors.WHITE
  const handleOnSelectColor = (selectedColor: string) => {
    onSelectColor(selectedColor, id)
  }
  return (
    <Container>
      <Popover
        content={
          <div>
            {
              <ColorPicker
                {...{ color }}
                onSelectColor={selectedColor =>
                  handleOnSelectColor(selectedColor)
                }
              />
            }
          </div>
        }
        trigger="hover"
        placement="right"
      >
        <Row>
          <Name>{name}</Name>
          <Oval color={accessColor} />
        </Row>
      </Popover>
    </Container>
  )
}

export default AccessoryColor
