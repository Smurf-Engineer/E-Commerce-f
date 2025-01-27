/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input/Input'
import { GRAY_DARK, WHITE, BLUE, GRAY_STRONG, GRAY_SNOW } from '../../theme/colors'
import Icon from 'antd/lib/icon'

interface DivProps {
  secondary?: boolean
}

export const Container = styled.div`
  width: 100%;
`

export const Title = styled.div`
  color: ${GRAY_DARK};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin: 24px 0;
`

export const ContainerMethods = styled.div`
  display: flex;
  /* justify-content: space-between; TODO: uncomment when left payment methods*/
  ${({ secondary }: DivProps) => secondary ? `
    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
  ` : ''}
`

interface ButtonProps {
  selected?: boolean
  disabledProp?: boolean
}

export const PaymentIcon = styled(Icon)`
  font-size: 16px;
`

export const PaypalIcon = styled.img`
  transition: all .25s;
  max-width: 90%;
`

export const StripeIcon = styled.img`
  transition: all .25s;
  max-width: 55%;
`

export const CheckIcon = styled(Icon)`
  color: ${BLUE};
  position: absolute;
  top: -10px;
  right: -6px;
  font-size: 18px;
  background: white;
  border-radius: 35px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: scale-in-center 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  @keyframes scale-in-center {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`

export const MethodButton = styled(Button)`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ selected }) => selected ? WHITE : GRAY_SNOW};
  border-radius: 5px;
  transition: all .25s;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  color: ${({ selected }) => selected ? BLUE : GRAY_STRONG};
  height: 58px;
  margin-left: 5px;
  margin-right: 12px;
  width: 112px;
  span {
    margin-left: 0px;
  }
  &:hover {
    border-color: ${BLUE};
    color: ${BLUE};
  }

  border: ${({ selected }: ButtonProps) => (selected ? `1.5px solid ${BLUE}` : `0.5px solid ${GRAY_STRONG}`)};

  ${({ secondary }: DivProps) => secondary ? `
    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  ` : ''}
  ${({ disabledProp }: ButtonProps) => disabledProp ? `
    filter: saturate(0) brightness(1.25);
    border: 0.5px solid ${GRAY_STRONG};
    background-color: ${GRAY_SNOW};
    color: ${GRAY_STRONG}; 
    &:hover {
      cursor: not-allowed;
    }
  ` : ''}
`

export const InvoiceDiv = styled.div`
  margin-top: 50px;
  margin-bottom: 40px;
`

export const InvoiceTitle = styled.div`
  font-weight: 900;
  font-size: 16px;
  margin-bottom: 12px;
  font-family: Avenir-Medium;
`

export const InvoiceSubtitle = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
`

export const InvoiceInformation = styled.div`
  max-width: 388px;
  width: 100%;
`

export const InvoiceIcon = styled(Icon)`
  margin-right: 8px;
  color: ${BLUE};
`

export const ReferenceDiv = styled.div`
  margin-left: 20px;
`

export const LabelReference = styled.div`
  font-size: 12px;
  color: ${GRAY_STRONG};
  font-family: Avenir;
  margin-bottom: 7px;
`

export const ReferenceInput = styled(Input)`
  width: 100%;
  max-width: 128px;
  height: 33px;
  margin-right: 28px;
  border-radius: 3px;
`

export const ReferenceIcon = styled(Icon)`
  margin-right: 4px;
  color: #7c9fc8;
`