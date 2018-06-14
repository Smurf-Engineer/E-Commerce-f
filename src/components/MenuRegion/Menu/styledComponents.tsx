/**
 * Styled Components - Created by david on 20/02/18.
 */
import styled from 'styled-components'
import Divider from 'antd/lib/divider'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Line = styled(Divider)`
  align-self: center;
  margin: 10px 0px;
  width: 276px;
`
export const LineVertical = styled(Divider)`
  height: 20px;
`

export const Text = styled.div`
  color: #5f6062;
  text-align: center;
  cursor: pointer;
  font-family: 'Avenir Next';
  font-size: 18px;
  line-height: 25px;
  padding: 0px 10px;
`

export const Label = styled.div`
  text-align: center;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 12px;
  margin-bottom: 13px;
`

export const Option = styled.div`
  display: flex;
  align-items: center;
`

export const MenuOption = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  margin-left: 12px;
  font-size: 14px;
  line-height: 22px;
`

export const menuStyle = {
  marginLeft: 58
}
