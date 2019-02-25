/**
 * Styled Components - Created by david on 29/05/18.
 */
import styled from 'styled-components'
import AntdSlider from 'antd/lib/slider'

export const Container = styled.div``

export const Header = styled.div`
  padding: 12px 50px 12px 32px;
`

export const Title = styled.div`
  color: #5f6062;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 22px;
`

export const Slider = styled(AntdSlider)`
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0px;
`

export const Value = styled.div`
  color: #5f6062;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
`
