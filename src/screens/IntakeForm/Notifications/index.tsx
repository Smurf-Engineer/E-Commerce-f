import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
// import get from 'lodash/get'
import DatePicker from 'antd/lib/date-picker'
// import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'
import { isPhoneNumber } from '../../../utils/utilsFiles'
import moment, { Moment } from 'moment'
import Checkbox, { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { DATE_FORMAT_STARTING_YEAR, onlyPro } from '../../../constants'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
  Container,
  // Title,
  MainContainer,
  // Text,
  Label,
  Required,
  Field,
  inputStyle,
  // ItalicText,
  // NotificationSettings,
  // InfoText,
  CheckboxLabel,
  // ValueContainer,
  // Row,
  // CheckBoxContainer,
  SectionButton,
  SectionButtonsContainer,
  InfoBody,
  cancelButtonStyle,
  acceptButtonStyle,
  ProjectInfoContainer,
  CheckTitle,
  BoxContainer
} from './styledComponents'
import { TEAM_SIZES } from './constants'
import messages from './messages'
import {
  Message,
  UserType
} from '../../../types/common'
import includes from 'lodash/includes'

const checkBoxes = [
  'event',
  'team',
  'company',
  'other'
]

const { confirm } = Modal

interface Props extends RouteComponentProps<any> {
  user?: UserType
  selectedTeamSize: string
  phone: string
  estimatedDate: Moment
  sendSms: boolean
  sendEmail: boolean
  mainProduct: number | null
  history: any
  categories: string[]
  isMobile: boolean
  removeCategory: (listName: string, value: string) => void
  addCategory: (listName: string, value: string) => void
  onChangeInput: (key: string, value: string) => void
  formatMessage: (messageDescriptor: Message, values?: {}) => string
  onSelectTeamSize: (size: string) => void
  onSelectDate: (dateMoment: Moment | null, date: string) => void
  onCheckSms: (checked: boolean) => void
  onCheckEmail: (checked: boolean) => void
  setDescription: (contentState: string | null) => void
}

export class Notifications extends React.Component<Props, {}> {
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
  
    const date = moment({ hour: 0, minute: 0, second: 0 })

    const isBeforeOfCurrentDay = current.valueOf() < date.valueOf()
    date.add(16, 'days')

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

  handleOnSelectTeamSize = (size: string) => {
    const { onSelectTeamSize, formatMessage, history, mainProduct } = this.props
    if (size === '1' && mainProduct && !onlyPro[mainProduct]) {
      confirm({
        title: formatMessage(messages.information),
        okText: formatMessage(messages.designLab),
        onOk: () => history.push(`/design-center?id=${mainProduct}`),
        onCancel: (close) => {
          onSelectTeamSize(size)
          return close()
        },
        cancelText: formatMessage(messages.stillPro),
        okButtonProps: {
          style: acceptButtonStyle
        },
        cancelButtonProps: {
          style: cancelButtonStyle
        },
        content: (
          <InfoBody
            dangerouslySetInnerHTML={{
            __html: formatMessage(messages.teamSizeAlert)
            }}
          />
        )
      })
    } else {
      onSelectTeamSize(size)
    }
  }

  render() {
    const {
      formatMessage,
      // user,
      selectedTeamSize,
      estimatedDate,
      removeCategory,
      categories,
      addCategory,
      // sendSms,
      // sendEmail,
      // phone
    } = this.props
    // const email = get(user, 'email')
    const availableSizes =
      TEAM_SIZES.map((size, index) => {
        const handleOnSelectSize = () => this.handleOnSelectTeamSize(size)
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
          <ProjectInfoContainer>
            <CheckTitle>
              {formatMessage(messages.isThis)}
            </CheckTitle>
            <BoxContainer>
              {checkBoxes.map((checkBox) => {
                const isSelected = includes(categories, checkBox)
                const handleAddCategory = () => isSelected
                  ? removeCategory('projectCategories', checkBox)
                  : addCategory('projectCategories', checkBox)
                return (
                  <Checkbox
                    key={checkBox}
                    checked={isSelected}
                    onChange={handleAddCategory}
                  >
                    <CheckboxLabel>
                      {formatMessage(messages[checkBox])}
                    </CheckboxLabel>
                  </Checkbox>
                  )
                })
              }
            </BoxContainer>
          </ProjectInfoContainer>
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
              allowClear={false}
              value={estimatedDate}
              dropdownClassName="hide-date-input"
              disabledDate={this.disabledDate}
              onChange={this.handleOnSelectDate}
            />
          </Field>
          {/* <Title>
            {formatMessage(messages.preferences)}
          </Title>
          <Text>
            {formatMessage(messages.receiveNotifications)}
          </Text>
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
          <ItalicText>
            {formatMessage(messages.setUpNotifications)}
          </ItalicText> */}
        </Container>
      </MainContainer>
    )
  }
}

export default Notifications
