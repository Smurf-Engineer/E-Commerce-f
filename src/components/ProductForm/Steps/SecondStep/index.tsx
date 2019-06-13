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
  setCheck: (selected: string, id: number, checked: boolean) => void
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
            {sizes.map((sizeItem: ItemDetailType, index) => (
              <CheckBox
                key={index}
                name={sizeItem.id}
                checked={sizeRange[sizeItem.id]}
                onChange={this.handleCheckChange}
              >
                {sizeItem.name}
              </CheckBox>
            ))}
          </InputDiv>
          <InputDiv flex={1} />
        </RowInput>
        <RowInput>
          <InputDiv flex={2}>
            <Label>
              <FormattedMessage {...messages.selectFitStyle} />
            </Label>
            {fitStyles.map((style: FitStyle, index) => (
              <CheckBox
                key={index}
                name={style.id}
                onChange={this.handleCheckStyle}
                checked={fitStylesProduct[style.id]}
              >
                {style.name}
              </CheckBox>
            ))}
          </InputDiv>
          <InputDiv flex={1} />
        </RowInput>
        {!customizable && (
          <RowInput>
            <InputDiv flex={2}>
              <Label>
                <FormattedMessage {...messages.selectColors} />
              </Label>
              {colors.map((color: ProductColors, index) => (
                <CheckBox
                  key={index}
                  name={color.id}
                  onChange={this.handleChangeColor}
                  checked={productColors[color.id]}
                >
                  <ColorIcon src={color.image} />
                  {color.name}
                </CheckBox>
              ))}
            </InputDiv>
            <InputDiv flex={1} />
          </RowInput>
        )}
      </Container>
    )
  }
  handleCheckChange = ({ target: { name, checked } }: any) => {
    const { setCheck } = this.props
    setCheck('sizeRange', parseInt(name, 10), checked)
  }
  handleCheckStyle = ({ target: { name, checked } }: any) => {
    const { setCheck } = this.props
    setCheck('fitStyles', parseInt(name, 10), checked)
  }
  handleChangeColor = ({ target: { name, checked } }: any) => {
    const { setCheck } = this.props
    setCheck('colors', parseInt(name, 10), checked)
  }
}

export default SecondStep
