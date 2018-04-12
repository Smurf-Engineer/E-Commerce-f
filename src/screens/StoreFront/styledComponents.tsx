/**
 * Styled Components - Created by gustavomedina on 11/04/18.
 */
import styled from 'styled-components'
import Slider from 'antd/lib/slider'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
`

export const HeadersContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const SideBar = styled.div`
  width: 30%;
  padding-top: 36px;
  padding-right: 32px;
`

export const Title = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-transform: uppercase;
`

export const AboutTitle = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.3px;
  line-height: 33px;
  text-transform: uppercase;
  text-align: center;
`

export const AboutContainer = styled.div`
  padding: 30px;
`

export const TierContainer = styled.div`
  padding-top: 40px;
`

export const OrderTitle = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 19px;
  text-align: right;
`

export const Content = styled.div`
  width: 70%;
  padding-top: 36px;
  padding-left: 36px;
`
export const PriceTitle = styled.div`
  padding-top: 27px;
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const PriceDescription = styled.div`
  padding-top: 10px;
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  letter-spacing: 0.11px;
  line-height: 23px;
`

export const TierTitle = styled.div`
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.11px;
  line-height: 23px;
  text-align: center;
`

export const TierDescription = styled.div`
  padding-top: 5px;
  color: #5f6062;
  font-family: Avenir Next;
  font-size: 12px;
  letter-spacing: 0.15px;
  line-height: 16px;
  text-align: center;
`

export const Text = styled.div`
  color: #fff;
`

export const StyledSlider = styled(Slider)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
`
