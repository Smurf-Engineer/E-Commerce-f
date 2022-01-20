/**
 * Styled Components - Created by eduardoquintero on 13/09/19.
 */
import { Button } from 'antd'
import styled from 'styled-components'
import { BLACK, GRAY_DARK, RED, WHITE } from '../../../theme/colors'

export const Container = styled.div``

export const Title = styled.div`
  font-size: 20px;
  line-height: 36px;
  text-align: center;
  @media (max-width: 1919px) {
    font-size: 18px;
    line-height: 32px;
  }
  @media (max-width: 1023px) {
    font-size: 16px;
    color: ${WHITE};
  }
`

export const SubTitle = styled.div`
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  @media (max-width: 1919px) {
    font-size: 16px;
    line-height: 28px;
  }
  @media (max-width: 1023px) {
    font-size: 14px;
    color: ${WHITE};
  }
`

export const IconTitle = styled.img`
  margin: 25px 0 6px -4px;
  height: ${({ height }) => height || '24px'};
  display: flex;
  align-items: flex-start;
  @media (max-width: 1023px) {
    margin-top: 15px;
  }
`

export const Content = styled.div`
  margin: 20px 0 40px;
  color: ${GRAY_DARK};
  font-size: 18px;
  letter-spacing: 0.2px;
  line-height: 26px;

  .important {
    color: ${RED};
  }
  .no-margin {
    margin-bottom: 0;
  }
  .italic {
    font-style: italic;
  }
  .smaller-text {
    font-size: 13px;
    span {
      text-decoration: underline;
    }
  }
  ul {
    margin-bottom: 20px;
  }
  ul,
  ul > li {
    list-style: none;
    padding-left: 0;
  }

  @media (max-width: 1919px) {
    font-size: 14px;
    line-height: 22px;
  }
  @media (max-width: 1023px) {
    color: ${WHITE};
    margin: 10px 0 20px;
  }
  @media (max-width: 767px) {
    font-size: 12px;
    line-height: 18px;
  }
  @media (max-width: 424px) {
    font-size: 10px;
    line-height: 16px;
  }
`

export const CloseButton = styled(Button)`
  background: ${BLACK};
  color: ${WHITE};

  &:hover {
    background: ${BLACK};
    color: ${WHITE};
    border-color: ${WHITE};
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`
