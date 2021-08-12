/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { GRAY_DARK, WHITE, GRAY_LIGHT, BLUE } from '../../theme/colors'

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
`

interface ButtonProps {
  selected?: boolean
}

export const MethodButton = styled(Button)`
  background-color: ${WHITE};
  border: 2px solid ${GRAY_LIGHT};
  border-radius: 2px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  color: ${({ selected }: ButtonProps) => (selected ? BLUE : GRAY_LIGHT)};
  height: 40px;
  margin-left: 5px;
  width: 138.23px;

  &:hover,
  &::selection,
  &::after,
  &:focus {
    border-color: ${BLUE};
    color: ${BLUE};
  }

  border: 0.5px solid
    ${({ selected }: ButtonProps) => (selected ? BLUE : GRAY_LIGHT)};
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
