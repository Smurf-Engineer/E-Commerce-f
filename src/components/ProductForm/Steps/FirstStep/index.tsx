/**
 * AboutUs Component - Created by cazarez on 07/02/18.
 */
import * as React from 'react'
import messages from './messages'
import { FormattedMessage } from 'react-intl'
import {
  Container,
  Separator,
  RowInput,
  CheckBox,
  Label,
  CheckGroup,
  InlineLabel,
  SwitchInput,
  RadioButton,
  InputDiv
} from './styledComponents'
import { Radio, Input, Select, AutoComplete } from 'antd'
import { Product, ItemDetailType } from '../../../../types/common'
const RadioGroup = Radio.Group
const Option = Select.Option
const { TextArea } = Input

interface Props {
  genders: object[]
  product: Product
  categories: object[]
  materials: string[]
  sports: object[]
  relatedTags: string[]
  seasons: string[]
  setValue: (field: string, value: any) => void
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
      customizable,
      mpn,
      tags,
      active,
      season,
      yotpoId,
      design_center,
      genders: gendersProduct,
      details,
      materials: materialsProduct,
      code,
      category_name: categoryName,
      sports,
      related_item_tag,
      description,
      shortDescription
    } = product
    const searchValues = tags ? tags.split(', ') : []
    const gendersValues = gendersProduct ? gendersProduct.map(e => e.id) : []
    const materialsValue = materialsProduct ? materialsProduct.split(' ') : []
    const specDetails = details ? details.split(',') : []
    const sportsSelected = sports ? sports.map(e => e.id) : []
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
              onChange={this.handleChangeCustom}
              value={customizable}
              name="customizable"
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
            <CheckGroup
              value={sportsSelected}
              onChange={this.handleCheckChange}
            >
              {sportsOptions.map((sport: ItemDetailType, index) => (
                <CheckBox key={index} value={sport.id}>
                  {sport.name}
                </CheckBox>
              ))}
            </CheckGroup>
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
              value={related_item_tag}
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
        <RowInput>
          <InputDiv flex={1} isFlex={true} flexFlow="row">
            <InlineLabel>
              <FormattedMessage {...messages.onStore} />
              <SwitchInput
                checked={active === 'true'}
                onChange={this.handleSwitchActive}
              />
            </InlineLabel>
            {customizable && (
              <InlineLabel>
                <FormattedMessage {...messages.designLabProduct} />
                <SwitchInput
                  checked={design_center}
                  onChange={this.handleSwitchDesign}
                />
              </InlineLabel>
            )}
          </InputDiv>
          <InputDiv flex={1} />
        </RowInput>
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
              placeholder={formatMessage(messages.genderHolder)}
              onChange={this.handleGenderChange}
            >
              {genders.map((gender: any, index) => (
                <Option key={index.toString()} value={gender.id}>
                  {gender.gender}
                </Option>
              ))}
            </Select>
          </InputDiv>
        </RowInput>
      </Container>
    )
  }
  handleCheckChange = (ids: any[]) => {
    const { setValue, sports } = this.props
    const value = sports.filter(({ id }: any) => ids.includes(id))
    setValue('sports', value)
  }
  handleGenderChange = (ids: any[]) => {
    const { setValue, genders } = this.props
    const value = genders.filter(({ id }: any) => ids.includes(id))
    setValue('genders', value)
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
      const fieldValue = value.join(' ')
      setValue('materials', fieldValue)
    }
  }
  handleRelatedChange = (value: any) => {
    const { setValue } = this.props
    setValue('related_item_tag', value)
  }
  handleChangeCategory = (value: string) => {
    const { setValue } = this.props
    setValue('category_name', value)
  }
  handleSwitchActive = (value: boolean) => {
    const { setValue } = this.props
    setValue('active', value ? 'true' : 'false')
  }
  handleSwitchDesign = (value: boolean) => {
    const { setValue } = this.props
    setValue('design_center', value)
  }
  handleSeason = (value: any) => {
    const { setValue } = this.props
    setValue('season', value)
  }
  handleChangeCustom = (event: any) => {
    const { setValue } = this.props
    const {
      target: { value, name }
    } = event
    setValue(name, value)
  }
}

export default FirstStep
