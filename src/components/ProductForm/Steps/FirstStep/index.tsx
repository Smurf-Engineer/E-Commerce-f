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
  Label,
  RadioButton,
  InputDiv
} from './styledComponents'
import { Radio, Input, Select, Checkbox } from 'antd'
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
interface Props {
  categories: object[]
  changeValue?: (field: string, value: any) => void
  formatMessage: (messageDescriptor: any) => string
}
export class FirstStep extends React.Component<Props, {}> {
  render() {
    const { categories, formatMessage } = this.props
    let categoriesOptions = categories.map((item: any) => item.name)
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
            <RadioGroup defaultValue="a" size="large">
              <RadioButton value="a">
                <FormattedMessage {...messages.custom} />
              </RadioButton>
              <RadioButton value="b">
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
              placeholder={formatMessage(messages.productName)}
            />
          </InputDiv>
          <InputDiv flex={2}>
            <Label>
              <FormattedMessage {...messages.mpn} />
            </Label>
            <Input
              size="large"
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
              style={{ width: '100%' }}
              placeholder={formatMessage(messages.searchTagsPlaceholder)}
              onChange={value => console.log('value:', value)}
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
              placeholder={formatMessage(messages.productCodeHolder)}
            />
          </InputDiv>
          <InputDiv flex={2}>
            <Label>
              <FormattedMessage {...messages.productDescriptor} />
            </Label>
            <Input
              size="large"
              placeholder={formatMessage(messages.productDescriptorHolder)}
            />
          </InputDiv>
          <InputDiv flex={1}>
            <Label>
              <FormattedMessage {...messages.yotpoId} />
            </Label>
            <Input
              size="large"
              placeholder={formatMessage(messages.yotpoIdHolder)}
            />
          </InputDiv>
        </RowInput>
        <RowInput>
          <InputDiv>
            <Label>
              <FormattedMessage {...messages.categories} />
            </Label>
            <CheckboxGroup onChange={value => console.log('value:', value)}>
              {categoriesOptions.map((category, index) => (
                <div>
                  <Checkbox key={index} value={category}>
                    {category}
                  </Checkbox>
                  {index % 4 && <br />}
                </div>
              ))}
            </CheckboxGroup>
          </InputDiv>
        </RowInput>
      </Container>
    )
  }
}

export default FirstStep
