import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import get from 'lodash/get'
import DatePicker from 'antd/lib/date-picker'
import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import { isPhoneNumber } from '../../../utils/utilsFiles'
import moment, { Moment } from 'moment'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { DATE_FORMAT_STARTING_YEAR } from '../../../constants'

import {
  Container,
  Title,
  MainContainer,
  Text,
  Label,
  Required,
  Field,
  inputStyle,
  ItalicText,
  NotificationSettings,
  InfoText,
  CheckboxLabel,
  ValueContainer,
  Row,
  CheckBoxContainer,
  SectionButton,
  SectionButtonsContainer
} from './styledComponents'
import { TEAM_SIZES } from './constants'
import messages from './messages'
import { Message, UserType } from '../../../types/common'

interface Props extends RouteComponentProps<any> {
  user?: UserType
  selectedTeamSize: string
  projectDescription: string
  projectName: string
  phone: string
  estimatedDate: Moment
  sendSms: boolean
  sendEmail: boolean
  onChangeInput: (key: string, value: string) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  onSelectTeamSize: (size: string) => void
  onSelectDate: (dateMoment: Moment | null, date: string) => void
  onCheckSms: (checked: boolean) => void
  onCheckEmail: (checked: boolean) => void
}

const { TextArea } = Input

export class Notes extends React.Component<Props, {}> {
  handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChangeInput } = this.props
    const { value, id: inputId } = event.target
    if (inputId === 'phone' && !isPhoneNumber(value) && value !== '') {
      return
    }
    onChangeInput(inputId, value)

  }

  disabledDate = (current: any) => {
    if (!current) {
      return false
    }
  
    const date = moment()
    date.hour(0)
    date.minute(0)
    date.second(0)

    const isBeforeOfCurrentDay = current.valueOf() < date.valueOf()
    date.add(7, 'days')

    return (
      isBeforeOfCurrentDay || current.valueOf() < date.valueOf()
    )
  }

  handleOnSelectDate = async (date: Moment, dateString: string) => {
    const { formatMessage, onSelectDate } = this.props
    if (date) {
      try {
        if (date && (date.weekday() === 0 || date.weekday() === 6)) {
          message.warning(formatMessage(messages.deliveryErrorLabel))
          return
        }
      } catch (error) {
        message.error(formatMessage(messages.errorMsg))
      }
    }
    onSelectDate(date, dateString)
  }

  handleCheckSmsChange = (event: CheckboxChangeEvent) => {
    const { onCheckSms } = this.props
    const { target: { checked } } = event
    onCheckSms(checked)
  }

  handleCheckEmailChange = (event: CheckboxChangeEvent) => {
    const { onCheckEmail } = this.props
    const { target: { checked } } = event
    onCheckEmail(checked)
  }

  render() {
    const {
      formatMessage,
      user,
      selectedTeamSize,
      projectDescription,
      projectName,
      phone,
      estimatedDate,
      sendSms,
      sendEmail,
      onSelectTeamSize
    } = this.props
    const email = get(user, 'email')
    const availableSizes =
      TEAM_SIZES.map((size, index) => {
        const handleOnSelectSize = () => onSelectTeamSize(size)
        return (
        <div key={index}>
          <SectionButton
            selected={size === selectedTeamSize}
            onClick={handleOnSelectSize}
          >
            {size}
          </SectionButton>
        </div>
      )})
  
    return (
      <MainContainer>
        <Container>
          <Field>
            <Label>
              {formatMessage(messages.projectName)} <Required>*</Required>
            </Label>
            <Input
              id="projectName"
              value={projectName}
              placeholder={formatMessage(messages.name)}
              size="large"
              onChange={this.handleOnChangeInput}
            />
          </Field>
          <Field>
            <Label>
              {formatMessage(messages.ideas)} <Required>*</Required>
            </Label>
            <TextArea
              id="projectDescription"
              value={projectDescription}
              rows={5}
              onChange={this.handleOnChangeInput}
            />
          </Field>
          <Field>
            <Label>
              {formatMessage(messages.teamSize)} <Required>*</Required>
            </Label>
            <SectionButtonsContainer>
              {availableSizes}
            </SectionButtonsContainer>
          </Field>
          <Field>
            <Label>
              {formatMessage(messages.deliveryDate)} <Required>*</Required>
            </Label>
            <DatePicker
              id="estimatedDate"
              format={DATE_FORMAT_STARTING_YEAR}
              size="large"
              style={inputStyle}
              value={estimatedDate}
              disabledDate={this.disabledDate}
              onChange={this.handleOnSelectDate}
            />
          </Field>
          <Title>
            {formatMessage(messages.preferences)}
          </Title>
          <Text>
            {formatMessage(messages.receiveNotifications)}
          </Text>
          <ItalicText>
            {formatMessage(messages.setUpNotifications)}
          </ItalicText>
          <NotificationSettings>
            {!!email && <Row>
              <CheckBoxContainer>
                <Checkbox
                  checked={sendEmail}
                  onChange={this.handleCheckEmailChange}>
                  <CheckboxLabel>
                    {formatMessage(messages.sendEmail)}
                  </CheckboxLabel>
                </Checkbox>
              </CheckBoxContainer>
              <ValueContainer>
                <InfoText>{`(${email})`}</InfoText>
              </ValueContainer>
            </Row>}
            <Row>
              <CheckBoxContainer>
                <Checkbox
                  checked={sendSms}
                  onChange={this.handleCheckSmsChange}>
                  <CheckboxLabel>
                    {formatMessage(messages.sendSms)}
                  </CheckboxLabel>
                </Checkbox>
              </CheckBoxContainer>
              <ValueContainer>
                <Input
                    id="phone"
                    value={phone}
                    placeholder={formatMessage(messages.addPhone)}
                    onChange={this.handleOnChangeInput}
                  />
                  <ItalicText>
                {formatMessage(messages.changes)}
              </ItalicText>
              </ValueContainer>
            </Row>
          </NotificationSettings>
        </Container>
      </MainContainer>
    )
  }
}

export default Notes
