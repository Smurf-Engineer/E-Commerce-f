/**
 * FirstStep Component - Created by Apodaca on 14/05/19.
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
  InlineLabel,
  SwitchInput,
  RadioButton,
  InputDiv,
  SpecDetail,
  SpecList,
  RemoveDetail,
  MoreIcon,
  SpecName
} from './styledComponents'
import Radio from 'antd/lib/radio'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import AutoComplete from 'antd/lib/auto-complete'
import { Product, ItemDetailType, GenderType } from '../../../../types/common'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import Draggable from '../../../Draggable'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { KEY_ENTER } from '../../../../constants'
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
  newSport: string
  newSportEnabled: boolean
  specDetail: string
  materialDetail: string
  setMaterial: (value: string) => void
  setSpec: (value: string) => void
  removeFile: (array: string, index: number) => void
  addFile: (array: string, item: any) => void
  moveFile: (array: string, index: number, indexTo: number) => void
  setValue: (field: string, value: any) => void
  enableNewSportAction: (value: boolean) => void
  setNewSport: (value: string) => void
  setDesignCenter: (checked: boolean) => void
  setGenderAction: (id: number, value: boolean) => void
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
      newSport,
      specDetail: specDetailValue,
      newSportEnabled,
      product,
      materials,
      formatMessage,
      materialDetail,
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
      customLink,
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
        {!designCenter && (
          <RowInput>
            <InputDiv flex={1}>
              <Label>
                <FormattedMessage {...messages.customLink} />
              </Label>
              <Input
                size="large"
                value={customLink}
                name="customLink"
                onChange={this.handleChangeCustom}
                placeholder={formatMessage(messages.customLinkPlaceholder)}
              />
            </InputDiv>
          </RowInput>
        )}
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
            <CheckBox
              onChange={this.handleEnableNewSport}
              checked={newSportEnabled}
            >
              {formatMessage(messages.other)}
            </CheckBox>
            <Input
              size="large"
              value={newSport}
              disabled={!newSportEnabled}
              onChange={this.handleChangeNewSport}
              placeholder={formatMessage(messages.typeName)}
            />
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
            <Input
              size="large"
              value={specDetailValue}
              onChange={this.handleChangeSpec}
              onPressEnter={this.handleSpecDetails}
              style={{ width: '100%' }}
              placeholder={formatMessage(messages.addMore)}
            />
            {!!details.length && (
              <SpecList>
                {details.map((item: string, index: number) => (
                  <Draggable
                    {...{ index }}
                    key={index}
                    id={index}
                    section="specs"
                    onDropRow={this.handleMoveSpecs}
                  >
                    <SpecDetail>
                      <MoreIcon type="ellipsis" />
                      <SpecName>{item}</SpecName>
                      <RemoveDetail
                        onClick={this.handleRemoveSpec(index)}
                        type="close"
                      />
                    </SpecDetail>
                  </Draggable>
                ))}
              </SpecList>
            )}
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.materialInfo} />
            </Label>
            <AutoComplete
              size="large"
              value={materialDetail}
              dataSource={materials}
              onInputKeyDown={this.handleAddMaterial}
              style={{ width: '100%' }}
              filterOption={(inputValue, option) =>
                option.props.children
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              placeholder={formatMessage(messages.addMore)}
              onChange={this.handleMaterialChange}
            />
            {materialsProduct && !!materialsProduct.length && (
              <SpecList>
                {materialsProduct.map((item: string, index: number) => (
                  <Draggable
                    {...{ index }}
                    key={index}
                    id={index}
                    section="materials"
                    onDropRow={this.handleMoveMaterials}
                  >
                    <SpecDetail>
                      <MoreIcon type="ellipsis" />
                      <SpecName>{item}</SpecName>
                      <RemoveDetail
                        onClick={this.handleRemoveMaterial(index)}
                        type="close"
                      />
                    </SpecDetail>
                  </Draggable>
                ))}
              </SpecList>
            )}
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
              onSelect={this.handleGenderChange(true)}
              onDeselect={this.handleGenderChange(false)}
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
  handleCheckChange = ({ target: { name, checked } }: CheckboxChangeEvent) => {
    const { setCheck } = this.props
    setCheck('sports', name, checked)
  }

  handleEnableNewSport = ({ target: { checked } }: CheckboxChangeEvent) => {
    const { enableNewSportAction } = this.props
    enableNewSportAction(checked)
  }

  handleChangeNewSport = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { setNewSport } = this.props
    setNewSport(value)
  }

  handleGenderChange = (selected: boolean) => (selectedId: string) => {
    const {
      setGenderAction,
      product: { designCenter, genders }
    } = this.props
    const idsSelected = Object.keys(genders).filter(
      id => genders[id].selected && selectedId !== id
    )
    if (!(!designCenter && idsSelected.length > 0)) {
      setGenderAction(selectedId, selected)
    }
  }

  handleSearchTagChange = (value: string[]) => {
    const { setValue } = this.props
    if (!value.find((str: string) => /[,\/]/g.test(str))) {
      const fieldValue = value.join(', ')
      setValue('tags', fieldValue)
    }
  }

  handleChangeSpec = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    const { setSpec } = this.props
    setSpec(value.replace(/[,]/g, ''))
  }

  handleMoveSpecs = (dragIndex: number, dropIndex: number) => {
    const { moveFile } = this.props
    moveFile('details', dragIndex, dropIndex)
  }

  handleRemoveSpec = (index: number) => () => {
    const { removeFile } = this.props
    removeFile('details', index)
  }

  handleSpecDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    const {
      addFile,
      product: { details }
    } = this.props
    if (!details.find((item: string) => item === value.trim())) {
      addFile('details', value)
    }
  }

  handleMoveMaterials = (dragIndex: number, dropIndex: number) => {
    const { moveFile } = this.props
    moveFile('materials', dragIndex, dropIndex)
  }

  handleRemoveMaterial = (index: number) => () => {
    const { removeFile } = this.props
    removeFile('materials', index)
  }

  handleMaterialChange = (value: string) => {
    const { setMaterial } = this.props
    setMaterial(value.replace(/[-\/]/g, ''))
  }

  handleAddMaterial = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event
    if (event.key === KEY_ENTER && value) {
      const {
        addFile,
        product: { materials }
      } = this.props
      if (!materials.find((item: string) => item === value.trim())) {
        addFile('materials', value)
      }
    }
  }

  handleRelatedChange = (value: string[]) => {
    const { setValue } = this.props
    setValue('relatedItemTag', value)
  }

  handleChangeCategory = (value: string) => {
    const { setValue } = this.props
    setValue('categoryName', value)
  }

  handleSwitchActive = (value: boolean) => {
    const { setValue } = this.props
    setValue('active', value)
  }

  handleSwitchDesign = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { setDesignCenter } = this.props
    setDesignCenter(value)
  }

  handleSeason = (value: string) => {
    const { setValue } = this.props
    setValue('season', value)
  }

  handleChangeCustom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setValue } = this.props
    const {
      target: { value, name, type }
    } = event
    setValue(name, type === 'number' ? parseFloat(value) : value)
  }
}

export default DragDropContext(HTML5Backend)(FirstStep)
