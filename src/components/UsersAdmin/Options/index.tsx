/**
 * Options Component - Created by eduardoquintero on 21/01/20.
 */
import * as React from 'react'
import get from 'lodash/get'
import { compose } from 'react-apollo'
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
  SaveButton
} from './styledComponents'
import MyLocker from '../../MyLocker'
import closeIcon from '../../../assets/cancel-button.svg'
import { FormattedMessage } from 'react-intl'
import TextArea from 'antd/lib/input/TextArea'

const RadioGroup = Radio.Group

interface Props {
  history: any
  match: any
  showLocker: boolean
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
  handleClose = () => {}
  render() {
    const { formatMessage, history, match, showLocker } = this.props

    const userId = get(match, 'params.id', '')

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
          visible={true}
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
const OptionsEnhance = compose(withRouter)(Options)
export default OptionsEnhance
