/**
 * Styled Components - Created by david on 12/03/18.
 */
import styled, { keyframes } from 'styled-components'
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

export const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`

export const List = styled.div`
  opacity: 0;
  animation: ${fadeIn} 0.5s cubic-bezier(0.67, 0.35, 0.565, 1) both;
  background-color: #fff;
  text-align: center;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 302px 302px 302px;
  grid-gap: 50px 40px;
  grid-template-rows: auto;
  justify-content: center;

  @media (max-width: 1020px) {
    grid-template-columns: 302px 302px;
  }
`

export const ModalMessage = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 22px;
`

export const Empty = styled.div`
  display: flex;
  flex: 1;
  height: 60vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const EmptyTitle = styled.div`
  color: #5f6062;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`

export const EmptyMessage = styled.div`
  margin-top: 16px;
  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 23px;
  text-align: center;
`
