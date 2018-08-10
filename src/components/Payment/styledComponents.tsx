/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  width: 100%;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
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
  height: 40px;
  width: 138.23px;
  color: ${({ selected }: ButtonProps) => (selected ? '#4a90e2' : '#dcdcdc')};
  border: 2px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
  margin-left: 5px;
  font-family: 'Avenir Next';

  &:hover,
  &::selection,
  &::after,
  &:focus {
    color: #4a90e2;
    border-color: #4a90e2;
  }

  border: 0.5px solid
    ${({ selected }: ButtonProps) => (selected ? '#4a90e2' : '#DCDCDC')};
`

export const MyCardsRow = styled.div`
  margin-bottom: 20px;
`
