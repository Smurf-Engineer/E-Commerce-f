/**
 * DiscountsModals Component - Created by eduardoquintero on 27/05/19.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import { Container, CloseIcon, Title } from './styledComponents'
import messages from './messages'
import Switch from 'antd/lib/switch'
import { BLUE } from '../../../theme/colors'
import {
  StyledInput,
  StyledSelect,
  Row,
  Column,
  Label,
  StyledButton,
  ButtonWrapper,
  ButtonsContainer,
  StyledInputNumber,
  StyledDatePicker
} from './styledComponents'
import closeIcon from '../../../assets/cancel-button.svg'
import Select from 'antd/lib/select'
import moment, { Moment } from 'moment'

interface Props {
  open: boolean
  width?: string | number
  title?: string
  discountTypes: string[]
  couponCode: string
  discountItemId: string
  discountType: string
  rate: number
  discountActive: boolean
  expiry: string
  loading: boolean
  requestClose?: () => void
  formatMessage: (messageDescriptor: any) => string
  handleOnInputChange: (event: any) => void
  onSelectDiscountType: (value: string) => void
  onChangeRate: (value: number) => void
  onActivateDiscount: (checked: boolean) => void
  onSaveDiscount: () => void
  onSelectDate: (date: Moment, dateString: string) => void
}

const { Option } = Select

const DiscountsModals = ({
  open,
  requestClose,
  formatMessage,
  width,
  discountTypes,
  handleOnInputChange,
  couponCode,
  discountItemId,
  onSelectDiscountType,
  discountType,
  rate,
  onChangeRate,
  onActivateDiscount,
  discountActive,
  onSaveDiscount,
  onSelectDate,
  expiry,
  loading
}: Props) => {
  return (
    <Container>
      <Modal
        {...{ width }}
        visible={open}
        footer={null}
        closable={false}
        destroyOnClose={true}
        onOk={onSaveDiscount}
        onCancel={requestClose}
      >
        <CloseIcon src={closeIcon} onClick={requestClose} />
        <Title>{formatMessage(messages.newDiscount)}</Title>
        <Label>{formatMessage(messages.couponCode)}</Label>
        <StyledInput
          id={'couponCode'}
          onChange={handleOnInputChange}
          maxLength={15}
          value={couponCode}
        />
        <Label>{formatMessage(messages.discountItemId)}</Label>
        <StyledInput
          id={'discountItemId'}
          onChange={handleOnInputChange}
          maxLength={7}
          data-is-number={true}
          value={discountItemId}
        />
        <Row>
          <Column>
            <Label>{formatMessage(messages.discountType)}</Label>
            <StyledSelect
              onSelect={onSelectDiscountType}
              defaultValue={discountType}
            >
              {discountTypes.map(value => (
                <Option value={value}>{value}</Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.rate)}</Label>
            <StyledInputNumber
              min={1}
              step={0.1}
              value={rate}
              onChange={onChangeRate}
            />
          </Column>
        </Row>
        <Label>{formatMessage(messages.expiryDate)}</Label>
        <StyledDatePicker
          placeholder={''}
          onChange={onSelectDate}
          value={expiry && moment(expiry, 'DD-MM-YYYY')}
        />
        <Row className={'margin'}>
          <Label>{formatMessage(messages.activateDiscount)}</Label>
          <Switch checked={discountActive} onChange={onActivateDiscount} />
        </Row>
        <ButtonsContainer>
          <StyledButton disabled={loading} onClick={requestClose}>
            {formatMessage(messages.cancel)}
          </StyledButton>
          <ButtonWrapper color={BLUE}>
            <StyledButton
              disabled={
                !couponCode.length || !discountItemId.length || !rate || !expiry
              }
              type="primary"
              onClick={onSaveDiscount}
              loading={loading}
            >
              {formatMessage(messages.save)}
            </StyledButton>
          </ButtonWrapper>
        </ButtonsContainer>
      </Modal>
    </Container>
  )
}

export default DiscountsModals
