/**
 * Styled Components - Created by cazarez on 10/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  width: 100%;
`
export const Content = styled.div`
  padding-bottom: 30px;
`
export const Title = styled.div`
  height: 22px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`
export const AddAddressBtn = styled(Button)`
  height: 40px;
  width: 221px;
  border: 2px solid #4a90e2;
  border-radius: 2px;
  background-color: #ffffff;
  color: #4a90e2;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 22px;
  text-align: center;
  margin: 20px 0;

  &:hover {
    color: #4a90e2;
    border-color: #4a90e2;
  }
`

export const AddressesList = styled.div`
  display: flex;
  justify-content: flex-start;
`
