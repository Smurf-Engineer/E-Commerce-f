/**
 * Styled Components - Created by cazarez on 02/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import { RED, BLUE, WHITE } from '../../theme/colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

export const Text = styled.div`
  color: #fff;
`

export const StyledButton = styled(Button)`
  height: 50px;
  width: 221px;
  border: 2px solid ${RED};
  border-radius: 2px;
  text-transform: uppercase;
  color: ${RED};
  transition: all 0.25s;
  &:hover {
    color: ${WHITE};
    background: ${RED};
  }
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
  }
`

interface ButtonContainerProps {
  withoutTop?: boolean
  myLockerList?: boolean
}

export const ButtonContainer = styled.div`
  user-select: none;
  display: flex !important;
  position: ${({ myLockerList }: ButtonContainerProps) =>
    myLockerList ? 'relative' : 'absolute'};
  justify-content: center;
  top: ${({ withoutTop, myLockerList }: ButtonContainerProps) => {
    if (myLockerList) {
      return '0'
    }
    return withoutTop ? '5px' : '170px'
  }};
`

export const CustomizeButton = styled.div`
  user-select: none;
  background-color: #e61737b3;
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding: 6px 19px;

  @media (min-width: 320px) and (max-width: 768px) {
    background-color: #fff;
    color: ${RED};
    border: 1px solid ${RED};
    width: 100%;
  }
`

interface Prop {
  individual?: boolean
  hide?: boolean
}

export const ButtonWrapper = styled.span`
  display: ${({ hide }: Prop) => (hide ? 'none' : 'flex')};
  align-self: flex-end;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  width: ${({ individual }: Prop) => (individual ? '93px' : '145px')};

  @media (min-width: 320px) and (max-width: 480px) {
    margin-top: ${({ individual }: Prop) => (individual ? '5px' : '0px')};
    width: ${({ individual }: Prop) => (individual ? '139px' : '145px')};
  }

  .ant-btn-primary {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
  .ant-btn-primary:hover {
    background-color: ${BLUE};
    border-color: ${BLUE};
  }
`
export const ReorderButton = styled(Button)`
  width: 100%;
`
