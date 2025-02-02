/**
 * Styled Components - Created by miguelcanobbio on 15/05/18.
 */
import styled from 'styled-components'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { AutoComplete, Icon, Tooltip } from 'antd'
import { BLACK, GRAY_STRONG } from '../../theme/colors'

interface InputProps {
  inputhWidth?: string
}

export const ShippingFormContainer = styled.div`
  margin: 23px 0 23px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 22px;

  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 0;
    flex-direction: column;
  }
`

export const Column = styled.div`
  width: ${({ inputhWidth }: InputProps) =>
    inputhWidth ? inputhWidth : '400px'};

  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

export const StyledInput = styled(Input)`
  height: 40px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
`

export const StreetInput = styled(Input)`
  height: 40px !important;
  width: 100% !important;
  border: 1px solid #bebebe;
  border-radius: 0 !important;
  margin-bottom: 5px !important;
`

export const StreetInputContainer = styled(AutoComplete)`
  width: 100%;
`

export const StyledCityInput = styled(Input)`
  height: 32px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
`
export const RequiredSpan = styled.span`
  color: #e61737;
  margin: 0 5px;
`
export const InputTitleContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`
export const Label = styled.div`
  height: 19px;
  color: #5f6062;
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`

export const ShipTopPoAPO = Label.extend`
  @media (max-width: 480px) {
    display: none;
  }
`

export const DropDownPlaceHolder = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  border: 1px solid #bebebe;
  border-radius: 0;
  margin-top: 5px;
  &:hover {
    border: 1px solid #bebebe;
    color: #bebebe;
  }
`
export const ErrorMsg = styled.div`
  height: 16px;
  width: 100%;
  color: #e61737;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`

export const StyledPopOver = styled(Tooltip)`
  cursor: pointer;
  font-size: 12px;
  margin-top: 2px;
  margin-left: 11px;
`

export const PopoverText = styled.div`
  max-width: 256px;
  width: 100%;
  font-size: 12px;
  color: ${BLACK};
`

export const InfoIconLink = styled(Icon)`
  margin-left: 10px;
  color: ${GRAY_STRONG};
`