import styled from 'styled-components'
import Button from 'antd/lib/button'

export const Container = styled.div``

export const HomeHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  color: white;
`

export const SearchBarContent = styled.div`
  position: absolute;
  top: 510px;
  left: 360px;
  right: 360px;
  color: #fff;

  @media (min-width: 768px) and (max-width: 1024px) {
    top: 14em;
    width: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (min-width: 481px) and (max-width: 767px) {
  }

  @media (min-width: 320px) and (max-width: 480px) {
    position: unset;
  }
`

export const SearchBackground = styled.img`
  width: 100%;
`
export const SearchContainer = styled.div`
  position: relative;
`

export const HelpContainer = styled.div`
  text-align: center;

  @media (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`

export const NeedHelp = styled.div`
  height: 19px;
  color: #ffffff;
  font-family: 'Avenir Next';
  font-size: 14px;
  line-height: 19px;
  margin: 17px 0 5px 0;
`

export const GetStartedButton = styled(Button)`
  width: 30%;
  height: 51px;
  border-radius: 0;

  font-family: 'Avenir Next';
  font-size: 16px;
  line-height: 22px;
`
