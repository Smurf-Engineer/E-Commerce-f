/**
 * Styled Components - Created by miguelcanobbio on 14/05/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div`
  background-color: #fff;
`

export const Text = styled.div`
  color: #fff;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const Message = styled.div`
  margin-top: 16px;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`

export const StyledEmptyButton = styled(Button)`
  border-radius: 0px;
  width: 25%;
  height: 50px;
  border-color: #e61737;
  border-width: 2px;
  background-color: #fff;
  margin: 16px 0;
  font-size: 18px;
`
