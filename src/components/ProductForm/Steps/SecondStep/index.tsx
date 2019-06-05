/**
 * SecondStep Component - Created by Apodaca on 14/05/19.
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
  ColorIcon,
  InputDiv
} from './styledComponents'
import {
  Product,
  ItemDetailType,
  FitStyle,
  ProductColors
} from '../../../../types/common'

interface Props {
  product: Product
  sizes: ItemDetailType[]
  colors: ProductColors[]
  fitStyles: FitStyle[]
  setValue: (field: string, value: any) => void
  formatMessage: (messageDescriptor: any) => string
}
export class SecondStep extends React.Component<Props, {}> {
  render() {
    const { sizes, product, fitStyles, colors } = this.props
    const {
      sizeRange,
      fitStyles: fitStylesProduct,
      colors: productColors,
      customizable
    } = product
    const sizesSelected = sizeRange.map(e => e.id || '')
    const stylesSelected = fitStylesProduct.map(e => e.id)
    const colorsSelected = productColors ? productColors.map(e => e.id) : []
    return (
      <Container>
        <Separator>
          <FormattedMessage {...messages.title} />
        </Separator>
        <RowInput>
          <InputDiv flex={2}>
            <Label>
              <FormattedMessage {...messages.sizesAvailable} />
            </Label>
            <CheckGroup value={sizesSelected} onChange={this.handleCheckChange}>
              {sizes.map((sizeItem: ItemDetailType, index) => (
                <CheckBox key={index} value={sizeItem.id}>
                  {sizeItem.name}
                </CheckBox>
              ))}
            </CheckGroup>
          </InputDiv>
          <InputDiv flex={1} />
        </RowInput>
        <RowInput>
          <InputDiv flex={2}>
            <Label>
              <FormattedMessage {...messages.selectFitStyle} />
            </Label>
            <CheckGroup value={stylesSelected} onChange={this.handleCheckStyle}>
              {fitStyles.map((style: FitStyle, index) => (
                <CheckBox key={index} value={style.id}>
                  {style.name}
                </CheckBox>
              ))}
            </CheckGroup>
          </InputDiv>
          <InputDiv flex={1} />
        </RowInput>
        {!customizable && (
          <RowInput>
            <InputDiv flex={2}>
              <Label>
                <FormattedMessage {...messages.selectColors} />
              </Label>
              <CheckGroup
                value={colorsSelected}
                onChange={this.handleChangeColor}
              >
                {colors.map((color: ProductColors, index) => (
                  <CheckBox key={index} value={color.id}>
                    <ColorIcon src={color.image} />
                    {color.name}
                  </CheckBox>
                ))}
              </CheckGroup>
            </InputDiv>
            <InputDiv flex={1} />
          </RowInput>
        )}
      </Container>
    )
  }
  handleCheckChange = (ids: any[]) => {
    const { setValue, sizes } = this.props
    const value = sizes.filter(({ id }: any) => ids.includes(id))
    setValue('sizeRange', value)
  }
  handleCheckStyle = (ids: any[]) => {
    const { setValue, fitStyles } = this.props
    const value = fitStyles.filter(({ id }: any) => ids.includes(id))
    setValue('fitStyles', value)
  }
  handleChangeColor = (ids: any[]) => {
    const { setValue, colors } = this.props
    const value = colors.filter(({ id }: any) => ids.includes(id))
    setValue('colors', value)
  }
}

export default SecondStep
