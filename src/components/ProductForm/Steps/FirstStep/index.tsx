/**
 * FirstStep Component - Created by Apodaca on 14/05/19.
 */
import * as React from 'react'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'
import {
  Container,
  Separator,
  RowInput,
  CheckBox,
  Label,
  InlineLabel,
  SwitchInput,
  RadioButton,
  InputDiv
} from './styledComponents'
import Radio from 'antd/lib/radio'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import AutoComplete from 'antd/lib/auto-complete'
import { Product, ItemDetailType, GenderType } from '../../../../types/common'
const RadioGroup = Radio.Group
const Option = Select.Option
const { TextArea } = Input

interface Props {
  genders: GenderType[]
  product: Product
  categories: ItemDetailType[]
  materials: string[]
  sports: ItemDetailType[]
  relatedTags: string[]
  seasons: string[]
  setValue: (field: string, value: any) => void
  setDesignCenter: (checked: boolean) => void
  setGenderActions: (id: number, value: boolean) => void
  setCheck: (selected: string, id: number, checked: boolean) => void
  formatMessage: (messageDescriptor: any) => string
}
export class FirstStep extends React.Component<Props, {}> {
  render() {
    const {
      categories,
      sports: sportsOptions,
      seasons,
      genders,
      product,
      materials,
      formatMessage,
      relatedTags
    } = this.props
    const {
      name,
      mpn,
      tags,
      obj,
      mtl,
      active,
      season,
      yotpoId,
      designCenter,
      genders: gendersProduct,
      details,
      contentTile,
      materials: materialsProduct,
      code,
      categoryName,
      sports,
      relatedItemTag,
      description,
      weight,
      shortDescription
    } = product
    const searchValues = tags ? tags.split(', ') : []
    const gendersValues = gendersProduct
      ? Object.keys(gendersProduct).filter(id => gendersProduct[id].selected)
      : []
    const materialsValue = materialsProduct ? materialsProduct.split('-') : []
    const specDetails = details ? details.split(',') : []
    return (
      <Container>
        <Separator>
          <FormattedMessage {...messages.title} />
        </Separator>
        <RowInput>
          <InputDiv>
            <Label>
              <FormattedMessage {...messages.productType} />
            </Label>
            <RadioGroup
              onChange={this.handleSwitchDesign}
              value={designCenter}
              name="designCenter"
              size="large"
            >
              <RadioButton value={true}>
                <FormattedMessage {...messages.custom} />
              </RadioButton>
              <RadioButton value={false}>
                <FormattedMessage {...messages.inline} />
              </RadioButton>
            </RadioGroup>
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={3}>
            <Label>
              <FormattedMessage {...messages.name} />
            </Label>
            <Input
              size="large"
              value={name}
              name="name"
              onChange={this.handleChangeCustom}
              placeholder={formatMessage(messages.productName)}
            />
          </InputDiv>
          <InputDiv flex={2}>
            <Label>
              <FormattedMessage {...messages.mpn} />
            </Label>
            <Input
              size="large"
              value={mpn}
              name="mpn"
              onChange={this.handleChangeCustom}
              placeholder={formatMessage(messages.mpnPlaceholder)}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.searchTags} />
            </Label>
            <Select
              mode="tags"
              size="large"
              value={searchValues}
              style={{ width: '100%' }}
              placeholder={formatMessage(messages.searchTagsPlaceholder)}
              onChange={this.handleSearchTagChange}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.productCode} />
            </Label>
            <Input
              size="large"
              value={code}
              name="code"
              onChange={this.handleChangeCustom}
              placeholder={formatMessage(messages.productCodeHolder)}
            />
          </InputDiv>
          <InputDiv flex={2}>
            <Label>
              <FormattedMessage {...messages.productDescriptor} />
            </Label>
            <Input
              size="large"
              value={shortDescription}
              name="shortDescription"
              onChange={this.handleChangeCustom}
              placeholder={formatMessage(messages.productDescriptorHolder)}
            />
          </InputDiv>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.yotpoId} />
            </Label>
            <Input
              size="large"
              value={yotpoId}
              name="yotpoId"
              onChange={this.handleChangeCustom}
              placeholder={formatMessage(messages.yotpoIdHolder)}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.categories} />
            </Label>
            {sportsOptions.map((sport: ItemDetailType, index) => (
              <CheckBox
                onChange={this.handleCheckChange}
                key={index}
                name={sport.id.toString()}
                checked={sports[sport.id]}
              >
                {sport.name}
              </CheckBox>
            ))}
          </InputDiv>
          <InputDiv flex={1} />
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.productCategories} />
            </Label>
            <Select
              size="large"
              value={categoryName}
              style={{ width: '100%' }}
              placeholder={formatMessage(messages.productCategoriesHolder)}
              onChange={this.handleChangeCategory}
            >
              {categories.map((category: ItemDetailType, index) => (
                <Option key={index.toString()} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </InputDiv>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.relatedItemTag} />
            </Label>
            <AutoComplete
              size="large"
              value={relatedItemTag}
              dataSource={relatedTags}
              style={{ width: '100%' }}
              filterOption={(inputValue, option) =>
                option.props.children
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              placeholder={formatMessage(messages.relatedItemTagHolder)}
              onChange={this.handleRelatedChange}
            />
          </InputDiv>
        </RowInput>
        {((obj && mtl) || !designCenter) && (
          <RowInput>
            <InputDiv flex={1} isFlex={true} flexFlow="row">
              <InlineLabel>
                <FormattedMessage {...messages.onStore} />
                <SwitchInput
                  checked={active}
                  onChange={this.handleSwitchActive}
                />
              </InlineLabel>
            </InputDiv>
            <InputDiv flex={1} />
          </RowInput>
        )}
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.productDescription} />
            </Label>
            <TextArea
              value={description}
              name="description"
              onChange={this.handleChangeCustom}
              placeholder={formatMessage(messages.generalProduct)}
              autosize={{ minRows: 5, maxRows: 10 }}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.specsDetails} />
            </Label>
            <Select
              mode="tags"
              size="large"
              value={specDetails}
              onChange={this.handleSpecDetails}
              style={{ width: '100%' }}
              placeholder={formatMessage(messages.addMore)}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.materialInfo} />
            </Label>
            <Select
              mode="tags"
              size="large"
              value={materialsValue}
              style={{ width: '100%' }}
              placeholder={formatMessage(messages.addMore)}
              onChange={this.handleMaterialChange}
            >
              {materials.map((material: string, index) => (
                <Option key={index.toString()} value={material}>
                  {material}
                </Option>
              ))}
            </Select>
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.season} />
            </Label>
            <Select
              size="large"
              value={season}
              onChange={this.handleSeason}
              style={{ width: '100%' }}
              placeholder={formatMessage(messages.seasonHolder)}
            >
              {seasons.map((seasonName: string, index) => (
                <Option key={index.toString()} value={seasonName}>
                  {seasonName}
                </Option>
              ))}
            </Select>
          </InputDiv>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.gender} />
            </Label>
            <Select
              size="large"
              mode="multiple"
              value={gendersValues}
              style={{ width: '100%' }}
              onSelect={this.handleGenderChange}
              onDeselect={this.handleGenderChange}
              placeholder={formatMessage(messages.genderHolder)}
            >
              {genders.map((gender: any, index) => (
                <Option key={index.toString()} value={gender.id.toString()}>
                  {gender.gender}
                </Option>
              ))}
            </Select>
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.contentTile} />
            </Label>
            <Input
              size="large"
              value={contentTile}
              name="contentTile"
              onChange={this.handleChangeCustom}
              placeholder={formatMessage(messages.contentTileHolder)}
            />
          </InputDiv>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.weight} />
            </Label>
            <Input
              size="large"
              type="number"
              value={weight}
              name="weight"
              onChange={this.handleChangeCustom}
              placeholder={formatMessage(messages.weightHolder)}
            />
          </InputDiv>
        </RowInput>
      </Container>
    )
  }
  handleCheckChange = ({ target: { name, checked } }: any) => {
    const { setCheck } = this.props
    setCheck('sports', name, checked)
  }
  handleGenderChange = (selectedId: string) => {
    const {
      setGenderActions,
      product: { designCenter, genders }
    } = this.props
    const idsSelected = Object.keys(genders).filter(
      id => genders[id].selected && selectedId !== id
    ).length
    if (!(!designCenter && idsSelected > 0)) {
      setGenderActions(
        selectedId,
        !get(genders, `${selectedId}.selected`, false)
      )
    }
  }
  handleSearchTagChange = (value: any) => {
    const { setValue } = this.props
    if (!value.find((str: string) => /[,\/]/g.test(str))) {
      const fieldValue = value.join(', ')
      setValue('tags', fieldValue)
    }
  }
  handleSpecDetails = (value: any) => {
    const { setValue } = this.props
    if (!value.find((str: string) => /[,\/]/g.test(str))) {
      const fieldValue = value.join(', ')
      setValue('details', fieldValue)
    }
  }
  handleMaterialChange = (value: any) => {
    const { setValue } = this.props
    if (!value.find((str: string) => /[,\/]/g.test(str))) {
      const fieldValue = value.join('-')
      setValue('materials', fieldValue)
    }
  }
  handleRelatedChange = (value: any) => {
    const { setValue } = this.props
    setValue('relatedItemTag', value)
  }
  handleChangeCategory = (value: string) => {
    const { setValue } = this.props
    setValue('categoryName', value)
  }
  handleSwitchActive = (value: boolean) => {
    const { setValue } = this.props
    setValue('active', value ? 'true' : 'false')
  }
  handleSwitchDesign = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { setDesignCenter } = this.props
    setDesignCenter(value)
  }
  handleSeason = (value: any) => {
    const { setValue } = this.props
    setValue('season', value)
  }
  handleChangeCustom = (event: any) => {
    const { setValue } = this.props
    const {
      target: { value, name, type }
    } = event
    setValue(name, type === 'number' ? parseFloat(value) : value)
  }
}

export default FirstStep
