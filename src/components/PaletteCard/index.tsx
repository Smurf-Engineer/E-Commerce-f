/**
 * PaletteCard Component - Created by david on 28/02/18.
 */
import * as React from 'react'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import Icon from 'antd/lib/icon'
import { FormattedMessage } from 'react-intl'
import ColorButton from '../ColorButton'
import messages from './messages'
import {
  Container,
  ColorButtons,
  Name,
  Row,
  Delete,
  TopRow,
  deleteIcon,
  buttonStyle
} from './styledComponents'

interface Props {
  id: number
  colors: string[]
  name: string
  buttonLabel?: string
  loading?: boolean
  onSelectPalette: (id: number) => void
  onClickDelete?: (index: number) => void
}

const colorsBlocks = ['Color 1', 'Color 2', 'Color 3', 'Color 4', 'Color 5']

const PaletteCard = ({
  id,
  name,
  colors,
  onSelectPalette,
  onClickDelete,
  buttonLabel,
  loading = false
}: Props) => {
  const handleOnSelectPalette = () => onSelectPalette(id)
  const handleOnClickDelete = () => (onClickDelete ? onClickDelete(id) : null)
  const colorButtons = colorsBlocks.map((label, index) => (
    <ColorButton
      key={index}
      {...{ index, label }}
      onSelectColorBlock={() => {}}
      currentColor={colors[index]}
    />
  ))
  return (
    <Container>
      <Row>
        <TopRow>
          <Name>{name}</Name>
          {!!onClickDelete && (
            <Delete onClick={handleOnClickDelete}>
              <Icon style={deleteIcon} type="minus-circle-o" />
            </Delete>
          )}
        </TopRow>
        <Button
          {...{ loading }}
          onClick={handleOnSelectPalette}
          style={buttonStyle}
          type="primary"
        >
          {buttonLabel || <FormattedMessage {...messages.apply} />}
        </Button>
      </Row>
      <ColorButtons>{colorButtons}</ColorButtons>
      <Divider />
    </Container>
  )
}

export default PaletteCard
