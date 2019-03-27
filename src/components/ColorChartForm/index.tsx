/**
 * ColorChartForm Component - Created by eduardoquintero on 19/03/18.
 */
import * as React from 'react'

import message from 'antd/lib/message'
import messages from './messages'
import {
  Container,
  CloseIcon,
  ModalContainer,
  Title,
  FormContainer,
  Label,
  Field,
  Column,
  Submit
} from './styledComponents'
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import closeIcon from '../../assets/cancel-button.svg'
import { FormattedMessage } from 'react-intl'
import formConfig from './formConfig'
import { UserInfo } from '../../types/common'
import { ReactNodeArray } from 'prop-types'

interface State {
  name: string
  email: string
  phone: string
  message: string
  mailingAddress: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface Props {
  open: boolean
  loading: boolean
  handleClose: () => void
  formatMessage: (messageDescriptor: any) => string
  onRequestColorChart: (userInfo: UserInfo) => void
}
const { TextArea } = Input

export class ColorChartForm extends React.Component<Props, State> {
  state = {
    name: '',
    email: '',
    phone: '',
    message: '',
    mailingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }

  render() {
    const { open, handleClose, formatMessage, loading } = this.props

    const fields = formConfig.reduce<ReactNodeArray[]>(
      (
        fieldsArray,
        { id, placeholder, type, singleColumn, required },
        index
      ) => {
        const elements = (
          <div key={index}>
            <Label>
              <FormattedMessage {...messages[id]} />
            </Label>
            {type === 'input' ? (
              <Input
                id={id}
                placeholder={formatMessage(messages[placeholder])}
                onChange={this.setValue}
                value={this.state[id]}
                required={required}
              />
            ) : (
              <TextArea
                id={id}
                placeholder={formatMessage(messages[placeholder])}
                onChange={this.setValue}
                value={this.state[id]}
              />
            )}
          </div>
        )
        fieldsArray.push(
          singleColumn ? <Field>{elements}</Field> : <Column>{elements}</Column>
        )
        return fieldsArray
      },
      []
    )
    return (
      <Container>
        <Modal
          visible={open}
          footer={null}
          closable={false}
          width={'auto'}
          destroyOnClose={true}
          afterClose={this.resetState}
          style={{ maxWidth: 800 }}
        >
          <ModalContainer>
            <CloseIcon src={closeIcon} onClick={handleClose} />
            <Title>
              <FormattedMessage {...messages.title} />
            </Title>
            <FormattedMessage {...messages.swatchesShip} />
            <FormContainer>
              {fields}
              <Submit>
                <Button
                  loading={loading}
                  type={'primary'}
                  onClick={this.sendRequest}
                >
                  {formatMessage(messages.submit)}
                </Button>
              </Submit>
            </FormContainer>
          </ModalContainer>
        </Modal>
      </Container>
    )
  }

  setValue = (e: any) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  resetState = (all = false) => {
    this.setState({
      name: '',
      email: '',
      phone: '',
      message: '',
      mailingAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    })
  }
  sendRequest = () => {
    const { onRequestColorChart, formatMessage } = this.props
    let invalidatedFields = 0
    Object.entries(this.state).forEach(entry => {
      let key = entry[0]
      let value = entry[1]
      if (key !== 'message' && !value.length) {
        invalidatedFields += 1
        return
      }
    })
    if (invalidatedFields > 0) {
      message.error(formatMessage(messages.fillFields))
      return
    }

    const userInfo = {
      ...this.state
    }
    onRequestColorChart(userInfo)
  }
}

export default ColorChartForm
