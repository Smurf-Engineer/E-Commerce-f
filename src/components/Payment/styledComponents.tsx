/**
 * Styled Components - Created by miguelcanobbio on 16/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'

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
  justify-content: space-between;
`

export const MethodButton = styled(Button)`
  height: 40px;
  width: 138.23px;
  border: 1px solid #dcdcdc;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
`

export const ContainerBilling = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
`

export const StyledCheckbox = styled(Checkbox)`
  height: 36px;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
  margin: 5px 0;
`
