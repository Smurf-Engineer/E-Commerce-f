/**
 * Options Component - Created by eduardoquintero on 21/01/20.
 */
import * as React from 'react'
import get from 'lodash/get'
import { compose, graphql } from 'react-apollo'
import Icon from 'antd/lib/icon'
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
import { QueryProps, DesignNote } from '../../../types/common'
import { GetDesignNotes } from '../data'
import Spin from 'antd/lib/spin'
import moment from 'moment'
import { NOTE_FORMAT } from '../constants'

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
  setDesignSelected: (designId: string) => void
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
    setDesignSelected('')
  }
  render() {
    const {
      formatMessage,
      history,
      match,
      showLocker,
      data,
      designSelected,
      setDesignSelected
    } = this.props
    const userId = get(match, 'params.id', '')
    const { loading, designNotes = [] } = data || {}
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
            {loading ? (
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
            <TextArea autosize={{ minRows: 5, maxRows: 8 }} rows={4} />
            <ButtonContainer>
              <SaveButton>
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
