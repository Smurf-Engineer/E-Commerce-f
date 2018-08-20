/**
 * Styled Components - Created by cazarez on 10/04/18.
 */
import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div``
export const Content = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60vh;
`

export const SearchBarContent = styled.div`
  position: absolute;
  align-self: center;
`

export const Text = styled.div`
  color: #fff;
`

export const SearchBackground = styled.img`
  width: 100%;
  object-fit: fill;

  @media (min-width: 320px) and (max-width: 480px) {
    object-fit: cover;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }
`

export const TeamStoreText = styled.div`
  height: 44px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
`
export const SearchContainer = styled.div`
  position: absolute;
`

export const ButtonRow = styled.div`
  margin-top: 21px;
  text-align: right;

  span {
    height: 22px;
    width: 100.9px;
    color: #5f6062;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
`
export const StyledButton = styled(Button)`
  border-radius: 0;
  height: 40px;
  width: 165.28px;
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);
`

export const ResultContainer = styled.div`
  padding: 80px 30px 90px 30px;
  background-color: #fff;

  @media (max-width: 480px) {
    padding: 80px 10px 90px 10px;
  }
`

export const TitleContainer = styled.div``
export const Title = styled.div`
  height: 33px;
  text-align: center;
  color: #5f6062;
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;

  @media (min-width: 320px) and (max-width: 480px) {
    font-size: 20px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }
`

export const GetSponsored = styled.div`
  height: 16px;
  text-align: center;
  color: #e61737;
  font-size: 12px;
  line-height: 16px;
`
