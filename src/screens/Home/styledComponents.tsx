import styled from 'styled-components'
import Button from 'antd/lib/button'
import { WHITE, AUBERGINE, GRAY_SOFT } from '../../theme/colors'

export const Container = styled.div``

export const HomeHeader = styled.div`
  color: ${WHITE};
  font-size: 24px;
  padding: 20px;
`

export const SearchBarContent = styled.div`
  color: ${WHITE};
  left: 315px;
  position: absolute;
  right: 300px;
  bottom: 24px;

  @media (min-width: 481px) and (max-width: 767px) and (orientation: landscape) {
    position: unset;
  }

  @media (min-width: 320px) and (max-width: 767px) {
    position: unset;
  }
`

export const SearchBackground = styled.img`
  object-fit: cover;
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
  color: ${WHITE};
  font-size: 14px;
  height: 19px;
  line-height: 19px;
  margin: 17px 0 5px 0;
`

export const GetStartedButton = styled(Button)`
  border-radius: 0;
  font-size: 16px;
  height: 51px;
  line-height: 22px;
  width: 30%;
`
export const PropositionTilesContainer = styled.div`
  background-color: ${AUBERGINE};
  color: ${WHITE};
  display: flex;
  justify-content: space-around;
  padding: 21px 0 29px;

  @media (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
    height: 401px;
    padding: 0;
  }
`
export const PropositionTile = styled.div`
  color: ${WHITE};
  font-size: 20px;
  letter-spacing: 0.25px;
  line-height: 27px;
  text-align: center;
`
export const SubText = styled.div`
  color: ${GRAY_SOFT};
  font-size: 14px;
`
