import styled from 'styled-components'
import Checkbox from 'antd/lib/checkbox'
import { WHITE_TRANSPARENT, GRAY_DARK } from '../../../theme/colors'

interface ColumnProps {
  marginLeft?: string
}

interface CheckboxProps {
  hide?: boolean
}

export const Container = styled.div`
  text-align: left;
  margin-bottom: 50px;
`

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    margin: 20px 15px 20px 5px;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: ${({ marginLeft }: ColumnProps) =>
    marginLeft ? marginLeft : '0px'};
`

export const Header = styled.div`
  display: flex;
  font-weight: 600;
  margin-bottom: 8px;
  align-items: baseline;
  min-height: 17px;
`

export const Title = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 2px;
  margin-top: 2px;

  @media (max-width: 767px) {
    flex-direction: column;
    font-weight: bold;
    margin: 10px 0;
  }
`

export const Description = styled.div`
  font-weight: normal;
  font-size: 12px;
`

export const LoadingContainer = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10000;
  height: 100vh;
  background: ${WHITE_TRANSPARENT};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CheckBoxStyled = styled(Checkbox)`
  margin-left: 8px !important;
  visibility: ${({ hide }: CheckboxProps) => (hide ? 'hidden' : 'visible')};

  @media (max-width: 767px) {
    margin: 10px 0;
  }
`

export const PhoneColumn = styled.div`
  display: block;
  margin-left: 10px;

  @media (max-width: 767px) {
    margin-left: 5px;
  }
`

export const InputTitleContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
`
export const Label = styled.div`
  height: 19px;
  color: ${GRAY_DARK};
  font-size: 14px;
  letter-spacing: 0.18px;
  line-height: 19px;
`
