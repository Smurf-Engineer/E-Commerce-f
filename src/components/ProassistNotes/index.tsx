/**
 * Proassist Notes Component - Created by Jesús Apodaca on 20/02/20.
 */
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import closeIcon from '../../assets/cancel-button.svg'
import { DesignNote } from '../../types/common'
import {
  ModalContainer,
  CloseIcon,
  Title,
  NoteContainer,
  NoteTitle,
  NoteText,
  SubTitle,
  ButtonContainer,
  SaveButton
} from './styledComponents'
import Modal from 'antd/lib/modal/Modal'
import Spin from 'antd/lib/spin'
import TextArea from 'antd/lib/input/TextArea'
import moment from 'moment'
import { DATE_FORMAT } from '../../constants'

interface Props {
  visible: boolean
  loading: boolean
  loadingData?: boolean
  note: string
  designNotes: DesignNote[]
  saveNote: () => void
  setNoteText: (text: string) => void
  handleClose: () => void
}

class ProassistNotes extends React.PureComponent<Props, {}> {
  handleChangeNote = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    const { setNoteText } = this.props
    const {
      currentTarget: { value }
    } = evt
    setNoteText(value)
  }
  render() {
    const {
      visible,
      saveNote,
      note,
      designNotes,
      handleClose,
      loadingData,
      loading
    } = this.props
    return (
      <Modal
        {...{ visible }}
        footer={null}
        closable={false}
        width={'800px'}
        destroyOnClose={true}
      >
        <ModalContainer>
          <CloseIcon src={closeIcon} onClick={handleClose} />
          <Title>
            <FormattedMessage {...messages.proAssistNotes} />
          </Title>
          {loadingData ? (
            <Spin />
          ) : (
              designNotes.map(
                ({ createdAt, text, user }: DesignNote, index: number) => (
                  <NoteContainer key={index}>
                    <NoteTitle>{`${moment(createdAt).format(
                      DATE_FORMAT
                    )} - ${user}`}</NoteTitle>
                    <NoteText>{text}</NoteText>
                  </NoteContainer>
                )
              )
            )}
          <SubTitle>
            <FormattedMessage {...messages.addNote} />
          </SubTitle>
          <TextArea
            value={note}
            onChange={this.handleChangeNote}
            autosize={{ minRows: 5, maxRows: 8 }}
            rows={4}
          />
          <ButtonContainer>
            <SaveButton {...{ loading }} disabled={!note} onClick={saveNote}>
              <FormattedMessage {...messages.add} />
            </SaveButton>
          </ButtonContainer>
        </ModalContainer>
      </Modal>
    )
  }
}

export default ProassistNotes
