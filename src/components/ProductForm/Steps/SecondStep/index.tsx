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
  setColors: () => void
  setCheck: (selected: string, id: number, checked: boolean) => void
  setValue: (field: string, value: any) => void
  formatMessage: (messageDescriptor: any) => string
}
export class SecondStep extends React.Component<Props, {}> {
  componentWillUnmount() {
    const {
      setColors,
      product: { designCenter }
    } = this.props
    if (!designCenter) {
      setColors()
    }
  }
  render() {
    const { sizes, product, fitStyles, colors } = this.props
    const {
      sizeRange: sizesSelected,
      fitStyles: fitStylesProduct,
      colors: productColors,
      designCenter
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
                onChange={this.handleCheckChange}
                key={index}
                name={sizeItem.id.toString()}
                checked={sizesSelected[sizeItem.id]}
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
                name={style.id.toString()}
                checked={fitStylesProduct[style.id]}
                onChange={this.handleCheckStyle}
              >
                {style.name}
              </CheckBox>
            ))}
          </InputDiv>
          <InputDiv flex={1} />
        </RowInput>
        {!designCenter && (
          <RowInput>
            <InputDiv flex={2}>
              <Label>
                <FormattedMessage {...messages.selectColors} />
              </Label>
              {colors.map((color: ProductColors, index) => (
                <CheckBox
                  key={index}
                  id={color.id.toString()}
                  name={color.name}
                  checked={productColors[color.id]}
                  onChange={this.handleChangeColor}
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
  handleCheckChange = ({
    target: { name, checked }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { setCheck } = this.props
    setCheck('sizeRange', name, checked)
  }
  handleCheckStyle = ({
    target: { name, checked }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { setCheck } = this.props
    setCheck('fitStyles', name, checked)
  }
  handleChangeColor = ({
    target: { name, id, checked }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { setCheck } = this.props
    setCheck('colors', id, checked ? name : false)
  }
}

export default SecondStep
