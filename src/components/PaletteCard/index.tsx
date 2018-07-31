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
  buttonStyle,
  MyFilesHeader,
  DeleteText
} from './styledComponents'

interface Props {
  id: number
  colors: string[]
  name: string
  buttonLabel?: string
  myFilesList?: boolean
  onSelectPalette?: (id: number) => void
  loading?: boolean
  onClickDelete?: (index: number) => void
  formatMessage: (messageDescriptor: any, values?: {}) => string
}

const { color1, color2, color3, color4, color5 } = messages
const colorsBlocks = [color1, color2, color3, color4, color5]

const PaletteCard = ({
  id,
  name,
  colors,
  myFilesList,
  onSelectPalette = () => {},
  onClickDelete,
  buttonLabel,
  loading = false,
  formatMessage
}: Props) => {
  const handleOnSelectPalette = () => onSelectPalette(id)
  const handleOnClickDelete = () => (onClickDelete ? onClickDelete(id) : null)
  const colorButtons = colorsBlocks.map((label, index) => (
    <ColorButton
      {...{ index, myFilesList }}
      key={index}
      label={formatMessage(label)}
      onSelectColorBlock={() => {}}
      currentColor={colors[index]}
    />
  ))
  const header = !myFilesList ? (
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
  ) : (
    <MyFilesHeader>
      <Name {...{ myFilesList }}>{name}</Name>
      <DeleteText onClick={handleOnClickDelete}>
        {formatMessage(messages.delete)}
      </DeleteText>
    </MyFilesHeader>
  )
  return (
    <Container>
      {header}
      <ColorButtons {...{ myFilesList }}>{colorButtons}</ColorButtons>
      {!myFilesList && <Divider />}
    </Container>
  )
}

export default PaletteCard
