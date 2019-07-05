/**
 * InternalsModal Component - Created by eduardoquintero on 04/07/19.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import { Container, CloseIcon, Title } from './styledComponents'
import messages from './messages'
import { BLUE } from '../../../theme/colors'
import {
  StyledInput,
  StyledSelect,
  Row,
  Column,
  Label,
  StyledButton,
  ButtonWrapper,
  ButtonsContainer
} from './styledComponents'
import closeIcon from '../../../assets/cancel-button.svg'
import Select from 'antd/lib/select'
import { ProductInternalsInfo } from '../../../types/common'

interface Props {
  open: boolean
  width?: string | number
  title?: string
  internalId: string
  discountItemId: string
  productCode: string
  discountTypes: string[]
  rate: number
  discountActive: boolean
  expiry: string
  loading: boolean
  productInternalsInfo: ProductInternalsInfo
  requestClose?: () => void
  formatMessage: (messageDescriptor: any) => string
  handleOnInputChange: (event: any) => void
  handleOnSelectChange: (value: string, id: string) => void
  onSaveDiscount: () => void
}

const { Option } = Select

const InternalsModal = ({
  open,
  requestClose,
  formatMessage,
  width,
  discountTypes,
  handleOnInputChange,
  internalId,
  discountItemId,
  handleOnSelectChange,
  productCode,
  rate,
  onSaveDiscount,
  expiry,
  loading
}: Props) => {
  console.log('YE ', productInternalsInfo)

  const selectProductCode = (value: string) =>
    handleOnSelectChange(value, 'productCode')
  const selectGender = (value: string) => handleOnSelectChange(value, 'gender')
  const selectSize = (value: string) => handleOnSelectChange(value, 'size')
  const selectFit = (value: string) => handleOnSelectChange(value, 'fitStyle')
  const selectColor = (value: string) => handleOnSelectChange(value, 'color')
  const selectPocketZipper = (value: string) =>
    handleOnSelectChange(value, 'pocketZipper')
  const selectFrontZipper = (value: string) =>
    handleOnSelectChange(value, 'frontZipper')
  const selectBinding = (value: string) =>
    handleOnSelectChange(value, 'binding')
  const selectBibBrace = (value: string) =>
    handleOnSelectChange(value, 'bibBrace')
  const selectCollection = (value: string) =>
    handleOnSelectChange(value, 'collection')
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
        <Title>{formatMessage(messages.newInternal)}</Title>
        <Label>{formatMessage(messages.internalId)}</Label>
        <StyledInput
          id={'internalId'}
          onChange={handleOnInputChange}
          maxLength={15}
          data-is-number={true}
          value={internalId}
        />
        <Row>
          <Column>
            <Label>{formatMessage(messages.productCode)}</Label>
            <StyledSelect
              onSelect={selectProductCode}
              defaultValue={productCode}
            >
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.gender)}</Label>
            <StyledSelect onSelect={selectGender} defaultValue={productCode}>
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.size)}</Label>
            <StyledSelect onSelect={selectSize} defaultValue={productCode}>
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.fitStyle)}</Label>
            <StyledSelect onSelect={selectFit} defaultValue={productCode}>
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.color)}</Label>
            <StyledSelect onSelect={selectColor} defaultValue={productCode}>
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.pocketZipper)}</Label>
            <StyledSelect
              onSelect={selectPocketZipper}
              defaultValue={productCode}
            >
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.frontZipper)}</Label>
            <StyledSelect
              onSelect={selectFrontZipper}
              defaultValue={productCode}
            >
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.binding)}</Label>
            <StyledSelect onSelect={selectBinding} defaultValue={productCode}>
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.bibBrace)}</Label>
            <StyledSelect onSelect={selectBibBrace} defaultValue={productCode}>
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.collection)}</Label>
            <StyledSelect
              onSelect={selectCollection}
              defaultValue={productCode}
            >
              {discountTypes.map(value => (
                <Option key={value} value={value}>
                  {value}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <ButtonsContainer>
          <StyledButton disabled={loading} onClick={requestClose}>
            {formatMessage(messages.delete)}
          </StyledButton>
          <ButtonWrapper color={BLUE}>
            <StyledButton
              disabled={
                !internalId.length || !discountItemId.length || !rate || !expiry
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

export default InternalsModal
