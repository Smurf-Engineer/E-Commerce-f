/**
 * RowItem Component - Created by eduardoquintero on 29/07/19.
 */
import * as React from 'react'
import {
  Container,
  Cell,
  Thumbnail,
  HorizontalWrapper,
  VerticalWrapper,
  HeavyText,
  RegularText,
  StyledInput,
  StyledButton,
  ButtonWrapper
} from './styledComponents'
import some from 'lodash/some'
import messages from '../messages'
import { isNumber } from '../../../../utils/utilsFiles'
import { BLUE } from '../../../../theme/colors'
import {
  Currency,
  PriceRange,
  Message,
  PricesByCurrency
} from '../../../../types/common'
import { CHF_CURRENCY } from '../../constants'

interface Props {
  thumbnail: string
  designName: string
  productName: string
  productType: string
  currencies: Currency[]
  index: number
  priceRange: PriceRange[]
  pricesByCurrency: PricesByCurrency
  loading: boolean
  handleOnSetPrice: (value: number, currency: string, itemIndex: number) => void
  handleOnSave: (event: React.MouseEvent<HTMLElement>) => void
  formatMessage: (messageDescriptor: Message) => string
}

const RowItem = ({
  thumbnail,
  designName,
  productName,
  productType,
  currencies,
  handleOnSetPrice,
  index,
  pricesByCurrency,
  handleOnSave,
  formatMessage,
  loading
}: Props) => {
  const onSetPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id: inputId } = event.target
    if (!isNumber(value) && value !== '') {
      return
    }
    handleOnSetPrice(Number(value), inputId, index)
  }
  const inputFields = currencies.map(({ shortName, id: currencyId }) => {
    return (
      shortName !== CHF_CURRENCY && (
        <Cell key={currencyId}>
          <StyledInput
            id={shortName}
            placeholder={shortName}
            onChange={onSetPrice}
            value={pricesByCurrency[shortName]}
          />
        </Cell>
      )
    )
  })
  return (
    <Container>
      <Cell>
        <HorizontalWrapper>
          <Thumbnail src={thumbnail} />
          <VerticalWrapper>
            <HeavyText>{designName}</HeavyText>
            <RegularText>{productName}</RegularText>
            <RegularText>{productType}</RegularText>
          </VerticalWrapper>
        </HorizontalWrapper>
      </Cell>
      {inputFields}
      <Cell>
        <ButtonWrapper color={BLUE}>
          <StyledButton
            id={index}
            disabled={some(
              currencies,
              ({ shortName }) => !pricesByCurrency[shortName]
            )}
            type="primary"
            onClick={handleOnSave}
            {...{ loading }}
          >
            {formatMessage(messages.save)}
          </StyledButton>
        </ButtonWrapper>
      </Cell>
    </Container>
  )
}

export default RowItem
