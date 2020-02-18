/**
 * Options Component - Created by eduardoquintero on 21/01/20.
 */
import * as React from 'react'
import get from 'lodash/get'
import { compose, graphql } from 'react-apollo'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import { withRouter } from 'react-router-dom'
import Radio, { RadioChangeEvent } from 'antd/lib/radio'
import messages from './messages'
import UserFiles from '../UserFiles'
import {
  RadioButton,
  BackLabel,
  BackText,
  CloseIcon,
  ModalContainer,
  Title,
  SubTitle,
  ButtonContainer,
  SaveButton,
  NoteContainer,
  NoteTitle,
  NoteText
} from './styledComponents'
import MyLocker from '../../MyLocker'
import closeIcon from '../../../assets/cancel-button.svg'
import { FormattedMessage } from 'react-intl'
import TextArea from 'antd/lib/input/TextArea'
import { QueryProps, DesignNote, MessagePayload } from '../../../types/common'
import { GetDesignNotes } from '../data'
import Spin from 'antd/lib/spin'
import moment from 'moment'
import { NOTE_FORMAT } from '../constants'
import { addNoteMutation } from '../../ProAssist/data'

const RadioGroup = Radio.Group

interface Data extends QueryProps {
  designNotes: DesignNote[]
}

interface Props {
  history: any
  match: any
  data: Data
  showLocker: boolean
  designSelected: string
  note: string
  loading: boolean
  setLoadingAction: (loading: boolean) => void
  addNoteAction: (variables: {}) => Promise<MessagePayload>
  setNoteText: (text: string) => void
  setDesignSelected: (designId?: string) => void
  onChangeSection: (value: boolean) => void
  formatMessage: (messageDescriptor: any) => string
}

class Options extends React.Component<Props> {
  handleOnGoBack = () => {
    const { history } = this.props
    history.push('/admin/users')
  }
  handleSelectSection = (e: RadioChangeEvent) => {
    const { onChangeSection } = this.props
    onChangeSection(e.target.value)
  }
  handleClose = () => {
    const { setDesignSelected } = this.props
    setDesignSelected()
  }
  handleChangeNote = (evt: React.FormEvent<HTMLTextAreaElement>) => {
    const { setNoteText } = this.props
    const {
      currentTarget: { value }
    } = evt
    setNoteText(value)
  }
  saveNote = async () => {
    const {
      addNoteAction,
      note,
      setDesignSelected,
      designSelected,
      setLoadingAction
    } = this.props
    try {
      setLoadingAction(true)
      const response = await addNoteAction({
        variables: {
          designId: designSelected,
          text: note
        }
      })
      setDesignSelected()
      message.success(get(response, 'data.addDesignNote.message', ''))
    } catch (e) {
      setLoadingAction(false)
      message.error(e.message)
    }
  }
  render() {
    const {
      formatMessage,
      history,
      match,
      showLocker,
      note,
      loading,
      data,
      designSelected,
      setDesignSelected
    } = this.props
    const userId = get(match, 'params.id', '')
    const { loading: loadingData, designNotes = [] } = data || {}
    return (
      <div>
        <BackLabel onClick={this.handleOnGoBack}>
          <Icon type="left" />
          <BackText>{formatMessage(messages.backToList)}</BackText>
        </BackLabel>
        <RadioGroup
          onChange={this.handleSelectSection}
          value={showLocker}
          name="usersListOption"
          size="large"
        >
          <RadioButton value={true}>
            {formatMessage(messages.locker)}
          </RadioButton>
          <RadioButton value={false}>
            {formatMessage(messages.files)}
          </RadioButton>
        </RadioGroup>
        {showLocker ? (
          <MyLocker
            {...{
              setCurrentShare: null,
              openQuickView: null,
              formatMessage,
              history,
              teamStoreId: null,
              savedDesignId: null,
              setItemToAddAction: null,
              openAddToTeamStoreModalAction: null,
              addItemToStore: null,
              setDesignSelected,
              userId
            }}
            openAddToStoreModal={false}
            onGoBack={this.handleOnGoBack}
            admin={true}
          />
        ) : (
          <UserFiles {...{ userId, formatMessage }} />
        )}
        <Modal
          visible={!!designSelected}
          footer={null}
          closable={false}
          width={'800px'}
          destroyOnClose={true}
        >
          <ModalContainer>
            <CloseIcon src={closeIcon} onClick={this.handleClose} />
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
                      NOTE_FORMAT
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
              <SaveButton
                {...{ loading }}
                disabled={!note}
                onClick={this.saveNote}
              >
                <FormattedMessage {...messages.add} />
              </SaveButton>
            </ButtonContainer>
          </ModalContainer>
        </Modal>
      </div>
    )
  }
}

type OwnProps = {
  designSelected?: string
}

const OptionsEnhance = compose(
  withRouter,
  graphql(addNoteMutation, { name: 'addNoteAction' }),
  graphql<Data>(GetDesignNotes, {
    options: (ownprops: OwnProps) => {
      const { designSelected } = ownprops
      return {
        variables: {
          designId: designSelected
        },
        skip: !designSelected,
        fetchPolicy: 'network-only'
      }
    }
  })
)(Options)
export default OptionsEnhance
