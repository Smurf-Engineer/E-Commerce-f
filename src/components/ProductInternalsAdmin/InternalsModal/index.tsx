/**
 * InternalsModal Component - Created by eduardoquintero on 04/07/19.
 */
import * as React from 'react'
import Modal from 'antd/lib/modal'
import get from 'lodash/get'
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
  ButtonsContainer,
  StyledSearch
} from './styledComponents'
import closeIcon from '../../../assets/cancel-button.svg'
import Select, { SelectValue } from 'antd/lib/select'
import {
  ProductInternalsInfo,
  GenderType,
  ProductSize,
  FitStyle,
  BasicColor,
  ProductColors,
  CollectionType,
  Message,
  PredyedColor
} from '../../../types/common'

interface Props {
  open: boolean
  width?: string | number
  title?: string
  internalId: number
  productCode: string
  loading: boolean
  productInternalsInfo: ProductInternalsInfo
  gender: string
  size: string
  topSize: string
  bottomSize: string
  fitStyle: string
  color: string
  predyedColor: string
  pocketZipper: string
  frontZipper: string
  binding: string
  bibBrace: string
  collection: string
  id: number
  model: string
  requestClose?: () => void
  formatMessage: (messageDescriptor: Message) => string
  handleOnInputChange: (event: any) => void
  handleOnSelectChange: (value: string, id: string) => void
  onSave: () => void
  deleteProduct: () => void
  handleOnProductChange: (value: SelectValue) => void
}

const TOP_SIZE = 'topSize'
const BOTTOM_SIZE = 'bottomSize'
const SIZE = 'size'

const { Option } = Select

const InternalsModal = ({
  open,
  requestClose,
  formatMessage,
  width,
  handleOnInputChange,
  internalId,
  handleOnSelectChange,
  onSave,
  loading,
  productInternalsInfo,
  gender: genderValue,
  size,
  topSize,
  bottomSize,
  fitStyle,
  color,
  pocketZipper,
  frontZipper,
  binding,
  predyedColor,
  bibBrace,
  collection,
  deleteProduct,
  id,
  handleOnProductChange,
  model
}: Props) => {
  const productsModels = get<ProductInternalsInfo, 'products', string[]>(
    productInternalsInfo,
    'products',
    []
  )
  const genders = get<ProductInternalsInfo, 'genders', GenderType[]>(
    productInternalsInfo,
    'genders',
    []
  )
  const sizes = get<ProductInternalsInfo, 'sizes', ProductSize[]>(
    productInternalsInfo,
    'sizes',
    []
  )
  const fitStyles = get<ProductInternalsInfo, 'fitStyles', FitStyle[]>(
    productInternalsInfo,
    'fitStyles',
    []
  )
  const predyedColors = get<ProductInternalsInfo, 'predyedColors', PredyedColor[]>(
    productInternalsInfo,
    'predyedColors',
    []
  )
  const basicColors = get<ProductInternalsInfo, 'basicColors', BasicColor[]>(
    productInternalsInfo,
    'basicColors',
    []
  )

  const frontZipperColors = get<
    ProductInternalsInfo,
    'frontZipperColors',
    BasicColor[]
  >(productInternalsInfo, 'frontZipperColors', [])

  const colors = get<ProductInternalsInfo, 'colors', ProductColors[]>(
    productInternalsInfo,
    'colors',
    []
  )
  const collections = get<
    ProductInternalsInfo,
    'collections',
    CollectionType[]
  >(productInternalsInfo, 'collections', [])

  const handleOnSelect = (fieldId: string) => (value: string) =>
    handleOnSelectChange(value, fieldId)

  const handleOnSelectSize = (fieldId: string) => (value: string) => {
    if (fieldId === SIZE) {
      handleOnSelectChange(null, TOP_SIZE)
      handleOnSelectChange(null, BOTTOM_SIZE)
    } else {
      handleOnSelectChange(null, SIZE)
    }
    handleOnSelectChange(value, fieldId)
  }
  return (
    <Container>
      <Modal
        {...{ width }}
        visible={open}
        footer={null}
        closable={false}
        destroyOnClose={true}
        onOk={onSave}
        onCancel={requestClose}
      >
        <CloseIcon src={closeIcon} onClick={requestClose} />
        <Title>
          {formatMessage(messages[id >= 0 ? 'editInternal' : 'newInternal'])}
        </Title>
        <Label>{formatMessage(messages.internalId)}</Label>
        <StyledInput
          id={'internalId'}
          onChange={handleOnInputChange}
          maxLength={8}
          data-is-number={true}
          value={internalId}
        />
        <Row>
          <Column>
            <Label>{formatMessage(messages.modelID)}</Label>
            <StyledSearch
              onChange={handleOnProductChange}
              filterOption={true}
              dataSource={productsModels}
              value={model}
            >
              <StyledInput />
            </StyledSearch>
          </Column>
          <Column>
            <Label>{formatMessage(messages.gender)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('gender')}
              defaultValue={genderValue}
            >
              {genders.map(({ gender }) => (
                <Option key={gender} value={gender}>
                  {gender}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.size)}</Label>
            <StyledSelect onSelect={handleOnSelectSize(SIZE)} defaultValue={size} value={size}>
              {sizes.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.topSize)}</Label>
            <StyledSelect onSelect={handleOnSelectSize(TOP_SIZE)} defaultValue={topSize} value={topSize}>
              {sizes.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.bottomSize)}</Label>
            <StyledSelect onSelect={handleOnSelectSize(BOTTOM_SIZE)} defaultValue={bottomSize} value={bottomSize}>
              {sizes.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.fitStyle)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('fitStyle')}
              defaultValue={fitStyle}
            >
              {fitStyles.map(({ info }) => (
                <Option key={info} value={info}>
                  {info}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.color)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('color')}
              defaultValue={color}
            >
              {colors.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.pocketZipper)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('pocketZipper')}
              defaultValue={pocketZipper}
            >
              {basicColors.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.frontZipper)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('frontZipper')}
              defaultValue={frontZipper}
            >
              {frontZipperColors.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.binding)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('binding')}
              defaultValue={binding}
            >
              {basicColors.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.bibBrace)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('bibBrace')}
              defaultValue={bibBrace}
            >
              {basicColors.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
          <Column>
            <Label>{formatMessage(messages.collection)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('collection')}
              defaultValue={collection}
            >
              {collections.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>{formatMessage(messages.predyed)}</Label>
            <StyledSelect
              onSelect={handleOnSelect('predyedColor')}
              defaultValue={predyedColor}
            >
              {predyedColors.map(({ name }) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </StyledSelect>
          </Column>
        </Row>
        <ButtonsContainer>
          <StyledButton disabled={loading || id < 0} onClick={deleteProduct}>
            {formatMessage(messages.delete)}
          </StyledButton>

          <ButtonWrapper color={BLUE}>
            <StyledButton
              disabled={!internalId || !model || !collection}
              type="primary"
              onClick={onSave}
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
