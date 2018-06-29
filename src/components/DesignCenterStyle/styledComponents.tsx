/**
 * Styled Components - Created by david on 12/03/18.
 */
import styled from 'styled-components'
import AntdSlider from 'antd/lib/slider'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.div`
  margin-top: 16;
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 12px;
  line-height: 16px;
`

export const Slider = styled(AntdSlider)`
  margin-top: 14px;
  width: 25%;
`

export const List = styled.div`
  background-color: #fff;
  text-align: center;
`

export const Row = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

export const ModalMessage = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`
