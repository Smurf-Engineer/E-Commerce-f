/**
 * PredyedModal Component - Created by Jesús Apodaca on 17/12/19.
 */
import * as React from 'react'
import {
  Title,
  FormContainer,
  Modal,
  NameInput,
  Label,
  maskStyles,
  Input,
  SaveSection,
  SaveButton,
  CloseIcon,
  CancelButton,
  ColorSelected
} from './styledComponents'
import { Message } from '../../../types/common'
import messages from './messages'
import closeIcon from '../../../assets/cancel-button.svg'

interface Props {
  openPredyed: boolean
  hexColor: string
  color: string
  editColor: string
  saveColor: () => void
  changeColorAction: (color: string) => void
  changeHexAction: (name: string) => void
  requestClose: () => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
}

export class PredyedModal extends React.Component<Props, {}> {
  handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    const { changeHexAction } = this.props
    changeHexAction(value)
  }
  handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    const { changeColorAction } = this.props
    changeColorAction(value)
  }

  render() {
    const {
      openPredyed,
      saveColor,
      formatMessage,
      requestClose,
      hexColor,
      editColor,
      color,
    } = this.props
    return (
      <Modal
        visible={openPredyed}
        footer={null}
        width="424px"
        closable={false}
        maskStyle={maskStyles}
        maskClosable={false}
        onCancel={requestClose}
      >
        <Title>
          {formatMessage(messages[editColor ? 'edit' : 'title'])}
          <CloseIcon src={closeIcon} onClick={requestClose} />
        </Title>
        <FormContainer>
          <NameInput>
            <Label>{formatMessage(messages.colorName)}</Label>
            <Input
              value={color}
              onChange={this.handleChangeName}
              placeholder={formatMessage(messages.colorPlaceholder)}
            />
          </NameInput>
          <NameInput>
            <Label>{formatMessage(messages.hexCode)}</Label>
            <Input
              prefix={<ColorSelected {...{ hexColor }} />}
              value={hexColor}
              onChange={this.handleChangeColor}
              placeholder={formatMessage(messages.hexPlaceholder)}
            />
          </NameInput>
          <SaveSection>
            <CancelButton onClick={requestClose}>
              {formatMessage(messages.cancel)}
            </CancelButton>
            <SaveButton onClick={saveColor} disabled={!color}>
              {formatMessage(messages.saveColor)}
            </SaveButton>
          </SaveSection>
        </FormContainer>
      </Modal>
    )
  }
}

export default PredyedModal
